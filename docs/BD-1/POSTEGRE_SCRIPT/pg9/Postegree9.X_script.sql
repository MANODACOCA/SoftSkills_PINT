/*==============================================================*/
/* DBMS name:      PostgreSQL 9.x                               */
/* Created on:     05/05/2025 19:38:37                          */
/*==============================================================*/


drop table "2FA";

drop table AREA;

drop table ASSINCRONO;

drop table AULAS;

drop table AVALIACOES;

drop table CATEGORIA;

drop table COMENTARIO;

drop table CONTEUDOS;

drop table CONTEUDOS_PARTILHADO;

drop table CURSOS;

drop table DENUNCIA;

drop table FORMADORES;

drop table FORMANDOS;

drop table GESTOR_ADMINISTRADOR;

drop table INSCRICOES;

drop table NORIFICACOES_CURSO;

drop table NOTIFICACOES_POST;

drop table OCORRENCIAS_EDICOES;

drop table POST;

drop table RESULTADOS;

drop table SINCRONO;

drop table S_S_O;

drop table TIPO_DENUNCIA;

drop table TIPO_FORMATO;

drop table TOPICO;

drop table UTILIZADOR;

/*==============================================================*/
/* Table: "2FA"                                                 */
/*==============================================================*/
create table "2FA" (
   ID_2FA               INT4                 not null,
   ID_UTILIZADOR        INT4                 not null,
   CODIGO               VARCHAR(6)           null,
   DATA_FA              DATE                 null,
   constraint PK_2FA primary key (ID_2FA)
);

/*==============================================================*/
/* Table: AREA                                                  */
/*==============================================================*/
create table AREA (
   ID_AREA              INT4                 not null,
   ID_CATEGORIA         INT4                 not null,
   NOME_AREA            VARCHAR(50)          null,
   DESCRICAO_AR         VARCHAR(100)         null,
   constraint PK_AREA primary key (ID_AREA)
);

/*==============================================================*/
/* Table: ASSINCRONO                                            */
/*==============================================================*/
create table ASSINCRONO (
   ID_CURSO             INT4                 not null,
   ID_CURSO_ASSINCRONO  INT4                 not null,
   ID_TOPICO            INT4                 null,
   ID_GESTOR_ADMINISTRADOR INT4                 null,
   ID_CATEGORIA         INT4                 null,
   ID_AREA              INT4                 null,
   NOME_CURSO           VARCHAR(30)          null,
   DESCRICAO_CURSO      VARCHAR(30)          null,
   NUMERO_VAGAS         INT4                 null,
   DATA_INICIO_CURSO    DATE                 null,
   DATA_FIM_CURSO       DATE                 null,
   TIPO_CURSO           INT4                 null,
   ESTADO               INT4                 null,
   IDIOMA               TEXT                 null,
   HORAS_CURSO          FLOAT8               null,
   CONTADOR_FORMANDOS   INT4                 null,
   IMAGEM               VARCHAR(200)         null,
   constraint PK_ASSINCRONO primary key (ID_CURSO, ID_CURSO_ASSINCRONO)
);

/*==============================================================*/
/* Table: AULAS                                                 */
/*==============================================================*/
create table AULAS (
   ID_AULA              INT4                 not null,
   ID_CURSO             INT4                 not null,
   DATA_AULA            DATE                 null,
   NOME_AULA            VARCHAR(50)          null,
   constraint PK_AULAS primary key (ID_AULA)
);

/*==============================================================*/
/* Table: AVALIACOES                                            */
/*==============================================================*/
create table AVALIACOES (
   ID_AVALIACAO         INT4                 not null,
   ID_POST              INT4                 not null,
   ID_UTILIZADOR        INT4                 not null,
   AVALIACAO            BOOL                 null,
   constraint PK_AVALIACOES primary key (ID_AVALIACAO)
);

/*==============================================================*/
/* Table: CATEGORIA                                             */
/*==============================================================*/
create table CATEGORIA (
   ID_CATEGORIA         INT4                 not null,
   NOME_CAT             VARCHAR(50)          null,
   DESCRICAO_CAT        VARCHAR(100)         null,
   constraint PK_CATEGORIA primary key (ID_CATEGORIA)
);

/*==============================================================*/
/* Table: COMENTARIO                                            */
/*==============================================================*/
create table COMENTARIO (
   ID_COMENTARIO4       INT4                 not null,
   ID_POST              INT4                 not null,
   ID_UTILIZADOR        INT4                 not null,
   ID_AVALIACAO         INT4                 null,
   TEXTO_COMENTARIO     VARCHAR(500)         null,
   CONTADOR_LIKES_COM   INT4                 null,
   constraint PK_COMENTARIO primary key (ID_COMENTARIO4)
);

/*==============================================================*/
/* Table: CONTEUDOS                                             */
/*==============================================================*/
create table CONTEUDOS (
   ID_CONTEUDO          INT4                 not null,
   ID_AULA              INT4                 not null,
   ID_FORMATO           INT4                 not null,
   CONTEUDO             TEXT                 null,
   constraint PK_CONTEUDOS primary key (ID_CONTEUDO)
);

/*==============================================================*/
/* Table: CONTEUDOS_PARTILHADO                                  */
/*==============================================================*/
create table CONTEUDOS_PARTILHADO (
   ID_AREA_CONHECIMENTO INT4                 not null,
   ID_AREA              INT4                 not null,
   ID_TOPICO            INT4                 not null,
   ID_CATEGORIA         INT4                 not null,
   DESCRICAO_CP         TEXT                 null,
   DATA_CRIACAO_CP      DATE                 null,
   constraint PK_CONTEUDOS_PARTILHADO primary key (ID_AREA_CONHECIMENTO)
);

/*==============================================================*/
/* Table: CURSOS                                                */
/*==============================================================*/
create table CURSOS (
   ID_CURSO             INT4                 not null,
   ID_TOPICO            INT4                 not null,
   ID_UTILIZADOR        INT4                 not null,
   ID_GESTOR_ADMINISTRADOR INT4                 not null,
   ID_CATEGORIA         INT4                 not null,
   ID_AREA              INT4                 not null,
   NOME_CURSO           VARCHAR(30)          null,
   DESCRICAO_CURSO      VARCHAR(30)          null,
   NUMERO_VAGAS         INT4                 null,
   DATA_INICIO_CURSO    DATE                 null,
   DATA_FIM_CURSO       DATE                 null,
   TIPO_CURSO           INT4                 null,
   ESTADO               INT4                 null,
   IDIOMA               TEXT                 null,
   HORAS_CURSO          FLOAT8               null,
   CONTADOR_FORMANDOS   INT4                 null,
   IMAGEM               VARCHAR(200)         null,
   constraint PK_CURSOS primary key (ID_CURSO)
);

/*==============================================================*/
/* Table: DENUNCIA                                              */
/*==============================================================*/
create table DENUNCIA (
   ID_DENUNCIA          INT4                 not null,
   ID_COMENTARIO4       INT4                 not null,
   ID_UTILIZADOR        INT4                 not null,
   ID_POST              INT4                 not null,
   ID_TIPO_DENUNCIA     INT4                 not null,
   constraint PK_DENUNCIA primary key (ID_DENUNCIA)
);

/*==============================================================*/
/* Table: FORMADORES                                            */
/*==============================================================*/
create table FORMADORES (
   ID_UTILIZADOR        INT4                 not null,
   ID_FORMADOR          INT4                 not null,
   NOME_UTILIZADOR      VARCHAR(1024)        null,
   PASSWORD             VARCHAR(16)          null,
   DATA_CRIACAO_UTILIZ  DATE                 null,
   TELEMOVEL            INT4                 null,
   GENERO               INT4                 null,
   MORADA               TEXT                 null,
   PAIS                 TEXT                 null,
   DATA_NASC            DATE                 null,
   EMAIL                VARCHAR(50)          null,
   DATA_ATIV_UTILI      DATE                 null,
   AUTEN2FAT            BOOL                 null,
   ESPECIALIDADES       TEXT                 null,
   EXPERIENCIA          TEXT                 null,
   constraint PK_FORMADORES primary key (ID_UTILIZADOR, ID_FORMADOR)
);

/*==============================================================*/
/* Table: FORMANDOS                                             */
/*==============================================================*/
create table FORMANDOS (
   ID_UTILIZADOR        INT4                 not null,
   ID_FORMANDO          INT4                 not null,
   NOME_UTILIZADOR      VARCHAR(1024)        null,
   PASSWORD             VARCHAR(16)          null,
   DATA_CRIACAO_UTILIZ  DATE                 null,
   TELEMOVEL            INT4                 null,
   GENERO               INT4                 null,
   MORADA               TEXT                 null,
   PAIS                 TEXT                 null,
   DATA_NASC            DATE                 null,
   EMAIL                VARCHAR(50)          null,
   DATA_ATIV_UTILI      DATE                 null,
   AUTEN2FAT            BOOL                 null,
   PERCURSO_FORMATIVO   TEXT                 null,
   constraint PK_FORMANDOS primary key (ID_UTILIZADOR, ID_FORMANDO)
);

/*==============================================================*/
/* Table: GESTOR_ADMINISTRADOR                                  */
/*==============================================================*/
create table GESTOR_ADMINISTRADOR (
   ID_UTILIZADOR        INT4                 not null,
   ID_GESTOR_ADMINISTRADOR INT4                 not null,
   NOME_UTILIZADOR      VARCHAR(1024)        null,
   PASSWORD             VARCHAR(16)          null,
   DATA_CRIACAO_UTILIZ  DATE                 null,
   TELEMOVEL            INT4                 null,
   GENERO               INT4                 null,
   MORADA               TEXT                 null,
   PAIS                 TEXT                 null,
   DATA_NASC            DATE                 null,
   EMAIL                VARCHAR(50)          null,
   DATA_ATIV_UTILI      DATE                 null,
   AUTEN2FAT            BOOL                 null,
   constraint PK_GESTOR_ADMINISTRADOR primary key (ID_UTILIZADOR, ID_GESTOR_ADMINISTRADOR)
);

/*==============================================================*/
/* Table: INSCRICOES                                            */
/*==============================================================*/
create table INSCRICOES (
   ID_INSCRICAO         INT4                 not null,
   ID_UTILIZADOR        INT4                 not null,
   ID_FORMANDO          INT4                 not null,
   ID_CURSO             INT4                 not null,
   DATA_LIMITE          DATE                 null,
   DATA_INICIO_INSC     DATE                 null,
   STATUS_INSCRICAO     INT4                 null,
   constraint PK_INSCRICOES primary key (ID_INSCRICAO)
);

/*==============================================================*/
/* Table: NORIFICACOES_CURSO                                    */
/*==============================================================*/
create table NORIFICACOES_CURSO (
   ID_NOTIFICACAO_CURSOS INT4                 not null,
   ID_UTILIZADOR        INT4                 null,
   ID_CURSO             INT4                 not null,
   DATA_HORA_NOTIFICACAOCURSO DATE                 null,
   constraint PK_NORIFICACOES_CURSO primary key (ID_NOTIFICACAO_CURSOS)
);

/*==============================================================*/
/* Table: NOTIFICACOES_POST                                     */
/*==============================================================*/
create table NOTIFICACOES_POST (
   ID_NOTIFICACAO_POST  INT4                 not null,
   ID_CURSO             INT4                 not null,
   ID_POST              INT4                 not null,
   ID_UTILIZADOR        INT4                 not null,
   DATA_HORA_NOTIFICACAOCP DATE                 null,
   constraint PK_NOTIFICACOES_POST primary key (ID_NOTIFICACAO_POST)
);

/*==============================================================*/
/* Table: OCORRENCIAS_EDICOES                                   */
/*==============================================================*/
create table OCORRENCIAS_EDICOES (
   NR_OCORRENCIA        INT4                 not null,
   ID_CURSO             INT4                 null,
   constraint PK_OCORRENCIAS_EDICOES primary key (NR_OCORRENCIA)
);

/*==============================================================*/
/* Table: POST                                                  */
/*==============================================================*/
create table POST (
   ID_POST              INT4                 not null,
   ID_UTILIZADOR        INT4                 not null,
   ID_AREA_CONHECIMENTO INT4                 not null,
   TEXTO_POST           VARCHAR(100)         null,
   CONTADOR_LIKES_POST  INT4                 null,
   CONTADOR_COMENTARIOS INT4                 null,
   constraint PK_POST primary key (ID_POST)
);

/*==============================================================*/
/* Table: RESULTADOS                                            */
/*==============================================================*/
create table RESULTADOS (
   ID_RESUL             INT4                 not null,
   ID_UTILIZADOR        INT4                 null,
   ID_FORMANDO          INT4                 null,
   ID_CURSO             INT4                 null,
   ID_CURSO_SINCRONO    INT4                 null,
   RESUL                FLOAT8               null,
   constraint PK_RESULTADOS primary key (ID_RESUL)
);

/*==============================================================*/
/* Table: SINCRONO                                              */
/*==============================================================*/
create table SINCRONO (
   ID_CURSO             INT4                 not null,
   ID_CURSO_SINCRONO    INT4                 not null,
   ID_UTILIZADOR        INT4                 not null,
   ID_FORMADOR          INT4                 not null,
   ID_TOPICO            INT4                 null,
   ID_GESTOR_ADMINISTRADOR INT4                 null,
   ID_CATEGORIA         INT4                 null,
   ID_AREA              INT4                 null,
   NOME_CURSO           VARCHAR(30)          null,
   DESCRICAO_CURSO      VARCHAR(30)          null,
   NUMERO_VAGAS         INT4                 null,
   DATA_INICIO_CURSO    DATE                 null,
   DATA_FIM_CURSO       DATE                 null,
   TIPO_CURSO           INT4                 null,
   ESTADO               INT4                 null,
   IDIOMA               TEXT                 null,
   HORAS_CURSO          FLOAT8               null,
   CONTADOR_FORMANDOS   INT4                 null,
   IMAGEM               VARCHAR(200)         null,
   N_MAX_FORM           INT4                 null,
   constraint PK_SINCRONO primary key (ID_CURSO, ID_CURSO_SINCRONO)
);

/*==============================================================*/
/* Table: S_S_O                                                 */
/*==============================================================*/
create table S_S_O (
   ID_SSO               INT4                 not null,
   ID_UTILIZADOR        INT4                 not null,
   EMAIL_SSO            VARCHAR(50)          null,
   TOKEN                VARCHAR(2048)        null,
   constraint PK_S_S_O primary key (ID_SSO)
);

/*==============================================================*/
/* Table: TIPO_DENUNCIA                                         */
/*==============================================================*/
create table TIPO_DENUNCIA (
   ID_TIPO_DENUNCIA     INT4                 not null,
   TIPO_DENUNCIA        TEXT                 null,
   constraint PK_TIPO_DENUNCIA primary key (ID_TIPO_DENUNCIA)
);

/*==============================================================*/
/* Table: TIPO_FORMATO                                          */
/*==============================================================*/
create table TIPO_FORMATO (
   ID_FORMATO           INT4                 not null,
   FORMATO              VARCHAR(200)         null,
   constraint PK_TIPO_FORMATO primary key (ID_FORMATO)
);

/*==============================================================*/
/* Table: TOPICO                                                */
/*==============================================================*/
create table TOPICO (
   ID_TOPICO            INT4                 not null,
   ID_AREA              INT4                 not null,
   NOME_TOPICO          VARCHAR(50)          null,
   DESCRICAO_TOP        VARCHAR(100)         null,
   constraint PK_TOPICO primary key (ID_TOPICO)
);

/*==============================================================*/
/* Table: UTILIZADOR                                            */
/*==============================================================*/
create table UTILIZADOR (
   ID_UTILIZADOR        INT4                 not null,
   NOME_UTILIZADOR      VARCHAR(1024)        null,
   PASSWORD             VARCHAR(16)          null,
   DATA_CRIACAO_UTILIZ  DATE                 null,
   TELEMOVEL            INT4                 null,
   GENERO               INT4                 null,
   MORADA               TEXT                 null,
   PAIS                 TEXT                 null,
   DATA_NASC            DATE                 null,
   EMAIL                VARCHAR(50)          null,
   DATA_ATIV_UTILI      DATE                 null,
   AUTEN2FAT            BOOL                 null,
   constraint PK_UTILIZADOR primary key (ID_UTILIZADOR)
);

