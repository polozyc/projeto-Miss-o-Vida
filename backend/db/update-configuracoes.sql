-- =========================================================
-- ATUALIZAÇÃO: Tabela de Configurações gerais do site
-- =========================================================
-- Seguro para rodar num banco já em uso — só cria a tabela nova
-- "configuracoes" e insere os valores atuais como ponto de partida.
-- Não toca em nenhuma tabela existente.
--
-- Rode este arquivo inteiro, de uma vez, no SQL Editor do Neon.
-- =========================================================

CREATE TABLE IF NOT EXISTS configuracoes (
    chave VARCHAR(60) PRIMARY KEY,
    valor TEXT,
    atualizado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

INSERT INTO configuracoes (chave, valor) VALUES
('telefone', '(11) 4187-0000'),
('email', 'contato@missaovida.org.br'),
('endereco', 'Rua Albino de Moraes, 60 - Vila Caldas, Carapicuíba - SP'),
('horario_atendimento', 'Segunda a sexta, das 9h às 17h'),
('pix_chave', 'doacoes@missaovida.org.br'),
('pix_tipo', 'email'),
('pix_qrcode_url', ''),
('instagram_url', 'https://instagram.com'),
('facebook_url', 'https://facebook.com')
ON CONFLICT (chave) DO NOTHING;
