const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { denuncia, comentario, utilizador, post, tipo_denuncia, conteudos_partilhado, topico, area, categoria } = require('../models/init-models')(sequelize);



async function getDenunciasAll() {
    try {
        const denuncias = await denuncia.findAll({
            include: [
                {
                    model: utilizador,
                    as: 'id_utilizador_utilizador',
                    attributes: ['nome_utilizador']
                },
                {
                    model: tipo_denuncia,
                    as: 'id_tipo_denuncia_tipo_denuncium',
                    attributes: ['tipo_denuncia']
                }
            ]
        });

        // Passo 2: Processar cada denúncia para obter detalhes
        const resultadosCompletos = [];
        
        for (const item of denuncias) {
            const denunciaData = item.toJSON();
            
            // Passo 3: Se tiver post, buscar detalhes do post e tópicos relacionados
            if (denunciaData.id_post) {
                // Buscar post
                const postInfo = await post.findByPk(denunciaData.id_post, {
                    attributes: ['texto_post', 'caminho_ficheiro', 'id_conteudos_partilhado']
                });
                
                if (postInfo) {
                    const postData = postInfo.toJSON();
                    denunciaData.post_info = { texto_post: postData.texto_post };
                    
                    // Buscar conteúdo partilhado
                    if (postData.id_conteudos_partilhado) {
                        const cpInfo = await conteudos_partilhado.findByPk(postData.id_conteudos_partilhado, {
                            attributes: ['id_conteudos_partilhado', 'id_topico']
                        });
                        
                        if (cpInfo) {
                            const cpData = cpInfo.toJSON();
                            
                            // Buscar tópico
                            const topicoInfo = await topico.findByPk(cpData.id_topico, {
                                attributes: ['nome_topico', 'id_area']
                            });
                            
                            if (topicoInfo) {
                                const topicoData = topicoInfo.toJSON();
                                
                                // Buscar área
                                const areaInfo = await area.findByPk(topicoData.id_area, {
                                    attributes: ['nome_area', 'id_categoria']
                                });
                                
                                if (areaInfo) {
                                    const areaData = areaInfo.toJSON();
                                    
                                    // Buscar categoria
                                    const categoriaInfo = await categoria.findByPk(areaData.id_categoria, {
                                        attributes: ['nome_cat']
                                    });
                                    
                                    // Montar estrutura de dados completa
                                    denunciaData.post_info.categoria_area_topico = {
                                        topico: topicoData.nome_topico,
                                        area: areaData.nome_area,
                                        categoria: categoriaInfo ? categoriaInfo.nome_cat : null
                                    };
                                }
                            }
                        }
                    }
                }
            }
            
            // Passo 4: Se tiver comentário, buscar detalhes
            if (denunciaData.id_comentario) {
                const comentarioInfo = await comentario.findByPk(denunciaData.id_comentario, {
                    attributes: ['texto_comentario', 'id_post']
                });
                
                if (comentarioInfo) {
                    const comentarioData = comentarioInfo.toJSON();
                    denunciaData.comentario_info = { texto_comentario: comentarioData.texto_comentario };
                    
                    // Se o comentário está associado a um post, pegue o post e siga a mesma árvore
                    if (comentarioData.id_post) {
                        // Mesmo processo do post acima, mas para o post do comentário
                        const postInfo = await post.findByPk(comentarioData.id_post, {
                            attributes: ['texto_post', 'caminho_ficheiro', 'id_conteudos_partilhado']
                        });
                        
                        if (postInfo) {
                            // Processo idêntico à parte do post acima
                            // Reutilizando a mesma lógica para obter categoria/área/tópico
                            const postData = postInfo.toJSON();
                            denunciaData.comentario_info.post = { texto_post: postData.texto_post };
                            
                            if (postData.id_conteudos_partilhado) {
                                // Repetir passos para obter conteúdo partilhado -> tópico -> área -> categoria
                                // Semelhante ao que foi feito para o post acima
                                const cpInfo = await conteudos_partilhado.findByPk(postData.id_conteudos_partilhado);
                                if (cpInfo) {
                                    const topicoInfo = await topico.findByPk(cpInfo.id_topico);
                                    if (topicoInfo) {
                                        const areaInfo = await area.findByPk(topicoInfo.id_area);
                                        if (areaInfo) {
                                            const categoriaInfo = await categoria.findByPk(areaInfo.id_categoria);
                                            
                                            denunciaData.comentario_info.post.categoria_area_topico = {
                                                topico: topicoInfo.nome_topico,
                                                area: areaInfo.nome_area,
                                                categoria: categoriaInfo ? categoriaInfo.nome_cat : null
                                            };
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            
            resultadosCompletos.push(denunciaData);
        }
        
        return resultadosCompletos;
    } catch (error) {
        console.error('Erro ao encontrar denuncias:', error);
        throw error;
    }
}

module.exports = {
    getDenunciasAll,
};