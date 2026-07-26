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

INSERT INTO projetos (categoria, titulo, descricao, tag, imagem_url, ordem) VALUES
-- Esporte
('esporte', 'Futebol de Base', 'Treinos semanais aos sábados, com foco em fundamentos, trabalho em equipe e valores esportivos.', '6 a 12 anos', 'https://placehold.co/700x500/1B4332/FBF7EF?font=roboto&text=Futebol+de+Base', 1),
('esporte', 'Vôlei Comunitário', 'Oficinas de vôlei que aliam atividade física a rodas de conversa sobre saúde e cidadania.', '13 a 17 anos', 'https://placehold.co/700x500/1B4332/FBF7EF?font=roboto&text=V%C3%B4lei+Comunit%C3%A1rio', 2),
('esporte', 'Capoeira e Cultura', 'Aulas de capoeira que resgatam a cultura afro-brasileira e fortalecem a autoestima dos participantes.', 'Todas as idades', 'https://placehold.co/700x500/1B4332/FBF7EF?font=roboto&text=Capoeira+e+Cultura', 3),
-- Educação
('educacao', 'Reforço Escolar', 'Apoio pedagógico gratuito para estudantes da rede pública com dificuldades de aprendizagem.', 'Educação', 'https://placehold.co/700x500/2D6A4F/FBF7EF?font=roboto&text=Reforço+Escolar', 1),
-- Social
('social', 'Cesta Solidária', 'Distribuição mensal de cestas básicas para famílias cadastradas em situação de vulnerabilidade.', 'Mensal', 'https://placehold.co/700x500/D68C1F/FBF7EF?font=roboto&text=Cesta+Solidária', 1),
('social', 'Campanha do Agasalho', 'Arrecadação e distribuição de roupas e cobertores durante os meses mais frios do ano.', 'Sazonal', 'https://placehold.co/700x500/D68C1F/FBF7EF?font=roboto&text=Campanha+do+Agasalho', 2),
('social', 'Mutirão de Cidadania', 'Emissão de documentos, orientação jurídica e serviços básicos de saúde para a comunidade.', 'Bimestral', 'https://placehold.co/700x500/D68C1F/FBF7EF?font=roboto&text=Mutirão+de+Cidadania', 3),
-- Evento
('evento', 'Festa das Crianças', 'Celebração especial no Dia das Crianças com brincadeiras, lanches e presentes para os pequenos.', 'Anual', 'https://placehold.co/700x500/C94530/FBF7EF?font=roboto&text=Festa+das+Crianças', 1),
('evento', 'Encontro de Famílias', 'Tarde de integração entre voluntários, famílias atendidas e parceiros da comunidade.', 'Semestral', 'https://placehold.co/700x500/C94530/FBF7EF?font=roboto&text=Encontro+de+Famílias', 2),
('evento', 'Confraternização de Fim de Ano', 'Celebração de encerramento das atividades do ano, com apresentações dos participantes dos projetos.', 'Anual', 'https://placehold.co/700x500/C94530/FBF7EF?font=roboto&text=Confraternização', 3);

INSERT INTO configuracoes (chave, valor) VALUES
('telefone', '(11) 4187-0000'),
('email', 'contato@missaovida.org.br'),
('endereco', 'Rua Albino de Moraes, 60 - Vila Caldas, Carapicuíba - SP'),
('horario_atendimento', 'Segunda a sexta, das 9h às 17h'),
('pix_chave', 'doacoes@missaovida.org.br'),
('pix_tipo', 'email'),
('pix_qrcode_url', ''),
('instagram_url', 'https://instagram.com'),
('facebook_url', 'https://facebook.com');

INSERT INTO certificados (titulo, descricao, categoria, arquivo_url, data_referencia, ordem) VALUES
('Certificado de Regularidade Cadastral de Entidades (CRCE)', 'Certificado emitido pela Controladoria Geral do Estado de São Paulo, comprovando que a ONG Missão Vida está inscrita e aprovada no Cadastro Estadual de Entidades.', 'regularidade', 'certificados/crce-0653-2024.pdf', 'CRCE nº 0653/2024', 1),
('Registro no Conselho Municipal dos Direitos da Criança e do Adolescente (CMDCA)', 'Certificado de registro da OSC junto ao CMDCA de Carapicuíba, reconhecendo o Projeto Acolhe - Serviço de Convivência e Fortalecimento de Vínculos.', 'registro', 'certificados/cmdca.pdf', 'Válido até 31/12/2025', 2),
('Certificado de Licença do Corpo de Bombeiros (CLCB)', 'Certificado de licença expedido pelo Corpo de Bombeiros da Polícia Militar do Estado de São Paulo para a edificação da sede da ONG.', 'licenca', 'certificados/clcb-1395898-2025.pdf', 'CLCB nº 1395898 - Válido até 29/08/2028', 3),
('Estatuto Social', 'Estatuto Social consolidado da ONG Missão Vida, com a redação vigente aprovada em Assembleia Geral.', 'estatutario', 'certificados/estatuto.pdf', 'Vigência desde 20/01/2023', 4),
('Ata da Assembleia Geral Extraordinária', 'Ata da Assembleia Geral Extraordinária que aprovou a reforma estatutária, a alteração de CNAEs e a eleição da atual Diretoria e Conselho Fiscal.', 'estatutario', 'certificados/ata-da-assembleia.pdf', 'Realizada em 20/01/2023', 5);

INSERT INTO mensagens (nome, email, telefone, assunto, mensagem, lida, criado_em) VALUES
('Fernanda Alves', 'fernanda.alves@example.com', '(11) 98888-1122', 'contato', 'Olá, gostaria de saber como posso ser voluntária nas oficinas esportivas aos finais de semana.', FALSE, NOW() - INTERVAL '2 days'),
('Ricardo Souza', 'ricardo.souza@example.com', '(11) 97777-3344', 'doacao', 'Bom dia! Represento uma pequena empresa local e gostaríamos de fazer uma doação mensal recorrente. Podem entrar em contato?', FALSE, NOW() - INTERVAL '1 days'),
('Marli Pereira', 'marli.pereira@example.com', '(11) 96666-5566', 'contato', 'Minha filha tem 9 anos e gostaria muito de participar das oficinas de esporte. Como faço a inscrição?', TRUE, NOW() - INTERVAL '6 days');
