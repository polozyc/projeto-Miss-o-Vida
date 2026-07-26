-- =========================================================
-- Missão Vida - Script de inicialização do banco de dados
-- =========================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Tabela de administradores
CREATE TABLE IF NOT EXISTS admins (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tabela de mensagens (formulário de contato e doações)
CREATE TABLE IF NOT EXISTS mensagens (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    telefone VARCHAR(30),
    assunto VARCHAR(50) NOT NULL DEFAULT 'contato', -- 'contato' | 'doacao'
    mensagem TEXT NOT NULL,
    lida BOOLEAN NOT NULL DEFAULT FALSE,
    criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tabela de notícias
CREATE TABLE IF NOT EXISTS noticias (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    resumo VARCHAR(300),
    conteudo TEXT NOT NULL,
    imagem_url VARCHAR(500),
    publicado BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tabela de galeria de fotos
CREATE TABLE IF NOT EXISTS galeria (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150),
    imagem_url VARCHAR(500) NOT NULL,
    categoria VARCHAR(80) DEFAULT 'geral',
    criado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tabela de projetos (cards de "Área Esportiva", "Ações Sociais", "Eventos Comunitários"
-- exibidos na Home e na página Projetos). Editável pelo painel admin, incluindo a imagem.
CREATE TABLE IF NOT EXISTS projetos (
    id SERIAL PRIMARY KEY,
    categoria VARCHAR(30) NOT NULL, -- 'esporte' | 'educacao' | 'social' | 'evento'
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT NOT NULL,
    tag VARCHAR(80),
    imagem_url VARCHAR(500),
    ordem INTEGER NOT NULL DEFAULT 0,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tabela de certificados/documentos institucionais (CRCE, CMDCA, CLCB, Estatuto,
-- Atas de Assembleia etc.), exibidos publicamente para dar transparência e
-- credibilidade à ONG. Editável pelo painel admin.
CREATE TABLE IF NOT EXISTS certificados (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(50) NOT NULL DEFAULT 'documento', -- 'regularidade' | 'registro' | 'licenca' | 'estatutario'
    arquivo_url VARCHAR(500) NOT NULL,
    data_referencia VARCHAR(50), -- texto livre, ex: "Válido até 31/12/2025"
    ordem INTEGER NOT NULL DEFAULT 0,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_mensagens_lida ON mensagens (lida);
CREATE INDEX IF NOT EXISTS idx_noticias_publicado ON noticias (publicado);
CREATE INDEX IF NOT EXISTS idx_projetos_categoria ON projetos (categoria);
CREATE INDEX IF NOT EXISTS idx_projetos_ativo ON projetos (ativo);
CREATE INDEX IF NOT EXISTS idx_certificados_ativo ON certificados (ativo);
