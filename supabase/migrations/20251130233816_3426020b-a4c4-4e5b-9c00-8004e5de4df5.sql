-- Create table for contact/quote leads
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  empresa TEXT,
  cidade TEXT,
  estado TEXT,
  tipo_interesse TEXT NOT NULL,
  mensagem TEXT,
  origem TEXT DEFAULT 'form_contato_site',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster queries by date
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);

-- Enable RLS (but make it public for this institutional website)
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert leads (contact form submission)
CREATE POLICY "Anyone can submit leads"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Only allow reading all leads (for admin page - we'll add simple protection in the app)
CREATE POLICY "Public read access for leads"
ON public.leads
FOR SELECT
TO anon, authenticated
USING (true);