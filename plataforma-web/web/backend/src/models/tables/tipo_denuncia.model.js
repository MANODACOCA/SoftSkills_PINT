const Sequelize =  require('sequelize');
const db = require('../db')

const TipoDenuncia = db.define('TIPO_DENUNCIA', {
    ID_TIPO_DENUNCIA: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    TIPO_DENUNCIA: {
        type: Sequelize.STRING(200),
        allowNull: true
    },
}
{
    timestamps: false,
});
module.exports = TipoDenuncia;