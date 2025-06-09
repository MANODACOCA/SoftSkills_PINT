//teste
const { Sequelize, Op, where } = require('sequelize');
const sequelize = require('../models/database');
const { utilizador } = require('../models/init-models')(sequelize);
const bcrypt = require('bcrypt');

//Função para comparar se os dados estão corretos do utilizador para entrar na aplicação
// async function verificacaoLogin(mail, pass) {
//     try{
//         const userExiste = await utilizador.findOne({ where: {email: mail} });

//         if(!userExiste){
//             return { success: false, message: 'Utilizador não econtrado'};
//         }

//         const match = await bcrypt.compare(pass, userExiste.password_util);
//         if(!match){
//             return { success: false, message: 'Password incorreta.' };
//         }

//         return { sucess: true, userExiste };    
//     } catch(error) {
//         console.error('Erro ao encontrar utilizador', error);
//         throw error;
//     }
// };


module.exports = {
    verificacaoLogin
}