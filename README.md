# Website Institucional - ONG Missão Vida

Website institucional completo, moderno e responsivo para a ONG **Missão Vida**, localizada em Carapicuíba - SP, desenvolvido como projeto de extensão universitária com o tema **"Digitalização e Automação de Processos Sociais"**.

O projeto inclui um site público (institucional, projetos, doações e contato) e um painel administrativo simples para gestão de galeria, notícias e mensagens recebidas.

---

## 🧱 Tecnologias utilizadas

| Camada         | Tecnologia                                   |
|----------------|-----------------------------------------------|
| Frontend       | React 18 + Vite + Tailwind CSS + React Router |
| Backend        | Node.js + Express (API REST)                  |
| Banco de dados | PostgreSQL 16                                 |
| Autenticação   | JWT + bcrypt (senha criptografada)            |
| Infraestrutura | Docker + Docker Compose                       |

---

## 📁 Estrutura do projeto

```
missao-vida/
├── docker-compose.yml
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── db/
│   │   ├── init.sql          # criação das tabelas
│   │   └── seed.sql          # dados de exemplo (notícias, galeria, mensagens)
│   └── src/
│       ├── server.js
│       ├── config/           # conexão com o banco e seed do admin padrão
│       ├── controllers/      # camada de entrada das requisições HTTP
│       ├── services/         # regras de negócio e acesso ao banco
│       ├── routes/           # definição das rotas da API
│       └── middleware/       # autenticação JWT e tratamento de erros
└── frontend/
    ├── Dockerfile
    ├── nginx.conf
    ├── package.json
    └── src/
        ├── main.jsx / App.jsx
        ├── api/               # cliente axios
        ├── context/           # contexto de autenticação do admin
        ├── components/        # Navbar, Footer, Cards, etc.
        └── pages/
            ├── Home.jsx, Sobre.jsx, Projetos.jsx, Doacoes.jsx, Contato.jsx
            └── admin/          # login e painel administrativo
```

---

## 🚀 Como rodar o projeto (via Docker - recomendado)

### Pré-requisitos
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/) instalados.

### Passos

1. Clone ou extraia o projeto e acesse a pasta raiz:
   ```bash
   cd missao-vida
   ```

2. (Opcional) Para customizar alguma variável, crie `backend/.env` e/ou `frontend/.env` com
   base na tabela da seção **Variáveis de ambiente**, mais abaixo.
   > O `docker-compose.yml` já possui valores padrão funcionais, então esse passo é opcional para rodar localmente.

3. Suba todos os serviços (banco de dados, backend e frontend):
   ```bash
   docker-compose up --build
   ```

4. Acesse:
   - **Site institucional:** http://localhost:5173
   - **API (backend):** http://localhost:4000/api/health
   - **Painel administrativo:** http://localhost:5173/admin/login

5. Para parar os serviços:
   ```bash
   docker-compose down
   ```

   Para remover também os dados do banco (reset completo):
   ```bash
   docker-compose down -v
   ```

### 🔐 Credenciais do administrador padrão

Na primeira execução, o backend cria automaticamente um administrador padrão:

- **E-mail:** `admin@missaovida.org.br`
- **Senha:** `missaovida2026`

> A senha é criptografada com bcrypt antes de ser salva no banco. Recomenda-se alterar essas credenciais em produção (via variáveis de ambiente `ADMIN_DEFAULT_EMAIL` e `ADMIN_DEFAULT_PASSWORD` antes da primeira execução).

---

## 💻 Como rodar sem Docker (modo desenvolvimento)

### 1. Banco de dados
Você precisa de uma instância PostgreSQL rodando localmente. Crie o banco e rode os scripts:
```bash
createdb missaovida_db
psql -d missaovida_db -f backend/db/init.sql
psql -d missaovida_db -f backend/db/seed.sql
```

### 2. Backend
```bash
cd backend
npm install
npm run dev                # inicia com nodemon em modo desenvolvimento
```
Crie um arquivo `backend/.env` com as variáveis da tabela abaixo (ou rode assim mesmo — os
valores padrão já servem pra um Postgres local com as credenciais do `docker-compose.yml`).
A API sobe em `http://localhost:4000`.

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Crie um arquivo `frontend/.env` com `VITE_API_URL` se a API não estiver em
`http://localhost:4000/api` (veja a tabela abaixo).
O site sobe em `http://localhost:5173`.

---

## ⚙️ Variáveis de ambiente

### Backend (`backend/.env`)
| Variável                | Descrição                                              | Padrão                              |
|-------------------------|----------------------------------------------------------|--------------------------------------|
| `PORT`                  | Porta da API                                              | `4000`                               |
| `DB_HOST`               | Host do PostgreSQL                                        | `localhost` (ou `db` no Docker)      |
| `DB_PORT`               | Porta do PostgreSQL                                       | `5432`                               |
| `DB_USER`               | Usuário do banco                                          | `missaovida`                         |
| `DB_PASSWORD`           | Senha do banco                                            | `missaovida123`                      |
| `DB_NAME`               | Nome do banco                                             | `missaovida_db`                      |
| `JWT_SECRET`            | Segredo usado para assinar os tokens JWT                  | `troque_esta_chave_em_producao`      |
| `CORS_ORIGIN`           | Origem permitida no CORS (URL do frontend)                | `http://localhost:5173`              |
| `ADMIN_DEFAULT_NAME`    | Nome do administrador criado automaticamente              | `Administrador Missão Vida`          |
| `ADMIN_DEFAULT_EMAIL`   | E-mail do administrador criado automaticamente            | `admin@missaovida.org.br`            |
| `ADMIN_DEFAULT_PASSWORD`| Senha do administrador criado automaticamente             | `missaovida2026`                     |

### Frontend (`frontend/.env`)
| Variável        | Descrição                       | Padrão                          |
|------------------|----------------------------------|----------------------------------|
| `VITE_API_URL`   | URL base da API do backend       | `http://localhost:4000/api`      |

---

## 🗄️ Estrutura do banco de dados

- **admins** — usuários do painel administrativo (nome, e-mail, senha criptografada).
- **mensagens** — mensagens enviadas pelos formulários de contato e doação.
- **noticias** — notícias/atualizações publicadas no site.
- **galeria** — fotos exibidas na galeria pública.

Os scripts de criação (`init.sql`) e de dados de exemplo (`seed.sql`) ficam em `backend/db/` e são executados automaticamente pelo container do PostgreSQL na primeira inicialização.

---

## 🔌 Principais endpoints da API

| Método | Rota                          | Acesso   | Descrição                              |
|--------|-------------------------------|----------|------------------------------------------|
| POST   | `/api/auth/login`             | Público  | Login do administrador (retorna JWT)      |
| GET    | `/api/noticias`                | Público  | Lista notícias publicadas                 |
| GET    | `/api/noticias/admin/todas`   | Protegido| Lista todas as notícias (inclui rascunhos)|
| POST   | `/api/noticias`                | Protegido| Cria notícia                              |
| PUT    | `/api/noticias/:id`            | Protegido| Edita notícia                             |
| DELETE | `/api/noticias/:id`            | Protegido| Exclui notícia                            |
| GET    | `/api/galeria`                  | Público  | Lista fotos da galeria                    |
| POST   | `/api/galeria`                  | Protegido| Adiciona foto (upload ou URL)              |
| DELETE | `/api/galeria/:id`              | Protegido| Remove foto                               |
| POST   | `/api/mensagens`                | Público  | Envia mensagem (contato/doação)           |
| GET    | `/api/mensagens`                | Protegido| Lista mensagens recebidas                 |
| PATCH  | `/api/mensagens/:id/lida`      | Protegido| Marca mensagem como lida                  |
| DELETE | `/api/mensagens/:id`            | Protegido| Exclui mensagem                           |

Rotas protegidas exigem o header `Authorization: Bearer <token>`.

---

## 🎨 Identidade visual

- **Paleta:** verde floresta (crescimento/esperança), âmbar/marigold (calor humano) e coral (energia/ação).
- **Tipografia:** Fraunces (títulos, com personalidade) + Plus Jakarta Sans (textos).
- **Elementos de assinatura:** divisores em forma de onda entre seções e contadores animados com efeito de "ripple", remetendo à ideia de uma ação se espalhando pela comunidade.

---

## 🌐 Hospedando o frontend no GitHub Pages (opcional, rápido)

O GitHub Pages hospeda **apenas arquivos estáticos** — ele não roda Node.js nem PostgreSQL.
Por isso, dá pra colocar o **frontend** lá para ter uma URL pública rapidamente, mas o
**backend + banco de dados precisam estar rodando em outro lugar** (ex: um VPS com o
`docker-compose.prod.yml` deste projeto, ou serviços com camada gratuita como Render,
Railway ou Fly.io).

> **Enquanto o backend não estiver hospedado publicamente**, o site sobe e todas as
> páginas informativas funcionam normalmente — só o formulário de contato/doação e o
> painel admin não vão conseguir se conectar a uma API.

### Passo a passo

1. **Crie um repositório no GitHub** e envie este projeto para ele:
   ```bash
   git init
   git add .
   git commit -m "Website institucional Missão Vida"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
   git push -u origin main
   ```

2. **Ative o GitHub Pages via Actions**: no repositório, vá em
   `Settings > Pages > Build and deployment > Source` e selecione **"GitHub Actions"**.

3. **(Opcional) Configure a URL do backend**, se já tiver um publicado: em
   `Settings > Secrets and variables > Actions > Variables`, crie uma variável chamada
   `VITE_API_URL` com o valor `https://SEU-BACKEND.exemplo.com/api`. Se pular esse passo,
   o site builda normalmente, só que sem conseguir enviar formulários.

4. **Rode o deploy**: o workflow em `.github/workflows/deploy-gh-pages.yml` já dispara
   automaticamente a cada `push` na branch `main` que altere algo em `frontend/`. Você
   também pode disparar manualmente pela aba **Actions > Deploy frontend no GitHub Pages
   > Run workflow**.

5. Após alguns instantes, o site fica disponível em:
   ```
   https://SEU-USUARIO.github.io/NOME-DO-REPO/
   ```
   (o link exato também aparece no resumo da execução do workflow, em Actions).

### Detalhes técnicos já configurados no projeto
- `vite.config.js` usa a variável `VITE_BASE_PATH` (definida pelo workflow) para ajustar
  os caminhos dos arquivos ao subdiretório `/NOME-DO-REPO/` do GitHub Pages.
- `public/404.html` + um pequeno script em `index.html` implementam o truque padrão de
  SPA para GitHub Pages, permitindo que rotas como `/sobre` ou `/contato` funcionem
  mesmo ao recarregar a página diretamente (o GitHub Pages não suporta rewrites de
  servidor como o Nginx faz no Docker).
- **Sobre headers de segurança:** o GitHub Pages não permite configurar headers HTTP
  customizados — os headers definidos em `frontend/nginx.conf` e no `Caddyfile`
  (CSP, HSTS, X-Frame-Options etc.) só valem para o deploy via Docker/VPS, **não**
  para o GitHub Pages. Por isso o `index.html` traz uma tag `<meta
  http-equiv="Content-Security-Policy">` equivalente (a única forma de CSP possível
  nessa hospedagem), que já é preenchida automaticamente com o valor de
  `VITE_API_URL` no build. HSTS e X-Frame-Options não têm equivalente via `<meta>` —
  isso é uma limitação inerente ao GitHub Pages, não do projeto.
- **Repositório precisa ser público** para usar o GitHub Pages gratuito (conta
  Free do GitHub só publica Pages de repositórios públicos). O projeto foi revisado
  e não tem segredos versionados: `.env` fica de fora do Git (veja `.gitignore`) e
  todas as credenciais (JWT, senha do admin, banco) só existem como variáveis de
  ambiente fora do repositório.

### E o backend, quando eu quiser publicar de verdade?
Quando estiver pronto, use o `docker-compose.prod.yml` já incluído neste projeto (veja a
seção **"Subindo em produção"** abaixo) num VPS, ou publique o backend isoladamente em
algum serviço com camada gratuita. Depois, é só atualizar a variável `VITE_API_URL` no
GitHub Actions e rodar o deploy de novo.

---

## 🆓 Hospedagem 100% gratuita (GitHub Pages + Render + Neon)

Este é o caminho recomendado para deixar o site **completo e funcional** no ar sem
gastar nada: frontend no GitHub Pages, backend no Render e banco de dados no Neon.

> **Trade-offs do plano gratuito**, pra você não se surpreender:
> - O backend no Render "dorme" após 15 minutos sem uso — a primeira visita depois
>   disso demora uns 30-60 segundos pra responder (as próximas são normais).
> - O banco no Neon "hiberna" com inatividade e acorda sozinho na próxima conexão
>   (sem necessidade de ação manual).
> - Nenhum dos dois pede cartão de crédito.

### Parte 1 — Banco de dados (Neon)

1. Crie uma conta gratuita em **https://neon.tech** (dá pra entrar com GitHub).
2. Crie um novo projeto (ex: nome `missao-vida`).
3. No painel do projeto, vá em **"Connection Details"** e copie a **connection
   string** (algo como `postgresql://usuario:senha@ep-xxxxx.neon.tech/neondb?sslmode=require`).
4. Abra o **"SQL Editor"** do Neon (no menu lateral) e rode o conteúdo dos dois
   arquivos deste projeto, nesta ordem:
   - Cole e execute todo o conteúdo de `backend/db/init.sql`
   - Cole e execute todo o conteúdo de `backend/db/seed.sql`
   
   Isso cria as tabelas (`admins`, `mensagens`, `noticias`, `galeria`) e insere os
   dados de exemplo. O administrador padrão **não** precisa ser criado aqui — o
   backend cria ele sozinho na primeira vez que subir (próxima etapa).

### Parte 2 — Backend (Render)

1. Suba o projeto para um repositório no GitHub, se ainda não fez isso (veja o
   passo a passo na seção do GitHub Pages, mais abaixo).
2. Crie uma conta gratuita em **https://render.com** (dá pra entrar com GitHub).
3. Clique em **"New +" > "Web Service"** e conecte o repositório do projeto.
4. Configure:
   - **Root Directory:** `backend`
   - **Runtime:** Docker (o Render detecta o `Dockerfile` automaticamente)
   - **Instance Type:** Free
5. Em **"Environment Variables"**, adicione:

   | Nome | Valor |
   |---|---|
   | `NODE_ENV` | `production` |
   | `DATABASE_URL` | a connection string copiada do Neon |
   | `JWT_SECRET` | um valor aleatório forte (gere com `openssl rand -base64 48`) |
   | `CORS_ORIGIN` | `https://SEU-USUARIO.github.io` (URL do GitHub Pages, sem barra no final) |
   | `ADMIN_DEFAULT_EMAIL` | e-mail do administrador (ex: `admin@missaovida.org.br`) |
   | `ADMIN_DEFAULT_PASSWORD` | uma senha forte à sua escolha |

   > Não é preciso definir `PORT` — o Render define isso automaticamente.
   > `NODE_ENV=production` ativa uma checagem no backend que **recusa subir**
   > se `JWT_SECRET`, `ADMIN_DEFAULT_PASSWORD` ou `CORS_ORIGIN` ficarem com
   > valor fraco/de exemplo — sem essa variável, essa proteção fica desativada.

6. Clique em **"Create Web Service"**. O Render vai buildar e subir o backend.
7. Quando terminar, copie a URL gerada (algo como
   `https://missao-vida-backend.onrender.com`) e teste no navegador:
   `https://missao-vida-backend.onrender.com/api/health` — deve responder um JSON
   com `"status": "ok"`.

### Parte 3 — Frontend (GitHub Pages)

1. Se ainda não tiver feito, suba o projeto para o GitHub:
   ```bash
   git init
   git add .
   git commit -m "Website institucional Missão Vida"
   git branch -M main
   git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPO.git
   git push -u origin main
   ```
2. No repositório: **Settings > Pages > Build and deployment > Source** →
   selecione **"GitHub Actions"**.
3. Em **Settings > Secrets and variables > Actions > Variables**, crie uma
   variável chamada `VITE_API_URL` com o valor:
   ```
   https://missao-vida-backend.onrender.com/api
   ```
   (troque pela URL real que o Render te deu na Parte 2).
4. Vá em **Actions > Deploy frontend no GitHub Pages > Run workflow** para
   disparar o primeiro deploy (os próximos rodam sozinhos a cada `push` em `main`).
5. Após alguns instantes, acesse:
   ```
   https://SEU-USUARIO.github.io/NOME-DO-REPO/
   ```

### Parte 4 — Testar tudo

- Navegue pelo site público e confira se a galeria e as notícias carregam
  (elas vêm da API/Neon).
- Envie uma mensagem pelo formulário de Contato ou Doações.
- Acesse `/admin/login` com o e-mail/senha definidos em `ADMIN_DEFAULT_EMAIL` /
  `ADMIN_DEFAULT_PASSWORD` e confira se a mensagem enviada aparece na aba
  **Mensagens** do painel.

Se o primeiro carregamento demorar um pouco, é o backend "acordando" no Render —
normal no plano gratuito.

---

## 🚀 Subindo em produção (VPS com Docker, plano pago)

O projeto inclui um `docker-compose.prod.yml` separado do compose de desenvolvimento, com HTTPS automático via [Caddy](https://caddyserver.com/) e o banco de dados sem porta exposta publicamente.

### 1. Servidor
Qualquer VPS com Docker instalado funciona (ex: DigitalOcean, Hetzner, AWS Lightsail, Oracle Cloud Free Tier). Requisitos mínimos: 1 vCPU / 1-2GB RAM.

```bash
# Instalar Docker (Ubuntu/Debian)
curl -fsSL https://get.docker.com | sh
sudo usermod -aG docker $USER
```

### 2. Domínio
Registre um domínio (ou subdomínio) e crie dois registros DNS tipo **A** apontando para o IP do servidor:
- `seudominio.org.br` → IP do servidor (site)
- `api.seudominio.org.br` → IP do servidor (API)

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto (fica de fora do Git — veja `.gitignore`) com:
```bash
POSTGRES_USER=missaovida_prod
POSTGRES_PASSWORD=            # gere com: openssl rand -base64 24
POSTGRES_DB=missaovida_db
JWT_SECRET=                   # gere com: openssl rand -base64 48
SITE_URL=https://seudominio.org.br
API_URL=https://api.seudominio.org.br/api
ADMIN_DEFAULT_NAME=Administrador Missão Vida
ADMIN_DEFAULT_EMAIL=admin@seudominio.org.br
ADMIN_DEFAULT_PASSWORD=       # gere com: openssl rand -base64 18
```
`docker-compose.prod.yml` lê essas variáveis automaticamente do `.env` na raiz.

### 4. Configurar o Caddyfile
Edite `Caddyfile` e troque `seudominio.org.br` / `api.seudominio.org.br` pelos seus domínios reais.

### 5. Subir os serviços
```bash
docker-compose -f docker-compose.prod.yml up -d --build
```
O Caddy emite o certificado HTTPS automaticamente na primeira requisição (precisa das portas 80 e 443 liberadas no firewall do servidor).

### 6. Verificar
```bash
docker-compose -f docker-compose.prod.yml ps
docker-compose -f docker-compose.prod.yml logs -f backend
```
Acesse `https://seudominio.org.br` e `https://api.seudominio.org.br/api/health`.

### 7. Backups do banco de dados
```bash
# Backup manual
docker exec missaovida_db pg_dump -U missaovida_prod missaovida_db > backup_$(date +%Y%m%d).sql

# Restaurar
cat backup_20260722.sql | docker exec -i missaovida_db psql -U missaovida_prod missaovida_db
```
Recomenda-se agendar isso via `cron` (ex: diariamente) e enviar os backups para um storage externo (S3, Backblaze, etc).

### 8. Atualizando o site (deploy de uma nova versão)
```bash
git pull                                   # ou copie os arquivos atualizados
docker-compose -f docker-compose.prod.yml up -d --build
```
Isso rebuilda apenas o que mudou, sem derrubar o volume do banco de dados.

### Checklist de segurança antes de ir ao ar
- [ ] `JWT_SECRET` trocado para um valor aleatório forte (não o do exemplo, mín. 32 caracteres)
- [ ] Senha do banco trocada
- [ ] Senha do administrador padrão trocada (ou alterada após o 1º login)
- [ ] Porta 5432 (Postgres) **não** exposta publicamente (o `docker-compose.prod.yml` já garante isso)
- [ ] Firewall do servidor liberando apenas as portas 22 (SSH), 80 e 443
- [ ] Backup automático do banco configurado
- [ ] `CORS_ORIGIN`/`SITE_URL` apontando exatamente para o domínio real (com `https://`)
- [ ] `NODE_ENV=production` definido no backend — o servidor **recusa subir** se `JWT_SECRET`, `ADMIN_DEFAULT_PASSWORD` ou `CORS_ORIGIN` ainda estiverem com valores de exemplo (ver `validarSegredosDeProducao` em `backend/src/server.js`)
- [ ] `api.seudominio.org.br` no `connect-src` do `frontend/nginx.conf` atualizado para o domínio real da API
- [ ] Após o 1º deploy, troque a senha do admin pelo painel e confirme que a chave Pix em **Configurações** é a correta — é o dado mais sensível do site, pois controla para onde as doações são direcionadas
- [ ] Revisar periodicamente os logs de tentativas de login (rate limit de 10 tentativas / 15 min por IP já ativo em `/api/auth/login`)

> Proteções já implementadas no código: rate limiting (login, formulário de doação e geral da API), `helmet` (headers HTTP de segurança), CORS restrito por allowlist, limite de tamanho de payload, validação de campos no formulário público, checagem de mimetype nos uploads de imagem, e headers de segurança (CSP, HSTS, X-Frame-Options) no Nginx/Caddy.

---

## 📌 Observações finais

- Os dados de doação (chave Pix) exibidos são **fictícios**, criados apenas para fins de demonstração acadêmica.
- As imagens utilizadas no site (banner, projetos, galeria) são fotos de banco de imagens gratuito (Unsplash), usadas apenas ilustrativamente.
- O projeto foi estruturado em camadas (controllers/services/routes/middleware) para facilitar manutenção e futura evolução do código.
