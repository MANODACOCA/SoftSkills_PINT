const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
const cursosService = require('./services/cursos.service');
const path = require('path');

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Main Route
app.get('/', (req, res) => {
  res.send('Servidor Node.js com Express funcionando!');
});
app.use(cors());
// Mensagem para mostrar que o servidor está a correr
app.listen(port, async() => {
  /*APENAS PARA TESTES DESENVOLVIEMENTO!!!!!!!!!!!!!!!!!!!!! APGAR DEPOIS */
  try{
    await cursosService.updateFormandosCounter();
  }catch(error){
    console.error('Erro ao atualiar contadores de formandos:', error);
  }
  /*APENAS PARA TESTES DESENVOLVIEMENTO!!!!!!!!!!!!!!!!!!!!! APGAR DEPOIS */
});

//All Routes 
const areaRouter = require('./routes/area_route.js');
app.use('/area',areaRouter);

const assincronoRouter = require('./routes/assincrono_route.js');
app.use('/assincrono',assincronoRouter);

const aulasRouter = require('./routes/aulas_route.js');
app.use('/aulas',aulasRouter);

const categoriaRouter = require('./routes/categoria_route.js');
app.use('/categoria',categoriaRouter);

const certificadosRouter = require('./routes/certificados_route.js');
app.use('/certificados',certificadosRouter);

const comentarioRouter = require('./routes/comentario_route.js');
app.use('/comentario',comentarioRouter);

const conteudosRouter = require('./routes/conteudos_route.js');
app.use('/conteudos',conteudosRouter);

const conteudos_forumRouter = require('./routes/conteudos_forum_route.js');
app.use('/conteudos_forum',conteudos_forumRouter);

const conteudos_partilhadoRouter = require('./routes/conteudos_partilhado_route.js');
app.use('/conteudos_partilhado',conteudos_partilhadoRouter);

const cursosRouter = require('./routes/cursos_route.js');
app.use('/cursos',cursosRouter);

const denunciaRouter = require('./routes/denuncia_route.js');
app.use('/denuncia',denunciaRouter);

const favoritosRouter = require('./routes/favoritos_route.js');
app.use('/favoritos',favoritosRouter);

const formadoresRouter = require('./routes/formadores_route.js');
app.use('/formadores',formadoresRouter);

const formandosRouter = require('./routes/formandos_route.js');
app.use('/formandos',formandosRouter);

const gestor_administradorRouter = require('./routes/gestor_administrador_route.js');
app.use('/gestor_administrador',gestor_administradorRouter);

const inscricoesRouter = require('./routes/inscricoes_route.js');
app.use('/inscricoes',inscricoesRouter);

const material_apoioRouter = require('./routes/material_apoio_route.js');
app.use('/material_apoio',material_apoioRouter);

const modelo_certificadoRouter = require('./routes/modelo_certificado_route.js');
app.use('/modelo_certificado',modelo_certificadoRouter);

const notificacoes_comentarios_postRouter = require('./routes/notificacoes_comentarios_post_route.js');
app.use('/notificacoes_comentarios_post',notificacoes_comentarios_postRouter);

const notificacoes_cursoRouter = require('./routes/notificacoes_curso_route.js');
app.use('/notificacoes_curso',notificacoes_cursoRouter);

const ocorrencias_edicoesRouter = require('./routes/ocorrencias_edicoes_route.js');
app.use('/ocorrencias_edicoes',ocorrencias_edicoesRouter);

const postRouter = require('./routes/post_route.js');
app.use('/posts',postRouter);

const resultadosRouter = require('./routes/resultados_route.js');
app.use('/resultados',resultadosRouter);

const sincronoRouter = require('./routes/sincrono_route.js');
app.use('/sincrono',sincronoRouter);

const s_s_oRouter = require('./routes/s_s_o_route.js');
app.use('/s_s_o',s_s_oRouter);

const tipo_denunciaRouter = require('./routes/tipo_denuncia_route.js');
app.use('/tipo_denuncia',tipo_denunciaRouter);

const tipo_formatoRouter = require('./routes/tipo_formato_route.js');
app.use('/tipo_formato',tipo_formatoRouter);

const topicoRouter = require('./routes/topico_route.js');
app.use('/topico',topicoRouter);

const twofaRouter = require('./routes/twofa_route.js');
app.use('/twofa',twofaRouter);

const utilizadorRouter = require('./routes/utilizador_route.js');
app.use('/utilizador',utilizadorRouter);

const trabalhosRouter = require('./routes/trabalhos_route.js');
app.use('/trabalhos',trabalhosRouter);

const entregaTrabalhosRouter = require('./routes/entrega_trabalhos_route.js');
app.use('/entrega-trabalhos',entregaTrabalhosRouter);

const likePostRouter = require('./routes/likes_post_route.js');
app.use('/likes-post',likePostRouter);

/* const entregaTrabalhosRouter = require('./routes/entrega_trabalhos_route.js');
app.use('/entrega-comentario',entregaTrabalhosRouter); */

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

