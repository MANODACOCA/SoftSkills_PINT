var DataTypes = require("sequelize").DataTypes;
var _area = require("./area");
var _assincrono = require("./assincrono");
var _aulas = require("./aulas");
var _avaliacoes = require("./avaliacoes");
var _categoria = require("./categoria");
var _comentario = require("./comentario");
var _conteudos = require("./conteudos");
var _conteudos_partilhado = require("./conteudos_partilhado");
var _cursos = require("./cursos");
var _denuncia = require("./denuncia");
var _formadores = require("./formadores");
var _formandos = require("./formandos");
var _gestor_administrador = require("./gestor_administrador");
var _inscricoes = require("./inscricoes");
var _notificacoes_curso = require("./notificacoes_curso");
var _notificacoes_post = require("./notificacoes_post");
var _ocorrencias_edicoes = require("./ocorrencias_edicoes");
var _post = require("./post");
var _resultados = require("./resultados");
var _s_s_o = require("./s_s_o");
var _sincrono = require("./sincrono");
var _tipo_denuncia = require("./tipo_denuncia");
var _tipo_formato = require("./tipo_formato");
var _topico = require("./topico");
var _twofa = require("./twofa");
var _utilizador = require("./utilizador");

function initModels(sequelize) {
  var area = _area(sequelize, DataTypes);
  var assincrono = _assincrono(sequelize, DataTypes);
  var aulas = _aulas(sequelize, DataTypes);
  var avaliacoes = _avaliacoes(sequelize, DataTypes);
  var categoria = _categoria(sequelize, DataTypes);
  var comentario = _comentario(sequelize, DataTypes);
  var conteudos = _conteudos(sequelize, DataTypes);
  var conteudos_partilhado = _conteudos_partilhado(sequelize, DataTypes);
  var cursos = _cursos(sequelize, DataTypes);
  var denuncia = _denuncia(sequelize, DataTypes);
  var formadores = _formadores(sequelize, DataTypes);
  var formandos = _formandos(sequelize, DataTypes);
  var gestor_administrador = _gestor_administrador(sequelize, DataTypes);
  var inscricoes = _inscricoes(sequelize, DataTypes);
  var notificacoes_curso = _notificacoes_curso(sequelize, DataTypes);
  var notificacoes_post = _notificacoes_post(sequelize, DataTypes);
  var ocorrencias_edicoes = _ocorrencias_edicoes(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var resultados = _resultados(sequelize, DataTypes);
  var s_s_o = _s_s_o(sequelize, DataTypes);
  var sincrono = _sincrono(sequelize, DataTypes);
  var tipo_denuncia = _tipo_denuncia(sequelize, DataTypes);
  var tipo_formato = _tipo_formato(sequelize, DataTypes);
  var topico = _topico(sequelize, DataTypes);
  var twofa = _twofa(sequelize, DataTypes);
  var utilizador = _utilizador(sequelize, DataTypes);

  conteudos_partilhado.belongsTo(area, { as: "id_area_area", foreignKey: "id_area"});
  area.hasMany(conteudos_partilhado, { as: "conteudos_partilhados", foreignKey: "id_area"});
  cursos.belongsTo(area, { as: "id_area_area", foreignKey: "id_area"});
  area.hasMany(cursos, { as: "cursos", foreignKey: "id_area"});
  topico.belongsTo(area, { as: "id_area_area", foreignKey: "id_area"});
  area.hasMany(topico, { as: "topicos", foreignKey: "id_area"});
  conteudos.belongsTo(aulas, { as: "id_aula_aula", foreignKey: "id_aula"});
  aulas.hasMany(conteudos, { as: "conteudos", foreignKey: "id_aula"});
  comentario.belongsTo(avaliacoes, { as: "id_avaliacao_avaliaco", foreignKey: "id_avaliacao"});
  avaliacoes.hasMany(comentario, { as: "comentarios", foreignKey: "id_avaliacao"});
  area.belongsTo(categoria, { as: "id_categoria_categorium", foreignKey: "id_categoria"});
  categoria.hasMany(area, { as: "areas", foreignKey: "id_categoria"});
  conteudos_partilhado.belongsTo(categoria, { as: "id_categoria_categorium", foreignKey: "id_categoria"});
  categoria.hasMany(conteudos_partilhado, { as: "conteudos_partilhados", foreignKey: "id_categoria"});
  cursos.belongsTo(categoria, { as: "id_categoria_categorium", foreignKey: "id_categoria"});
  categoria.hasMany(cursos, { as: "cursos", foreignKey: "id_categoria"});
  denuncia.belongsTo(comentario, { as: "id_comentario_comentario", foreignKey: "id_comentario"});
  comentario.hasMany(denuncia, { as: "denuncia", foreignKey: "id_comentario"});
  post.belongsTo(conteudos_partilhado, { as: "id_area_conhecimento_conteudos_partilhado", foreignKey: "id_area_conhecimento"});
  conteudos_partilhado.hasMany(post, { as: "posts", foreignKey: "id_area_conhecimento"});
  assincrono.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(assincrono, { as: "assincronos", foreignKey: "id_curso"});
  aulas.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(aulas, { as: "aulas", foreignKey: "id_curso"});
  inscricoes.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(inscricoes, { as: "inscricos", foreignKey: "id_curso"});
  notificacoes_curso.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(notificacoes_curso, { as: "notificacoes_cursos", foreignKey: "id_curso"});
  notificacoes_post.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(notificacoes_post, { as: "notificacoes_posts", foreignKey: "id_curso"});
  ocorrencias_edicoes.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(ocorrencias_edicoes, { as: "ocorrencias_edicos", foreignKey: "id_curso"});
  sincrono.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(sincrono, { as: "sincronos", foreignKey: "id_curso"});
  sincrono.belongsTo(formadores, { as: "id_formador_formadore", foreignKey: ["id_utilizador", "id_formador"]});
  formadores.hasMany(sincrono, { as: "sincronos", foreignKey: "id_formador"});
  inscricoes.b(elongsToformandos, { as: "id_formando_formando", foreignKey: ["id_utilizador" , "id_formando"]});
  formandos.hasMany(inscricoes, { as: "inscricos", foreignKey: ["id_utilizador", "id_formando"]});
  resultados.belongsTo(formandos, { as: "id_formando_formando", foreignKey: ["id_utilizador", "id_formando"]});
  formandos.hasMany(resultados, { as: "resultados", foreignKey: ["id_utilizador", "id_formando"]});
  cursos.belongsTo(gestor_administrador, { as: "id_gestor_administrador_gestor_administrador", foreignKey: ["id_gestor_administrador", "id_utilizador"]});
  gestor_administrador.hasMany(cursos, { as: "cursos", foreignKey: ["id_gestor_administrador", "id_utilizador"]});
  avaliacoes.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(avaliacoes, { as: "avaliacos", foreignKey: "id_post"});
  comentario.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(comentario, { as: "comentarios", foreignKey: "id_post"});
  denuncia.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(denuncia, { as: "denuncia", foreignKey: "id_post"});
  notificacoes_post.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(notificacoes_post, { as: "notificacoes_posts", foreignKey: "id_post"});
  resultados.belongsTo(sincrono, { as: "id_curso_sincrono_sincrono", foreignKey: ["id_curso", "id_curso_sincrono"]});
  sincrono.hasMany(resultados, { as: "resultados", foreignKey: ["id_curso", "id_curso_sincrono"]});
  denuncia.belongsTo(tipo_denuncia, { as: "id_tipo_denuncia_tipo_denuncium", foreignKey: "id_tipo_denuncia"});
  tipo_denuncia.hasMany(denuncia, { as: "denuncia", foreignKey: "id_tipo_denuncia"});
  conteudos.belongsTo(tipo_formato, { as: "id_formato_tipo_formato", foreignKey: "id_formato"});
  tipo_formato.hasMany(conteudos, { as: "conteudos", foreignKey: "id_formato"});
  conteudos_partilhado.belongsTo(topico, { as: "id_topico_topico", foreignKey: "id_topico"});
  topico.hasMany(conteudos_partilhado, { as: "conteudos_partilhados", foreignKey: "id_topico"});
  cursos.belongsTo(topico, { as: "id_topico_topico", foreignKey: "id_topico"});
  topico.hasMany(cursos, { as: "cursos", foreignKey: "id_topico"});
  avaliacoes.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(avaliacoes, { as: "avaliacos", foreignKey: "id_utilizador"});
  comentario.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(comentario, { as: "comentarios", foreignKey: "id_utilizador"});
  denuncia.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(denuncia, { as: "denuncia", foreignKey: "id_utilizador"});
  formadores.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(formadores, { as: "formadores", foreignKey: "id_utilizador"});
  formandos.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(formandos, { as: "formandos", foreignKey: "id_utilizador"});
  gestor_administrador.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(gestor_administrador, { as: "gestor_administradors", foreignKey: "id_utilizador"});
  notificacoes_curso.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(notificacoes_curso, { as: "notificacoes_cursos", foreignKey: "id_utilizador"});
  notificacoes_post.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(notificacoes_post, { as: "notificacoes_posts", foreignKey: "id_utilizador"});
  post.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(post, { as: "posts", foreignKey: "id_utilizador"});
  s_s_o.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(s_s_o, { as: "s_s_os", foreignKey: "id_utilizador"});
  twofa.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(twofa, { as: "twofas", foreignKey: "id_utilizador"});

  return {
    area,
    assincrono,
    aulas,
    avaliacoes,
    categoria,
    comentario,
    conteudos,
    conteudos_partilhado,
    cursos,
    denuncia,
    formadores,
    formandos,
    gestor_administrador,
    inscricoes,
    notificacoes_curso,
    notificacoes_post,
    ocorrencias_edicoes,
    post,
    resultados,
    s_s_o,
    sincrono,
    tipo_denuncia,
    tipo_formato,
    topico,
    twofa,
    utilizador,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
