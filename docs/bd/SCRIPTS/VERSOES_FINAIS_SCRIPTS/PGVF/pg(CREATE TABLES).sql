/* SQLINES DEMO *** ==============================================*/
/* SQLINES DEMO ***  Microsoft SQL Server 2017                    */
/* SQLINES DEMO ***  14/04/2025 14:50:27                          */
/* SQLINES DEMO *** ==============================================*/


DROP TABLE IF EXISTS CERTIFICADOS;
DROP TABLE IF EXISTS MODELO_CERTIFICADO;
DROP TABLE IF EXISTS CONTEUDOS_FORUM;
DROP TABLE IF EXISTS RESULTADOS;
DROP TABLE IF EXISTS SINCRONO;
DROP TABLE IF EXISTS OCORRENCIAS_EDICOES;
DROP TABLE IF EXISTS NOTIFICACOES_CURSO;
DROP TABLE IF EXISTS INSCRICOES;
DROP TABLE IF EXISTS FAVORITOS;
DROP TABLE IF EXISTS FORMANDOS;
DROP TABLE IF EXISTS FORMADORES;
DROP TABLE IF EXISTS DENUNCIA;
DROP TABLE IF EXISTS TIPO_DENUNCIA;
DROP TABLE IF EXISTS CONTEUDOS;
DROP TABLE IF EXISTS MATERIAL_APOIO;
DROP TABLE IF EXISTS TIPO_FORMATO;
DROP TABLE IF EXISTS NOTIFICACOES_COMENTARIOS_POST;
DROP TABLE IF EXISTS ASSINCRONO;
DROP TABLE IF EXISTS TWOFA;
DROP TABLE IF EXISTS S_S_O;
DROP TABLE IF EXISTS COMENTARIO;
DROP TABLE IF EXISTS POST;
DROP TABLE IF EXISTS CONTEUDOS_PARTILHADO;
DROP TABLE IF EXISTS AULAS;
DROP TABLE IF EXISTS CURSOS;
DROP TABLE IF EXISTS GESTOR_ADMINISTRADOR;
DROP TABLE IF EXISTS UTILIZADOR;
DROP TABLE IF EXISTS TOPICO;
DROP TABLE IF EXISTS AREA;
DROP TABLE IF EXISTS CATEGORIA;


create table CATEGORIA (
   ID_CATEGORIA         int generated always as identity(start with 1 increment by 1)    not null,
   NOME_CAT             varchar(50)          not null,
   constraint PK_CATEGORIA primary key (ID_CATEGORIA)
);

create table AREA (
   ID_AREA              int generated always as identity(start with 1 increment by 1)    not null,
   ID_CATEGORIA         int                  not null,
   NOME_AREA            varchar(50)          not null,
   constraint PK_AREA primary key (ID_AREA),
   constraint FK_AREA_ADQUIRE_CATEGORI foreign key (ID_CATEGORIA)
      references CATEGORIA (ID_CATEGORIA)
);

create table TOPICO (
   ID_TOPICO            int generated always as identity(start with 1 increment by 1)    not null,
   ID_AREA              int                  not null,
   NOME_TOPICO          varchar(50)          not null,
   DESCRICAO_TOP        varchar(1024)         not null,
   constraint PK_TOPICO primary key (ID_TOPICO),
   constraint FK_TOPICO_CONTAM_AREA foreign key (ID_AREA)
      references AREA (ID_AREA)
);

create table UTILIZADOR (
   ID_UTILIZADOR        int generated always as identity(start with 1 increment by 1)    not null,
   NOME_UTILIZADOR      varchar(1024)        not null,
   EMAIL                varchar(50)          not null,
   PASSWORD_UTIL        varchar(256)         not null,
   IMG_PERFIL			varchar(1024)		 	null,
   DATA_CRIACAO_UTILIZ  timestamp(3)             not null DEFAULT NOW(),
   TELEMOVEL            int                  	null,
   GENERO               int                  	null,
   MORADA               varchar(100)        	null,
   PAIS                 varchar(100)         	null,
   DATA_NASC            timestamp(3)             null,
   DATA_ATIV_UTILI      timestamp(3)             null,
   AUTEN2FAT            boolean                  null,
   ISFORMANDO			boolean					 null DEFAULT TRUE,
   ISFORMADOR			boolean					 null,
   ISGESTOR_ADMINISTRADOR boolean				 null,
   constraint PK_UTILIZADOR primary key (ID_UTILIZADOR)
);

create table S_S_O (
   ID_SSO               int generated always as identity(start with 1 increment by 1)    not null,
   ID_UTILIZADOR        int                  not null,
   EMAIL_SSO            varchar(50)          not null,
   TOKEN                varchar(2048)        not null,
   constraint PK_S_S_O primary key (ID_SSO),
   constraint FK_S_S_O_PODE_POSS_UTILIZAD foreign key (ID_UTILIZADOR)
      references UTILIZADOR (ID_UTILIZADOR)
);

create table TWOFA (
   ID_2FA               int generated always as identity(start with 1 increment by 1)	 not null,
   ID_UTILIZADOR        int                  not null,
   CODIGO               varchar(6)           not null,
   DATA_FA              timestamp(3)             not null DEFAULT NOW(),
   constraint PK_2FA primary key (ID_2FA),
   constraint FK_2FA_IRA_FAZER_UTILIZAD foreign key (ID_UTILIZADOR)
      references UTILIZADOR (ID_UTILIZADOR)
);

create table GESTOR_ADMINISTRADOR (
   ID_GESTOR_ADMINISTRADOR int			     not null,
   constraint PK_GESTOR_ADMINISTRADOR primary key (ID_GESTOR_ADMINISTRADOR),
   constraint FK_GESTOR_A_PODE_SER2_UTILIZAD foreign key (ID_GESTOR_ADMINISTRADOR)
      references UTILIZADOR (ID_UTILIZADOR)
);

create table CURSOS (
   ID_CURSO             int generated always as identity(start with 1 increment by 1)    not null,
   ID_GESTOR_ADMINISTRADOR int               not null,
   ID_TOPICO            int                  not null,
   NOME_CURSO           varchar(75)          not null,
   DESCRICAO_CURSO      varchar(2024)        not null,
   DATA_INICIO_INSCRICAO timestamp(3)			 not null,
   DATA_FIM_INSCRICAO	timestamp(3)			 not null,
   DATA_INICIO_CURSO    timestamp(3)             not null,
   DATA_FIM_CURSO       timestamp(3)             not null,
   ESTADO               boolean                  not null DEFAULT TRUE,
   IDIOMA               varchar(50)          not null,
   HORAS_CURSO          double precision                not null,
   CONTADOR_FORMANDOS   int                  not null,
   IMAGEM               varchar(1024)        not null,
   ISASSINCRONO			boolean					 null,
   ISSINCRONO			boolean					 null,
   constraint PK_CURSOS primary key (ID_CURSO),
   constraint FK_CURSOS_CONTA_TOPICO foreign key (ID_TOPICO)
      references TOPICO (ID_TOPICO),
   constraint FK_CURSOS_CRIA_GESTOR_A foreign key (ID_GESTOR_ADMINISTRADOR)
      references GESTOR_ADMINISTRADOR (ID_GESTOR_ADMINISTRADOR)
);

create table ASSINCRONO (
   ID_CURSO_ASSINCRONO  int					 not null,
   constraint PK_ASSINCRONO primary key (ID_CURSO_ASSINCRONO),
   constraint FK_ASSINCRO_PODEM_SER_CURSOS foreign key (ID_CURSO_ASSINCRONO)
      references CURSOS (ID_CURSO)
);

create table AULAS (
   ID_AULA              int generated always as identity(start with 1 increment by 1)    not null,
   ID_CURSO             int                  not null,
   DATA_AULA            timestamp(3)             not null,
   NOME_AULA            varchar(50)          not null,
   CAMINHO_URL			varchar(1024)		 null,
   constraint PK_AULAS primary key (ID_AULA),
   constraint FK_AULAS_E_CONSTIT_CURSOS foreign key (ID_CURSO)
      references CURSOS (ID_CURSO)
);

create table CONTEUDOS_PARTILHADO (
   ID_CONTEUDOS_PARTILHADO int generated always as identity(start with 1 increment by 1)    not null,
   ID_TOPICO            int                  not null,
   DATA_CRIACAO_CP      timestamp(3)             not null DEFAULT NOW(),
   constraint PK_CONTEUDOS_PARTILHADO primary key (ID_CONTEUDOS_PARTILHADO),
   constraint FK_CONTEUDO_DETEM_TOPICO foreign key (ID_TOPICO)
      references TOPICO (ID_TOPICO)
);

create table POST (
   ID_POST              int generated always as identity(start with 1 increment by 1)    not null,
   ID_UTILIZADOR        int                  not null,
   ID_CONTEUDOS_PARTILHADO int               not null,
   TEXTO_POST           varchar(1024)         not null,
   CONTADOR_LIKES_POST  int                  not null,
   CONTADOR_COMENTARIOS int                  not null,
   constraint PK_POST primary key (ID_POST),
   constraint FK_POST_VAI_TER_CONTEUDO foreign key (ID_CONTEUDOS_PARTILHADO)
      references CONTEUDOS_PARTILHADO (ID_CONTEUDOS_PARTILHADO),
   constraint FK_POST_ESCREVE_UTILIZAD foreign key (ID_UTILIZADOR)
      references UTILIZADOR (ID_UTILIZADOR)
);

create table COMENTARIO (
   ID_COMENTARIO		int generated always as identity(start with 1 increment by 1)    not null,
   ID_POST              int                  not null,
   ID_UTILIZADOR        int                  not null,
   TEXTO_COMENTARIO     varchar(1024)         not null,
   CONTADOR_LIKES_COM   int                  not null,
   constraint PK_COMENTARIO primary key (ID_COMENTARIO),
   constraint FK_COMENTAR_RELATIONS_POST foreign key (ID_POST)
      references POST (ID_POST),
   constraint FK_COMENTAR_ESCREVE__UTILIZAD foreign key (ID_UTILIZADOR)
      references UTILIZADOR (ID_UTILIZADOR)
);

create table NOTIFICACOES_COMENTARIOS_POST (
   ID_NOTIFICACAO_COMENTARIOS_POST int generated always as identity(start with 1 increment by 1)    not null,
   ID_COMENTARIO        int                  not null,
   ID_UTILIZADOR        int                  not null,
   DATA_HORA_NOTIFICACAOCP timestamp(3)          not null DEFAULT NOW(),
   constraint PK_NOTIFICACOES_COMENTARIOS_POST primary key (ID_NOTIFICACAO_COMENTARIOS_POST),
   constraint FK_NOTIFICA_ENGLOBA_UTILIZAD foreign key (ID_UTILIZADOR)
      references UTILIZADOR (ID_UTILIZADOR),
   constraint FK_NOTIFICA_PODE_TER_COM foreign key (ID_COMENTARIO)
      references COMENTARIO (ID_COMENTARIO)
);

create table TIPO_FORMATO (
   ID_FORMATO           int generated always as identity(start with 1 increment by 1)    not null,
   FORMATO              varchar(200)         not null,
   constraint PK_TIPO_FORMATO primary key (ID_FORMATO)
);

create table MATERIAL_APOIO (
   ID_MATERIAL_APOIO  int generated always as identity(start with 1 increment by 1)		 not null,
   ID_CURSO             int                  not null,
   ID_FORMATO           int                  not null,
   CONTEUDO             varchar(1024)        not null,
   constraint PK_MATERIAL_APOIO primary key (ID_MATERIAL_APOIO),
   constraint FK_MATERIAL_APOIO_REUNE_TIPO_FOR foreign key (ID_FORMATO)
      references TIPO_FORMATO (ID_FORMATO),
   constraint FK_MATERIAL_PODEM_SER_CURSOS foreign key (ID_CURSO)
      references CURSOS (ID_CURSO)
);

create table CONTEUDOS (
   ID_CONTEUDO          int generated always as identity(start with 1 increment by 1)    not null,
   ID_AULA              int                  not null,
   ID_FORMATO           int                  not null,
   NOME_CONTEUDO		VARCHAR(255)		 not null,
   CONTEUDO             varchar(200)         not null,
   TEMPO_DURACAO		time(6)				 null,
   constraint PK_CONTEUDO primary key (ID_CONTEUDO),
   constraint FK_CONTEUDO_TEM_DISPO_AULAS foreign key (ID_AULA)
      references AULAS (ID_AULA),
   constraint FK_CONTEUDO_REUNE_TIPO_FORMATOS foreign key (ID_FORMATO)
      references TIPO_FORMATO (ID_FORMATO)
);

create table TIPO_DENUNCIA (
   ID_TIPO_DENUNCIA     int generated always as identity(start with 1 increment by 1)    not null,
   TIPO_DENUNCIA        varchar(100)         not null,
   constraint PK_TIPO_DENUNCIA primary key (ID_TIPO_DENUNCIA)
);

create table DENUNCIA (
   ID_DENUNCIA          int generated always as identity(start with 1 increment by 1)    not null,
   ID_COMENTARIO        int                  null,
   ID_UTILIZADOR        int                  not null,
   ID_POST              int                  null,
   ID_TIPO_DENUNCIA     int                  not null,
   constraint PK_DENUNCIA primary key (ID_DENUNCIA),
   constraint FK_DENUNCIA_REALIZA_UTILIZAD foreign key (ID_UTILIZADOR)
      references UTILIZADOR (ID_UTILIZADOR),
   constraint FK_DENUNCIA_POSSUIR_TIPO_DEN foreign key (ID_TIPO_DENUNCIA)
      references TIPO_DENUNCIA (ID_TIPO_DENUNCIA),
   constraint FK_DENUNCIA_RELATIONS_POST foreign key (ID_POST)
      references POST (ID_POST),
   constraint FK_DENUNCIA_PERTENCE_COMENTAR foreign key (ID_COMENTARIO)
      references COMENTARIO (ID_COMENTARIO)
);

create table FORMADORES (
   ID_FORMADOR          int				     not null,
   DESCRICAO_FORMADOR   varchar(1024)         null,
   constraint PK_FORMADORES primary key (ID_FORMADOR),
   constraint FK_FORMADOR_PODE_SER3_UTILIZAD foreign key (ID_FORMADOR)
      references UTILIZADOR (ID_UTILIZADOR)
);

create table FORMANDOS (
   ID_FORMANDO          int			     not null,
   PERCURSO_FORMATIVO   varchar(100)		 null,
   constraint PK_FORMANDOS primary key (ID_FORMANDO),
   constraint FK_FORMANDO_PODE_SER_UTILIZAD foreign key (ID_FORMANDO)
      references UTILIZADOR (ID_UTILIZADOR)
);

create table FAVORITOS (
   ID_FAVORITO         int generated always as identity(start with 1 increment by 1) not null,
   ID_FORMANDO          int			     not null,
   ID_CURSO	            int			     not null,
   constraint PK_FAVORITOS primary key (ID_FAVORITO),
   constraint FK_FAVORITOS_PODE_TER_FORMANDO foreign key (ID_FORMANDO)
      references UTILIZADOR (ID_UTILIZADOR),
   constraint FK_FAVORITOS_PODE_TER_CURSO foreign key (ID_CURSO)
      references CURSOS (ID_CURSO)
);

create table INSCRICOES (
   ID_INSCRICAO         int generated always as identity(start with 1 increment by 1)    not null,
   ID_FORMANDO          int                  not null,
   ID_CURSO             int                  not null,
   DATA_INSCRICAO       timestamp(3)             not null DEFAULT NOW(),
   STATUS_INSCRICAO     int                  not null DEFAULT 1,
   constraint PK_INSCRICOES primary key (ID_INSCRICAO),
   constraint FK_INSCRICO_DETERMINA_CURSOS foreign key (ID_CURSO)
      references CURSOS (ID_CURSO),
   constraint FK_INSCRICO_REALIZAM_FORMANDO foreign key (ID_FORMANDO)
      references FORMANDOS (ID_FORMANDO)
);

create table NOTIFICACOES_CURSO (
   ID_NOTIFICACAO_CURSOS int generated always as identity(start with 1 increment by 1)    not null,
   ID_UTILIZADOR        int                  not null,
   ID_CURSO             int                  not null,
   DATA_HORA_NOTIFICACAOCURSO timestamp(3)       not null DEFAULT NOW(),
   constraint PK_NOTIFICACOES_CURSO primary key (ID_NOTIFICACAO_CURSOS),
   constraint FK_NOTIFICA_VAI_RECEB_UTILIZAD foreign key (ID_UTILIZADOR)
      references UTILIZADOR (ID_UTILIZADOR),
   constraint FK_NOTIFICA_TERA_CURSOS foreign key (ID_CURSO)
      references CURSOS (ID_CURSO)
);

create table OCORRENCIAS_EDICOES (
   ID_CURSO             int                  not null,
   NR_OCORRENCIA        int                  not null,
   DATA_ULT_OCORRENCIA  TIMESTAMP(3)             NOT NULL,
   constraint PK_OCORRENCIAS_EDICOES primary key (ID_CURSO, NR_OCORRENCIA),
   constraint FK_OCORRENC_CONTEM_VA_CURSOS foreign key (ID_CURSO)
      references CURSOS (ID_CURSO)
);

create table SINCRONO (
   ID_CURSO_SINCRONO    int				     not null,
   ID_FORMADOR          int                  not null,
   NUMERO_VAGAS         int                  null,
   constraint PK_SINCRONO primary key (ID_CURSO_SINCRONO),
   constraint FK_SINCRONO_LECIONAM_FORMADOR foreign key (ID_FORMADOR)
      references FORMADORES (ID_FORMADOR),
   constraint FK_SINCRONO_PODEM_SER_CURSOS foreign key (ID_CURSO_SINCRONO)
      references CURSOS (ID_CURSO)
);

create table RESULTADOS (
   ID_RESUL             int generated always as identity(start with 1 increment by 1)    not null,
   ID_FORMANDO          int                  not null,
   ID_CURSO_SINCRONO    int                  not null,
   RESUL                double precision                not null,
   constraint PK_RESULTADOS primary key (ID_RESUL),
   constraint FK_RESULTAD_VAI_POSSU_SINCRONO foreign key (ID_CURSO_SINCRONO)
      references SINCRONO (ID_CURSO_SINCRONO),
   constraint FK_RESULTAD_CLASSIFIC_FORMANDO foreign key (ID_FORMANDO)
      references FORMANDOS (ID_FORMANDO)
);

create table CONTEUDOS_FORUM (
   ID_CONTEUDOS_FORUM   int generated always as identity(start with 1 increment by 1)    not null,
   ID_COMENTARIO        int                  null,
   ID_POST				int					 null,
   ID_FORMATO           int                  not null,
   CONTEUDO             varchar(1024)        not null,
   constraint PK_CONTEUDOS_FORUM primary key (ID_CONTEUDOS_FORUM),
   constraint FK_CONTEUDO_REUNE_POST foreign key (ID_POST)
      references POST (ID_POST),
   constraint FK_CONTEUDO_REUNE_COMENTARIO foreign key (ID_COMENTARIO)
      references COMENTARIO (ID_COMENTARIO),
   constraint FK_CONTEUDO_FORUM_REUNE_TIPO_FOR foreign key (ID_FORMATO)
      references TIPO_FORMATO (ID_FORMATO)
);

create table MODELO_CERTIFICADO (
   ID_MODELO_CERTIFICADO int generated always as identity(start with 1 increment by 1) not null,
   ID_CURSO              int not null,
   CONTEUDO_TEMPLATE     text not null,
   constraint PK_MODELO_CERTIFICADO primary key (ID_MODELO_CERTIFICADO),
   constraint FK_MODELO_CERTIFICADO_CURSO foreign key (ID_CURSO)
      references CURSOS(ID_CURSO)
);

create table CERTIFICADOS (
   ID_CERTIFICADO       int generated always as identity(start with 1 increment by 1) not null,
   ID_FORMANDO          int              not null,
   ID_CURSO             int              not null,
   CERTIFICADO_FINAL    text             not null,
   constraint PK_CERTIFICADOS primary key (ID_CERTIFICADO),
   constraint FK_FORMANDO_REUNE_VARIOS_CERTIFICADOS foreign key (ID_FORMANDO)
      references FORMANDOS (ID_FORMANDO),
   constraint FK_CURSO_TEM_DISPO_CERTIFICADOS foreign key (ID_CURSO)
      references CURSOS(ID_CURSO)
);
