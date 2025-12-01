-- Inserir TODAS as chaves de conteúdo necessárias
INSERT INTO public.site_content (key, value_text) VALUES

-- HOME: Diferenciais
('home_diferenciais_titulo', 'Por Que Escolher a PROJEMAC?'),
('home_diferenciais_subtitulo', 'Somos referência em soluções de energia com anos de experiência no mercado'),
('home_diferencial_1_titulo', 'Equipe Especializada'),
('home_diferencial_1_texto', 'Profissionais qualificados e experientes em sistemas de energia.'),
('home_diferencial_2_titulo', 'Cobertura Regional'),
('home_diferencial_2_texto', 'Atendimento em todo estado de Minas Gerais.'),
('home_diferencial_3_titulo', 'Equipamentos Modernos'),
('home_diferencial_3_texto', 'Geradores de última geração das melhores marcas.'),

-- HOME: CTA Final
('home_cta_titulo', 'Precisa de uma Solução em Energia?'),
('home_cta_subtitulo', 'Entre em contato conosco e receba um orçamento personalizado para sua necessidade'),
('home_cta_botao', 'Solicitar Orçamento Agora'),

-- SOBRE: Header
('sobre_header_titulo', 'A Empresa'),
('sobre_header_subtitulo', 'Especialistas em soluções de energia com grupos geradores'),

-- SOBRE: História
('sobre_historia_titulo', 'Nossa História'),

-- SOBRE: Missão, Visão, Valores
('sobre_missao_titulo', 'Missão'),
('sobre_missao_texto', 'Fornecer soluções confiáveis e eficientes em geração de energia, superando as expectativas de nossos clientes através de tecnologia de ponta e atendimento personalizado.'),
('sobre_visao_titulo', 'Visão'),
('sobre_visao_texto', 'Ser referência nacional em soluções de energia, reconhecida pela qualidade dos serviços, inovação tecnológica e compromisso com a sustentabilidade.'),
('sobre_valores_titulo', 'Valores'),
('sobre_valores_texto', '• Compromisso com a qualidade\n• Ética e transparência\n• Inovação constante\n• Foco no cliente\n• Responsabilidade social'),

-- SOBRE: Números
('sobre_numeros_titulo', 'PROJEMAC em Números'),
('sobre_numero_1_valor', '30+'),
('sobre_numero_1_label', 'Anos de Experiência'),
('sobre_numero_2_valor', '500+'),
('sobre_numero_2_label', 'Clientes Atendidos'),
('sobre_numero_3_valor', '1000+'),
('sobre_numero_3_label', 'Projetos Executados'),

-- SOBRE: Equipe
('sobre_equipe_titulo', 'Nossa Equipe'),
('sobre_equipe_texto', 'Contamos com uma equipe multidisciplinar de engenheiros, técnicos e especialistas em energia, todos comprometidos em oferecer as melhores soluções para nossos clientes. Nossa equipe passa por treinamentos constantes para estar sempre atualizada com as mais recentes tecnologias e melhores práticas do setor.'),

-- SERVICOS: Header
('servicos_header_titulo', 'Nossos Serviços'),
('servicos_header_subtitulo', 'Soluções completas em geração de energia para sua empresa'),

-- SERVICOS: Showcase
('servicos_showcase_titulo', 'Equipamentos Prontos para Locação'),
('servicos_showcase_subtitulo', 'Frota moderna com entrega e instalação em todo o Brasil'),

-- SERVICOS: CTA
('servicos_cta_titulo', 'Precisa de Mais Informações?'),
('servicos_cta_subtitulo', 'Nossa equipe está pronta para ajudar você a encontrar a melhor solução em geração de energia'),

-- SETORES: Header
('setores_header_titulo', 'Setores Atendidos'),
('setores_header_subtitulo', 'Soluções especializadas em energia para diversos segmentos'),

-- SETORES: Intro
('setores_intro_titulo', 'Experiência em Diversos Mercados'),
('setores_intro_subtitulo', 'Entendemos as necessidades específicas de cada setor e oferecemos soluções personalizadas'),

-- SETORES: Por que escolher
('setores_escolher_titulo', 'Por Que Nos Escolher Para Seu Setor?'),
('setores_escolher_1_titulo', 'Experiência Comprovada'),
('setores_escolher_1_texto', 'Anos de experiência atendendo empresas de diversos portes e segmentos.'),
('setores_escolher_2_titulo', 'Soluções Personalizadas'),
('setores_escolher_2_texto', 'Cada setor tem necessidades únicas. Desenvolvemos projetos sob medida para seu negócio.'),
('setores_escolher_3_titulo', 'Suporte Especializado'),
('setores_escolher_3_texto', 'Equipe técnica com conhecimento profundo das particularidades de cada segmento.'),

-- SETORES: CTA
('setores_cta_titulo', 'Seu Setor Precisa de Energia Confiável?'),
('setores_cta_subtitulo', 'Fale com nossos especialistas e descubra a melhor solução para seu negócio'),

-- CONTATO: Header
('contato_header_titulo', 'Entre em Contato'),
('contato_header_subtitulo', 'Solicite um orçamento ou tire suas dúvidas com nossa equipe'),

-- CONTATO: Info
('contato_info_titulo', 'Fale Conosco'),
('contato_telefone', '(31) 3495-3004'),
('contato_email', 'contato@projemac.com.br'),
('contato_endereco', 'Belo Horizonte - MG\nAtendimento em todo Brasil'),
('contato_horario', 'Segunda a Sexta: 8h às 18h'),
('contato_whatsapp_texto', 'Prefere conversar pelo WhatsApp? Estamos disponíveis!'),
('contato_whatsapp_botao', 'Iniciar Conversa no WhatsApp'),

-- CONTATO: Form
('contato_form_titulo', 'Solicite um Orçamento')

ON CONFLICT (key) DO UPDATE SET value_text = EXCLUDED.value_text;