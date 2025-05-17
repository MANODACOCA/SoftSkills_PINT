/*==============================================================*/
/*INSERTS DAS TABELAS                                           */
/*==============================================================*/
-- Inserção de dados em (PostgreSQL)

/*Tabela CATEGORIA*/
INSERT INTO CATEGORIA (NOME_CAT, DESCRICAO_CAT) VALUES
('Desenvolvimento de Software', 'Projectos, linguagens de programação e frameworks'),
('Infraestrutura de TI', 'Servidores, redes e gestão de sistemas'),
('Cibersegurança', 'Protecção de dados, firewalls e controlo de acessos'),
('Suporte Técnico', 'Assistência a utilizadores e resolução de problemas'),
('Inovação e I&D', 'Investigação, protótipos e novas tecnologias');

SELECT * FROM CATEGORIA;
/*Tabela CATEGORIA*/


/*Tabela AREA*/
INSERT INTO AREA (ID_CATEGORIA, NOME_AREA, DESCRICAO_AR) VALUES
(1, 'Frontend', 'Desenvolvimento da interface com o utilizador'),
(1, 'Backend', 'Lógica de servidor e integração com bases de dados'),
(1, 'Mobile', 'Aplicações para Android e iOS'),
(2, 'Servidores', 'Gestão e monitorização de servidores físicos e virtuais'),
(2, 'Redes', 'Configuração e manutenção de redes empresariais'),
(3, 'Análise de Vulnerabilidades', 'Identificação de falhas de segurança'),
(3, 'Gestão de Acessos', 'Controlo de permissões e autenticações'),
(4, 'Helpdesk', 'Atendimento e apoio técnico aos utilizadores'),
(4, 'Manutenção de Equipamentos', 'Gestão e reparação de hardware'),
(5, 'Inteligência Artificial', 'Investigação e desenvolvimento em IA e Machine Learning');

SELECT * FROM AREA;
/*Tabela AREA*/


/*Tabela TOPICO*/
INSERT INTO TOPICO (ID_AREA, NOME_TOPICO, DESCRICAO_TOP) VALUES
(1, 'React', 'Biblioteca JavaScript para interfaces de utilizador'),
(1, 'UX/UI Design', 'Melhoria da experiência do utilizador'),
(2, 'APIs REST', 'Desenvolvimento de serviços web RESTful'),
(2, 'ORMs', 'Mapeamento objeto-relacional com frameworks como Hibernate'),
(3, 'Flutter', 'Framework da Google para aplicações móveis'),
(4, 'Virtualização', 'Uso de máquinas virtuais em servidores empresariais'),
(5, 'VPNs Empresariais', 'Redes privadas virtuais para segurança de dados'),
(6, 'Pentesting', 'Testes de intrusão para avaliação da segurança'),
(8, 'Suporte Remoto', 'Assistência técnica à distância via software'),
(10, 'Redes Neuronais', 'Estrutura base para algoritmos de IA');

SELECT * FROM TOPICO;
/*Tabela TOPICO*/


/*Tabela Utilizador*/
INSERT INTO UTILIZADOR (
   NOME_UTILIZADOR, PASSWORD_UTIL, DATA_CRIACAO_UTILIZ, 
   TELEMOVEL, GENERO, MORADA, PAIS, DATA_NASC, EMAIL, DATA_ATIV_UTILI, AUTEN2FAT,
   ISFORMANDO, ISFORMADOR, ISGESTOR_ADMINISTRADOR
) VALUES
('João Silva', 'jsilva123', '2023-09-15 10:30:00', 912345678, 1, 'Rua das Flores, 45', 'Portugal', '1990-03-12', 'joao.silva@email.pt', '2024-04-01 08:15:00', true, true, false, false),/*FORMANDO*/
('Maria Fernandes', 'mf2023pt', '2023-10-05 14:22:00', 913456789, 2, 'Av. da Liberdade, 102', 'Portugal', '1987-07-19', 'maria.fernandes@email.pt', '2024-03-22 17:00:00', true, true, false, false),/*FORMANDO*/
('Tiago Costa', 'tcosta$$', '2024-01-20 09:05:00', 914567890, 1, 'Rua do Carmo, 12', 'Portugal', '1995-11-02', 'tiago.costa@email.pt', NULL, false, false, true, false),/*FORMADOR*/
('Ana Lopes', 'ana2024##', '2024-03-01 11:45:00', NULL, 2, 'Rua Nova, 78', 'Portugal', '1992-06-25', 'ana.lopes@email.pt', '2024-04-10 13:30:00', false, true, true, false),/*FORMANDO E FORMADOR*/
('Ricardo Neves', 'rn!tech01', '2023-12-10 16:10:00', 915678901, 1, 'Travessa da Paz, 5', 'Portugal', '1985-01-15', 'ricardo.neves@email.pt', '2024-01-20 09:00:00', false, false, false, true);/*GESTOR ADMNISTRADOR*/

SELECT * FROM UTILIZADOR;
/*Tabela Utilizador*/


/*Tabela S_S_O*/
INSERT INTO S_S_O (ID_UTILIZADOR, EMAIL_SSO, TOKEN) VALUES
(1, 'joao.silva@email.pt', 'token_abc123_joao_01'),
(1, 'joao.silva@email.pt', 'token_abc123_joao_02'),
(2, 'maria.fernandes@email.pt', 'token_maria_xyz01'),
(2, 'maria.fernandes@email.pt', 'token_maria_xyz02'),
(3, 'tiago.costa@email.pt', 'token_tiago_alpha01'),
(3, 'tiago.costa@email.pt', 'token_tiago_beta02'),
(4, 'ana.lopes@email.pt', 'token_ana_01'),
(4, 'ana.lopes@email.pt', 'token_ana_02'),
(5, 'ricardo.neves@email.pt', 'token_ricardo_01'),
(5, 'ricardo.neves@email.pt', 'token_ricardo_02');

SELECT * FROM S_S_O;
/*Tabela S_S_O*/


/*Tabela 2FA*/
INSERT INTO TWOFA (ID_UTILIZADOR, CODIGO, DATA_FA) VALUES
(1, '928374', '2024-04-10 08:30:00'),
(1, '192837', '2024-04-13 10:45:00'),
(2, '746291', '2024-04-12 09:20:00'),
(2, '374920', '2024-04-13 18:10:00'),
(3, '561203', '2024-04-11 14:00:00'),
(3, '004732', '2024-04-12 08:50:00'),
(4, '832014', '2024-04-10 07:15:00'),
(4, '983112', '2024-04-14 06:40:00'),
(5, '209384', '2024-04-12 11:30:00'),
(5, '765432', '2024-04-13 19:25:00');

SELECT * FROM TWOFA;
/*Tabela 2FA*/


/*Tabela GESTOR-ADMNISTRADOR*/
INSERT INTO GESTOR_ADMINISTRADOR (ID_GESTOR_ADMINISTRADOR)
SELECT ID_UTILIZADOR 
FROM UTILIZADOR 
WHERE ISGESTOR_ADMINISTRADOR = true;

SELECT * FROM GESTOR_ADMINISTRADOR;
/*Tabela GESTOR-ADMNISTRADOR*/


/*Tabela cursos*/
INSERT INTO CURSOS (
   ID_TOPICO, ID_GESTOR_ADMINISTRADOR, 
   NOME_CURSO, DESCRICAO_CURSO, NUMERO_VAGAS, DATA_INICIO_CURSO,
   DATA_FIM_CURSO, ESTADO, IDIOMA, HORAS_CURSO,
   CONTADOR_FORMANDOS, IMAGEM, ISASSINCRONO, ISSINCRONO
) VALUES
(1, 5, 'Curso React', 'Desenvolvimento de aplicações web com React JS', 20, '2024-05-01', '2024-06-01', 1, 'Português', 40.0, 5, 'https://cloudmatetechnologies.com/wp-content/uploads/2024/06/react.js.png', true, false),/*ASSICRONO*/
(2, 5, 'Curso UX/UI', 'Princípios de design para aplicações modernas', 15, '2024-04-20', '2024-05-20', 1, 'Português', 30.0, 3, 'https://zup.com.br/wp-content/uploads/2021/03/5d80e6d2dd362e0d237ffe44_ux-vs-ui.jpeg', true, false),/*ASSICRONO*/
(3, 5, 'API RESTful', 'Desenvolvimento e integração de APIs web RESTful', 25, '2024-04-15', '2024-05-15', 1, 'Português', 35.0, 6, 'https://blog.postman.com/wp-content/uploads/2020/07/API-101-What-Is-a-REST-API-scaled.jpg', false, true),/*SICRONO*/
(4, 5, 'ORM Avançado', 'Uso avançado de frameworks ORM em projetos', 10, '2024-06-01', '2024-07-01', 1, 'Português', 20.0, 2, 'https://miro.medium.com/v2/resize:fit:2000/1*cWKVGQg53Ia_t34G-2YwYA.png', true, false),/*ASSICRONO*/
(5, 5, 'Flutter Mobile', 'Desenvolvimento de apps multiplataforma com Flutter', 18, '2024-05-10', '2024-06-10', 1, 'Português', 38.0, 4, 'https://blog.solguruz.com/wp-content/uploads/2023/11/Flutter-for-Hybrid-Apps-Why-Flutter-is-the-Best-Platform-to-Make-Hybrid-Apps.png', false, true),/*SICRONO*/
(6, 5, 'Virtualização', 'Gestão de servidores virtuais e containers', 12, '2024-05-05', '2024-06-05', 1, 'Português', 25.0, 4, 'https://sauk.com.br/wp-content/uploads/2020/09/o-que-virtualizacao.jpg', true, false),/*ASSICRONO*/
(7, 5, 'VPN Segura', 'Configuração e proteção de redes privadas virtuais', 20, '2024-05-15', '2024-06-20', 1, 'Português', 28.0, 3, 'https://surfshark.com/wp-content/uploads/2022/12/Are_VPNs_safe_hero-1024x501.png', false, true),/*SICRONO*/
(8, 5, 'Teste Penetração', 'Técnicas de segurança ofensiva e pentesting', 15, '2024-05-02', '2024-06-12', 1, 'Português', 32.0, 2, 'https://brasiline.com.br/wp-content/uploads/2021/08/Imagem1.jpg', true, false),/*ASSICRONO*/
(9, 5, 'Suporte Remoto', 'Técnicas avançadas de assistência técnica remota', 30, '2024-04-25', '2024-05-25', 1, 'Português', 26.0, 5, 'https://cdn.prod.website-files.com/64ce91383031d34ffe3ee618/65a0fda038317a3f37df0109_suporte-remoto.jpg', false, true),/*SICRONO*/
(10, 5, 'Redes Neuronais', 'Introdução à inteligência artificial e redes neuronais', 10, '2024-06-01', '2024-07-10', 1, 'Português', 40.0, 1, 'https://img.odcdn.com.br/wp-content/uploads/2023/05/o-que-e-rede-neural.jpg', true, false);/*ASSICRONO*/

SELECT * FROM CURSOS;
/*Tabela cursos*/


/*Tabela assicrono*/
INSERT INTO ASSINCRONO (ID_CURSO_ASSINCRONO)
SELECT ID_CURSO
FROM CURSOS
WHERE ISASSINCRONO = true;

SELECT * FROM ASSINCRONO;
/*Tabela assicrono*/


/*Tabela aulas*/
INSERT INTO AULAS (
  ID_CURSO, DATA_AULA, NOME_AULA
) VALUES
(1, '2024-05-03', 'Introdução ao React'),
(2, '2024-04-21', 'Fundamentos de UX'),
(3, '2024-04-17', 'Estrutura de uma API REST'),
(4, '2024-06-02', 'Configuração de ORM'),
(5, '2024-05-12', 'Primeira App com Flutter'),
(6, '2024-05-06', 'Virtualização com Hyper-V'),
(7, '2024-05-17', 'Conceitos de VPN'),
(8, '2024-05-04', 'Ferramentas para Pentesting'),
(9, '2024-04-27', 'Protocolos de Suporte Técnico'),
(10, '2024-06-03', 'Fundamentos de Redes Neuronais');

SELECT * FROM AULAS;
/*Tabela aulas*/


/*Tabela CONTEUDOS_PARTILHADO*/
INSERT INTO CONTEUDOS_PARTILHADO (
  ID_TOPICO, DESCRICAO_CP, DATA_CRIACAO_CP
) VALUES
(1, 'Guia de React para Iniciantes', '2024-05-01'),
(2, 'UX: Melhores Práticas', '2024-04-25'),
(3, 'API REST: Boas Práticas', '2024-04-18'),
(4, 'ORM com exemplos práticos', '2024-05-03'),
(5, 'Introdução ao Flutter', '2024-04-27'),
(6, 'Manual de Virtualização', '2024-05-06'),
(7, 'Configuração de VPNs', '2024-05-09'),
(8, 'Pentesting com Kali Linux', '2024-04-30'),
(9, 'FAQ de Suporte Técnico', '2024-05-02'),
(10, 'Bases de Inteligência Artificial', '2024-05-10');

SELECT * FROM CONTEUDOS_PARTILHADO;
/*Tabela CONTEUDOS_PARTILHADO*/


/*Tabela POST*/
INSERT INTO POST (
   ID_UTILIZADOR, ID_CONTEUDOS_PARTILHADO, TEXTO_POST, CONTADOR_LIKES_POST, CONTADOR_COMENTARIOS
) VALUES
(1, 1, 'Aprendi hoje sobre componentes em React! Incrível!', 120, 15),
(2, 2, 'UX não é só sobre design, é sobre experiência. Façam o teste!', 200, 25),
(3, 3, 'As melhores práticas para criar uma API RESTful de sucesso!', 150, 10),
(4, 4, 'Configuração de ORM foi mais fácil do que eu pensava, recomendo!', 95, 5),
(5, 5, 'A primeira app em Flutter já está no ar. Super fácil de começar!', 130, 18),
(1, 6, 'Virtualizar sistemas nunca foi tão acessível. Vamos lá!', 80, 12),
(2, 7, 'VPNs: essencial para segurança, mas com a configuração certa!', 110, 22),
(3, 8, 'Pentesting é emocionante! Kali Linux está em alta!', 170, 30),
(4, 9, 'Suporte técnico eficiente é a chave para a satisfação do cliente.', 140, 20),
(5, 10, 'Entendendo a IA: não é ficção científica, está aqui agora.', 250, 35);

SELECT * FROM POST;
/*Tabela POST*/


/*Tabela NOTIFICACOES_POST*/
INSERT INTO NOTIFICACOES_POST (
   ID_CURSO, ID_POST, ID_UTILIZADOR, DATA_HORA_NOTIFICACAOCP
) VALUES
(1, 1, 1, '2024-05-02 09:30:00'),
(2, 2, 2, '2024-04-22 10:15:00'),
(3, 3, 3, '2024-04-19 14:00:00'),
(4, 4, 4, '2024-06-02 08:45:00'),
(5, 5, 5, '2024-05-14 16:30:00'),
(6, 6, 1, '2024-05-07 11:00:00'),
(7, 7, 2, '2024-05-18 12:20:00'),
(8, 8, 3, '2024-05-05 17:10:00'),
(9, 9, 4, '2024-05-03 09:40:00'),
(10, 10, 5, '2024-06-04 18:25:00');

SELECT * FROM NOTIFICACOES_POST;
/*Tabela NOTIFICACOES_POST*/


/*Tabela AVALIACOES*/
INSERT INTO AVALIACOES (
   ID_POST, ID_UTILIZADOR, AVALIACAO
) VALUES
(1, 1, true),
(2, 2, true),
(3, 3, false),
(4, 4, true),
(5, 5, true),
(6, 1, false),
(7, 2, true),
(8, 3, false),
(9, 4, true),
(10, 5, false);

SELECT * FROM AVALIACOES;
/*Tabela AVALIACOES*/


/*Tabela COMENTARIO*/
INSERT INTO COMENTARIO (
   ID_POST, ID_UTILIZADOR, ID_AVALIACAO, TEXTO_COMENTARIO, CONTADOR_LIKES_COM
) VALUES
(1, 1, 1, 'Ótimo post sobre React! Muito útil para iniciantes.', 15),
(2, 2, 2, 'Excelente conteúdo sobre UX. Vou aplicar no meu projeto.', 20),
(3, 3, 3, 'Achei o post interessante, mas poderia ser mais aprofundado.', 8),
(4, 4, 4, 'Adorei as dicas sobre ORM! Muito bem explicado.', 12),
(5, 5, 5, 'Flutter é realmente incrível, mas ainda estou aprendendo.', 25),
(6, 1, 6, 'A explicação sobre virtualização não ficou clara para mim.', 3),
(7, 2, 7, 'VPNs são essenciais para segurança, ótimas dicas!', 18),
(8, 3, 8, 'Pentesting é um tema interessante, mas o post não trouxe novidades.', 7),
(9, 4, 9, 'Excelente abordagem ao suporte técnico. Vou seguir essas dicas.', 10),
(10, 5, 10, 'Inteligência artificial é o futuro, mas este post é muito superficial.', 5);

SELECT * FROM COMENTARIO;
/*Tabela COMENTARIO*/


/*Tabela TIPO_FORMATO*/
INSERT INTO TIPO_FORMATO (
   FORMATO
) VALUES
('Vídeo'),
('PDF'),
('Artigo'),
('Imagem'),
('Gráfico');

SELECT * FROM TIPO_FORMATO;
/*Tabela TIPO_FORMATO*/


/*Tabela CONTEUDOS*/
INSERT INTO CONTEUDOS (
   ID_AULA, ID_FORMATO, CONTEUDO
) VALUES
(1, 1, 'Introdução ao React - Vídeo explicativo sobre os fundamentos do React.'),
(2, 2, 'Guia de UX - PDF sobre melhores práticas de design de experiência de utilizador.'),
(3, 3, 'O que são APIs RESTful - Artigo sobre as definições e boas práticas para APIs REST.'),
(4, 4, 'Sessão ao vivo sobre ORM - Webinar sobre configuração e uso de ORM em aplicações.'),
(5, 5, 'Infográfico sobre Flutter - Visualização interativa sobre os principais componentes do Flutter.'),
(6, 1, 'Exploração de máquinas virtuais - Vídeo explicativo sobre máquinas virtuais e suas aplicações.'),
(7, 2, 'VPNs e segurança - PDF explicando o funcionamento e importância das VPNs.'),
(8, 3, 'Pentesting básico - Artigo com introdução ao conceito de pentesting e suas técnicas.'),
(9, 4, 'Webinar sobre Suporte Técnico - Webinar ao vivo sobre como fornecer suporte técnico eficiente.'),
(10, 5, 'Infográfico sobre Inteligência Artificial - Infográfico interativo sobre IA e suas aplicações.');

SELECT * FROM CONTEUDOS;
/*Tabela CONTEUDOS*/


/*Tabela TIPO_DENUNCIA*/
INSERT INTO TIPO_DENUNCIA (
   TIPO_DENUNCIA
) VALUES
('Comentário impróprio'),
('Informação falsa'),
('Spam'),
('Bullying'),
('Burla ou fraude');

SELECT * FROM TIPO_DENUNCIA;
/*Tabela TIPO_DENUNCIA*/


/*Tabela DENUNCIA*/
INSERT INTO DENUNCIA (
   ID_COMENTARIO, ID_UTILIZADOR, ID_POST, ID_TIPO_DENUNCIA
) VALUES
(1, 1, 1, 1),  
(2, 2, 2, 2),  
(3, 3, 3, 3),  
(4, 4, 4, 4),  
(5, 5, 5, 5), 
(6, 1, 6, 1), 
(7, 2, 7, 2), 
(8, 3, 8, 3), 
(9, 4, 9, 4), 
(10, 5, 10, 5);

SELECT * FROM DENUNCIA;
/*Tabelas DENUNCIA*/


/*Tabela FORMADORES*/
INSERT INTO FORMADORES (ID_FORMADOR, ESPECIALIDADES, EXPERIENCIA)
SELECT ID_UTILIZADOR, 'Gestão de Projetos', 'Mais de 5 anos em gestão de equipas'
FROM UTILIZADOR 
WHERE ISFORMADOR = true
LIMIT 1;

INSERT INTO FORMADORES (ID_FORMADOR, ESPECIALIDADES, EXPERIENCIA)
SELECT ID_UTILIZADOR, 'Marketing Digital', 'Experiência em campanhas online'
FROM UTILIZADOR 
WHERE ISFORMADOR = true AND ID_UTILIZADOR = 4
LIMIT 1;

SELECT * FROM FORMADORES;
/*Tabela FORMADORES*/


/*Tabela FORMANDOS*/
INSERT INTO FORMANDOS (ID_FORMANDO, PERCURSO_FORMATIVO)
SELECT ID_UTILIZADOR, 'Curso de Liderança e Gestão'
FROM UTILIZADOR
WHERE ISFORMANDO = true
LIMIT 1;

INSERT INTO FORMANDOS (ID_FORMANDO, PERCURSO_FORMATIVO)
SELECT ID_UTILIZADOR, 'Formação em Marketing Avançado'
FROM UTILIZADOR
WHERE ISFORMANDO = true AND ID_UTILIZADOR = 2
LIMIT 1;

SELECT * FROM FORMANDOS;
/*Tabela FORMANDOS*/


/*Tabela INSCRICOES*/
INSERT INTO INSCRICOES (
    ID_FORMANDO, ID_CURSO, DATA_LIMITE, DATA_INICIO_INSC, STATUS_INSCRICAO
) VALUES
(1, 1, '2024-05-01 23:59:59', '2024-04-01 09:00:00', 1),
(2, 2, '2024-05-01 23:59:59', '2024-04-01 10:00:00', 1),
(2, 3, '2024-06-10 23:59:59', '2024-05-10 08:30:00', 1),
(1, 4, '2024-06-10 23:59:59', '2024-05-12 14:00:00', 1),
(2, 5, '2024-07-15 23:59:59', '2024-06-01 13:00:00', 0),
(1, 4, '2024-08-20 23:59:59', '2024-07-05 11:15:00', 1),
(1, 4, '2024-08-20 23:59:59', '2024-07-07 15:45:00', 0),
(2, 5, '2024-09-30 23:59:59', '2024-08-01 09:30:00', 1),
(2, 5, '2024-09-30 23:59:59', '2024-08-02 10:00:00', 1),
(1, 3, '2024-07-15 23:59:59', '2024-06-10 12:00:00', 0);

SELECT * FROM INSCRICOES;
/*Tabela INSCRICOES*/


/*Tabela NOTIFICACOES_CURSO*/
INSERT INTO NOTIFICACOES_CURSO (
   ID_UTILIZADOR, ID_CURSO, DATA_HORA_NOTIFICACAOCURSO
) VALUES
(1, 1, '2024-04-10 09:00:00'),
(2, 1, '2024-04-10 10:30:00'),
(3, 2, '2024-04-11 14:45:00'),
(4, 2, '2024-04-11 15:00:00'),
(5, 3, '2024-04-12 08:15:00'),
(1, 4, '2024-04-12 13:20:00'),
(2, 4, '2024-04-13 11:10:00'),
(3, 5, '2024-04-13 16:30:00'),
(4, 5, '2024-04-14 09:40:00'),
(5, 3, '2024-04-14 17:25:00');

SELECT * FROM NOTIFICACOES_CURSO;
/*Tabela NOTIFICACOES_CURSO*/


/*Tabela OCORRENCIAS_EDICOES*/
INSERT INTO OCORRENCIAS_EDICOES (ID_CURSO, NR_OCORRENCIA, DATA_ULT_OCORRENCIA)
VALUES 
(1, 2, '2024-01-15 09:30:00'),
(2, 1, '2024-01-16 10:15:00'),
(3, 50, '2024-01-17 14:00:00'),
(4, 100, '2024-01-18 16:45:00'),
(5, 50, '2024-01-19 11:20:00'),
(6, 20, '2024-01-20 13:10:00'),
(7, 35, '2024-01-21 08:30:00'),
(8, 20, '2024-01-22 15:00:00'),
(9, 21, '2024-01-23 17:30:00'),
(10, 5, '2024-01-24 12:00:00');

SELECT * FROM OCORRENCIAS_EDICOES;
/*Tabela OCORRENCIAS_EDICOES*/


/*Tabela SINCRONO*/
INSERT INTO SINCRONO (ID_CURSO_SINCRONO, ID_FORMADOR)
SELECT ID_CURSO, 3
FROM CURSOS
WHERE ISSINCRONO = true
LIMIT 1;

INSERT INTO SINCRONO (ID_CURSO_SINCRONO, ID_FORMADOR)
SELECT ID_CURSO, 4
FROM CURSOS
WHERE ISSINCRONO = true AND ID_CURSO = 5
LIMIT 1;

INSERT INTO SINCRONO (ID_CURSO_SINCRONO, ID_FORMADOR)
SELECT ID_CURSO, 3
FROM CURSOS
WHERE ISSINCRONO = true AND ID_CURSO = 7
LIMIT 1;

INSERT INTO SINCRONO (ID_CURSO_SINCRONO, ID_FORMADOR)
SELECT ID_CURSO, 3
FROM CURSOS
WHERE ISSINCRONO = true AND ID_CURSO = 9
LIMIT 1;

SELECT * FROM SINCRONO;
/*Tabela SINCRONO*/


/*Tabela RESULTADOS*/
INSERT INTO RESULTADOS (ID_FORMANDO, ID_CURSO_SINCRONO, RESUL)
VALUES
(2, 5, 16.5),
(2, 7, 11.5),
(1, 3, 9.5),
(1, 9, 10.2);

SELECT * FROM RESULTADOS;
/*Tabela RESULTADOS*/