import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Lista de senhas comuns bloqueadas
const COMMON_PASSWORDS = [
  'password', '123456', '12345678', 'qwerty', 'abc123', 'monkey', '1234567', 
  'letmein', 'trustno1', 'dragon', 'baseball', 'iloveyou', 'master', 'sunshine',
  'ashley', 'bailey', 'passw0rd', 'shadow', '123123', '654321', 'superman',
  'qazwsx', 'michael', 'football', 'admin', 'senha', 'senha123', '123456789'
];

// Validar força da senha
function validatePasswordStrength(password: string): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (password.length < 12) {
    errors.push("A senha deve ter pelo menos 12 caracteres");
  }

  if (!/[a-z]/.test(password)) {
    errors.push("A senha deve conter pelo menos uma letra minúscula");
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("A senha deve conter pelo menos uma letra maiúscula");
  }

  if (!/[0-9]/.test(password)) {
    errors.push("A senha deve conter pelo menos um número");
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push("A senha deve conter pelo menos um caractere especial");
  }

  // Verificar senhas comuns
  const lowerPassword = password.toLowerCase();
  if (COMMON_PASSWORDS.some(common => lowerPassword.includes(common))) {
    errors.push("Esta senha é muito comum e não pode ser usada");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

// Verificar senha vazada usando HaveIBeenPwned API
async function checkPwnedPassword(password: string): Promise<{ isPwned: boolean; count: number }> {
  try {
    // Criar hash SHA-1 da senha
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-1', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();

    // Usar k-anonymity: enviar apenas os primeiros 5 caracteres
    const prefix = hashHex.substring(0, 5);
    const suffix = hashHex.substring(5);

    const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`, {
      headers: {
        'User-Agent': 'Projemac-Password-Validator',
      },
    });

    if (!response.ok) {
      console.error('HaveIBeenPwned API error:', response.status);
      // Se a API falhar, permitir a senha mas logar o erro
      return { isPwned: false, count: 0 };
    }

    const text = await response.text();
    const hashes = text.split('\n');

    for (const line of hashes) {
      const [hashSuffix, countStr] = line.split(':');
      if (hashSuffix.trim() === suffix) {
        const count = parseInt(countStr.trim());
        return { isPwned: true, count };
      }
    }

    return { isPwned: false, count: 0 };
  } catch (error) {
    console.error('Error checking pwned password:', error);
    // Em caso de erro, permitir a senha mas logar
    return { isPwned: false, count: 0 };
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { password, email } = await req.json();

    if (!password) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          errors: ['Senha não fornecida'] 
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // 1. Validar força da senha
    const strengthValidation = validatePasswordStrength(password);
    if (!strengthValidation.valid) {
      return new Response(
        JSON.stringify({ 
          valid: false, 
          errors: strengthValidation.errors,
          reason: 'weak_password'
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // 2. Verificar senhas vazadas
    const pwnedCheck = await checkPwnedPassword(password);
    if (pwnedCheck.isPwned) {
      console.log(`Senha vazada detectada para email ${email || 'desconhecido'}. Apareceu ${pwnedCheck.count} vezes em vazamentos.`);
      return new Response(
        JSON.stringify({ 
          valid: false, 
          errors: [
            `Esta senha foi exposta em ${pwnedCheck.count.toLocaleString('pt-BR')} vazamentos de dados.`,
            'Por favor, escolha uma senha única que você nunca usou antes.'
          ],
          reason: 'pwned_password',
          pwnedCount: pwnedCheck.count
        }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Senha válida
    console.log(`Senha validada com sucesso para email ${email || 'desconhecido'}`);
    return new Response(
      JSON.stringify({ 
        valid: true, 
        message: 'Senha forte e segura!' 
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Error in validate-password function:', error);
    return new Response(
      JSON.stringify({ 
        valid: false, 
        errors: ['Erro ao validar senha. Tente novamente.'] 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});