import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const TIPO_INTERESSE_MAP: Record<string, string> = {
  locacao: 'Locação de Geradores',
  projeto: 'Projeto de Instalação',
  outros: 'Outros',
};

function buildEmailHtml(data: {
  nome: string;
  email: string;
  telefone: string;
  empresa?: string | null;
  cidade?: string | null;
  estado?: string | null;
  tipo_interesse: string;
  mensagem?: string | null;
}): string {
  const tipoLabel = TIPO_INTERESSE_MAP[data.tipo_interesse] ?? data.tipo_interesse;
  const dataHora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });

  const row = (label: string, value: string | null | undefined) =>
    value
      ? `<tr>
          <td style="padding:10px 16px;font-weight:600;color:#374151;background:#f9fafb;width:180px;border-bottom:1px solid #e5e7eb;">${label}</td>
          <td style="padding:10px 16px;color:#1f2937;border-bottom:1px solid #e5e7eb;">${value}</td>
        </tr>`
      : '';

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
            <span style="display:inline-block;background:#dbeafe;color:#1d4ed8;font-size:13px;font-weight:600;padding:6px 18px;border-radius:20px;letter-spacing:0.3px;">
              ${tipoLabel}
            </span>
          </td>
        </tr>

        <!-- Dados -->
        <tr>
          <td style="padding:24px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
              ${row('Nome', data.nome)}
              ${row('Email', `<a href="mailto:${data.email}" style="color:#2563eb;text-decoration:none;">${data.email}</a>`)}
              ${row('Telefone', `<a href="tel:${data.telefone}" style="color:#2563eb;text-decoration:none;">${data.telefone}</a>`)}
              ${row('Empresa', data.empresa)}
              ${row('Cidade / Estado', [data.cidade, data.estado].filter(Boolean).join(' - ') || null)}
              ${row('Interesse', tipoLabel)}
            </table>
          </td>
        </tr>

        ${data.mensagem ? `
        <!-- Mensagem -->
        <tr>
          <td style="padding:0 32px 28px;">
            <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px;">
              <p style="margin:0 0 8px;font-weight:600;color:#374151;font-size:13px;text-transform:uppercase;letter-spacing:0.5px;">Mensagem</p>
              <p style="margin:0;color:#1f2937;line-height:1.6;white-space:pre-wrap;">${data.mensagem}</p>
            </div>
          </td>
        </tr>` : ''}

        <!-- CTA -->
        <tr>
          <td style="padding:0 32px 36px;text-align:center;">
            <a href="mailto:${data.email}" style="display:inline-block;background:#2563eb;color:#ffffff;text-decoration:none;padding:14px 32px;border-radius:8px;font-weight:600;font-size:15px;">
              Responder ao Cliente
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f9fafb;padding:20px 32px;text-align:center;border-top:1px solid #e5e7eb;">
            <p style="margin:0;color:#9ca3af;font-size:12px;">
              Este email foi gerado automaticamente pelo formulário de contato do site Projemac.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  const {
    nome,
    email,
    telefone,
    empresa,
    cidade,
    estado,
    tipo_interesse,
    mensagem,
    honeypot,
    formLoadTime,
  } = req.body ?? {};

  // Proteção anti-bot: honeypot preenchido = bot
  if (honeypot) {
    return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  }

  // Proteção anti-bot: formulário preenchido em menos de 3 segundos = bot
  if (formLoadTime && Date.now() - formLoadTime < 3000) {
    return res.status(200).json({ message: 'Mensagem enviada com sucesso!' });
  }

  // Validação básica dos campos obrigatórios
  if (!nome || !email || !telefone || !tipo_interesse) {
    return res.status(400).json({ message: 'Preencha todos os campos obrigatórios.' });
  }

  try {
    await resend.emails.send({
      from: 'noreply@projemac.com.br',
      to: 'contato@projemac.com.br',
      replyTo: email,
      subject: `[Orçamento] ${nome} — ${TIPO_INTERESSE_MAP[tipo_interesse] ?? tipo_interesse}`,
      html: buildEmailHtml({ nome, email, telefone, empresa, cidade, estado, tipo_interesse, mensagem }),
    });

    return res.status(200).json({ message: 'Mensagem enviada com sucesso! Em breve entraremos em contato.' });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ message: 'Erro ao enviar mensagem. Tente novamente ou ligue para (31) 3495-3004.' });
  }
}
