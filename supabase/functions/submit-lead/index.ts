import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// In-memory rate limiting (resets when function restarts)
const submissionTracker = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT = {
  MAX_SUBMISSIONS: 3, // máximo de submissões
  WINDOW_MS: 60000, // em 1 minuto (60000ms)
};

const MIN_FORM_FILL_TIME_MS = 2000; // tempo mínimo para preencher formulário (2 segundos)

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const { 
      nome, 
      email, 
      telefone, 
      empresa, 
      cidade, 
      estado, 
      tipo_interesse, 
      mensagem,
      honeypot, // campo invisível que bots preenchem
      formLoadTime, // timestamp de quando o form foi carregado
    } = await req.json();

    // === PROTEÇÃO 1: HONEYPOT ===
    // Se o campo honeypot estiver preenchido, é bot
    if (honeypot && honeypot.trim() !== '') {
      console.log('Blocked: Honeypot field filled');
      return new Response(
        JSON.stringify({ 
          error: 'Invalid submission',
          message: 'Por favor, tente novamente.'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // === PROTEÇÃO 2: TEMPO DE PREENCHIMENTO ===
    // Se o formulário foi enviado muito rápido, provavelmente é bot
    if (formLoadTime) {
      const now = Date.now();
      const timeTaken = now - formLoadTime;
      
      if (timeTaken < MIN_FORM_FILL_TIME_MS) {
        console.log(`Blocked: Form filled too quickly (${timeTaken}ms)`);
        return new Response(
          JSON.stringify({ 
            error: 'Invalid submission',
            message: 'Por favor, preencha o formulário com calma.'
          }),
          { 
            status: 400, 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
          }
        );
      }
    }

    // === PROTEÇÃO 3: RATE LIMITING POR IP ===
    const clientIP = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    const now = Date.now();
    const tracker = submissionTracker.get(clientIP);

    if (tracker) {
      // Se ainda está dentro da janela de tempo
      if (now - tracker.timestamp < RATE_LIMIT.WINDOW_MS) {
        if (tracker.count >= RATE_LIMIT.MAX_SUBMISSIONS) {
          console.log(`Blocked: Rate limit exceeded for IP ${clientIP}`);
          return new Response(
            JSON.stringify({ 
              error: 'Rate limit exceeded',
              message: 'Você enviou muitas mensagens. Por favor, aguarde um momento.'
            }),
            { 
              status: 429, 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
            }
          );
        }
        // Incrementa contador
        tracker.count++;
      } else {
        // Janela expirou, reseta contador
        submissionTracker.set(clientIP, { count: 1, timestamp: now });
      }
    } else {
      // Primeira submissão deste IP
      submissionTracker.set(clientIP, { count: 1, timestamp: now });
    }

    // Limpa entradas antigas do tracker (mais de 5 minutos)
    const CLEANUP_THRESHOLD = 5 * 60 * 1000; // 5 minutos
    for (const [ip, data] of submissionTracker.entries()) {
      if (now - data.timestamp > CLEANUP_THRESHOLD) {
        submissionTracker.delete(ip);
      }
    }

    // === VALIDAÇÃO BÁSICA ===
    if (!nome || !email || !telefone || !tipo_interesse) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields',
          message: 'Por favor, preencha todos os campos obrigatórios.'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validação de tamanhos (alinhada com validação client-side)
    if (nome.length > 100 || email.length > 255 || telefone.length > 20 || telefone.length < 10) {
      return new Response(
        JSON.stringify({ 
          error: 'Field validation error',
          message: 'Um ou mais campos têm tamanho inválido.'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Validação de mensagem (max 1000 caracteres, alinhada com client-side)
    if (mensagem && mensagem.length > 1000) {
      return new Response(
        JSON.stringify({ 
          error: 'Message too long',
          message: 'A mensagem não pode ter mais de 1000 caracteres.'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // === INSERIR LEAD NO BANCO ===
    const { data, error } = await supabase
      .from('leads')
      .insert([
        {
          nome: nome.trim(),
          email: email.trim().toLowerCase(),
          telefone: telefone.trim(),
          empresa: empresa?.trim() || null,
          cidade: cidade?.trim() || null,
          estado: estado?.trim()?.toUpperCase() || null,
          tipo_interesse,
          mensagem: mensagem?.trim() || null,
          origem: 'form_contato_site',
        },
      ])
      .select();

    if (error) {
      console.error('Database error:', error);
      return new Response(
        JSON.stringify({ 
          error: 'Database error',
          message: 'Erro ao salvar seus dados. Por favor, tente novamente.'
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        message: 'Mensagem enviada com sucesso! Em breve entraremos em contato.',
        data 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: 'Ocorreu um erro inesperado. Por favor, tente novamente.'
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
