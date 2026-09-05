import { timingSafeEqual } from 'node:crypto';
import { Resend } from 'resend';

// Webhook de conversão do RD Station Marketing → e-mail formatado para o comercial.
// Reaproveita o visual do e-mail "⚡ Novo Orçamento Recebido" de api/send-email.ts.
//
// Configuração no RD Station: URL = https://<dominio>/api/rd-webhook-notify?token=<RD_WEBHOOK_TOKEN>
// Env na Vercel: RESEND_API_KEY (já existente) e RD_WEBHOOK_TOKEN (segredo simples do webhook).

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_FROM = 'send@projemac.com.br';
const EMAIL_TO = 'comercial@projemac.com.br';

type Origem = 'locacao' | 'eventos' | 'paradas';

// Identificadores das conversões das LPs. Aceita o id completo (com hash) ou só a base.
const CONVERSIONS: Record<Origem, { full: string; base: string }> = {
  locacao: { full: 'formulario-locacao-e55b1a7f26f221676e7f', base: 'formulario-locacao' },
  eventos: { full: 'formulario-eventos-b20a2563b4e5ea067c08', base: 'formulario-eventos' },
  paradas: { full: 'formulario-paradas-de-energia-83702f9f40ca36e64518', base: 'formulario-paradas-de-energia' },
};

const ORIGEM_LABEL: Record<Origem, string> = {
  locacao: 'Locação Mensal/Semanal/Diária',
  eventos: 'Locação para Eventos',
  paradas: 'Parada de Energia',
};

// Chaves que o RD usa para dados padrão do lead — não são tratadas como campos customizados.
const STANDARD_KEYS = new Set([
  'conversion_identifier', 'identificador', 'email', 'email_lead', 'name', 'nome',
  'mobile_phone', 'personal_phone', 'telefone', 'celular', 'phone',
  'company', 'company_name', 'empresa', 'city', 'cidade', 'state', 'estado',
  'traffic_source', 'traffic_medium', 'traffic_campaign', 'traffic_value',
  'client_tracking_id', 'legal_bases', 'available_for_mailing', 'tags',
  'job_title', 'cargo', 'website', 'uuid', 'id', 'created_at', 'updated_at',
  'user', 'lead_stage', 'fit_score', 'interest', 'opportunity', 'number_conversions',
  'bio', 'public_url', 'first_conversion', 'last_conversion', 'custom_fields',
  'conversion_origin', 'source', 'cumulative_sum', 'content', 'twitter', 'facebook',
  'linkedin', 'lead_id', 'form_id', 'form_name', 'landing_page', 'page_url', 'url',
]);

// Campos customizados relevantes, na ordem em que aparecem na tabela.
// `match` é testado contra a chave normalizada (sem cf_, sem acento, minúscula).
const CUSTOM_FIELDS: { label: string; match: RegExp; origens?: Origem[] }[] = [
  { label: 'Prazo', match: /prazo|periodo|duracao|tempo_de_locacao/, origens: ['locacao'] },
  { label: 'Tipo de evento', match: /tipo.*evento|evento.*tipo/, origens: ['eventos'] },
  { label: 'Data prevista', match: /data.*(prevista|evento|inicio|locacao)|previsao/, origens: ['locacao', 'eventos'] },
  { label: 'Situação', match: /situacao/, origens: ['paradas'] },
  { label: 'Data do desligamento', match: /data.*deslig|deslig.*data|data.*parada/, origens: ['paradas'] },
  { label: 'O que precisa continuar ligado', match: /continuar.*ligad|precisa.*ligad|equipamento|carga/, origens: ['paradas'] },
];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type AnyRecord = Record<string, unknown>;

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function asText(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'string') return value.trim() || null;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  if (Array.isArray(value)) {
    const parts = value.map(asText).filter(Boolean) as string[];
    return parts.length ? parts.join(', ') : null;
  }
  return null;
}

function normalizeKey(key: string): string {
  return key
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .toLowerCase()
    .replace(/^cf_/, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

function normalizeText(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function humanizeKey(key: string): string {
  const words = normalizeKey(key).replace(/_/g, ' ').trim();
  return words ? words.charAt(0).toUpperCase() + words.slice(1) : key;
}

function firstText(...values: unknown[]): string | null {
  for (const v of values) {
    const t = asText(v);
    if (t) return t;
  }
  return null;
}

// ---------------------------------------------------------------------------
// Parsing do payload do RD Station
// ---------------------------------------------------------------------------

function parseBody(raw: unknown): unknown {
  if (typeof raw === 'string') {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (Buffer.isBuffer(raw)) {
    try {
      return JSON.parse(raw.toString('utf8'));
    } catch {
      return null;
    }
  }
  return raw ?? null;
}

// O RD envia { leads: [...] } no webhook clássico; outras integrações podem
// mandar { lead: {...} }, um lead solto ou um array de leads.
function extractLeads(body: unknown): AnyRecord[] {
  if (Array.isArray(body)) return body.filter(isRecord);
  if (!isRecord(body)) return [];
  if (Array.isArray(body.leads)) return body.leads.filter(isRecord);
  if (isRecord(body.leads)) return [body.leads];
  if (isRecord(body.lead)) return [body.lead];
  if (isRecord(body.data) && Array.isArray((body.data as AnyRecord).leads)) {
    return ((body.data as AnyRecord).leads as unknown[]).filter(isRecord);
  }
  if (isRecord(body.data)) return [body.data as AnyRecord];
  return [body];
}

function conversionContent(conversion: unknown): AnyRecord {
  if (!isRecord(conversion)) return {};
  return isRecord(conversion.content) ? conversion.content : conversion;
}

function extractConversionIdentifier(lead: AnyRecord): string | null {
  const last = conversionContent(lead.last_conversion);
  const first = conversionContent(lead.first_conversion);
  return firstText(
    last.conversion_identifier,
    last.identificador,
    isRecord(lead.last_conversion) ? lead.last_conversion.conversion_identifier : null,
    lead.conversion_identifier,
    lead.identificador,
    first.conversion_identifier,
    first.identificador,
  );
}

function resolveOrigem(identifier: string | null): Origem | null {
  if (!identifier) return null;
  const id = identifier.trim().toLowerCase();
  // Remove um hash hexadecimal final (ex.: "-e55b1a7f26f221676e7f") para comparar com a base.
  const stripped = id.replace(/-[0-9a-f]{16,}$/, '');
  for (const origem of Object.keys(CONVERSIONS) as Origem[]) {
    const { full, base } = CONVERSIONS[origem];
    if (id === full || id === base || stripped === base) return origem;
  }
  return null;
}

// Junta todos os campos customizados possíveis: lead.custom_fields, o conteúdo da
// última conversão e chaves cf_* soltas no lead.
function collectCustomFields(lead: AnyRecord): { fields: Record<string, string>; explicit: Set<string> } {
  const fields: Record<string, string> = {};
  // Chaves vindas de custom_fields ou com prefixo cf_: sabidamente customizadas.
  const explicit = new Set<string>();
  const add = (key: string, value: unknown, isExplicit: boolean) => {
    const text = asText(value);
    if (!text) return;
    if (STANDARD_KEYS.has(key.toLowerCase())) return;
    if (!(key in fields)) fields[key] = text;
    if (isExplicit || /^cf_/i.test(key)) explicit.add(key);
  };

  if (isRecord(lead.custom_fields)) {
    for (const [k, v] of Object.entries(lead.custom_fields)) add(k, v, true);
  }
  const last = conversionContent(lead.last_conversion);
  for (const [k, v] of Object.entries(last)) add(k, v, false);
  for (const [k, v] of Object.entries(lead)) {
    if (/^cf_/i.test(k)) add(k, v, true);
  }
  return { fields, explicit };
}

interface LeadInfo {
  origem: Origem;
  identifier: string;
  nome: string | null;
  email: string | null;
  telefone: string | null;
  empresa: string | null;
  cidade: string | null;
  estado: string | null;
  campos: { label: string; value: string }[];
  urgente: boolean;
}

function buildLeadInfo(lead: AnyRecord, origem: Origem, identifier: string): LeadInfo {
  const last = conversionContent(lead.last_conversion);
  const { fields: custom, explicit } = collectCustomFields(lead);

  const campos: { label: string; value: string }[] = [];
  const used = new Set<string>();

  for (const field of CUSTOM_FIELDS) {
    if (field.origens && !field.origens.includes(origem)) continue;
    const entry = Object.entries(custom).find(
      ([key]) => !used.has(key) && field.match.test(normalizeKey(key))
    );
    if (entry) {
      used.add(entry[0]);
      campos.push({ label: field.label, value: entry[1] });
    }
  }

  // Demais campos customizados que não bateram com os relevantes entram no fim,
  // com a chave humanizada, para nenhuma informação do formulário se perder.
  for (const [key, value] of Object.entries(custom)) {
    if (used.has(key) || !explicit.has(key)) continue;
    campos.push({ label: humanizeKey(key), value });
  }

  const situacao = campos.find((c) => c.label === 'Situação')?.value ?? null;
  const urgente =
    origem === 'paradas' && !!situacao && normalizeText(situacao).includes('sem energia agora');

  return {
    origem,
    identifier,
    nome: firstText(lead.name, lead.nome, last.name, last.nome),
    email: firstText(lead.email, last.email, last.email_lead),
    telefone: firstText(
      lead.mobile_phone, lead.personal_phone, lead.phone,
      last.mobile_phone, last.personal_phone, last.telefone, last.phone,
    ),
    empresa: firstText(lead.company, lead.company_name, last.company, last.company_name, last.empresa),
    cidade: firstText(lead.city, last.city, last.cidade),
    estado: firstText(lead.state, last.state, last.estado),
    campos,
    urgente,
  };
}

// ---------------------------------------------------------------------------
// E-mail (mesmo template visual de api/send-email.ts)
// ---------------------------------------------------------------------------

function interesseLabel(info: LeadInfo): string {
  const base = ORIGEM_LABEL[info.origem];
  return info.urgente ? `${base} ⚡ URGENTE` : base;
}

function buildEmailHtml(info: LeadInfo): string {
  const tipoLabel = interesseLabel(info);
  const dataHora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  const row = (label: string, value: string | null | undefined) =>
    value
      ? `<tr>
          <td style="padding:10px 16px;font-weight:600;color:#374151;background:#f9fafb;width:180px;border-bottom:1px solid #e5e7eb;">${label}</td>
          <td style="padding:10px 16px;color:#1f2937;border-bottom:1px solid #e5e7eb;">${value}</td>
        </tr>`
      : '';

  const email = info.email ? escapeHtml(info.email) : null;
  const telefone = info.telefone ? escapeHtml(info.telefone) : null;
  const telHref = info.telefone ? encodeURIComponent(info.telefone.replace(/[^\d+]/g, '')) : '';

  const camposRows = info.campos
    .map((c) => row(escapeHtml(c.label), escapeHtml(c.value)))
    .join('\n              ');

  const chipBg = info.urgente ? '#fee2e2' : '#dbeafe';
  const chipColor = info.urgente ? '#b91c1c' : '#1d4ed8';

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Novo Orçamento</title></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f3f4f6;padding:40px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#1e3a5f 0%,#2563eb 100%);padding:36px 32px;text-align:center;">
            <h1 style="margin:0;color:#ffffff;font-size:24px;font-weight:700;letter-spacing:-0.5px;">
              ⚡ Novo Orçamento Recebido
            </h1>
            <p style="margin:8px 0 0;color:#bfdbfe;font-size:14px;">${dataHora}</p>
          </td>
        </tr>

        <!-- Badge tipo -->
        <tr>
          <td style="padding:24px 32px 0;text-align:center;">
            <span style="display:inline-block;background:${chipBg};color:${chipColor};font-size:13px;font-weight:600;padding:6px 18px;border-radius:20px;letter-spacing:0.3px;">
              ${escapeHtml(tipoLabel)}
            </span>
          </td>
        </tr>

        <!-- Dados -->
        <tr>
          <td style="padding:24px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
              ${row('Nome', info.nome ? escapeHtml(info.nome) : null)}
              ${row('Email', email ? `<a href="mailto:${email}" style="color:#2563eb;text-decoration:none;">${email}</a>` : null)}
              ${row('Telefone', telefone ? `<a href="tel:${telHref}" style="color:#2563eb;text-decoration:none;">${telefone}</a>` : null)}
              ${row('Empresa', info.empresa ? escapeHtml(info.empresa) : null)}
              ${row('Cidade / Estado', [info.cidade, info.estado].filter(Boolean).map((v) => escapeHtml(v as string)).join(' - ') || null)}
              ${row('Interesse', escapeHtml(tipoLabel))}
              ${camposRows}
            </table>
          </td>
        </tr>

        ${email ? `
        <!-- CTA -->
        <tr>
          <td style="padding:0 32px 36px;text-align:center;">
            <a href="mailto:${email}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;">
              Responder ao Cliente
            </a>
          </td>
        </tr>` : ''}

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              Este email foi gerado automaticamente pela landing page do site Projemac (formulário RD Station: ${escapeHtml(info.identifier)}).
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------

function getQueryToken(req: any): string | null {
  const fromQuery = req.query?.token;
  if (typeof fromQuery === 'string') return fromQuery;
  if (Array.isArray(fromQuery) && typeof fromQuery[0] === 'string') return fromQuery[0];
  // Fallback caso o runtime não popule req.query.
  try {
    const url = new URL(req.url ?? '', 'http://localhost');
    return url.searchParams.get('token');
  } catch {
    return null;
  }
}

function tokenIsValid(provided: string | null, expected: string | undefined): boolean {
  if (!provided || !expected) return false;
  const a = Buffer.from(provided);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  // Placeholder: valor real cadastrado como env RD_WEBHOOK_TOKEN na Vercel.
  const expectedToken = process.env.RD_WEBHOOK_TOKEN;
  if (!expectedToken) {
    console.error('RD_WEBHOOK_TOKEN não configurada — webhook do RD Station recusado.');
    return res.status(401).json({ message: 'Não autorizado' });
  }
  if (!tokenIsValid(getQueryToken(req), expectedToken)) {
    return res.status(401).json({ message: 'Não autorizado' });
  }

  const body = parseBody(req.body);
  const leads = extractLeads(body);

  // Sempre 200 daqui em diante para o RD não ficar reenviando o evento.
  if (leads.length === 0) {
    console.warn('RD webhook: payload sem leads reconhecíveis.');
    return res.status(200).json({ message: 'Ignorado: payload sem leads', notified: 0 });
  }

  const matched: LeadInfo[] = [];
  const ignored: string[] = [];

  for (const lead of leads) {
    const identifier = extractConversionIdentifier(lead);
    const origem = resolveOrigem(identifier);
    if (!origem) {
      ignored.push(identifier ?? '(sem identificador)');
      continue;
    }
    matched.push(buildLeadInfo(lead, origem, identifier as string));
  }

  if (matched.length === 0) {
    return res.status(200).json({ message: 'Ignorado: conversão fora das LPs', notified: 0, ignored });
  }

  const results = await Promise.allSettled(
    matched.map((info) => {
      const nome = info.nome ?? info.email ?? 'Lead sem nome';
      return resend.emails.send({
        from: EMAIL_FROM,
        to: EMAIL_TO,
        ...(info.email ? { replyTo: info.email } : {}),
        subject: `[Orçamento] ${nome} — ${interesseLabel(info)}`,
        html: buildEmailHtml(info),
      });
    })
  );

  let notified = 0;
  results.forEach((result, i) => {
    if (result.status === 'fulfilled' && !(result.value as any)?.error) {
      notified += 1;
    } else {
      const detail = result.status === 'rejected' ? result.reason : (result.value as any)?.error;
      console.error(`RD webhook: falha ao enviar e-mail (${matched[i].identifier}):`, detail);
    }
  });

  // Falha no Resend ainda responde 200: reenvio do RD geraria e-mails duplicados
  // para os leads que deram certo. O erro fica registrado nos logs da Vercel.
  return res.status(200).json({ message: 'Processado', notified, ignored });
}
