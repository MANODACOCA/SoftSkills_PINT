/*==============================================================*/
/* DBMS name:      Microsoft SQL Server 2017                    */
/* Created on:     14/04/2025 14:50:27                          */
/*==============================================================*/
if exists (select 1
            from  sysobjects
           where  id = object_id('CERTIFICADOS')
            and   type = 'U')
   drop table CERTIFICADOS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MODELO_CERTIFICADO')
            and   type = 'U')
   drop table MODELO_CERTIFICADO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CONTEUDOS_FORUM')
            and   type = 'U')
   drop table CONTEUDOS_FORUM
go

if exists (select 1
            from  sysobjects
           where  id = object_id('RESULTADOS')
            and   type = 'U')
   drop table RESULTADOS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('SINCRONO')
            and   type = 'U')
   drop table SINCRONO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('OCORRENCIAS_EDICOES')
            and   type = 'U')
   drop table OCORRENCIAS_EDICOES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NOTIFICACOES_CURSO')
            and   type = 'U')
   drop table NOTIFICACOES_CURSO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('INSCRICOES')
            and   type = 'U')
   drop table INSCRICOES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('FAVORITOS')
            and   type = 'U')
   drop table FAVORITOS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('FORMANDOS')
            and   type = 'U')
   drop table FORMANDOS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('FORMADORES')
            and   type = 'U')
   drop table FORMADORES
go

if exists (select 1
            from  sysobjects
           where  id = object_id('DENUNCIA')
            and   type = 'U')
   drop table DENUNCIA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TIPO_DENUNCIA')
            and   type = 'U')
   drop table TIPO_DENUNCIA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CONTEUDOS')
            and   type = 'U')
   drop table CONTEUDOS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('MATERIAL_APOIO')
            and   type = 'U')
   drop table MATERIAL_APOIO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TIPO_FORMATO')
            and   type = 'U')
   drop table TIPO_FORMATO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('NOTIFICACOES_COMENTARIOS_POST')
            and   type = 'U')
   drop table NOTIFICACOES_COMENTARIOS_POST
go

if exists (select 1
            from  sysobjects
           where  id = object_id('ASSINCRONO')
            and   type = 'U')
   drop table ASSINCRONO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TWOFA')
            and   type = 'U')
   drop table TWOFA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('S_S_O')
            and   type = 'U')
   drop table S_S_O
go

if exists (select 1
            from  sysobjects
           where  id = object_id('COMENTARIO')
            and   type = 'U')
   drop table COMENTARIO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('POST')
            and   type = 'U')
   drop table POST
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CONTEUDOS_PARTILHADO')
            and   type = 'U')
   drop table CONTEUDOS_PARTILHADO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('AULAS')
            and   type = 'U')
   drop table AULAS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CURSOS')
            and   type = 'U')
   drop table CURSOS
go

if exists (select 1
            from  sysobjects
           where  id = object_id('GESTOR_ADMINISTRADOR')
            and   type = 'U')
   drop table GESTOR_ADMINISTRADOR
go

if exists (select 1
            from  sysobjects
           where  id = object_id('UTILIZADOR')
            and   type = 'U')
   drop table UTILIZADOR
go

if exists (select 1
            from  sysobjects
           where  id = object_id('TOPICO')
            and   type = 'U')
   drop table TOPICO
go

if exists (select 1
            from  sysobjects
           where  id = object_id('AREA')
            and   type = 'U')
   drop table AREA
go

if exists (select 1
            from  sysobjects
           where  id = object_id('CATEGORIA')
            and   type = 'U')
   drop table CATEGORIA
go



/*==============================================================*/
/* Table: CATEGORIA                                             */
/*==============================================================*/
create table CATEGORIA (
   ID_CATEGORIA         int identity(1,1)    not null,
   NOME_CAT             varchar(50)          not null,
   constraint PK_CATEGORIA primary key (ID_CATEGORIA)
)
go


/*==============================================================*/
/* Table: AREA                                                  */
/*==============================================================*/
create table AREA (
   ID_AREA              int identity(1,1)    not null,
   ID_CATEGORIA         int                  not null,
   NOME_AREA            varchar(50)          not null,
   constraint PK_AREA primary key (ID_AREA),
   constraint FK_AREA_ADQUIRE_CATEGORI foreign key (ID_CATEGORIA)
      references CATEGORIA (ID_CATEGORIA)
)
go

/*==============================================================*/
/* Table: TOPICO                                                */
/*==============================================================*/
create table TOPICO (
   ID_TOPICO            int identity(1,1)    not null,
   ID_AREA              int                  not null,
   NOME_TOPICO          varchar(50)          not null,
   DESCRICAO_TOP        varchar(1024)         not null,
   constraint PK_TOPICO primary key (ID_TOPICO),
   constraint FK_TOPICO_CONTAM_AREA foreign key (ID_AREA)
      references AREA (ID_AREA)
)
go

/*==============================================================*/
/* Table: UTILIZADOR                                            */
/*==============================================================*/
create table UTILIZADOR (
   ID_UTILIZADOR        int identity(1,1)    not null,
   NOME_UTILIZADOR      varchar(1024)        not null,
   EMAIL                varchar(50)          not null,
   PASSWORD_UTIL        varchar(256)         not null,
   IMG_PERFIL			varchar(1024)		 not null,
   DATA_CRIACAO_UTILIZ  datetime             not null DEFAULT GETDATE(),
   TELEMOVEL            int                  null,
   GENERO               int                  not null,
   MORADA               varchar(100)         not null,
   PAIS                 varchar(100)         not null,
   DATA_NASC            datetime             not null,
   DATA_ATIV_UTILI      datetime             null,
   AUTEN2FAT            bit                  null,
   ISFORMANDO			bit					 null DEFAULT 1,
   ISFORMADOR			bit					 null,
   ISGESTOR_ADMINISTRADOR bit				 null,
   constraint PK_UTILIZADOR primary key (ID_UTILIZADOR)
)
go

/*==============================================================*/
/* Table: S_S_O                                                 */
/*==============================================================*/
create table S_S_O (
   ID_SSO               int identity(1,1)    not null,
   ID_UTILIZADOR        int                  not null,
   EMAIL_SSO            varchar(50)          not null,
   TOKEN                varchar(2048)        not null,
   constraint PK_S_S_O primary key (ID_SSO),
   constraint FK_S_S_O_PODE_POSS_UTILIZAD foreign key (ID_UTILIZADOR)
      references UTILIZADOR (ID_UTILIZADOR)
)
go


/*==============================================================*/
/* Table: TWOFA                                                 */
/*==============================================================*/
create table TWOFA (
   ID_2FA               int identity(1,1)	 not null,
   ID_UTILIZADOR        int                  not null,
   CODIGO               varchar(6)           not null,
   DATA_FA              datetime             not null DEFAULT GETDATE(),
   constraint PK_2FA primary key (ID_2FA),
   constraint FK_2FA_IRA_FAZER_UTILIZAD foreign key (ID_UTILIZADOR)
      references UTILIZADOR (ID_UTILIZADOR)
)
go

/*==============================================================*/
/* Table: GESTOR_ADMINISTRADOR                                  */
/*==============================================================*/
create table GESTOR_ADMINISTRADOR (
   ID_GESTOR_ADMINISTRADOR int			     not null,
   constraint PK_GESTOR_ADMINISTRADOR primary key (ID_GESTOR_ADMINISTRADOR),
   constraint FK_GESTOR_A_PODE_SER2_UTILIZAD foreign key (ID_GESTOR_ADMINISTRADOR)
      references UTILIZADOR (ID_UTILIZADOR)
)
go

/*==============================================================*/
/* Table: CURSOS                                                */
/*==============================================================*/
create table CURSOS (
   ID_CURSO             int identity(1,1)    not null,
   ID_GESTOR_ADMINISTRADOR int               not null,
   ID_TOPICO            int                  not null,
   NOME_CURSO           varchar(75)          not null,
   DESCRICAO_CURSO      varchar(2024)        not null,
   DATA_INICIO_INSCRICAO datetime			 not null,
   DATA_FIM_INSCRICAO	datetime			 not null,
   DATA_INICIO_CURSO    datetime             not null,
   DATA_FIM_CURSO       datetime             not null,
   ESTADO               bit                  not null DEFAULT 1,
   IDIOMA               varchar(50)          not null,
   HORAS_CURSO          float                not null,
   CONTADOR_FORMANDOS   int                  not null,
   IMAGEM               varchar(1024)        not null,
   ISASSINCRONO			bit					 null,
   ISSINCRONO			bit					 null,
   constraint PK_CURSOS primary key (ID_CURSO),
   constraint FK_CURSOS_CONTA_TOPICO foreign key (ID_TOPICO)
      references TOPICO (ID_TOPICO),
   constraint FK_CURSOS_CRIA_GESTOR_A foreign key (ID_GESTOR_ADMINISTRADOR)
      references GESTOR_ADMINISTRADOR (ID_GESTOR_ADMINISTRADOR)
)
go

/*==============================================================*/
/* Table: ASSINCRONO                                            */
/*==============================================================*/
create table ASSINCRONO (
   ID_CURSO_ASSINCRONO  int					 not null,
   constraint PK_ASSINCRONO primary key (ID_CURSO_ASSINCRONO),
   constraint FK_ASSINCRO_PODEM_SER_CURSOS foreign key (ID_CURSO_ASSINCRONO)
      references CURSOS (ID_CURSO)
)
go

/*==============================================================*/
/* Table: AULAS                                                 */
/*==============================================================*/
create table AULAS (
   ID_AULA              int identity(1,1)    not null,
   ID_CURSO             int                  not null,
   DATA_AULA            datetime             not null,
   NOME_AULA            varchar(50)          not null,
   CAMINHO_URL			varchar(1024)		 null,
   constraint PK_AULAS primary key (ID_AULA),
   constraint FK_AULAS_E_CONSTIT_CURSOS foreign key (ID_CURSO)
      references CURSOS (ID_CURSO)
)
go

/*==============================================================*/
/* Table: CONTEUDOS_PARTILHADO                                  */
/*==============================================================*/
create table CONTEUDOS_PARTILHADO (
   ID_CONTEUDOS_PARTILHADO int identity(1,1)    not null,
   ID_TOPICO            int                  not null,
   DATA_CRIACAO_CP      datetime             not null DEFAULT GETDATE(),
   constraint PK_CONTEUDOS_PARTILHADO primary key (ID_CONTEUDOS_PARTILHADO),
   constraint FK_CONTEUDO_DETEM_TOPICO foreign key (ID_TOPICO)
      references TOPICO (ID_TOPICO)
)
go

/*==============================================================*/
/* Table: POST                                                  */
/*==============================================================*/
create table POST (
   ID_POST              int identity(1,1)    not null,
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
)
go

/*==============================================================*/
/* Table: COMENTARIO                                            */
/*==============================================================*/
create table COMENTARIO (
   ID_COMENTARIO		int identity(1,1)    not null,
   ID_POST              int                  not null,
   ID_UTILIZADOR        int                  not null,
   TEXTO_COMENTARIO     varchar(1024)         not null,
   CONTADOR_LIKES_COM   int                  not null,
   constraint PK_COMENTARIO primary key (ID_COMENTARIO),
   constraint FK_COMENTAR_RELATIONS_POST foreign key (ID_POST)
      references POST (ID_POST),
   constraint FK_COMENTAR_ESCREVE__UTILIZAD foreign key (ID_UTILIZADOR)
      references UTILIZADOR (ID_UTILIZADOR)
)
go

/*==============================================================*/
/* Table: NOTIFICACOES_COMENTARIOS_POST                         */
/*==============================================================*/
create table NOTIFICACOES_COMENTARIOS_POST (
   ID_NOTIFICACAO_COMENTARIOS_POST int identity(1,1)    not null,
   ID_COMENTARIO        int                  not null,
   ID_UTILIZADOR        int                  not null,
   DATA_HORA_NOTIFICACAOCP datetime          not null DEFAULT GETDATE(),
   constraint PK_NOTIFICACOES_COMENTARIOS_POST primary key (ID_NOTIFICACAO_COMENTARIOS_POST),
   constraint FK_NOTIFICA_ENGLOBA_UTILIZAD foreign key (ID_UTILIZADOR)
      references UTILIZADOR (ID_UTILIZADOR),
   constraint FK_NOTIFICA_PODE_TER_COM foreign key (ID_COMENTARIO)
      references COMENTARIO (ID_COMENTARIO)
)
go

/*==============================================================*/
/* Table: TIPO_FORMATO                                          */
/*==============================================================*/
create table TIPO_FORMATO (
   ID_FORMATO           int identity(1,1)    not null,
   FORMATO              varchar(200)         not null,
   constraint PK_TIPO_FORMATO primary key (ID_FORMATO)
)
go

/*==============================================================*/
/* Table: MATERIAL_APOIO                                        */
/*==============================================================*/
create table MATERIAL_APOIO (
   ID_MATERIAL_APOIO  int identity(1,1)		 not null,
   ID_CURSO             int                  not null,
   ID_FORMATO           int                  not null,
   CONTEUDO             varchar(1024)        not null,
   constraint PK_MATERIAL_APOIO primary key (ID_MATERIAL_APOIO),
   constraint FK_MATERIAL_APOIO_REUNE_TIPO_FOR foreign key (ID_FORMATO)
      references TIPO_FORMATO (ID_FORMATO),
   constraint FK_MATERIAL_PODEM_SER_CURSOS foreign key (ID_CURSO)
      references CURSOS (ID_CURSO)
)
go

/*==============================================================*/
/* Table: CONTEUDOS                                             */
/*==============================================================*/
create table CONTEUDOS (
   ID_CONTEUDO          int identity(1,1)    not null,
   ID_AULA              int                  not null,
   ID_FORMATO           int                  not null,
   NOME_CONTEUDO		VARCHAR(255)		 not null,
   CONTEUDO             varchar(200)         not null,
   TEMPO_DURACAO		time				 null,
   constraint PK_CONTEUDO primary key (ID_CONTEUDO),
   constraint FK_CONTEUDO_TEM_DISPO_AULAS foreign key (ID_AULA)
      references AULAS (ID_AULA),
   constraint FK_CONTEUDO_REUNE_TIPO_FORMATOS foreign key (ID_FORMATO)
      references TIPO_FORMATO (ID_FORMATO)
)
go

/*==============================================================*/
/* Table: TIPO_DENUNCIA                                         */
/*==============================================================*/
create table TIPO_DENUNCIA (
   ID_TIPO_DENUNCIA     int identity(1,1)    not null,
   TIPO_DENUNCIA        varchar(100)         not null,
   constraint PK_TIPO_DENUNCIA primary key (ID_TIPO_DENUNCIA)
)
go

/*==============================================================*/
/* Table: DENUNCIA                                              */
/*==============================================================*/
create table DENUNCIA (
   ID_DENUNCIA          int identity(1,1)    not null,
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
)
go

/*==============================================================*/
/* Table: FORMADORES                                            */
/*==============================================================*/
create table FORMADORES (
   ID_FORMADOR          int				     not null,
   DESCRICAO_FORMADOR   varchar(1024)         null,
   constraint PK_FORMADORES primary key (ID_FORMADOR),
   constraint FK_FORMADOR_PODE_SER3_UTILIZAD foreign key (ID_FORMADOR)
      references UTILIZADOR (ID_UTILIZADOR)
)
go

/*==============================================================*/
/* Table: FORMANDOS                                             */
/*==============================================================*/
create table FORMANDOS (
   ID_FORMANDO          int			     not null,
   PERCURSO_FORMATIVO   varchar(100)		 null,
   constraint PK_FORMANDOS primary key (ID_FORMANDO),
   constraint FK_FORMANDO_PODE_SER_UTILIZAD foreign key (ID_FORMANDO)
      references UTILIZADOR (ID_UTILIZADOR)
)
go

/*==============================================================*/
/* Table: FAVORITOS                                             */
/*==============================================================*/
create table FAVORITOS (
   ID_FAVORITO         int identity(1,1) not null,
   ID_FORMANDO          int			     not null,
   ID_CURSO	            int			     not null,
   constraint PK_FAVORITOS primary key (ID_FAVORITO),
   constraint FK_FAVORITOS_PODE_TER_FORMANDO foreign key (ID_FORMANDO)
      references UTILIZADOR (ID_UTILIZADOR),
   constraint FK_FAVORITOS_PODE_TER_CURSO foreign key (ID_CURSO)
      references CURSOS (ID_CURSO)
)
go

/*==============================================================*/
/* Table: INSCRICOES                                            */
/*==============================================================*/
create table INSCRICOES (
   ID_INSCRICAO         int identity(1,1)    not null,
   ID_FORMANDO          int                  not null,
   ID_CURSO             int                  not null,
   DATA_INSCRICAO       datetime             not null DEFAULT GETDATE(),
   STATUS_INSCRICAO     int                  not null DEFAULT 1,
   constraint PK_INSCRICOES primary key (ID_INSCRICAO),
   constraint FK_INSCRICO_DETERMINA_CURSOS foreign key (ID_CURSO)
      references CURSOS (ID_CURSO),
   constraint FK_INSCRICO_REALIZAM_FORMANDO foreign key (ID_FORMANDO)
      references FORMANDOS (ID_FORMANDO)
)
go

/*==============================================================*/
/* Table: NOTIFICACOES_CURSO                                    */
/*==============================================================*/
create table NOTIFICACOES_CURSO (
   ID_NOTIFICACAO_CURSOS int identity(1,1)    not null,
   ID_UTILIZADOR        int                  not null,
   ID_CURSO             int                  not null,
   DATA_HORA_NOTIFICACAOCURSO datetime       not null DEFAULT GETDATE(),
   constraint PK_NOTIFICACOES_CURSO primary key (ID_NOTIFICACAO_CURSOS),
   constraint FK_NOTIFICA_VAI_RECEB_UTILIZAD foreign key (ID_UTILIZADOR)
      references UTILIZADOR (ID_UTILIZADOR),
   constraint FK_NOTIFICA_TERA_CURSOS foreign key (ID_CURSO)
      references CURSOS (ID_CURSO)
)
go

/*==============================================================*/
/* Table: OCORRENCIAS_EDICOES                                   */
/*==============================================================*/
create table OCORRENCIAS_EDICOES (
   ID_CURSO             int                  not null,
   NR_OCORRENCIA        int                  not null,
   DATA_ULT_OCORRENCIA  DATETIME             NOT NULL,
   constraint PK_OCORRENCIAS_EDICOES primary key (ID_CURSO, NR_OCORRENCIA),
   constraint FK_OCORRENC_CONTEM_VA_CURSOS foreign key (ID_CURSO)
      references CURSOS (ID_CURSO)
)
go

/*==============================================================*/
/* Table: SINCRONO                                              */
/*==============================================================*/
create table SINCRONO (
   ID_CURSO_SINCRONO    int				     not null,
   ID_FORMADOR          int                  not null,
   NUMERO_VAGAS         int                  null,
   constraint PK_SINCRONO primary key (ID_CURSO_SINCRONO),
   constraint FK_SINCRONO_LECIONAM_FORMADOR foreign key (ID_FORMADOR)
      references FORMADORES (ID_FORMADOR),
   constraint FK_SINCRONO_PODEM_SER_CURSOS foreign key (ID_CURSO_SINCRONO)
      references CURSOS (ID_CURSO)
)
go

/*==============================================================*/
/* Table: RESULTADOS                                            */
/*==============================================================*/
create table RESULTADOS (
   ID_RESUL             int identity(1,1)    not null,
   ID_FORMANDO          int                  not null,
   ID_CURSO_SINCRONO    int                  not null,
   RESUL                float                not null,
   constraint PK_RESULTADOS primary key (ID_RESUL),
   constraint FK_RESULTAD_VAI_POSSU_SINCRONO foreign key (ID_CURSO_SINCRONO)
      references SINCRONO (ID_CURSO_SINCRONO),
   constraint FK_RESULTAD_CLASSIFIC_FORMANDO foreign key (ID_FORMANDO)
      references FORMANDOS (ID_FORMANDO)
)
go


/*==============================================================*/
/* Table: CONTEUDOS_FORUM                                       */
/*==============================================================*/
create table CONTEUDOS_FORUM (
   ID_CONTEUDOS_FORUM   int identity(1,1)    not null,
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
)
go

/*==============================================================*/
/* Table: MODELO_CERTIFICADO                                    */
/*==============================================================*/
create table MODELO_CERTIFICADO (
   ID_MODELO_CERTIFICADO int identity(1,1) not null,
   ID_CURSO              int not null,
   CONTEUDO_TEMPLATE     text not null,
   constraint PK_MODELO_CERTIFICADO primary key (ID_MODELO_CERTIFICADO),
   constraint FK_MODELO_CERTIFICADO_CURSO foreign key (ID_CURSO)
      references CURSOS(ID_CURSO)
);
go

/*==============================================================*/
/* Table: CERTIFICADOS                                          */
/*==============================================================*/
create table CERTIFICADOS (
   ID_CERTIFICADO       int identity(1,1) not null,
   ID_FORMANDO          int              not null,
   ID_CURSO             int              not null,
   CERTIFICADO_FINAL    text             not null,
   constraint PK_CERTIFICADOS primary key (ID_CERTIFICADO),
   constraint FK_FORMANDO_REUNE_VARIOS_CERTIFICADOS foreign key (ID_FORMANDO)
      references FORMANDOS (ID_FORMANDO),
   constraint FK_CURSO_TEM_DISPO_CERTIFICADOS foreign key (ID_CURSO)
      references CURSOS(ID_CURSO)
);
go