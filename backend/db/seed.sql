-- =========================================================
-- Missão Vida - Dados de exemplo (mock) para desenvolvimento
-- O usuário administrador é criado automaticamente pelo backend
-- na primeira execução (ver src/config/seedAdmin.js), pois a
-- senha precisa ser criptografada em tempo de execução.
-- =========================================================

INSERT INTO noticias (titulo, resumo, conteudo, imagem_url, publicado, criado_em) VALUES
(
  'Missão Vida celebra 500 crianças atendidas no projeto esportivo',
  'Ação de futebol e cidadania completa mais um ciclo transformando vidas em Carapicuíba.',
  'Neste último semestre, o projeto esportivo da Missão Vida alcançou a marca histórica de 500 crianças e adolescentes atendidos nas oficinas de futebol, vôlei e capoeira. Além da prática esportiva, os encontros trabalham valores como respeito, disciplina e trabalho em equipe, com apoio de voluntários da comunidade e parceiros locais.',
  'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=1200&q=80',
  TRUE,
  NOW() - INTERVAL '10 days'
),
(
  'Campanha do Agasalho arrecada mais de 1.200 peças em Carapicuíba',
  'Comunidade se mobiliza e ajuda famílias em situação de vulnerabilidade a enfrentar o frio.',
  'Com o apoio de moradores, escolas e comércios da região, a Campanha do Agasalho 2026 da Missão Vida superou a meta inicial e arrecadou mais de 1.200 peças de roupas e cobertores, distribuídos diretamente às famílias cadastradas em nossos programas sociais.',
  'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?w=1200&q=80',
  TRUE,
  NOW() - INTERVAL '25 days'
),
(
  'Novo mutirão de saúde e cidadania acontece em setembro',
  'Parceria com profissionais voluntários oferecerá orientação jurídica, emissão de documentos e aferição de saúde básica.',
  'A Missão Vida se prepara para realizar um novo mutirão comunitário, reunindo voluntários da área da saúde e do direito para oferecer serviços gratuitos à população de Carapicuíba, incluindo orientação jurídica básica, emissão de documentos civis e aferição de pressão e glicemia.',
  'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&q=80',
  TRUE,
  NOW() - INTERVAL '2 days'
);

INSERT INTO galeria (titulo, imagem_url, categoria, criado_em) VALUES
('Oficina de futebol com as crianças', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=900&q=80', 'esporte', NOW() - INTERVAL '30 days'),
('Roda de capoeira comunitária', 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?w=900&q=80', 'esporte', NOW() - INTERVAL '28 days'),
('Entrega de cestas básicas', 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=80', 'acao-social', NOW() - INTERVAL '20 days'),
('Voluntários na Campanha do Agasalho', 'https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=900&q=80', 'acao-social', NOW() - INTERVAL '18 days'),
('Aula de reforço escolar', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=900&q=80', 'educacao', NOW() - INTERVAL '14 days'),
('Evento comunitário de fim de ano', 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=900&q=80', 'evento', NOW() - INTERVAL '5 days'),
('Time infantil da Missão Vida', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80', 'esporte', NOW() - INTERVAL '3 days'),
('Voluntários reunidos no salão comunitário', 'https://images.unsplash.com/photo-1593113630400-ea4288922497?w=900&q=80', 'geral', NOW() - INTERVAL '1 days');

INSERT INTO mensagens (nome, email, telefone, assunto, mensagem, lida, criado_em) VALUES
('Fernanda Alves', 'fernanda.alves@example.com', '(11) 98888-1122', 'contato', 'Olá, gostaria de saber como posso ser voluntária nas oficinas esportivas aos finais de semana.', FALSE, NOW() - INTERVAL '2 days'),
('Ricardo Souza', 'ricardo.souza@example.com', '(11) 97777-3344', 'doacao', 'Bom dia! Represento uma pequena empresa local e gostaríamos de fazer uma doação mensal recorrente. Podem entrar em contato?', FALSE, NOW() - INTERVAL '1 days'),
('Marli Pereira', 'marli.pereira@example.com', '(11) 96666-5566', 'contato', 'Minha filha tem 9 anos e gostaria muito de participar das oficinas de esporte. Como faço a inscrição?', TRUE, NOW() - INTERVAL '6 days');
