var DataTypes = require("sequelize").DataTypes;
var _area = require("./area");
var _assincrono = require("./assincrono");
var _aulas = require("./aulas");
var _avaliacoes_et = require("./avaliacoes_et");
var _categoria = require("./categoria");
var _certificados = require("./certificados");
var _comentario = require("./comentario");
var _conteudos = require("./conteudos");
var _conteudos_partilhado = require("./conteudos_partilhado");
var _cursos = require("./cursos");
var _denuncia = require("./denuncia");
var _entrega_trabalhos = require("./entrega_trabalhos");
var _favoritos = require("./favoritos");
var _formadores = require("./formadores");
var _formandos = require("./formandos");
var _gestor_administrador = require("./gestor_administrador");
var _inscricoes = require("./inscricoes");
var _likes_comentario = require("./likes_comentario");
var _likes_post = require("./likes_post");
var _material_apoio = require("./material_apoio");
var _modelo_certificado = require("./modelo_certificado");
var _notificacoes_curso = require("./notificacoes_curso");
var _ocorrencias_edicoes = require("./ocorrencias_edicoes");
var _post = require("./post");
var _resultados = require("./resultados");
var _s_s_o = require("./s_s_o");
var _sincrono = require("./sincrono");
var _tipo_denuncia = require("./tipo_denuncia");
var _tipo_formato = require("./tipo_formato");
var _topico = require("./topico");
var _trabalhos = require("./trabalhos");
var _twofa = require("./twofa");
var _utilizador = require("./utilizador");

function initModels(sequelize) {
  var area = _area(sequelize, DataTypes);
  var assincrono = _assincrono(sequelize, DataTypes);
  var aulas = _aulas(sequelize, DataTypes);
  var avaliacoes_et = _avaliacoes_et(sequelize, DataTypes);
  var categoria = _categoria(sequelize, DataTypes);
  var certificados = _certificados(sequelize, DataTypes);
  var comentario = _comentario(sequelize, DataTypes);
  var conteudos = _conteudos(sequelize, DataTypes);
  var conteudos_partilhado = _conteudos_partilhado(sequelize, DataTypes);
  var cursos = _cursos(sequelize, DataTypes);
  var denuncia = _denuncia(sequelize, DataTypes);
  var entrega_trabalhos = _entrega_trabalhos(sequelize, DataTypes);
  var favoritos = _favoritos(sequelize, DataTypes);
  var formadores = _formadores(sequelize, DataTypes);
  var formandos = _formandos(sequelize, DataTypes);
  var gestor_administrador = _gestor_administrador(sequelize, DataTypes);
  var inscricoes = _inscricoes(sequelize, DataTypes);
  var likes_comentario = _likes_comentario(sequelize, DataTypes);
  var likes_post = _likes_post(sequelize, DataTypes);
  var material_apoio = _material_apoio(sequelize, DataTypes);
  var modelo_certificado = _modelo_certificado(sequelize, DataTypes);
  var notificacoes_curso = _notificacoes_curso(sequelize, DataTypes);
  var ocorrencias_edicoes = _ocorrencias_edicoes(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var resultados = _resultados(sequelize, DataTypes);
  var s_s_o = _s_s_o(sequelize, DataTypes);
  var sincrono = _sincrono(sequelize, DataTypes);
  var tipo_denuncia = _tipo_denuncia(sequelize, DataTypes);
  var tipo_formato = _tipo_formato(sequelize, DataTypes);
  var topico = _topico(sequelize, DataTypes);
  var trabalhos = _trabalhos(sequelize, DataTypes);
  var twofa = _twofa(sequelize, DataTypes);
  var utilizador = _utilizador(sequelize, DataTypes);

  topico.belongsTo(area, { as: "id_area_area", foreignKey: "id_area"});
  area.hasMany(topico, { as: "topicos", foreignKey: "id_area"});
  conteudos.belongsTo(aulas, { as: "id_aula_aula", foreignKey: "id_aula"});
  aulas.hasMany(conteudos, { as: "conteudos", foreignKey: "id_aula"});
  area.belongsTo(categoria, { as: "id_categoria_categorium", foreignKey: "id_categoria"});
  categoria.hasMany(area, { as: "areas", foreignKey: "id_categoria"});
  denuncia.belongsTo(comentario, { as: "id_comentario_comentario", foreignKey: "id_comentario"});
  comentario.hasMany(denuncia, { as: "denuncia", foreignKey: "id_comentario"});
  likes_comentario.belongsTo(comentario, { as: "id_comentario_comentario", foreignKey: "id_comentario"});
  comentario.hasMany(likes_comentario, { as: "likes_comentarios", foreignKey: "id_comentario"});
  post.belongsTo(conteudos_partilhado, { as: "id_conteudos_partilhado_conteudos_partilhado", foreignKey: "id_conteudos_partilhado"});
  conteudos_partilhado.hasMany(post, { as: "posts", foreignKey: "id_conteudos_partilhado"});
  assincrono.belongsTo(cursos, { as: "id_curso_assincrono_curso", foreignKey: "id_curso_assincrono"});
  cursos.hasOne(assincrono, { as: "assincrono", foreignKey: "id_curso_assincrono"});
  aulas.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(aulas, { as: "aulas", foreignKey: "id_curso"});
  certificados.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(certificados, { as: "certificados", foreignKey: "id_curso"});
  favoritos.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(favoritos, { as: "favoritos", foreignKey: "id_curso"});
  inscricoes.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(inscricoes, { as: "inscricos", foreignKey: "id_curso"});
  material_apoio.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(material_apoio, { as: "material_apoios", foreignKey: "id_curso"});
  modelo_certificado.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(modelo_certificado, { as: "modelo_certificados", foreignKey: "id_curso"});
  notificacoes_curso.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(notificacoes_curso, { as: "notificacoes_cursos", foreignKey: "id_curso"});
  ocorrencias_edicoes.belongsTo(cursos, { as: "id_curso_curso", foreignKey: "id_curso"});
  cursos.hasMany(ocorrencias_edicoes, { as: "ocorrencias_edicos", foreignKey: "id_curso"});
  ocorrencias_edicoes.belongsTo(cursos, { as: "id_curso_anterior_curso", foreignKey: "id_curso_anterior"});
  cursos.hasMany(ocorrencias_edicoes, { as: "id_curso_anterior_ocorrencias_edicos", foreignKey: "id_curso_anterior"});
  ocorrencias_edicoes.belongsTo(cursos, { as: "id_curso_raiz_curso", foreignKey: "id_curso_raiz"});
  cursos.hasMany(ocorrencias_edicoes, { as: "id_curso_raiz_ocorrencias_edicos", foreignKey: "id_curso_raiz"});
  sincrono.belongsTo(cursos, { as: "id_curso_sincrono_curso", foreignKey: "id_curso_sincrono"});
  cursos.hasOne(sincrono, { as: "sincrono", foreignKey: "id_curso_sincrono"});
  trabalhos.belongsTo(cursos, { as: "id_curso_tr_curso", foreignKey: "id_curso_tr"});
  cursos.hasMany(trabalhos, { as: "trabalhos", foreignKey: "id_curso_tr"});
  avaliacoes_et.belongsTo(entrega_trabalhos, { as: "id_entrega_trabalho_aet_entrega_trabalho", foreignKey: "id_entrega_trabalho_aet"});
  entrega_trabalhos.hasMany(avaliacoes_et, { as: "avaliacoes_ets", foreignKey: "id_entrega_trabalho_aet"});
  sincrono.belongsTo(formadores, { as: "id_formador_formadore", foreignKey: "id_formador"});
  formadores.hasMany(sincrono, { as: "sincronos", foreignKey: "id_formador"});
  certificados.belongsTo(formandos, { as: "id_formando_formando", foreignKey: "id_formando"});
  formandos.hasMany(certificados, { as: "certificados", foreignKey: "id_formando"});
  entrega_trabalhos.belongsTo(formandos, { as: "id_formando_et_formando", foreignKey: "id_formando_et"});
  formandos.hasMany(entrega_trabalhos, { as: "entrega_trabalhos", foreignKey: "id_formando_et"});
  inscricoes.belongsTo(formandos, { as: "id_formando_formando", foreignKey: "id_formando"});
  formandos.hasMany(inscricoes, { as: "inscricos", foreignKey: "id_formando"});
  resultados.belongsTo(formandos, { as: "id_formando_formando", foreignKey: "id_formando"});
  formandos.hasMany(resultados, { as: "resultados", foreignKey: "id_formando"});
  cursos.belongsTo(gestor_administrador, { as: "id_gestor_administrador_gestor_administrador", foreignKey: "id_gestor_administrador"});
  gestor_administrador.hasMany(cursos, { as: "cursos", foreignKey: "id_gestor_administrador"});
  comentario.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(comentario, { as: "comentarios", foreignKey: "id_post"});
  denuncia.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(denuncia, { as: "denuncia", foreignKey: "id_post"});
  likes_post.belongsTo(post, { as: "id_post_post", foreignKey: "id_post"});
  post.hasMany(likes_post, { as: "likes_posts", foreignKey: "id_post"});
  resultados.belongsTo(sincrono, { as: "id_curso_sincrono_sincrono", foreignKey: "id_curso_sincrono"});
  sincrono.hasMany(resultados, { as: "resultados", foreignKey: "id_curso_sincrono"});
  denuncia.belongsTo(tipo_denuncia, { as: "id_tipo_denuncia_tipo_denuncium", foreignKey: "id_tipo_denuncia"});
  tipo_denuncia.hasMany(denuncia, { as: "denuncia", foreignKey: "id_tipo_denuncia"});
  comentario.belongsTo(tipo_formato, { as: "id_formato_tipo_formato", foreignKey: "id_formato"});
  tipo_formato.hasMany(comentario, { as: "comentarios", foreignKey: "id_formato"});
  conteudos.belongsTo(tipo_formato, { as: "id_formato_tipo_formato", foreignKey: "id_formato"});
  tipo_formato.hasMany(conteudos, { as: "conteudos", foreignKey: "id_formato"});
  material_apoio.belongsTo(tipo_formato, { as: "id_formato_tipo_formato", foreignKey: "id_formato"});
  tipo_formato.hasMany(material_apoio, { as: "material_apoios", foreignKey: "id_formato"});
  post.belongsTo(tipo_formato, { as: "id_formato_tipo_formato", foreignKey: "id_formato"});
  tipo_formato.hasMany(post, { as: "posts", foreignKey: "id_formato"});
  trabalhos.belongsTo(tipo_formato, { as: "id_formato_tr_tipo_formato", foreignKey: "id_formato_tr"});
  tipo_formato.hasMany(trabalhos, { as: "trabalhos", foreignKey: "id_formato_tr"});
  conteudos_partilhado.belongsTo(topico, { as: "id_topico_topico", foreignKey: "id_topico"});
  topico.hasMany(conteudos_partilhado, { as: "conteudos_partilhados", foreignKey: "id_topico"});
  cursos.belongsTo(topico, { as: "id_topico_topico", foreignKey: "id_topico"});
  topico.hasMany(cursos, { as: "cursos", foreignKey: "id_topico"});
  entrega_trabalhos.belongsTo(trabalhos, { as: "id_trabalho_et_trabalho", foreignKey: "id_trabalho_et"});
  trabalhos.hasMany(entrega_trabalhos, { as: "entrega_trabalhos", foreignKey: "id_trabalho_et"});
  comentario.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(comentario, { as: "comentarios", foreignKey: "id_utilizador"});
  denuncia.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(denuncia, { as: "denuncia", foreignKey: "id_utilizador"});
  favoritos.belongsTo(utilizador, { as: "id_formando_utilizador", foreignKey: "id_formando"});
  utilizador.hasMany(favoritos, { as: "favoritos", foreignKey: "id_formando"});
  formadores.belongsTo(utilizador, { as: "id_formador_utilizador", foreignKey: "id_formador"});
  utilizador.hasOne(formadores, { as: "formadore", foreignKey: "id_formador"});
  formandos.belongsTo(utilizador, { as: "id_formando_utilizador", foreignKey: "id_formando"});
  utilizador.hasOne(formandos, { as: "formando", foreignKey: "id_formando"});
  gestor_administrador.belongsTo(utilizador, { as: "id_gestor_administrador_utilizador", foreignKey: "id_gestor_administrador"});
  utilizador.hasOne(gestor_administrador, { as: "gestor_administrador", foreignKey: "id_gestor_administrador"});
  likes_comentario.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(likes_comentario, { as: "likes_comentarios", foreignKey: "id_utilizador"});
  likes_post.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(likes_post, { as: "likes_posts", foreignKey: "id_utilizador"});
  notificacoes_curso.belongsTo(utilizador, { as: "id_utilizador_utilizador", foreignKey: "id_utilizador"});
  utilizador.hasMany(notificacoes_curso, { as: "notificacoes_cursos", foreignKey: "id_utilizador"});
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
    avaliacoes_et,
    categoria,
    certificados,
    comentario,
    conteudos,
    conteudos_partilhado,
    cursos,
    denuncia,
    entrega_trabalhos,
    favoritos,
    formadores,
    formandos,
    gestor_administrador,
    inscricoes,
    likes_comentario,
    likes_post,
    material_apoio,
    modelo_certificado,
    notificacoes_curso,
    ocorrencias_edicoes,
    post,
    resultados,
    s_s_o,
    sincrono,
    tipo_denuncia,
    tipo_formato,
    topico,
    trabalhos,
    twofa,
    utilizador,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
