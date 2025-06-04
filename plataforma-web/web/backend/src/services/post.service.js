const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { conteudos_partilhado, topico, post, utilizador } = require('../models/init-models')(sequelize);

const Post = require('../models/post'); // Supondo que o modelo está neste caminho

async function handleLike(postId) {
  try {
    // Encontra o post pelo ID
    const post = await Post.findByPk(postId);
    
    if (!post) {
      throw new Error('Post não encontrado');
    }

    // Incrementa o contador de likes
    post.contador_likes_post += 1;
    
    // Salva as alterações no banco de dados
    await post.save();
    
    return {
      success: true,
      newLikeCount: post.contador_likes_post
    };
    
  } catch (error) {
    console.error("Erro ao curtir post:", error);
    throw error; // Rejeita o erro para ser tratado pelo chamador
  }
}

module.exports = {
  handleLike
};