-- =========================================================
-- ATUALIZAÇÃO: Números de impacto da seção "Nosso Impacto"
-- =========================================================
-- Seguro para rodar num banco já em uso — só insere 3 chaves novas
-- na tabela "configuracoes" que já existe. Não altera nem apaga
-- nenhuma configuração que você já tenha editado.
--
-- Rode este arquivo inteiro, de uma vez, no SQL Editor do Neon.
-- =========================================================

INSERT INTO configuracoes (chave, valor) VALUES
('impacto_pessoas', '5MIL'),
('impacto_cestas', '1200MIL'),
('impacto_criancas', '200')
ON CONFLICT (chave) DO NOTHING;
