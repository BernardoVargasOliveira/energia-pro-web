# Instruções para Configurar o CMS Admin

## ✅ CMS Instalado com Sucesso!

O sistema de gerenciamento de conteúdo (CMS) foi instalado e está funcionando. Todas as tabelas necessárias foram criadas e populadas com os dados atuais do site.

## 📋 Como Criar o Primeiro Usuário Admin

Para acessar o painel administrativo, siga estes passos:

### 1. Criar uma Conta
1. Acesse `/login` no navegador
2. Clique na aba **"Cadastro"**
3. Preencha seu email e senha
4. Clique em "Criar Conta"
5. Aguarde a confirmação

### 2. Tornar sua Conta Admin
Após criar a conta, você precisa adicionar a role "admin" manualmente no banco de dados:

1. Abra o **Lovable Cloud** (backend) clicando no botão que o AI vai te mostrar
2. Vá em **Database → Tables → auth.users** e copie o seu `id` (UUID)
3. Vá em **Database → Tables → user_roles**
4. Clique em "Insert row" e preencha:
   - `user_id`: Cole o UUID que você copiou
   - `role`: Selecione **"admin"**
5. Clique em "Save"

### 3. Acessar o Painel Admin
1. Faça login em `/login`
2. Você será redirecionado automaticamente para `/admin`
3. Pronto! Agora você pode gerenciar todo o conteúdo do site

## 🎯 Funcionalidades do CMS

### Páginas de Gerenciamento

- **Home**: Editar textos da página inicial (hero, CTAs, títulos)
- **Sobre**: Editar missão, visão, valores e história da empresa
- **Serviços**: CRUD completo de serviços (criar, editar, excluir)
- **Produtos**: CRUD completo de produtos/geradores
- **Setores**: CRUD completo de setores atendidos
- **Leads**: Visualizar todos os leads/contatos recebidos

### ✅ Layout Preservado
O layout visual do site foi mantido **100% idêntico**. Apenas os dados agora vêm do banco de dados e podem ser editados via admin.

## 🔒 Segurança

- ✅ RLS (Row Level Security) configurado em todas as tabelas
- ✅ Apenas admins podem editar conteúdo
- ✅ Leads podem ser submetidos publicamente (formulário de contato)
- ✅ Autenticação obrigatória para acessar /admin
- ✅ Verificação de role admin antes de permitir acesso

## 📊 Tabelas do Banco

1. **site_content**: Textos gerais do site (títulos, subtítulos, descrições)
2. **services**: Serviços oferecidos
3. **sectors**: Setores atendidos
4. **products**: Produtos/geradores disponíveis
5. **banners**: Banners e imagens (estrutura criada, pronta para uso)
6. **leads**: Contatos/leads recebidos pelo formulário
7. **user_roles**: Permissões de usuários (admin/user)

## 🚀 Próximos Passos Opcionais

Se quiser expandir o CMS, você pode:

1. Adicionar upload de imagens para produtos e banners
2. Criar editor rico (WYSIWYG) para textos longos
3. Adicionar mais campos personalizados
4. Criar página de gerenciamento de banners
5. Adicionar filtros e busca na página de leads

## ⚠️ Importante

- O site continua funcionando normalmente mesmo sem admin configurado
- Os dados iniciais já foram populados com o conteúdo atual do site
- Nenhuma alteração visual foi feita no layout
- Todos os textos agora podem ser editados via /admin