-- =========================================
-- TABELA: site_content (textos gerais)
-- =========================================
CREATE TABLE IF NOT EXISTS public.site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value_text TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Policies: admins podem fazer tudo, público pode ler
CREATE POLICY "Public can read site content"
ON public.site_content
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage site content"
ON public.site_content
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- =========================================
-- TABELA: banners (imagens principais)
-- =========================================
CREATE TABLE IF NOT EXISTS public.banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  image_url TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.banners ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can read banners"
ON public.banners
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage banners"
ON public.banners
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- =========================================
-- TABELA: services (serviços)
-- =========================================
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can read services"
ON public.services
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage services"
ON public.services
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- =========================================
-- TABELA: sectors (setores atendidos)
-- =========================================
CREATE TABLE IF NOT EXISTS public.sectors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.sectors ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can read sectors"
ON public.sectors
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage sectors"
ON public.sectors
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- =========================================
-- TRIGGER: Atualizar updated_at automaticamente
-- =========================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_site_content_updated_at BEFORE UPDATE ON public.site_content
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banners_updated_at BEFORE UPDATE ON public.banners
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sectors_updated_at BEFORE UPDATE ON public.sectors
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =========================================
-- DADOS INICIAIS (exemplos)
-- =========================================
INSERT INTO public.site_content (key, value_text) VALUES
('home_hero_title', 'Soluções Completas em Geradores de Energia'),
('home_hero_subtitle', 'Locação, venda e manutenção de geradores para sua empresa'),
('sobre_texto', 'A PROJEMAC é especializada em soluções de energia com mais de X anos de experiência no mercado.'),
('home_servicos_titulo', 'Nossos Serviços'),
('home_setores_titulo', 'Setores Atendidos')
ON CONFLICT (key) DO NOTHING;

INSERT INTO public.services (title, description, icon, order_index) VALUES
('Locação de Geradores', 'Aluguel de geradores de 20kVA a 2000kVA para eventos e obras', '⚡', 1),
('Venda de Geradores', 'Geradores novos e seminovos das melhores marcas', '🔌', 2),
('Manutenção Preventiva', 'Manutenção programada para seu gerador', '🔧', 3),
('Operação 24/7', 'Operadores especializados disponíveis', '👷', 4);

INSERT INTO public.sectors (name, description, icon, order_index) VALUES
('Eventos', 'Shows, festas e eventos corporativos', '🎉', 1),
('Construção Civil', 'Obras e construções', '🏗️', 2),
('Industrial', 'Fábricas e indústrias', '🏭', 3),
('Hospitalar', 'Hospitais e clínicas', '🏥', 4),
('Telecomunicações', 'Torres e data centers', '📡', 5);