const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { material_apoio, conteudos, tipo_formato, cursos } = require('../models/init-models')(sequelize);

async function getMaterialApoioDoCurso(cursoID){
    const cursoSincrono = await cursos.findOne({
        where: {id_curso: cursoID}
    });

    if(!cursoSincrono) {
        throw new Error('Curso não econtrado');
    }

    if(cursoSincrono.issincrono){
        return [];
    }

    const materialApoio = await material_apoio.findAll({
        where: { id_curso: cursoID },
        include: [
            {
                model: tipo_formato,
                as: 'id_formato_tipo_formato',
                attributes: ['id_formato', 'formato']
            }
        ]
    });
    return materialApoio;
}

module.exports = {
    getMaterialApoioDoCurso,
}
