-- =========================================================
-- ATUALIZAÇÃO: Tabela de Certificados/Documentos institucionais
-- =========================================================
-- Este script é SEGURO para rodar num banco que já está em uso
-- (como o seu no Neon). Ele só CRIA a tabela nova "certificados"
-- e insere os documentos institucionais — não toca em nenhuma
-- tabela existente (noticias, galeria, mensagens, projetos),
-- então nenhuma alteração que você já fez pelo painel admin é
-- afetada.
--
-- Rode este arquivo inteiro, de uma vez, no SQL Editor do Neon.
-- =========================================================

CREATE TABLE IF NOT EXISTS certificados (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    categoria VARCHAR(50) NOT NULL DEFAULT 'documento',
    arquivo_url VARCHAR(500) NOT NULL,
    data_referencia VARCHAR(50),
    ordem INTEGER NOT NULL DEFAULT 0,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMP NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_certificados_ativo ON certificados (ativo);

INSERT INTO certificados (titulo, descricao, categoria, arquivo_url, data_referencia, ordem) VALUES
('Certificado de Regularidade Cadastral de Entidades (CRCE)', 'Certificado emitido pela Controladoria Geral do Estado de São Paulo, comprovando que a ONG Missão Vida está inscrita e aprovada no Cadastro Estadual de Entidades.', 'regularidade', 'certificados/crce-0653-2024.pdf', 'CRCE nº 0653/2024', 1),
('Registro no Conselho Municipal dos Direitos da Criança e do Adolescente (CMDCA)', 'Certificado de registro da OSC junto ao CMDCA de Carapicuíba, reconhecendo o Projeto Acolhe - Serviço de Convivência e Fortalecimento de Vínculos.', 'registro', 'certificados/cmdca.pdf', 'Válido até 31/12/2025', 2),
('Certificado de Licença do Corpo de Bombeiros (CLCB)', 'Certificado de licença expedido pelo Corpo de Bombeiros da Polícia Militar do Estado de São Paulo para a edificação da sede da ONG.', 'licenca', 'certificados/clcb-1395898-2025.pdf', 'CLCB nº 1395898 - Válido até 29/08/2028', 3),
('Estatuto Social', 'Estatuto Social consolidado da ONG Missão Vida, com a redação vigente aprovada em Assembleia Geral.', 'estatutario', 'certificados/estatuto.pdf', 'Vigência desde 20/01/2023', 4),
('Ata da Assembleia Geral Extraordinária', 'Ata da Assembleia Geral Extraordinária que aprovou a reforma estatutária, a alteração de CNAEs e a eleição da atual Diretoria e Conselho Fiscal.', 'estatutario', 'certificados/ata-da-assembleia.pdf', 'Realizada em 20/01/2023', 5);
