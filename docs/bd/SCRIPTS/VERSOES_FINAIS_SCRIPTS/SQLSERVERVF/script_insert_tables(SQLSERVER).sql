-- Inserir CATEGORIA
INSERT INTO CATEGORIA (NOME_CAT) VALUES 
('Tecnologia'),
('Gestão e Negócios'),
('Saúde e Bem-estar'),
('Línguas'),
('Marketing Digital');

-- Inserir AREA
INSERT INTO AREA (ID_CATEGORIA, NOME_AREA) VALUES 
(1, 'Desenvolvimento Web'),
(1, 'Programação'),
(1, 'Bases de Dados'),
(2, 'Gestão de Projetos'),
(2, 'Liderança'),
(3, 'Nutrição'),
(3, 'Primeiros Socorros'),
(4, 'Inglês'),
(4, 'Francês'),
(5, 'Redes Sociais');

-- Inserir TOPICO (com descrições expandidas)
INSERT INTO TOPICO (ID_AREA, NOME_TOPICO, DESCRICAO_TOP) VALUES 
(1, 'HTML e CSS', 'Fundamentos essenciais de HTML5 e CSS3 para o desenvolvimento web moderno. Esta formação abrange desde a estrutura básica de documentos HTML, semântica avançada, acessibilidade e boas práticas, até ao desenvolvimento de layouts responsivos com CSS Grid e Flexbox. Serão abordadas também técnicas avançadas de estilização, animações e transições, e compatibilidade entre navegadores para criação de interfaces modernas e acessíveis.'),

(1, 'JavaScript', 'Programação com JavaScript para desenvolvimento web interativo e dinâmico. Esta formação explora desde os conceitos fundamentais da linguagem até técnicas avançadas como programação funcional, manipulação do DOM, eventos, trabalho com APIs, promises e async/await. Serão também abordados frameworks modernos, padrões de design, otimização de performance e depuração. O participante aprenderá a criar aplicações web robustas e interativas utilizando as mais recentes especificações da linguagem.'),

(2, 'Java', 'Programação orientada a objetos com Java, uma das linguagens mais utilizadas no desenvolvimento de software empresarial. Este curso aborda os pilares fundamentais da orientação a objetos, incluindo encapsulamento, herança, polimorfismo e abstração. Serão exploradas as APIs principais da linguagem, como Collections Framework, Stream API, manipulação de exceções e programação concorrente. O participante desenvolverá competências para criar aplicações robustas, modulares e escaláveis em ambientes corporativos.'),

(2, 'Python', 'Linguagem de programação Python para análise de dados, automação e desenvolvimento de aplicações. Neste curso são abordados os conceitos fundamentais da linguagem, estruturas de dados, funções, módulos, pacotes e programação orientada a objetos em Python. Serão também exploradas as principais bibliotecas para ciência de dados como Pandas, NumPy, Matplotlib e integração com bases de dados. Os formandos aprenderão a desenvolver scripts de automação e aplicações de análise de dados com interfaces gráficas.'),

(3, 'SQL Server', 'Administração e programação com Microsoft SQL Server, sistema de gestão de bases de dados relacionais empresarial. O curso abrange desde a instalação e configuração do SQL Server, modelagem de dados, linguagem SQL avançada, até à otimização de queries, índices e planos de execução. Serão explorados tópicos como procedimentos armazenados, funções, triggers, transações, segurança, backup e recuperação. Os participantes adquirirão competências para implementar, manter e otimizar bases de dados SQL Server em ambientes de produção.'),

(3, 'MySQL', 'Gestão de bases de dados relacionais com MySQL, uma das soluções de bases de dados open source mais populares mundialmente. Este curso abrange a instalação e configuração do MySQL, modelagem de dados, SQL avançado, administração de servidores, otimização de performance, clustering e replicação. Serão também exploradas técnicas de backup e recuperação, segurança, controlo de acessos e integração com diferentes linguagens de programação. Os formandos desenvolverão competências para projetar e manter bases de dados escaláveis e eficientes.'),

(4, 'Metodologias Ágeis', 'Métodos ágeis para gestão eficiente de projetos de software e outros domínios. O curso explora os valores e princípios do Manifesto Ágil, os principais frameworks como Scrum, Kanban e XP, técnicas de planeamento e estimativa, e ferramentas para implementação bem-sucedida. Serão abordadas práticas como reuniões diárias, retrospetivas, gestão de backlog, entrega contínua e integração contínua. Os participantes aprenderão a adaptar metodologias ágeis a diferentes contextos organizacionais, promovendo maior colaboração e entregas de valor incremental.'),

(5, 'Comunicação Eficaz', 'Técnicas avançadas de comunicação para líderes e profissionais que buscam aprimorar sua influência e clareza na transmissão de mensagens. O curso aborda elementos verbais e não-verbais da comunicação, estratégias para falar em público, técnicas de escuta ativa, comunicação assertiva e gestão de conflitos através do diálogo. São explorados diferentes contextos comunicacionais, desde reuniões e apresentações até feedback individual e comunicação em equipa. Os participantes desenvolverão competências para adaptar seu estilo de comunicação a diferentes audiências e situações profissionais.'),

(6, 'Alimentação Saudável', 'Princípios fundamentais de uma alimentação equilibrada e sustentável para melhoria da qualidade de vida e prevenção de doenças. O curso explora os grupos alimentares, macro e micronutrientes essenciais, planeamento de refeições, leitura de rótulos e escolhas alimentares conscientes. Serão discutidos temas como dietas especiais, mitos alimentares, relação entre alimentação e doenças crónicas, nutrição desportiva e alimentação em diferentes fases da vida. Os formandos adquirirão conhecimentos para fazer escolhas informadas e desenvolver hábitos alimentares saudáveis a longo prazo.'),

(7, 'Suporte Básico de Vida', 'Procedimentos essenciais de primeiros socorros e Suporte Básico de Vida para situações de emergência. Este curso capacita os participantes a reconhecer e atuar em situações que representam risco de vida, como paragem cardiorrespiratória, obstrução das vias aéreas, hemorragias graves e choque. São abordadas técnicas de reanimação cardiopulmonar, utilização de desfibrilhador automático externo, posicionamento de segurança e procedimentos para diferentes tipos de trauma. Os formandos desenvolverão competências práticas através de simulações realistas para agir com confiança em emergências.'),

(8, 'Inglês para Negócios', 'Inglês aplicado ao contexto empresarial e profissional para comunicação eficaz em ambiente internacional. O curso abrange vocabulário específico para reuniões, negociações, apresentações, correspondência comercial e networking. São desenvolvidas as quatro competências linguísticas (compreensão e expressão oral e escrita) com foco em situações reais do mundo empresarial. Os participantes aprenderão expressões idiomáticas, fraseologia específica e convenções culturais relevantes para o ambiente de negócios internacional, melhorando significativamente sua eficácia comunicativa em inglês profissional.'),

(9, 'Francês Básico', 'Introdução abrangente à língua francesa, desenvolvendo competências fundamentais de comunicação para situações quotidianas e turísticas. O curso aborda pronúncia, gramática básica, vocabulário essencial e expressões úteis para apresentações, compras, restaurantes, transportes e acomodação. São desenvolvidas as quatro competências linguísticas (compreensão e expressão oral e escrita) através de diálogos, leituras, exercícios práticos e simulações de situações reais. Os formandos adquirirão uma base sólida para comunicação elementar em francês, compreendendo também aspetos culturais relevantes.'),

(10, 'Facebook Ads', 'Marketing e publicidade avançada no Facebook e Instagram para empresas e profissionais de marketing digital. Este curso explora em profundidade o Business Manager, configuração de campanhas, segmentação de públicos, formatos de anúncios, orçamentos e licitações. São abordadas estratégias para diferentes objetivos de marketing, otimização de campanhas, análise de resultados e retorno sobre investimento. Os participantes aprenderão a criar funis de conversão eficazes, implementar pixel de rastreamento, realizar testes A/B e desenvolver estratégias de remarketing para maximizar os resultados das suas campanhas publicitárias nas plataformas Meta.');

-- Inserir UTILIZADOR (mantido igual)
INSERT INTO UTILIZADOR (NOME_UTILIZADOR, EMAIL, PASSWORD_UTIL, IMG_PERFIL, TELEMOVEL, GENERO, MORADA, PAIS, DATA_NASC, DATA_ATIV_UTILI, AUTEN2FAT, ISFORMANDO, ISFORMADOR, ISGESTOR_ADMINISTRADOR) VALUES 
('António Silva', 'antonio.silva@email.pt', 'pbkdf2:sha256:150000$XYZ123', 'https://randomuser.me/api/portraits/men/1.jpg', 912345678, 1, 'Rua das Flores, 123, 1º Esq', 'Portugal', '1985-05-12', '2023-01-15', 0, 1, 0, 0),
('Maria Santos', 'maria.santos@email.pt', 'pbkdf2:sha256:150000$XYZ124', 'https://randomuser.me/api/portraits/women/1.jpg', 961234567, 2, 'Avenida da República, 45, 3º Dto', 'Portugal', '1990-08-21', '2023-01-16', 0, 1, 0, 0),
('João Oliveira', 'joao.oliveira@email.pt', 'pbkdf2:sha256:150000$XYZ125', 'https://randomuser.me/api/portraits/men/2.jpg', 932345678, 1, 'Rua do Comércio, 78', 'Portugal', '1988-03-30', '2023-01-17', 1, 1, 0, 0),
('Ana Costa', 'ana.costa@email.pt', 'pbkdf2:sha256:150000$XYZ126', 'https://randomuser.me/api/portraits/women/2.jpg', 915678901, 2, 'Praça da Liberdade, 12, 5º', 'Portugal', '1992-11-05', '2023-01-18', 0, 1, 0, 0),
('José Pereira', 'jose.pereira@email.pt', 'pbkdf2:sha256:150000$XYZ127', 'https://randomuser.me/api/portraits/men/3.jpg', 926789012, 1, 'Rua das Palmeiras, 56, 2º', 'Portugal', '1983-07-18', '2023-01-19', 0, 1, 1, 0),
('Sofia Martins', 'sofia.martins@email.pt', 'pbkdf2:sha256:150000$XYZ128', 'https://randomuser.me/api/portraits/women/3.jpg', 968901234, 2, 'Avenida Central, 89, Bloco A', 'Portugal', '1987-09-22', '2023-01-20', 1, 1, 1, 0),
('Rui Ferreira', 'rui.ferreira@email.pt', 'pbkdf2:sha256:150000$XYZ129', 'https://randomuser.me/api/portraits/men/4.jpg', 937890123, 1, 'Rua da Boavista, 120', 'Portugal', '1980-12-10', '2023-01-21', 0, 1, 1, 0),
('Carla Rodrigues', 'carla.rodrigues@email.pt', 'pbkdf2:sha256:150000$XYZ130', 'https://randomuser.me/api/portraits/women/4.jpg', 919012345, 2, 'Largo do Rossio, 9, 1º', 'Portugal', '1991-04-25', '2023-01-22', 0, 1, 0, 0),
('Francisco Gomes', 'francisco.gomes@email.pt', 'pbkdf2:sha256:150000$XYZ131', 'https://randomuser.me/api/portraits/men/5.jpg', 963456789, 1, 'Av. 25 de Abril, 67, 4º Esq', 'Portugal', '1978-06-15', '2023-01-23', 1, 0, 0, 1),
('Marta Fernandes', 'marta.fernandes@email.pt', 'pbkdf2:sha256:150000$XYZ132', 'https://randomuser.me/api/portraits/women/5.jpg', 934567890, 2, 'Rua do Carmo, 33, 2º Dto', 'Portugal', '1989-02-28', '2023-01-24', 0, 1, 0, 0),
('Paulo Lopes', 'paulo.lopes@email.pt', 'pbkdf2:sha256:150000$XYZ133', 'https://randomuser.me/api/portraits/men/6.jpg', 916789012, 1, 'Praça do Município, 5', 'Portugal', '1986-10-08', '2023-01-25', 0, 1, 0, 0),
('Sara Ribeiro', 'sara.ribeiro@email.pt', 'pbkdf2:sha256:150000$XYZ134', 'https://randomuser.me/api/portraits/women/6.jpg', 927890123, 2, 'Rua dos Clérigos, 42, 3º', 'Portugal', '1993-01-17', '2023-01-26', 0, 1, 0, 0),
('Miguel Almeida', 'miguel.almeida@email.pt', 'pbkdf2:sha256:150000$XYZ135', 'https://randomuser.me/api/portraits/men/7.jpg', 969012345, 1, 'Avenida da Liberdade, 112, 6º', 'Portugal', '1984-08-29', '2023-01-27', 1, 1, 1, 0),
('Teresa Pinto', 'teresa.pinto@email.pt', 'pbkdf2:sha256:150000$XYZ136', 'https://randomuser.me/api/portraits/women/7.jpg', 935678901, 2, 'Rua de Santa Catarina, 76, 1º', 'Portugal', '1995-03-14', '2023-01-28', 0, 1, 0, 0),
('Carlos Marques', 'carlos.marques@email.pt', 'pbkdf2:sha256:150000$XYZ137', 'https://randomuser.me/api/portraits/men/8.jpg', 918901234, 1, 'Largo do Chiado, 8', 'Portugal', '1982-05-09', '2023-01-29', 0, 1, 0, 0);

-- Inserir S_S_O (Single Sign-On)
INSERT INTO S_S_O (ID_UTILIZADOR, EMAIL_SSO, TOKEN) VALUES
(3, 'joao.oliveira@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzIiwibmFtZSI6Ikpvw6NvIE9saXZlaXJhIiwiaWF0IjoxNjc0MDY1ODQwfQ.T8y_c8S'),
(6, 'sofia.martins@outlook.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2IiwibmFtZSI6IlNvZmlhIE1hcnRpbnMiLCJpYXQiOjE2NzQwNjU4NDB9.5Xz8_dK'),
(9, 'francisco.gomes@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5IiwibmFtZSI6IkZyYW5jaXNjbyBHb21lcyIsImlhdCI6MTY3NDA2NTg0MH0.Rk6p_jL'),
(13, 'miguel.almeida@gmail.com', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMyIsIm5hbWUiOiJNaWd1ZWwgQWxtZWlkYSIsImlhdCI6MTY3NDA2NTg0MH0.PqV9_mC');

-- Inserir TWOFA
INSERT INTO TWOFA (ID_UTILIZADOR, CODIGO, DATA_FA) VALUES
(3, '123456', '2023-02-15 09:45:00'),
(6, '789012', '2023-02-16 14:20:00'),
(9, '345678', '2023-02-17 11:30:00'),
(13, '901234', '2023-02-18 16:15:00');

-- Inserir GESTOR_ADMINISTRADOR
INSERT INTO GESTOR_ADMINISTRADOR (ID_GESTOR_ADMINISTRADOR) VALUES
(9); -- Francisco Gomes

-- Inserir CURSOS com datas futuras (os 8 originais)
INSERT INTO CURSOS (ID_GESTOR_ADMINISTRADOR, ID_TOPICO, NOME_CURSO, DESCRICAO_CURSO, DATA_INICIO_INSCRICAO, DATA_FIM_INSCRICAO, 
                   DATA_INICIO_CURSO, DATA_FIM_CURSO, ESTADO, IDIOMA, HORAS_CURSO, CONTADOR_FORMANDOS, IMAGEM, ISASSINCRONO, ISSINCRONO) VALUES
-- Cursos originais com datas atualizadas                   
(9, 1, 'Desenvolvimento Web Responsivo', 'Este curso abrangente de Desenvolvimento Web Responsivo foi desenhado para dotar os formandos com as competências necessárias para criar websites modernos, adaptáveis a qualquer dispositivo. Começaremos pelas fundações do HTML5 semântico, explorando todas as novas tags e atributos, para depois avançarmos para CSS3 com foco em flexbox, grid e media queries. Aprenderá a implementar animações, transições e transformações para melhorar a experiência do utilizador. O curso inclui também módulos sobre acessibilidade web, performance e otimização para motores de busca. Através de projetos práticos, os formandos desenvolverão um portfólio completo de websites responsivos, seguindo as melhores práticas da indústria e os padrões W3C.', 
   '2025-05-01', '2025-05-31', '2025-06-15', '2025-09-15', TRUE, 'Português', 40, 0, 'https://kinsta.com/pt/wp-content/uploads/sites/3/2020/09/design-responsivo-web.jpg', TRUE, FALSE),
   
(9, 2, 'JavaScript Avançado', 'Curso intensivo de JavaScript Avançado destinado a desenvolvedores que pretendem dominar esta linguagem fundamental para o desenvolvimento web moderno. Partindo de conceitos intermediários, o programa aprofunda tópicos como closures, prototypes, padrões de design, programação funcional e manipulação avançada do DOM. Os formandos aprenderão a trabalhar com as mais recentes funcionalidades do ECMAScript, incluindo classes, módulos, async/await, generators e decorators. O curso aborda ainda o desenvolvimento de SPAs (Single Page Applications), interação com APIs RESTful, websockets, e estratégias de teste automatizado. Inclui workshops práticos sobre frameworks populares como React, Vue ou Angular, e ferramentas essenciais do ecossistema JavaScript como npm, webpack e babel. Todos os conceitos são aplicados em projetos reais de complexidade crescente.', 
   '2025-05-10', '2025-06-10', '2025-06-25', '2025-09-25', TRUE, 'Português', 45, 0, 'https://blog.cronapp.io/wp-content/uploads/2020/09/javascript-1.jpg', FALSE, TRUE),
   
(9, 3, 'Java para Iniciantes', 'Introdução abrangente à programação orientada a objetos utilizando a linguagem Java, uma das mais populares e versáteis do mercado. Este curso foi desenhado para iniciantes com pouca ou nenhuma experiência em programação. Começa com os conceitos fundamentais da linguagem Java, incluindo sintaxe básica, tipos de dados, operadores, estruturas de controlo e funções. Progride para tópicos orientados a objetos como classes, herança, polimorfismo, encapsulamento e interfaces. Os formandos aprenderão a trabalhar com o ecossistema Java, incluindo o ambiente de desenvolvimento (JDK), ferramentas de build como Maven e Gradle, e IDEs como IntelliJ IDEA. O curso também aborda manipulação de exceções, coleções, entrada/saída, threading básico e introdução a GUI com JavaFX. Todos os conceitos são reforçados através de exercícios práticos e um projeto final.', 
   '2025-05-15', '2025-06-15', '2025-07-01', '2025-10-01', TRUE, 'Português', 60, 0, 'https://programadorviking.com.br/wp-content/uploads/2020/06/JavaScript-Para-Iniciantes.jpg', TRUE, FALSE),
   
(9, 4, 'Python para Análise de Dados', 'Formação completa em Python focada na análise e visualização de dados, uma competência cada vez mais valorizada no mercado português. Iniciamos com os fundamentos da linguagem Python, abordando tipos de dados, estruturas de controlo, funções e programação orientada a objetos. O curso avança para o ecossistema de análise de dados em Python, com foco nas bibliotecas NumPy para computação numérica, Pandas para manipulação e análise de dados estruturados, e Matplotlib e Seaborn para visualização. Os formandos aprenderão técnicas de importação e exportação de dados em diversos formatos, limpeza e transformação de dados, análise estatística descritiva e inferencial, e criação de dashboards interativos com Plotly e Dash. O programa inclui também uma introdução ao machine learning com scikit-learn e análise de séries temporais. Os conhecimentos são aplicados em datasets reais, incluindo dados abertos do governo português e estatísticas europeias.', 
   '2025-05-20', '2025-06-20', '2025-07-10', '2025-10-10', TRUE, 'Português', 50, 0, 'https://img-c.udemycdn.com/course/750x422/4596136_0432_3.jpg', FALSE, TRUE),
   
(9, 5, 'Administração SQL Server', 'Curso avançado de administração de bases de dados Microsoft SQL Server, focado nas necessidades do mercado empresarial português. O programa cobre desde a instalação e configuração inicial do SQL Server até à implementação de soluções complexas de alta disponibilidade e disaster recovery. Os formandos aprenderão a planear e implementar infraestruturas de bases de dados, gerir segurança e permissões, otimizar performance através de índices e query tuning, automatizar tarefas administrativas com scripts e jobs, e implementar estratégias eficientes de backup e recuperação. O curso aborda ainda tópicos avançados como clusters de failover, Always On Availability Groups, replicação, particionamento, columnstore indexes, e monitorização em tempo real. Inclui também boas práticas para migração de dados, upgrade de versões, e integração com o ecossistema Microsoft (Azure, PowerBI, SSIS, SSAS, SSRS). Todas as aulas combinam teoria com exercícios práticos em laboratório virtual.', 
   '2025-06-01', '2025-06-30', '2025-07-15', '2025-10-15', TRUE, 'Português', 55, 0, 'https://blog.powerdata.es/hs-fs/hubfs/iStock-517373542.jpg?width=591&name=iStock-517373542.jpg', TRUE, FALSE),
   
(9, 7, 'Gestão Ágil de Projetos', 'Formação completa em metodologias ágeis para gestão de projetos, adaptada à realidade das empresas portuguesas que procuram aumentar a eficiência e flexibilidade das suas equipas. O curso começa por apresentar os princípios e valores do Manifesto Ágil, contrastando-os com abordagens tradicionais. Explora em detalhe os principais frameworks ágeis, com especial ênfase em Scrum (papéis, eventos, artefactos), Kanban (fluxo contínuo, limites WIP, métricas) e híbridos como Scrumban. Os formandos aprenderão a planear releases e sprints, gerir backlogs de produto, conduzir cerimónias eficazes, e utilizar métricas ágeis para medir e melhorar a performance da equipa. O programa aborda também tópicos como escalabilidade ágil (SAFe, Nexus, LeSS), gestão de stakeholders, e ferramentas digitais para equipas ágeis. Inclui simulações práticas, estudos de caso de empresas portuguesas que implementaram métodos ágeis, e workshops de aplicação dos conceitos a cenários reais.', 
   '2025-06-10', '2025-07-10', '2025-07-25', '2025-10-25', TRUE, 'Português', 35, 0, 'https://deverhum.com.br/wp-content/uploads/2022/03/Gestao-Agil-de-Projetos-Conceito-e-aplicacao.jpeg', FALSE, TRUE),
   
(9, 8, 'Liderança e Comunicação', 'Curso especializado em competências de liderança e comunicação, essenciais para profissionais que desejam progredir na carreira em organizações portuguesas. O programa desenvolve capacidades fundamentais de liderança, desde o autoconhecimento e inteligência emocional até à gestão de equipas de alto desempenho. Aborda os diferentes estilos de liderança e a sua aplicação em contextos variados, técnicas de motivação e engagement, delegação eficaz, e gestão de mudança organizacional. Na componente de comunicação, os formandos aprenderão princípios de comunicação assertiva, escuta ativa, feedback construtivo, persuasão e influência, gestão de conflitos, e apresentações de impacto. O programa inclui ainda módulos sobre comunicação em contexto multicultural, liderança remota e híbrida, e comunicação em situações de crise. A metodologia é prática e experiencial, combinando avaliações de perfil, estudos de caso, role-playing, videogravação com feedback, e desenvolvimento de um plano de ação personalizado.', 
   '2025-06-15', '2025-07-15', '2025-08-01', '2025-11-01', TRUE, 'Português', 30, 0, 'https://www.plantareducacao.com.br/wp-content/uploads/2022/07/comunicacao-lideranca-02-1.png', FALSE, TRUE),
   
(9, 9, 'Nutrição e Saúde', 'Curso abrangente sobre princípios de alimentação saudável e o seu impacto na saúde e bem-estar, adaptado ao contexto alimentar português. O programa começa com os fundamentos da nutrição humana, explorando macronutrientes (proteínas, hidratos de carbono, gorduras) e micronutrientes (vitaminas, minerais), suas funções no organismo e fontes alimentares. Os formandos aprenderão a interpretar rótulos nutricionais, identificar alimentos processados e ultraprocessados, e compreender as recomendações da Roda dos Alimentos Portuguesa. O curso aborda a relação entre alimentação e prevenção de doenças crónicas como diabetes, hipertensão e obesidade, com especial foco nas tendências epidemiológicas em Portugal. Inclui módulos sobre alimentação em diferentes fases da vida, estratégias para mudança de comportamentos alimentares, mitos e factos sobre dietas populares, e adaptação de receitas tradicionais portuguesas para versões mais saudáveis. A metodologia combina conhecimentos teóricos com workshops práticos de planeamento de refeições equilibradas e económicas.', 
   '2025-06-20', '2025-07-20', '2025-08-10', '2025-11-10', TRUE, 'Português', 25, 0, 'https://salomaoayrozaribeiro.com.br/wp-content/uploads/2021/01/Ayroza-Blog-Alimentacao.png', TRUE, FALSE),

-- 15 cursos adicionais com datas futuras
(9, 10, 'Marketing no Facebook e Instagram', 'Formação especializada em estratégias de marketing digital para as plataformas Facebook e Instagram, focada nas particularidades do mercado português. O curso explora detalhadamente o algoritmo e métricas de ambas plataformas, técnicas avançadas de segmentação de público, criação de conteúdo de alto envolvimento, planeamento editorial e gestão de comunidades online. Os formandos aprenderão a desenvolver campanhas publicitárias eficazes com orçamentos variados, utilizar ferramentas nativas como Facebook Business Manager, Instagram Insights e Creator Studio, e implementar estratégias de crescimento orgânico e pago. São ainda abordadas técnicas de storytelling visual, produção de conteúdo para diferentes formatos (feed, stories, reels, IGTV), integração com e-commerce, e análise de dados para otimização contínua. O curso inclui estudos de caso de marcas portuguesas bem-sucedidas nas redes sociais e exercícios práticos de desenvolvimento de estratégias personalizadas.', 
   '2025-07-01', '2025-07-31', '2025-08-15', '2025-11-15', TRUE, 'Português', 35, 0, 'https://eixo.digital/wp-content/uploads/2018/04/COMO-USAR-CADA-REDE-SOCIAL-NO-MARKETING-DIGITAL-1.png', FALSE, TRUE),
   
(9, 1, 'UI/UX Design Fundamentals', 'Curso abrangente sobre os princípios fundamentais de design de interface (UI) e experiência do utilizador (UX), duas competências altamente valorizadas no mercado digital português. O programa inicia com os fundamentos do design centrado no utilizador, abordando pesquisa de utilizadores, personas, jornadas de utilizador e arquitetura de informação. Na componente de UI, os formandos aprenderão princípios de design visual, sistemas de grelhas, tipografia, teoria da cor, hierarquia visual, e design de componentes de interface. A componente de UX foca-se em metodologias de design thinking, wireframing, prototipagem, testes de usabilidade e design de interação. Os participantes trabalharão com ferramentas profissionais como Figma, Adobe XD ou Sketch, e aprenderão a criar sistemas de design escaláveis. O curso aborda ainda acessibilidade digital, design responsivo, tendências atuais e considerações específicas para o mercado português. Inclui um projeto final abrangente, desde a pesquisa inicial até ao protótipo funcional de alta fidelidade.', 
   '2025-07-05', '2025-08-05', '2025-08-20', '2025-11-20', TRUE, 'Português', 50, 0, 'https://leonardoconstanciodesigner.com/wp-content/uploads/2024/06/O-que-Faz-um-UX-UI-Designer.jpg', TRUE, FALSE),
   
(9, 2, 'React e Redux para Aplicações Web', 'Formação intensiva nas tecnologias React e Redux, essenciais para o desenvolvimento de aplicações web modernas e altamente requisitadas no mercado de trabalho tecnológico português. O curso parte dos fundamentos do React, abordando componentes, props, estado, ciclo de vida, hooks e roteamento. Avança para tópicos avançados como gestão de estado com Context API e Redux, otimização de performance, code-splitting, server-side rendering, e integração com APIs REST e GraphQL. Os formandos aprenderão a estruturar projetos de média e grande escala, implementar padrões arquiteturais como Flux e Redux-Saga, utilizar TypeScript para tipagem estática, e aplicar testes automatizados com Jest e React Testing Library. O programa inclui ainda módulos sobre deployment, CI/CD, monitorização, e integração com ecossistemas como Next.js e Gatsby. Todos os conceitos são aplicados em um projeto real, desenvolvido progressivamente ao longo do curso, culminando numa aplicação web completa e pronta para produção.', 
   '2025-07-10', '2025-08-10', '2025-08-25', '2025-11-25', TRUE, 'Português', 60, 0, 'https://www.tutorialswebsite.com/wp-content/uploads/react-redux.png', FALSE, TRUE),
   
(9, 4, 'Data Science com Python', 'Curso avançado de Data Science utilizando o ecossistema Python, orientado para profissionais portugueses que pretendem adquirir competências práticas nesta área em expansão. O programa abrange o ciclo completo de análise de dados, desde a aquisição e preparação dos dados até à modelação, avaliação e implementação de soluções. Os formandos aprenderão técnicas avançadas de manipulação de dados com Pandas, visualização científica com Matplotlib, Seaborn e Plotly, análise estatística com SciPy e StatsModels, e machine learning com Scikit-learn. O curso aprofunda algoritmos de aprendizagem supervisionada (regressão, classificação), não supervisionada (clustering, redução de dimensionalidade), e introduz conceitos de deep learning com TensorFlow e Keras. São abordadas ainda técnicas de processamento de linguagem natural, séries temporais, e sistemas de recomendação. O programa enfatiza casos de uso relevantes para o mercado português, incluindo análise de dados financeiros, detecção de fraude, segmentação de clientes e otimização de operações empresariais.', 
   '2025-07-15', '2025-08-15', '2025-09-01', '2025-12-01', TRUE, 'Português', 70, 0, 'https://www.mygreatlearning.com/blog/wp-content/uploads/2019/09/What-is-data-science-2.jpg', TRUE, FALSE),
   
(9, 6, 'Nutrição Desportiva Avançada', 'Formação especializada em nutrição desportiva, destinada a profissionais de saúde, treinadores e atletas que pretendem otimizar o desempenho através de estratégias nutricionais avançadas. O curso explora em profundidade o metabolismo energético durante o exercício, requisitos nutricionais específicos para diferentes modalidades desportivas, periodização nutricional em sincronização com o treino, e estratégias para momentos críticos (pré, durante e pós-treino/competição). Os formandos aprenderão sobre suplementação desportiva baseada em evidência científica, nutrição para hipertrofia muscular, estratégias de perda de gordura mantendo performance, hidratação e eletrólitos, e nutrição para recuperação e prevenção de lesões. O programa aborda ainda as necessidades nutricionais específicas de atletas vegetarianos/veganos, atletas femininas, atletas jovens em desenvolvimento e atletas masters. Inclui módulos sobre nutrição em condições ambientais extremas, estratégias para viagens e competições, e considerações para desportos de equipa vs. individuais. A metodologia combina fundamentação científica atualizada com aplicação prática através de estudos de caso e planeamento nutricional personalizado.', 
   '2025-07-20', '2025-08-20', '2025-09-05', '2025-12-05', TRUE, 'Português', 40, 0, 'https://www.hospitaldaluz.pt/Portals/_default/SiteData/GlobalAssets/Sa%C3%BAde%20e%20bem-estar/Imagens/2022/nutricao-para-quem-inicia-desporto.jpg', FALSE, TRUE),
   
(9, 5, 'Power BI para Análise de Dados Empresariais', 'Curso prático de análise de dados empresariais utilizando Microsoft Power BI, uma das ferramentas de business intelligence mais utilizadas em empresas portuguesas. O programa inicia com os fundamentos do Power BI Desktop, abordando importação e transformação de dados com Power Query, modelação de dados relacionais, criação de medidas com DAX (Data Analysis Expressions), e desenvolvimento de visualizações interativas e dashboards. Avança para tópicos avançados como relacionamentos complexos entre tabelas, medidas calculadas avançadas, inteligência temporal, análise What-If, hierarquias, parâmetros, e drill-through. Os formandos aprenderão também sobre Power BI Service, colaboração e partilha segura de relatórios, gateways de dados, atualização automática, e integração com outras ferramentas Microsoft. O curso inclui módulos específicos sobre as visualizações mais úteis para diferentes áreas de negócio (finanças, vendas, marketing, RH, operações), KPIs relevantes para empresas portuguesas, e considerações sobre RGPD na análise de dados. Todos os conceitos são aplicados em projetos reais, utilizando conjuntos de dados empresariais representativos do mercado nacional.', 
   '2025-07-25', '2025-08-25', '2025-09-10', '2025-12-10', TRUE, 'Português', 35, 0, 'https://hermes.dio.me/articles/cover/77cf9981-870a-4cd6-b4f5-3da8e9196453.jpg', TRUE, FALSE),
   
(9, 7, 'SBV e Primeiros Socorros para Educadores', 'Formação especializada em Suporte Básico de Vida (SBV) e primeiros socorros, desenhada especificamente para professores, educadores de infância, auxiliares de ação educativa e outros profissionais que trabalham com crianças em contexto escolar português. O curso aborda procedimentos essenciais para identificação e atuação em situações de emergência mais comuns em ambiente escolar, seguindo as diretrizes do Conselho Português de Ressuscitação e do INEM. Os formandos aprenderão protocolos de avaliação primária, técnicas de SBV adaptadas a diferentes idades (crianças e adolescentes), desobstrução da via aérea, posição lateral de segurança, e atuação em casos específicos como crises de asma, reações alérgicas graves, convulsões, traumatismos, queimaduras, hemorragias e outras situações frequentes em contexto educativo. O programa inclui componente prática intensiva com simulação de cenários em ambiente escolar, utilização de DAE (Desfibrilhador Automático Externo), e elaboração de planos de emergência para estabelecimentos de ensino. É também abordada a legislação portuguesa relevante e os procedimentos de comunicação com o 112 e com os encarregados de educação.', 
   '2025-08-01', '2025-09-01', '2025-09-15', '2025-12-15', TRUE, 'Português', 20, 0, 'https://www.qualificar-fp.pt/uploads/1/2/6/8/126871834/primeiro-socorro_orig.png', FALSE, TRUE),
   
(9, 8, 'Inglês para Profissionais de Turismo', 'Curso especializado de inglês para profissionais do setor turístico português, desenhado para melhorar a comunicação com visitantes internacionais e promover a excelência no atendimento. O programa foca-se no desenvolvimento de competências linguísticas práticas e relevantes para diversos contextos turísticos: hotelaria, restauração, agências de viagens, guias turísticos, animação turística e enoturismo. Os formandos aprenderão vocabulário específico do setor, expressões idiomáticas úteis, estruturas gramaticais essenciais e pronúncia adequada. O curso aborda situações comunicativas frequentes como check-in/check-out, reservas, informações sobre destinos, descrição do património cultural e natural português, resolução de problemas, gestão de reclamações, e promoção de experiências turísticas. Inclui ainda módulos sobre diferenças culturais, etiqueta internacional, e como apresentar a gastronomia, vinhos e tradições portuguesas a visitantes estrangeiros. A metodologia é prática e interativa, privilegiando roleplays de situações reais, simulações, estudos de caso e atividades de listening com diferentes sotaques de falantes de inglês. São também desenvolvidas competências de escrita para e-mails profissionais e comunicação nas redes sociais.', 
   '2025-08-05', '2025-09-05', '2025-09-20', '2025-12-20', TRUE, 'Português/Inglês', 45, 0, 'https://blog.topenglish.com.br/wp-content/uploads/2017/10/ingles-profissional-quais-profissoes-exigem-fluencia-na-lingua.jpeg', TRUE, FALSE),
   
(9, 9, 'Francês Comercial e de Negócios', 'Formação intensiva em língua francesa orientada para contextos profissionais e comerciais, especificamente adaptada às necessidades de empresários e profissionais portugueses que trabalham com mercados francófonos (França, Bélgica, Suíça, Canadá e países africanos de expressão francesa). O curso parte de um nível intermédio (A2/B1) e desenvolve competências linguísticas aplicadas ao mundo empresarial. Os formandos aprenderão terminologia específica de negócios, finanças, comércio internacional, marketing, recursos humanos e áreas jurídicas. O programa foca-se em situações comunicativas como apresentações profissionais, reuniões, negociações, networking, atendimento telefónico, videoconferências, e participação em feiras e eventos internacionais. Na componente escrita, são trabalhados e-mails formais, propostas comerciais, relatórios, contratos e documentação técnica. O curso aborda ainda aspetos culturais essenciais para os negócios nos diferentes países francófonos, etiqueta empresarial, e particularidades das relações comerciais luso-francesas. A metodologia combina o desenvolvimento das quatro competências linguísticas (compreensão e expressão oral e escrita) com situações práticas inspiradas no mundo empresarial real, incluindo simulações, estudos de caso e projetos aplicados ao setor de atividade de cada formando.', 
   '2025-08-10', '2025-09-10', '2025-09-25', '2025-12-25', TRUE, 'Português/Francês', 50, 0, 'https://www.i9project.net/wp-content/uploads/2014/07/Frances-Negocios.jpg', FALSE, TRUE),
   
(9, 3, 'Desenvolvimento Mobile com Flutter', 'Curso prático de desenvolvimento de aplicações móveis multiplataforma utilizando o framework Flutter, cada vez mais procurado por empresas portuguesas que pretendem otimizar recursos no desenvolvimento mobile. O programa começa com os fundamentos do Dart, linguagem de programação utilizada pelo Flutter, para depois explorar a arquitetura do framework, widgets, layouts, navegação entre ecrãs e gestão de estado. Os formandos aprenderão a desenvolver interfaces nativas e responsivas para iOS e Android a partir de um único código-base, aplicar os princípios de Material Design e Cupertino, integrar com APIs RESTful e bases de dados, implementar autenticação e autorização seguras, e utilizar recursos nativos dos dispositivos (câmara, GPS, notificações push, etc). O curso aborda ainda tópicos avançados como testes automatizados, CI/CD para mobile, monitorização de performance, internacionalização, acessibilidade, e publicação nas lojas de aplicações (App Store e Google Play). O programa culmina com o desenvolvimento de uma aplicação completa, desde a conceptualização até à publicação, podendo os formandos optar por desenvolver um projeto pessoal ou profissional com o acompanhamento do formador.', 
   '2025-08-15', '2025-09-15', '2025-10-01', '2026-01-01', TRUE, 'Português', 65, 0, 'https://blog.solguruz.com/wp-content/uploads/2023/11/Flutter-for-Hybrid-Apps-Why-Flutter-is-the-Best-Platform-to-Make-Hybrid-Apps.png', TRUE, FALSE),
   
(9, 10, 'Marketing Estratégico e Branding Digital', 'Formação avançada em marketing estratégico e desenvolvimento de marca no contexto digital, adaptada à realidade das empresas portuguesas que competem em mercados cada vez mais globalizados. O curso integra fundamentos tradicionais de marketing estratégico com as mais recentes tendências digitais, abordando análise de mercado, segmentação, posicionamento e proposta de valor na era digital. Na componente de branding, os formandos aprenderão metodologias para desenvolver identidades de marca memoráveis, storytelling de marca, brand voice, identidade visual e experiência de marca em múltiplos touchpoints digitais. O programa explora ainda estratégias omnichannel, jornada do cliente digital, inbound marketing, content marketing, SEO, marketing de influência e estratégias de crescimento para startups e PMEs. São abordados também tópicos como medição e análise de resultados de marketing digital, attribution modeling, customer lifetime value, e otimização de conversão. A metodologia combina teoria atualizada com aplicação prática através de workshops, análise de casos de sucesso de marcas portuguesas, e desenvolvimento de um plano de marketing digital completo para um projeto real, com feedback personalizado ao longo do processo.', 
   '2025-08-20', '2025-09-20', '2025-10-05', '2026-01-05', TRUE, 'Português', 45, 0, 'https://informati.com.br/wp-content/uploads/2024/09/Qual_a_diferenca_entre_Branding_e_Campanhas_de_Marketing_Digital_Capa.png', FALSE, TRUE),
   
(9, 1, 'WordPress Avançado para Empresas', 'Curso especializado em WordPress focado nas necessidades de negócios e empresas portuguesas que pretendem desenvolver e gerir sites profissionais, lojas online e plataformas de conteúdo. O programa vai além das funcionalidades básicas do WordPress, aprofundando tópicos avançados como instalação e configuração em ambiente profissional, personalização avançada de temas (child themes), desenvolvimento de plugins específicos, comércio eletrónico com WooCommerce, otimização de performance, segurança e backups. Os formandos aprenderão técnicas de desenvolvimento front-end e back-end específicas para WordPress, incluindo criação de custom post types, taxonomias personalizadas, campos personalizados com ACF, desenvolvimento de Gutenberg blocks, e integração com APIs externas. O curso aborda ainda SEO técnico para WordPress, adaptação à legislação portuguesa e europeia (RGPD, cookies, acessibilidade), multilinguismo, escalabilidade para sites de alto tráfego, e estratégias de manutenção e atualização. A metodologia é prática, com os formandos a desenvolverem um projeto completo do início ao fim, podendo utilizar casos reais das suas empresas. Inclui também módulos sobre deployment, staging environments e ferramentas de desenvolvimento colaborativo.', 
   '2025-08-25', '2025-09-25', '2025-10-10', '2026-01-10', TRUE, 'Português', 40, 0, 'https://freenocode.org/wp-content/uploads/2020/10/WordPress-web.jpg', TRUE, FALSE),
   
(9, 4, 'Machine Learning para Negócios', 'Curso prático de Machine Learning aplicado a problemas empresariais, desenhado para profissionais portugueses que pretendem utilizar IA para extrair valor de dados e otimizar processos de negócio. O programa adota uma abordagem acessível e orientada para resultados, não exigindo experiência prévia em programação avançada. Os formandos aprenderão os fundamentos teóricos do machine learning (aprendizagem supervisionada, não supervisionada e por reforço), enquanto desenvolvem competências práticas com ferramentas como Python, scikit-learn, e plataformas low-code/no-code como AutoML. O curso aborda casos de uso relevantes para empresas portuguesas: previsão de vendas, segmentação de clientes, análise de sentimento, sistemas de recomendação, deteção de fraude, otimização de preços, manutenção preditiva, e automação de processos. Para cada aplicação, são exploradas as etapas do processo: definição do problema de negócio, preparação de dados, seleção de algoritmos apropriados, treino e avaliação de modelos, interpretação de resultados, e implementação em ambiente de produção. O programa inclui discussões sobre ética em IA, viés algorítmico, privacidade de dados (RGPD), e gestão de mudança organizacional para adoção de soluções baseadas em ML. Os formandos desenvolvem um projeto final aplicado ao seu setor de atividade, com mentoria personalizada.', 
   '2025-09-01', '2025-10-01', '2025-10-15', '2026-01-15', TRUE, 'Português', 55, 0, 'https://www.flatworldsolutions.com/IT-services/images/benefits-machine-learning-business.jpg', FALSE, TRUE),
   
(9, 6, 'Gestão de Stress e Bem-estar no Trabalho', 'Formação abrangente sobre gestão de stress e promoção do bem-estar em contexto laboral, especialmente relevante para o mercado de trabalho português atual. O curso adota uma abordagem holística, combinando conhecimentos da psicologia, neurociência, medicina do trabalho e gestão organizacional. Os formandos começarão por compreender os mecanismos fisiológicos e psicológicos do stress, identificar fatores de risco pessoais e organizacionais, e reconhecer os sinais de alarme de stress crónico e burnout. O programa desenvolve competências práticas de gestão de stress, incluindo técnicas de respiração e relaxamento, mindfulness aplicado ao trabalho, gestão eficaz do tempo e energia, estabelecimento de limites saudáveis, e estratégias de desconexão digital. São abordados ainda temas como comunicação assertiva em situações de pressão, resolução construtiva de conflitos, e equilíbrio entre vida profissional e pessoal. Na dimensão organizacional, os formandos aprenderão a implementar e promover práticas de trabalho saudáveis, liderança promotora de bem-estar, e programas de saúde mental no local de trabalho em conformidade com a legislação portuguesa. A metodologia é experiencial e reflexiva, combinando exposição teórica com exercícios práticos, dinâmicas de grupo, estudos de caso, e desenvolvimento de um plano personalizado de gestão de stress e bem-estar.', 
   '2025-09-05', '2025-10-05', '2025-10-20', '2026-01-20', TRUE, 'Português', 25, 0, 'https://edenred.pt/wp-content/uploads/2023/02/Stress-no-trabalho.jpg', TRUE, FALSE),
   
(9, 7, 'Gestão e Compliance em Proteção de Dados', 'Curso especializado em gestão e conformidade (compliance) em proteção de dados pessoais, focado no Regulamento Geral de Proteção de Dados (RGPD) e na legislação portuguesa complementar. A formação foi desenhada para Data Protection Officers, juristas, profissionais de compliance, gestores e técnicos de IT que necessitam implementar e monitorizar práticas de conformidade em organizações portuguesas. O programa aborda em profundidade o enquadramento jurídico da proteção de dados em Portugal e na UE, os princípios fundamentais do RGPD, direitos dos titulares e obrigações dos responsáveis pelo tratamento e subcontratantes. Os formandos desenvolverão competências práticas para implementação de programas de compliance, incluindo mapeamento de tratamentos de dados, avaliações de impacto (DPIA), gestão de riscos, políticas e procedimentos internos, medidas técnicas e organizativas adequadas, e resposta a incidentes de segurança. O curso explora a interação com a autoridade de controlo portuguesa (CNPD), gestão de consentimentos e outras bases legais, transferências internacionais de dados após o Schrems II, e particularidades setoriais (saúde, finanças, recursos humanos, marketing). A metodologia combina exposição teórica com workshops práticos, análise de jurisprudência recente, resolução de casos práticos inspirados em situações reais do mercado português, e desenvolvimento de documentação essencial de compliance.', 
   '2025-09-10', '2025-10-10', '2025-10-25', '2026-01-25', TRUE, 'Português', 35, 0, 'https://lec.com.br/wp-content/uploads/2018/11/248702-protecao-de-dados-entenda-os-principais-pontos-da-nova-lei.jpg', FALSE, TRUE);

-- Inserir ASSINCRONO (incluindo os originais e os novos cursos assíncronos)
INSERT INTO ASSINCRONO (ID_CURSO_ASSINCRONO) VALUES
-- Cursos originais assíncronos
(1),  -- Desenvolvimento Web Responsivo
(3),  -- Java para Iniciantes
(5),  -- Administração SQL Server
(8),  -- Nutrição e Saúde

-- Novos cursos assíncronos
(9),  -- UI/UX Design Fundamentals
(11), -- Data Science com Python
(13), -- Power BI para Análise de Dados Empresariais
(15), -- Inglês para Profissionais de Turismo
(17), -- Desenvolvimento Mobile com Flutter
(19), -- WordPress Avançado para Empresas
(21); -- Gestão de Stress e Bem-estar no Trabalho

-- Inserir AULAS
INSERT INTO AULAS (ID_CURSO, DATA_AULA, NOME_AULA, CAMINHO_URL) VALUES
-- Curso 1: Desenvolvimento Web Responsivo
(1, '2023-03-15', 'Introdução ao HTML5', 'https://example.com/aulas/html_intro'),
(1, '2023-03-22', 'CSS3 Fundamentos', 'https://example.com/aulas/css_fundamentos'),
(1, '2023-03-29', 'Layout Responsivo', 'https://example.com/aulas/layout_responsivo'),
(1, '2023-04-05', 'Flexbox e Grid', 'https://example.com/aulas/flexbox_grid'),

-- Curso 2: JavaScript Avançado
(2, '2023-03-25', 'Fundamentos de JavaScript', 'https://example.com/aulas/js_fundamentos'),
(2, '2023-04-01', 'Funções Avançadas', 'https://example.com/aulas/js_funcoes'),
(2, '2023-04-08', 'Manipulação do DOM', 'https://example.com/aulas/js_dom'),
(2, '2023-04-15', 'Async/Await e Promises', 'https://example.com/aulas/js_async'),

-- Curso 3: Java para Iniciantes
(3, '2023-04-01', 'Introdução ao Java', 'https://example.com/aulas/java_intro'),
(3, '2023-04-08', 'Tipos de Dados e Operadores', 'https://example.com/aulas/java_tipos'),
(3, '2023-04-15', 'Orientação a Objetos', 'https://example.com/aulas/java_oop'),
(3, '2023-04-22', 'Coleções e Exceções', 'https://example.com/aulas/java_colecoes');

-- Inserir CONTEUDOS_PARTILHADO
INSERT INTO CONTEUDOS_PARTILHADO (ID_TOPICO, DATA_CRIACAO_CP) VALUES
(1, '2023-03-10'), -- HTML e CSS
(2, '2023-03-15'), -- JavaScript
(3, '2023-03-20'), -- Java
(7, '2023-03-25'), -- Metodologias Ágeis
(8, '2023-03-30'); -- Comunicação Eficaz

-- Inserir POST (com textos mais elaborados)
INSERT INTO POST (ID_UTILIZADOR, ID_CONTEUDOS_PARTILHADO, TEXTO_POST, CONTADOR_LIKES_POST, CONTADOR_COMENTARIOS) VALUES
(1, 1, 'Estou a desenvolver um website complexo que necessita de um layout responsivo com múltiplos níveis de navegação. Experimentei várias abordagens com media queries, mas estou a ter dificuldade em conseguir uma solução elegante para o Flexbox. Alguém pode recomendar recursos ou técnicas avançadas para implementar menus responsivos hierárquicos que funcionem bem em todos os dispositivos? Idealmente, procuro exemplos práticos e não apenas teoria. Agradeço qualquer ajuda ou orientação neste desafio!', 5, 2),

(3, 2, 'Estou a trabalhar num projeto que utiliza intensamente chamadas assíncronas e estou com dificuldades em compreender o comportamento das Promises em JavaScript, especialmente em casos de encadeamento complexo e tratamento de erros. Consigo implementar soluções básicas, mas quando preciso de lidar com múltiplas chamadas paralelas e sequenciais, acabo criando código difícil de manter. Como funcionam efetivamente as Promises e qual a melhor estratégia para organizar código assíncrono complexo? Já tentei usar async/await, mas ainda tenho dúvidas sobre as melhores práticas. Alguma recomendação de recursos ou padrões para aprofundar este conhecimento?', 8, 3),

(2, 4, 'Na minha empresa estamos a considerar transitar do método tradicional em cascata para metodologias ágeis, mas há divergências na equipa sobre qual framework adotar. Qual é efetivamente a principal diferença entre Scrum e Kanban em termos práticos? Interessa-nos particularmente entender como cada um se adapta a equipas pequenas com requisitos frequentemente alterados pelos clientes. Alguém tem experiência de implementação em contextos semelhantes e pode partilhar aprendizagens, desafios enfrentados e estratégias de sucesso? Agradeço especialmente exemplos concretos de adaptação destas metodologias a diferentes realidades organizacionais.', 12, 4),

(10, 3, 'Estou a começar um novo projeto utilizando Java 17 após alguns anos trabalhando principalmente com Python. Tenho acompanhado as atualizações da linguagem de forma superficial, mas gostaria de compreender em profundidade o que mudou. Quais são as principais novidades e melhorias introduzidas no Java 17 que realmente impactam o desenvolvimento quotidiano? Estou particularmente interessada em recursos que possam tornar o código mais conciso e expressivo, além de melhorias de performance relevantes. Há alguma funcionalidade que deva receber atenção especial durante a migração ou na estruturação do novo projeto?', 6, 2),

(12, 5, 'Vou fazer uma apresentação importante para a administração da empresa sobre um projeto complexo e tenho dificuldade em comunicar eficazmente informações técnicas para um público não técnico. Procuro dicas práticas para melhorar minhas habilidades de apresentação em público, especialmente no que diz respeito à simplificação de conceitos complexos sem perder o rigor. Como encontrar o equilíbrio entre detalhe técnico e clareza? Que estratégias utilizam para manter o público envolvido durante apresentações longas? Também apreciaria recomendações sobre estruturação de slides e gestão de nervosismo. A apresentação é crítica para a aprovação do orçamento do próximo ano!', 15, 5);

-- Inserir COMENTARIO
INSERT INTO COMENTARIO (ID_POST, ID_UTILIZADOR, TEXTO_COMENTARIO, CONTADOR_LIKES_COM) VALUES
-- Comentários para o post sobre HTML/Flexbox
(1, 5, 'Recomendo o site Flexbox Froggy, é um jogo que ensina os conceitos de forma prática. Também sugiro o CSS Grid Garden para entender a diferença. Para menus responsivos hierárquicos específicos, uma abordagem que funcionou bem nos meus projetos foi combinar media queries com Flexbox para diferentes breakpoints, definindo display:none para submenus em mobile e utilizando hover/focus para revelá-los quando necessário. O padrão "mobile-first" torna o código mais limpo.', 8),

(1, 13, 'O CSS-Tricks tem um guia completo sobre Flexbox que considero essencial: https://css-tricks.com/snippets/css/a-guide-to-flexbox/. Para menus complexos, recomendo implementar uma solução com JavaScript para controlar o estado de abertura/fechamento dos submenus em dispositivos tácteis, pois o hover não funciona adequadamente. Considere também usar o atributo aria-expanded para acessibilidade. Se precisar de exemplos concretos, posso partilhar algumas implementações que desenvolvi recentemente.', 12),

-- Comentários para o post sobre JavaScript Promises
(2, 5, 'Promises são objetos que representam conclusão ou falha de operações assíncronas. A sintaxe básica é: new Promise((resolve, reject) => {}). Para casos complexos, recomendo a abordagem de modularização, dividindo o código em funções menores e compondo-as. Promise.all() é excelente para operações paralelas, enquanto Promise.allSettled() é mais seguro quando precisas que todas as promessas sejam processadas independentemente de falhas. Para dependências sequenciais, o padrão de encadeamento .then() é mais legível do que aninhamentos.', 14),

(2, 1, 'Recomendo estudar também async/await, que torna o código mais limpo quando se trabalha com Promises. Esta sintaxe é especialmente útil para fluxos sequenciais complexos. Um padrão que uso frequentemente é criar funções assíncronas pequenas e composicionais, e depois combiná-las em funções de mais alto nível. Também vale a pena explorar bibliotecas como a Bluebird, que oferecem funcionalidades adicionais às Promises nativas. E não esqueças o tratamento de erros adequado com try/catch quando usares async/await.', 10),

(2, 13, 'Este artigo explica muito bem: https://javascript.info/promise-basics. Além disso, recomendo fortemente implementar um sistema robusto de tratamento de erros com .catch() ou try/catch para async/await. Para chamadas paralelas com dependências entre si, uma abordagem que funciona bem é usar Promise.all() para as chamadas independentes e então encadear com os resultados. Também é fundamental entender o conceito de microtasks queue para evitar comportamentos inesperados, especialmente em aplicações complexas com múltiplas operações assíncronas simultâneas.', 9),

-- Comentários para o post sobre Scrum vs Kanban
(3, 6, 'Scrum é mais estruturado com sprints definidos, enquanto Kanban é mais fluido e contínuo. Na prática, a principal diferença é que Scrum impõe timeboxes e cerimónias regulares (Daily, Planning, Review, Retrospective), o que traz previsibilidade e ritmo à equipa. Já o Kanban foca-se no fluxo contínuo e visualização do trabalho, limitando o WIP (Work in Progress) para identificar gargalos. Para equipas pequenas com requisitos voláteis, muitas vezes recomendo começar com Kanban pela simplicidade e menor sobrecarga processual, evoluindo para Scrumban conforme a maturidade aumenta.', 15),

(3, 14, 'Scrum tem papéis específicos como Scrum Master, Product Owner e o time, já Kanban não define papéis. Na nossa empresa, que tem equipas de 4-6 pessoas, começámos com Kanban e gradualmente adotámos algumas práticas do Scrum como as reuniões de planeamento quinzenais e retrospetivas, mantendo a visualização e limites de WIP do Kanban. Esta abordagem híbrida (Scrumban) tem funcionado muito bem para projetos com requisitos frequentemente alterados, pois mantém a estrutura necessária sem a rigidez excessiva, permitindo rápida adaptação às solicitações dos clientes.', 12),

(3, 8, 'Ambos são úteis, mas Kanban tende a ser mais simples de implementar inicialmente. Na minha experiência como gestora de projetos, o Kanban funciona melhor para equipas de suporte ou manutenção, onde as prioridades mudam constantemente. O Scrum é mais adequado para desenvolvimento de produtos com entregas incrementais. Um aspeto frequentemente negligenciado é a maturidade da equipa - Scrum requer maior disciplina e autogestão. Sugiro avaliar a cultura organizacional antes de decidir. Também é importante lembrar que as metodologias devem servir a equipa e não o contrário - personalize conforme necessário.', 11),

(3, 9, 'O importante é adaptar a metodologia à realidade da equipa e projeto. Como gestor, implementei ambas as abordagens em diferentes equipas. Para contextos de alta incerteza, como startups ou produtos inovadores, o Kanban oferece maior flexibilidade para pivotar rapidamente. Para produtos mais estabelecidos onde a previsibilidade é importante para stakeholders, o Scrum traz benefícios claros. Uma estratégia eficaz é começar com princípios básicos (visualização do trabalho, limitação de WIP, retrospetivas) e gradualmente adicionar práticas conforme a necessidade. Evite dogmatismo - procure o que realmente agrega valor à sua equipa específica.', 18),

-- Comentários para o post sobre Java 17
(4, 13, 'Java 17 trouxe sealed classes, melhorias em records, pattern matching para switch, entre outros recursos. Os records (introduzidos no Java 14 e finalizados no 16) são particularmente úteis para criar classes imutáveis de dados com menos código boilerplate, resultando em maior legibilidade. As sealed classes permitem restringir quais classes podem implementar uma interface ou estender uma classe, trazendo maior controle ao design da API. O pattern matching para switch (preview) torna o código mais expressivo e menos propenso a erros. Na migração, atenção especial às mudanças no SecurityManager e à remoção de APIs obsoletas.', 11),

(4, 3, 'Também houve melhorias significativas de performance e no garbage collector. O G1 GC recebeu vários ajustes para melhor desempenho e menor latência, enquanto o ZGC está mais maduro para uso em produção. Na parte de APIs, a nova API de pseudorandom number generators (PRNG) fornece implementações de alta qualidade e facilmente utilizáveis, e a adição de métodos úteis como Stream.toList() simplifica código comum. Ao migrar para Java 17, recomendo verificar dependências que possam estar usando APIs internas removidas (particularmente relevante se usar bibliotecas mais antigas) e tirar proveito das novas ferramentas de empacotamento como jpackage.', 7),

-- Comentários para o post sobre apresentações
(5, 6, 'Prepare-se bem, pratique bastante e conheça bem o público alvo. Para comunicar conceitos técnicos a não-técnicos, uso frequentemente a técnica da "pirâmide invertida" - comece com a conclusão/mensagem principal, depois apresente os pontos-chave, e só então entre em detalhes técnicos quando necessário. Analogias e metáforas do quotidiano são extremamente eficazes para traduzir conceitos complexos. Por exemplo, explique microserviços comparando-os a departamentos especializados numa empresa vs monolito como uma pequena empresa onde todos fazem tudo. Grave-se a ensaiar e reveja criticamente - muitas vezes falamos mais rápido e usamos jargão sem perceber.', 16),

(5, 8, 'Use slides simples com pouco texto e mais imagens. A regra dos 3 segundos é útil: se não for possível compreender um slide em 3 segundos, está demasiado complexo. Para temas técnicos, visualizações e diagramas são muito mais eficazes que texto. Considere usar a técnica de storytelling para estruturar a apresentação: contexto/problema (o desafio), complicação (tentativas anteriores/obstáculos), resolução (a solução proposta) e resultados (benefícios esperados, incluindo ROI). Para orçamentos, apresente primeiro o valor/retorno esperado antes dos custos, e sempre contextualize números (ex: "este investimento representa apenas 2% do orçamento anual mas trará 15% de eficiência").', 14),

(5, 2, 'Comece com uma história ou exemplo interessante para captar atenção. O cérebro humano está programado para prestar atenção a narrativas. Quando apresento conceitos técnicos para executivos, gosto de usar o formato "Antes-Depois-Ponte": mostre a situação atual com seus problemas, pinte um quadro do futuro desejado, e então explique como sua proposta é a ponte entre esses dois estados. Para questões orçamentais, foque nos problemas de negócio que está a resolver e não nas tecnologias. Quantifique benefícios sempre que possível, usando métricas que ressoem com a gestão (redução de custos, aumento de receita, mitigação de riscos, vantagem competitiva). Prepare-se para perguntas difíceis com slides de apoio.', 12);

-- Inserir NOTIFICACOES_COMENTARIOS_POST
INSERT INTO NOTIFICACOES_COMENTARIOS_POST (ID_COMENTARIO, ID_UTILIZADOR, DATA_HORA_NOTIFICACAOCP) VALUES
-- Notificações para o autor do post sobre HTML/Flexbox (ID_UTILIZADOR = 1)
(1, 1, '2025-05-15 10:12:43'), -- Comentário de José Pereira
(2, 1, '2025-05-15 14:22:18'), -- Comentário de Miguel Almeida

-- Notificações para o autor do post sobre JavaScript Promises (ID_UTILIZADOR = 3)
(3, 3, '2025-05-18 09:05:22'), -- Comentário de José Pereira
(4, 3, '2025-05-18 11:30:17'), -- Comentário de António Silva
(5, 3, '2025-05-18 16:45:09'), -- Comentário de Miguel Almeida

-- Notificações para o autor do post sobre Scrum vs Kanban (ID_UTILIZADOR = 2)
(6, 2, '2025-05-20 08:22:34'), -- Comentário de Sofia Martins
(7, 2, '2025-05-20 10:17:55'), -- Comentário de Teresa Pinto
(8, 2, '2025-05-20 15:33:40'), -- Comentário de Carla Rodrigues
(9, 2, '2025-05-21 09:11:27'), -- Comentário de Francisco Gomes

-- Notificações para o autor do post sobre Java 17 (ID_UTILIZADOR = 10)
(10, 10, '2025-05-25 14:05:18'), -- Comentário de Miguel Almeida
(11, 10, '2025-05-25 16:22:43'), -- Comentário de João Oliveira

-- Notificações para o autor do post sobre apresentações (ID_UTILIZADOR = 12)
(12, 12, '2025-05-27 09:43:21'), -- Comentário de Sofia Martins
(13, 12, '2025-05-27 11:18:52'), -- Comentário de Carla Rodrigues
(14, 12, '2025-05-27 14:56:33'); -- Comentário de Maria Santos

-- Inserir TIPO_FORMATO
INSERT INTO TIPO_FORMATO (FORMATO) VALUES
('Vídeo'),
('Documento PDF'),
('Apresentação PowerPoint'),
('Texto'),
('Imagem'),
('Áudio'),
('Infográfico'),
('Link Externo');

-- Inserir MATERIAL_APOIO
INSERT INTO MATERIAL_APOIO (ID_CURSO, ID_FORMATO, CONTEUDO) VALUES
(1, 2, 'https://example.com/materiais/guia_html_css.pdf'),
(1, 3, 'https://example.com/materiais/slides_desenvolvimento_web.pptx'),
(2, 2, 'https://example.com/materiais/manual_javascript.pdf'),
(2, 8, 'https://javascript.info/'),
(3, 2, 'https://example.com/materiais/introducao_java.pdf'),
(3, 3, 'https://example.com/materiais/slides_java_oop.pptx'),
(4, 2, 'https://example.com/materiais/python_data_analysis.pdf'),
(4, 8, 'https://pandas.pydata.org/docs/');

--Inserir CONTEUDOS
INSERT INTO CONTEUDOS (ID_AULA, ID_FORMATO, NOME_CONTEUDO, CONTEUDO, TEMPO_DURACAO) VALUES
-- Aula 1: Introdução ao HTML5
(1, 1, 'Vídeo: Estrutura Básica HTML', 'https://example.com/conteudos/video_html_estrutura.mp4', '00:45:00'),
(1, 2, 'Material de Apoio HTML', 'https://example.com/conteudos/html_material.pdf', NULL),
(1, 4, 'Exercícios Práticos', 'https://example.com/conteudos/html_exercicios.html', NULL),

-- Aula 2: CSS3 Fundamentos
(2, 1, 'Vídeo: Seletores CSS', 'https://example.com/conteudos/video_css_seletores.mp4', '00:50:00'),
(2, 2, 'Guia de Referência CSS', 'https://example.com/conteudos/css_referencia.pdf', NULL),
(2, 7, 'Infográfico: Propriedades CSS', 'https://example.com/conteudos/css_props_infografico.png', NULL),

-- Aula 5: Fundamentos de JavaScript
(5, 1, 'Vídeo: Sintaxe JavaScript', 'https://example.com/conteudos/video_js_sintaxe.mp4', '00:55:00'),
(5, 3, 'Slides da Aula', 'https://example.com/conteudos/js_slides.pptx', NULL),
(5, 8, 'MDN JavaScript Reference', 'https://developer.mozilla.org/pt-PT/docs/Web/JavaScript/Reference', NULL);

-- Inserir TIPO_DENUNCIA
INSERT INTO TIPO_DENUNCIA (TIPO_DENUNCIA) VALUES
('Conteúdo inapropriado'),
('Spam'),
('Assédio'),
('Informação incorreta'),
('Linguagem ofensiva'),
('Violação de direitos autorais'),
('Comportamento inadequado');

-- Inserir DENUNCIA
INSERT INTO DENUNCIA (ID_COMENTARIO, ID_UTILIZADOR, ID_POST, ID_TIPO_DENUNCIA) VALUES
-- Denúncias de posts
(NULL, 3, 2, 4),  -- João Oliveira denuncia post por informação incorreta
(NULL, 4, 3, 2),  -- Ana Costa denuncia post por spam
(NULL, 10, 5, 5), -- Marta Fernandes denuncia post por linguagem ofensiva

-- Denúncias de comentários
(5, 2, NULL, 4),  -- Maria Santos denuncia comentário por informação incorreta
(8, 11, NULL, 5), -- Paulo Lopes denuncia comentário por linguagem ofensiva
(14, 1, NULL, 2), -- António Silva denuncia comentário por spam
(3, 12, NULL, 7), -- Sara Ribeiro denuncia comentário por comportamento inadequado
(10, 14, NULL, 4); -- Teresa Pinto denuncia comentário por informação incorreta

-- Inserir FORMADORES (com descrições expandidas)
INSERT INTO FORMADORES (ID_FORMADOR, DESCRICAO_FORMADOR) VALUES
(5, 'Especialista em desenvolvimento web com mais de 10 anos de experiência no setor de tecnologia. Licenciado em Engenharia Informática pela Universidade do Porto e Mestre em Sistemas de Informação. Trabalhou em grandes empresas tecnológicas nacionais e internacionais, liderando equipas de desenvolvimento em projetos de elevada complexidade. Possui certificações em diversas tecnologias web e já formou mais de 500 profissionais ao longo da sua carreira. A sua abordagem pedagógica combina fundamentos teóricos sólidos com aplicações práticas e estudos de caso reais, preparando os formandos para os desafios do mercado de trabalho atual.'), -- José Pereira

(6, 'Especialista em gestão e liderança com formação avançada e vasta experiência internacional. Licenciada em Gestão pelo ISCTE e MBA pela INSEAD, com especialização em Comportamento Organizacional. Trabalhou como gestora executiva em empresas multinacionais em Portugal, França e Reino Unido, liderando processos de transformação organizacional e desenvolvimento de equipas de alto desempenho. É certificada em metodologias de coaching e mentoring, e autora de diversos artigos sobre liderança em revistas especializadas. A sua metodologia formativa privilegia a aprendizagem experiencial e a aplicação imediata dos conceitos teóricos, através de dinâmicas de grupo e simulações de situações reais do quotidiano empresarial.'), -- Sofia Martins

(7, 'Nutricionista com experiência em consultas e formação profissional há mais de 15 anos. Licenciado em Ciências da Nutrição pela Universidade do Porto e Doutorado em Nutrição Clínica. Possui especializações em Nutrição Desportiva e Comportamento Alimentar pela Universidade de Barcelona. Trabalhou em hospitais públicos e privados, desenvolvendo programas de educação alimentar e intervenções nutricionais personalizadas. É autor de dois livros sobre alimentação saudável e colaborador regular em revistas e programas de televisão sobre saúde e bem-estar. A sua abordagem pedagógica combina o rigor científico com estratégias práticas e realistas para a mudança de hábitos alimentares, adaptadas às necessidades e contextos individuais dos formandos.'), -- Rui Ferreira

(13, 'Formador em múltiplas áreas da tecnologia, especialista em programação e bases de dados com uma carreira que abrange mais de 12 anos no setor. Licenciado em Engenharia de Software e Mestre em Ciência de Dados, com certificações avançadas em diversas plataformas tecnológicas. Desenvolveu a sua carreira em empresas de consultoria e startups tecnológicas, onde participou no desenvolvimento de sistemas críticos para o setor financeiro e de telecomunicações. Paralelamente à atividade profissional, mantém uma forte ligação ao ensino, tendo lecionado em instituições de ensino superior e centros de formação profissional. A sua metodologia formativa caracteriza-se pela forte componente prática e pela capacidade de tornar conceitos complexos acessíveis a diferentes perfis de formandos, desde iniciantes até profissionais com experiência.'); -- Miguel Almeida

-- Inserir FORMANDOS
INSERT INTO FORMANDOS (ID_FORMANDO, PERCURSO_FORMATIVO) VALUES
(1, 'Desenvolvimento Web e Frontend'),
(2, 'Gestão e Liderança'),
(3, 'Programação e Base de Dados'),
(4, 'Frontend e UX/UI'),
(10, 'Marketing Digital e Design'),
(11, 'Saúde e Nutrição'),
(12, 'Liderança e Comunicação'),
(14, 'Gestão de Projetos'),
(15, 'Análise de Dados');

-- Inserir FAVORITOS
INSERT INTO FAVORITOS (ID_FORMANDO, ID_CURSO) VALUES
(1, 1),  -- António Silva favorita Desenvolvimento Web Responsivo
(1, 2),  -- António Silva favorita JavaScript Avançado
(1, 9),  -- António Silva favorita UI/UX Design Fundamentals
(2, 6),  -- Maria Santos favorita Gestão Ágil de Projetos
(2, 7),  -- Maria Santos favorita Liderança e Comunicação
(2, 10), -- Maria Santos favorita Marketing no Facebook e Instagram
(3, 3),  -- João Oliveira favorita Java para Iniciantes
(3, 5),  -- João Oliveira favorita Administração SQL Server
(3, 12), -- João Oliveira favorita React e Redux para Aplicações Web
(4, 2),  -- Ana Costa favorita JavaScript Avançado
(4, 11), -- Ana Costa favorita Data Science com Python
(10, 8), -- Marta Fernandes favorita Nutrição e Saúde
(10, 15),-- Marta Fernandes favorita Inglês para Profissionais de Turismo
(11, 8), -- Paulo Lopes favorita Nutrição e Saúde
(11, 14),-- Paulo Lopes favorita Nutrição Desportiva Avançada
(12, 7), -- Sara Ribeiro favorita Liderança e Comunicação
(12, 18),-- Sara Ribeiro favorita Francês Comercial e de Negócios
(14, 6), -- Teresa Pinto favorita Gestão Ágil de Projetos
(14, 20),-- Teresa Pinto favorita Marketing Estratégico e Branding Digital
(15, 4), -- Carlos Marques favorita Python para Análise de Dados
(15, 22);-- Carlos Marques favorita Machine Learning para Negócios

-- Inserir INSCRICOES
INSERT INTO INSCRICOES (ID_FORMANDO, ID_CURSO, DATA_INSCRICAO, STATUS_INSCRICAO) VALUES
(1, 1, '2023-02-15', 1), -- António Silva - Desenvolvimento Web Responsivo
(1, 2, '2023-02-20', 1), -- António Silva - JavaScript Avançado
(2, 6, '2023-03-20', 1), -- Maria Santos - Gestão Ágil de Projetos
(2, 7, '2023-03-25', 1), -- Maria Santos - Liderança e Comunicação
(3, 3, '2023-03-01', 1), -- João Oliveira - Java para Iniciantes
(3, 5, '2023-03-05', 1), -- João Oliveira - Administração SQL Server
(4, 2, '2023-02-25', 1), -- Ana Costa - JavaScript Avançado
(10, 8, '2023-04-05', 1), -- Marta Fernandes - Nutrição e Saúde
(11, 8, '2023-04-10', 1), -- Paulo Lopes - Nutrição e Saúde
(12, 7, '2023-03-30', 1), -- Sara Ribeiro - Liderança e Comunicação
(14, 6, '2023-03-15', 1), -- Teresa Pinto - Gestão Ágil de Projetos
(15, 4, '2023-03-10', 1); -- Carlos Marques - Python para Análise de Dados

-- Atualizar contador de formandos nos cursos
UPDATE CURSOS SET CONTADOR_FORMANDOS = (SELECT COUNT(*) FROM INSCRICOES WHERE INSCRICOES.ID_CURSO = CURSOS.ID_CURSO) WHERE ID_CURSO IN (1, 2, 3, 4, 5, 6, 7, 8);

-- Inserir NOTIFICACOES_CURSO
INSERT INTO NOTIFICACOES_CURSO (ID_UTILIZADOR, ID_CURSO, DATA_HORA_NOTIFICACAOCURSO) VALUES
-- Notificações de início iminente de curso
(1, 1, '2025-06-10 09:00:00'), -- Lembrete para António Silva sobre início do curso de Desenvolvimento Web Responsivo
(1, 2, '2025-06-20 09:00:00'), -- Lembrete para António Silva sobre início do curso de JavaScript Avançado
(2, 6, '2025-07-20 09:00:00'), -- Lembrete para Maria Santos sobre início do curso de Gestão Ágil de Projetos
(2, 7, '2025-07-25 09:00:00'), -- Lembrete para Maria Santos sobre início do curso de Liderança e Comunicação
(3, 3, '2025-06-25 09:00:00'), -- Lembrete para João Oliveira sobre início do curso de Java para Iniciantes
(4, 2, '2025-06-20 09:00:00'), -- Lembrete para Ana Costa sobre início do curso de JavaScript Avançado

-- Notificações de encerramento iminente de inscrições
(10, 8, '2025-07-15 09:00:00'), -- Aviso para Marta Fernandes sobre fim das inscrições do curso de Nutrição e Saúde
(11, 8, '2025-07-15 09:00:00'), -- Aviso para Paulo Lopes sobre fim das inscrições do curso de Nutrição e Saúde
(12, 7, '2025-07-10 09:00:00'), -- Aviso para Sara Ribeiro sobre fim das inscrições do curso de Liderança e Comunicação
(15, 4, '2025-06-15 09:00:00'), -- Aviso para Carlos Marques sobre fim das inscrições do curso de Python para Análise de Dados

-- Notificações de novos materiais adicionados aos cursos
(1, 1, '2025-06-25 14:30:00'), -- Notificação para António Silva sobre novo material em Desenvolvimento Web Responsivo
(3, 3, '2025-07-10 11:15:00'), -- Notificação para João Oliveira sobre novo material em Java para Iniciantes
(4, 2, '2025-07-05 16:45:00'), -- Notificação para Ana Costa sobre novo material em JavaScript Avançado
(15, 4, '2025-07-20 10:30:00'), -- Notificação para Carlos Marques sobre novo material em Python para Análise de Dados

-- Notificações de novas inscrições para os cursos recém-adicionados
(1, 9, '2025-07-15 09:30:00'), -- Confirmação de inscrição para António Silva em UI/UX Design Fundamentals
(2, 10, '2025-07-10 10:15:00'), -- Confirmação de inscrição para Maria Santos em Marketing no Facebook e Instagram
(3, 12, '2025-07-20 14:45:00'), -- Confirmação de inscrição para João Oliveira em React e Redux para Aplicações Web
(4, 11, '2025-07-25 11:30:00'), -- Confirmação de inscrição para Ana Costa em Data Science com Python

-- Lembretes de atividades pendentes
(1, 1, '2025-07-05 09:00:00'), -- Lembrete para António Silva sobre atividade pendente em Desenvolvimento Web Responsivo
(2, 6, '2025-08-10 09:00:00'), -- Lembrete para Maria Santos sobre atividade pendente em Gestão Ágil de Projetos
(3, 3, '2025-07-15 09:00:00'), -- Lembrete para João Oliveira sobre atividade pendente em Java para Iniciantes
(4, 2, '2025-07-10 09:00:00'), -- Lembrete para Ana Costa sobre atividade pendente em JavaScript Avançado

-- Notificações de alterações nos cursos
(10, 15, '2025-08-15 15:20:00'), -- Notificação para Marta Fernandes sobre alteração no curso de Inglês para Profissionais de Turismo
(11, 14, '2025-08-05 10:45:00'), -- Notificação para Paulo Lopes sobre alteração no curso de Nutrição Desportiva Avançada
(12, 18, '2025-08-20 14:30:00'), -- Notificação para Sara Ribeiro sobre alteração no curso de Francês Comercial e de Negócios
(14, 20, '2025-09-01 09:15:00'), -- Notificação para Teresa Pinto sobre alteração no curso de Marketing Estratégico e Branding Digital

-- Notificações de próximas aulas síncronas
(2, 6, '2025-08-05 09:00:00'), -- Lembrete para Maria Santos sobre próxima aula em Gestão Ágil de Projetos
(2, 7, '2025-08-15 09:00:00'), -- Lembrete para Maria Santos sobre próxima aula em Liderança e Comunicação
(4, 2, '2025-07-15 09:00:00'), -- Lembrete para Ana Costa sobre próxima aula em JavaScript Avançado
(15, 4, '2025-07-25 09:00:00'), -- Lembrete para Carlos Marques sobre próxima aula em Python para Análise de Dados

-- Notificações de avaliações disponíveis
(1, 1, '2025-08-15 14:00:00'), -- Notificação para António Silva sobre avaliação disponível em Desenvolvimento Web Responsivo
(3, 3, '2025-09-01 11:30:00'), -- Notificação para João Oliveira sobre avaliação disponível em Java para Iniciantes
(12, 7, '2025-09-15 10:45:00'), -- Notificação para Sara Ribeiro sobre avaliação disponível em Liderança e Comunicação
(15, 4, '2025-08-25 16:15:00'); -- Notificação para Carlos Marques sobre avaliação disponível em Python para Análise de Dados

-- Inserir OCORRENCIAS_EDICOES
INSERT INTO OCORRENCIAS_EDICOES (ID_CURSO, NR_OCORRENCIA, DATA_ULT_OCORRENCIA) VALUES
(1, 1, '2024-01-15'), -- Primeira edição do curso de Desenvolvimento Web Responsivo
(1, 2, '2024-06-15'), -- Segunda edição do curso de Desenvolvimento Web Responsivo
(1, 3, '2025-06-15'), -- Terceira edição (atual) do curso de Desenvolvimento Web Responsivo
(2, 1, '2024-01-25'), -- Primeira edição do curso de JavaScript Avançado
(2, 2, '2024-06-25'), -- Segunda edição do curso de JavaScript Avançado
(2, 3, '2025-06-25'), -- Terceira edição (atual) do curso de JavaScript Avançado
(3, 1, '2024-02-01'), -- Primeira edição do curso de Java para Iniciantes
(3, 2, '2025-07-01'), -- Segunda edição (atual) do curso de Java para Iniciantes
(4, 1, '2024-02-10'), -- Primeira edição do curso de Python para Análise de Dados
(4, 2, '2025-07-10'), -- Segunda edição (atual) do curso de Python para Análise de Dados
(5, 1, '2024-01-15'), -- Primeira edição do curso de Administração SQL Server
(5, 2, '2025-07-15'), -- Segunda edição (atual) do curso de Administração SQL Server
(6, 1, '2024-01-25'), -- Primeira edição do curso de Gestão Ágil de Projetos
(6, 2, '2025-07-25'), -- Segunda edição (atual) do curso de Gestão Ágil de Projetos
(7, 1, '2024-03-01'), -- Primeira edição do curso de Liderança e Comunicação
(7, 2, '2025-08-01'), -- Segunda edição (atual) do curso de Liderança e Comunicação
(8, 1, '2024-03-10'), -- Primeira edição do curso de Nutrição e Saúde
(8, 2, '2025-08-10'), -- Segunda edição (atual) do curso de Nutrição e Saúde
(9, 1, '2025-08-20'), -- Primeira edição (atual) do curso de UI/UX Design Fundamentals
(10, 1, '2025-08-15'), -- Primeira edição (atual) do curso de Marketing no Facebook e Instagram
(12, 1, '2025-08-25'); -- Primeira edição (atual) do curso de React e Redux

-- Inserir SINCRONO (incluindo os originais e os novos cursos síncronos)
INSERT INTO SINCRONO (ID_CURSO_SINCRONO, ID_FORMADOR, NUMERO_VAGAS) VALUES
-- Cursos originais síncronos
(2, 5, 25),  -- JavaScript Avançado - José Pereira
(4, 13, 30), -- Python para Análise de Dados - Miguel Almeida
(6, 6, 20),  -- Gestão Ágil de Projetos - Sofia Martins
(7, 6, 20),  -- Liderança e Comunicação - Sofia Martins

-- Novos cursos síncronos
(10, 5, 25), -- Marketing no Facebook e Instagram - José Pereira
(12, 13, 30), -- React e Redux para Aplicações Web - Miguel Almeida
(14, 7, 15), -- Nutrição Desportiva Avançada - Rui Ferreira
(16, 7, 20), -- SBV e Primeiros Socorros para Educadores - Rui Ferreira
(18, 5, 20), -- Francês Comercial e de Negócios - José Pereira
(20, 13, 25), -- Marketing Estratégico e Branding Digital - Miguel Almeida
(22, 6, 15), -- Machine Learning para Negócios - Sofia Martins
(23, 6, 18); -- Gestão e Compliance em Proteção de Dados - Sofia Martins

-- Inserir RESULTADOS (para cursos síncronos já finalizados)
INSERT INTO RESULTADOS (ID_FORMANDO, ID_CURSO_SINCRONO, RESUL) VALUES
(1, 2, 85.5), -- António Silva - JavaScript Avançado
(4, 2, 78.0), -- Ana Costa - JavaScript Avançado
(2, 6, 92.0), -- Maria Santos - Gestão Ágil de Projetos
(14, 6, 88.5), -- Teresa Pinto - Gestão Ágil de Projetos
(2, 7, 95.0), -- Maria Santos - Liderança e Comunicação
(12, 7, 82.5); -- Sara Ribeiro - Liderança e Comunicação

-- Inserir CONTEUDOS_FORUM
INSERT INTO CONTEUDOS_FORUM (ID_COMENTARIO, ID_POST, ID_FORMATO, CONTEUDO) VALUES
-- Conteúdos anexados a posts
(NULL, 1, 2, 'https://example.com/files/flexbox_samples.pdf'), -- PDF anexado ao post sobre Flexbox
(NULL, 1, 7, 'https://example.com/files/layout_comparison.png'), -- Imagem anexada ao post sobre Flexbox
(NULL, 2, 2, 'https://example.com/files/promises_cheatsheet.pdf'), -- PDF anexado ao post sobre Promises
(NULL, 2, 3, 'https://example.com/files/async_patterns.pptx'), -- Apresentação anexada ao post sobre Promises
(NULL, 3, 3, 'https://example.com/files/scrum_vs_kanban.pptx'), -- Apresentação anexada ao post sobre metodologias ágeis
(NULL, 4, 2, 'https://example.com/files/java17_features.pdf'), -- PDF anexado ao post sobre Java 17
(NULL, 5, 3, 'https://example.com/files/presentation_tips.pptx'), -- Apresentação anexada ao post sobre apresentações
(NULL, 4, 2, 'https://example.com/files/python_performance.pdf'), -- PDF anexado ao post sobre Python

-- Conteúdos anexados a comentários
(3, NULL, 6, 'https://example.com/files/promise_diagram.svg'), -- Diagrama SVG anexado ao comentário sobre Promises
(6, NULL, 7, 'https://example.com/files/scrum_board.jpg'), -- Imagem anexada ao comentário sobre Scrum
(8, NULL, 2, 'https://example.com/files/kanban_guide.pdf'), -- PDF anexado ao comentário sobre Kanban
(10, NULL, 2, 'https://example.com/files/java_migration.pdf'), -- PDF anexado ao comentário sobre Java
(12, NULL, 7, 'https://example.com/files/presentation_slide_example.png'), -- Imagem anexada ao comentário sobre apresentações
(14, NULL, 5, 'https://example.com/files/public_speaking.mp3'), -- Áudio anexado ao comentário sobre apresentações
(13, NULL, 7, 'https://example.com/files/python_performance_graph.png'), -- Imagem anexada ao comentário sobre Python
(12, NULL, 2, 'https://example.com/files/nutrition_cognitive_research.pdf'); -- PDF anexado ao comentário sobre nutrição

-- Inserir MODELO_CERTIFICADO
INSERT INTO MODELO_CERTIFICADO (ID_CURSO, CONTEUDO_TEMPLATE) VALUES
(1, '<html><head><style>body{font-family:Arial,sans-serif;margin:40px;} .certificado{border:3px solid #1a5276;padding:30px;text-align:center;} .titulo{color:#1a5276;font-size:36px;margin-bottom:30px;} .conteudo{font-size:18px;line-height:1.6;margin-bottom:40px;} .assinatura{display:flex;justify-content:space-around;margin-top:80px;} .assinatura div{width:200px;text-align:center;} .linha{border-top:1px solid #000;margin-bottom:10px;} .logos{margin-top:40px;display:flex;justify-content:space-between;}</style></head><body><div class="certificado"><div class="logos"><img src="[LOGO_EMPRESA]" width="150"><img src="[LOGO_CURSO]" width="150"></div><h1 class="titulo">Certificado de Conclusão</h1><div class="conteudo"><p>Certifica-se que <strong>[NOME]</strong> concluiu com aproveitamento o curso de <strong>Desenvolvimento Web Responsivo</strong>, com duração total de <strong>40 horas</strong>, realizado no período de 15 de junho a 15 de setembro de 2025.</p><p>Conteúdos programáticos: HTML5 semântico, CSS3 avançado, design responsivo, flexbox e grid, animações, otimização e performance, acessibilidade web.</p></div><div class="assinatura"><div><div class="linha"></div><p>Formador</p></div><div><div class="linha"></div><p>Direção Pedagógica</p></div></div><p style="margin-top:40px;font-size:14px;">Certificado emitido em [DATA_EMISSAO] - Código de Verificação: [CODIGO]</p></div></body></html>'),

(2, '<html><head><style>body{font-family:Arial,sans-serif;margin:40px;} .certificado{border:3px solid #1a5276;padding:30px;text-align:center;} .titulo{color:#1a5276;font-size:36px;margin-bottom:30px;} .conteudo{font-size:18px;line-height:1.6;margin-bottom:40px;} .assinatura{display:flex;justify-content:space-around;margin-top:80px;} .assinatura div{width:200px;text-align:center;} .linha{border-top:1px solid #000;margin-bottom:10px;} .logos{margin-top:40px;display:flex;justify-content:space-between;}</style></head><body><div class="certificado"><div class="logos"><img src="[LOGO_EMPRESA]" width="150"><img src="[LOGO_CURSO]" width="150"></div><h1 class="titulo">Certificado de Conclusão</h1><div class="conteudo"><p>Certifica-se que <strong>[NOME]</strong> concluiu com aproveitamento o curso de <strong>JavaScript Avançado</strong>, com duração total de <strong>45 horas</strong>, realizado no período de 25 de junho a 25 de setembro de 2025.</p><p>Conteúdos programáticos: ECMAScript moderno, manipulação avançada do DOM, padrões de design, programação funcional, APIs RESTful, SPA, ferramentas de desenvolvimento.</p></div><div class="assinatura"><div><div class="linha"></div><p>Formador</p></div><div><div class="linha"></div><p>Direção Pedagógica</p></div></div><p style="margin-top:40px;font-size:14px;">Certificado emitido em [DATA_EMISSAO] - Código de Verificação: [CODIGO]</p></div></body></html>'),

(3, '<html><head><style>body{font-family:Arial,sans-serif;margin:40px;} .certificado{border:3px solid #1a5276;padding:30px;text-align:center;} .titulo{color:#1a5276;font-size:36px;margin-bottom:30px;} .conteudo{font-size:18px;line-height:1.6;margin-bottom:40px;} .assinatura{display:flex;justify-content:space-around;margin-top:80px;} .assinatura div{width:200px;text-align:center;} .linha{border-top:1px solid #000;margin-bottom:10px;} .logos{margin-top:40px;display:flex;justify-content:space-between;}</style></head><body><div class="certificado"><div class="logos"><img src="[LOGO_EMPRESA]" width="150"><img src="[LOGO_CURSO]" width="150"></div><h1 class="titulo">Certificado de Conclusão</h1><div class="conteudo"><p>Certifica-se que <strong>[NOME]</strong> concluiu com aproveitamento o curso de <strong>Java para Iniciantes</strong>, com duração total de <strong>60 horas</strong>, realizado no período de 1 de julho a 1 de outubro de 2025.</p><p>Conteúdos programáticos: Fundamentos da linguagem Java, orientação a objetos, exceções, coleções, entrada/saída, threads, interfaces gráficas com JavaFX.</p></div><div class="assinatura"><div><div class="linha"></div><p>Formador</p></div><div><div class="linha"></div><p>Direção Pedagógica</p></div></div><p style="margin-top:40px;font-size:14px;">Certificado emitido em [DATA_EMISSAO] - Código de Verificação: [CODIGO]</p></div></body></html>'),

(4, '<html><head><style>body{font-family:Arial,sans-serif;margin:40px;} .certificado{border:3px solid #1a5276;padding:30px;text-align:center;} .titulo{color:#1a5276;font-size:36px;margin-bottom:30px;} .conteudo{font-size:18px;line-height:1.6;margin-bottom:40px;} .assinatura{display:flex;justify-content:space-around;margin-top:80px;} .assinatura div{width:200px;text-align:center;} .linha{border-top:1px solid #000;margin-bottom:10px;} .logos{margin-top:40px;display:flex;justify-content:space-between;}</style></head><body><div class="certificado"><div class="logos"><img src="[LOGO_EMPRESA]" width="150"><img src="[LOGO_CURSO]" width="150"></div><h1 class="titulo">Certificado de Conclusão</h1><div class="conteudo"><p>Certifica-se que <strong>[NOME]</strong> concluiu com aproveitamento o curso de <strong>Python para Análise de Dados</strong>, com duração total de <strong>50 horas</strong>, realizado no período de 10 de julho a 10 de outubro de 2025.</p><p>Conteúdos programáticos: Fundamentos de Python, Pandas, NumPy, Matplotlib, análise estatística, visualização de dados, manipulação de datasets, introdução a machine learning.</p></div><div class="assinatura"><div><div class="linha"></div><p>Formador</p></div><div><div class="linha"></div><p>Direção Pedagógica</p></div></div><p style="margin-top:40px;font-size:14px;">Certificado emitido em [DATA_EMISSAO] - Código de Verificação: [CODIGO]</p></div></body></html>');


-- Inserir CERTIFICADOS (certificados emitidos para edições anteriores dos cursos)
INSERT INTO CERTIFICADOS (ID_FORMANDO, ID_CURSO, CERTIFICADO_FINAL) VALUES
-- Certificados de edições anteriores
(1, 1, '<html><head><style>body{font-family:Arial,sans-serif;margin:40px;} .certificado{border:3px solid #1a5276;padding:30px;text-align:center;} .titulo{color:#1a5276;font-size:36px;margin-bottom:30px;} .conteudo{font-size:18px;line-height:1.6;margin-bottom:40px;} .assinatura{display:flex;justify-content:space-around;margin-top:80px;} .assinatura div{width:200px;text-align:center;} .linha{border-top:1px solid #000;margin-bottom:10px;} .logos{margin-top:40px;display:flex;justify-content:space-between;}</style></head><body><div class="certificado"><div class="logos"><img src="https://example.com/logos/empresa.png" width="150"><img src="https://example.com/logos/curso_web.png" width="150"></div><h1 class="titulo">Certificado de Conclusão</h1><div class="conteudo"><p>Certifica-se que <strong>António Silva</strong> concluiu com aproveitamento o curso de <strong>Desenvolvimento Web Responsivo</strong>, com duração total de <strong>40 horas</strong>, realizado no período de 15 de janeiro a 15 de abril de 2024.</p><p>Conteúdos programáticos: HTML5 semântico, CSS3 avançado, design responsivo, flexbox e grid, animações, otimização e performance, acessibilidade web.</p></div><div class="assinatura"><div><div class="linha"></div><p>José Pereira</p><p>Formador</p></div><div><div class="linha"></div><p>Carla Rodrigues</p><p>Direção Pedagógica</p></div></div><p style="margin-top:40px;font-size:14px;">Certificado emitido em 20/04/2024 - Código de Verificação: WD24-AS1-85F9</p></div></body></html>'),

(3, 3, '<html><head><style>body{font-family:Arial,sans-serif;margin:40px;} .certificado{border:3px solid #1a5276;padding:30px;text-align:center;} .titulo{color:#1a5276;font-size:36px;margin-bottom:30px;} .conteudo{font-size:18px;line-height:1.6;margin-bottom:40px;} .assinatura{display:flex;justify-content:space-around;margin-top:80px;} .assinatura div{width:200px;text-align:center;} .linha{border-top:1px solid #000;margin-bottom:10px;} .logos{margin-top:40px;display:flex;justify-content:space-between;}</style></head><body><div class="certificado"><div class="logos"><img src="https://example.com/logos/empresa.png" width="150"><img src="https://example.com/logos/curso_java.png" width="150"></div><h1 class="titulo">Certificado de Conclusão</h1><div class="conteudo"><p>Certifica-se que <strong>João Oliveira</strong> concluiu com aproveitamento o curso de <strong>Java para Iniciantes</strong>, com duração total de <strong>60 horas</strong>, realizado no período de 1 de fevereiro a 1 de maio de 2024.</p><p>Conteúdos programáticos: Fundamentos da linguagem Java, orientação a objetos, exceções, coleções, entrada/saída, threads, interfaces gráficas com JavaFX.</p></div><div class="assinatura"><div><div class="linha"></div><p>Rui Ferreira</p><p>Formador</p></div><div><div class="linha"></div><p>Francisco Gomes</p><p>Direção Pedagógica</p></div></div><p style="margin-top:40px;font-size:14px;">Certificado emitido em 10/05/2024 - Código de Verificação: JV24-JO3-92H7</p></div></body></html>'),

(4, 2, '<html><head><style>body{font-family:Arial,sans-serif;margin:40px;} .certificado{border:3px solid #1a5276;padding:30px;text-align:center;} .titulo{color:#1a5276;font-size:36px;margin-bottom:30px;} .conteudo{font-size:18px;line-height:1.6;margin-bottom:40px;} .assinatura{display:flex;justify-content:space-around;margin-top:80px;} .assinatura div{width:200px;text-align:center;} .linha{border-top:1px solid #000;margin-bottom:10px;} .logos{margin-top:40px;display:flex;justify-content:space-between;}</style></head><body><div class="certificado"><div class="logos"><img src="https://example.com/logos/empresa.png" width="150"><img src="https://example.com/logos/curso_js.png" width="150"></div><h1 class="titulo">Certificado de Conclusão</h1><div class="conteudo"><p>Certifica-se que <strong>Ana Costa</strong> concluiu com aproveitamento o curso de <strong>JavaScript Avançado</strong>, com duração total de <strong>45 horas</strong>, realizado no período de 25 de janeiro a 25 de abril de 2024.</p><p>Conteúdos programáticos: ECMAScript moderno, manipulação avançada do DOM, padrões de design, programação funcional, APIs RESTful, SPA, ferramentas de desenvolvimento.</p></div><div class="assinatura"><div><div class="linha"></div><p>José Pereira</p><p>Formador</p></div><div><div class="linha"></div><p>Carla Rodrigues</p><p>Direção Pedagógica</p></div></div><p style="margin-top:40px;font-size:14px;">Certificado emitido em 05/05/2024 - Código de Verificação: JS24-AC4-78D3</p></div></body></html>'),

(2, 7, '<html><head><style>body{font-family:Arial,sans-serif;margin:40px;} .certificado{border:3px solid #1a5276;padding:30px;text-align:center;} .titulo{color:#1a5276;font-size:36px;margin-bottom:30px;} .conteudo{font-size:18px;line-height:1.6;margin-bottom:40px;} .assinatura{display:flex;justify-content:space-around;margin-top:80px;} .assinatura div{width:200px;text-align:center;} .linha{border-top:1px solid #000;margin-bottom:10px;} .logos{margin-top:40px;display:flex;justify-content:space-between;}</style></head><body><div class="certificado"><div class="logos"><img src="https://example.com/logos/empresa.png" width="150"><img src="https://example.com/logos/curso_lideranca.png" width="150"></div><h1 class="titulo">Certificado de Conclusão</h1><div class="conteudo"><p>Certifica-se que <strong>Maria Santos</strong> concluiu com aproveitamento o curso de <strong>Liderança e Comunicação</strong>, com duração total de <strong>30 horas</strong>, realizado no período de 1 de março a 1 de junho de 2024.</p><p>Conteúdos programáticos: Estilos de liderança, inteligência emocional, comunicação assertiva, feedback construtivo, gestão de conflitos, apresentações de impacto, liderança em ambiente remoto.</p></div><div class="assinatura"><div><div class="linha"></div><p>Sofia Martins</p><p>Formadora</p></div><div><div class="linha"></div><p>Francisco Gomes</p><p>Direção Pedagógica</p></div></div><p style="margin-top:40px;font-size:14px;">Certificado emitido em 15/06/2024 - Código de Verificação: LD24-MS2-67C2</p></div></body></html>'),

(10, 8, '<html><head><style>body{font-family:Arial,sans-serif;margin:40px;} .certificado{border:3px solid #1a5276;padding:30px;text-align:center;} .titulo{color:#1a5276;font-size:36px;margin-bottom:30px;} .conteudo{font-size:18px;line-height:1.6;margin-bottom:40px;} .assinatura{display:flex;justify-content:space-around;margin-top:80px;} .assinatura div{width:200px;text-align:center;} .linha{border-top:1px solid #000;margin-bottom:10px;} .logos{margin-top:40px;display:flex;justify-content:space-between;}</style></head><body><div class="certificado"><div class="logos"><img src="https://example.com/logos/empresa.png" width="150"><img src="https://example.com/logos/curso_nutricao.png" width="150"></div><h1 class="titulo">Certificado de Conclusão</h1><div class="conteudo"><p>Certifica-se que <strong>Marta Fernandes</strong> concluiu com aproveitamento o curso de <strong>Nutrição e Saúde</strong>, com duração total de <strong>25 horas</strong>, realizado no período de 10 de março a 10 de junho de 2024.</p><p>Conteúdos programáticos: Princípios de nutrição, grupos alimentares, leitura de rótulos, planeamento de refeições, mitos nutricionais, alimentação para diferentes fases da vida, relação entre alimentação e saúde.</p></div><div class="assinatura"><div><div class="linha"></div><p>Rui Ferreira</p><p>Formador</p></div><div><div class="linha"></div><p>Carla Rodrigues</p><p>Direção Pedagógica</p></div></div><p style="margin-top:40px;font-size:14px;">Certificado emitido em 20/06/2024 - Código de Verificação: NT24-MF10-55B8</p></div></body></html>');

