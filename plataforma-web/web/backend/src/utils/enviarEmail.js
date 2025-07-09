const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendEmail(destinatario, passwordTemporaria) {
  return transporter.sendMail({
    from: '"SoftSkills" <softskills.service@gmail.com>',
    to: destinatario,
    subject: 'A sua conta na SoftSkills foi criada com sucesso',
    html: `
<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 30px;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 35px; border-radius: 12px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);">
    <h2 style="color: #3085d6; text-align: center; margin-bottom: 20px;">🎉 Bem-vindo à SoftSkills!</h2>
    <p style="font-size: 16px; color: #333;">Olá,</p>
    <p style="font-size: 16px; color: #333;">A sua conta foi <strong>criada com sucesso</strong> e já está quase pronta para uso.</p>
    
    <div style="margin: 25px 0;">
      <p style="font-size: 15px; color: #333;">Abaixo está a sua <strong>password temporária</strong>:</p>
      <div style="text-align: center;">
          <p style="font-size: 20px; font-weight: bold; background-color: #e6f7ff; color: #00A9E0; padding: 12px 20px; border-radius: 8px; display: inline-block; letter-spacing: 1px;">${passwordTemporaria}</p>
      </div>
    </div>

    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

    <p style="font-size: 15px; color: #333;">Para ativar a sua conta, clique no botão abaixo:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="https://softskills-three.vercel.app/login?email=${destinatario}&password_util=${passwordTemporaria}" target="_blank" style="background-color: #3b5b84; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">Ativar Conta</a>
    </div>

    <p style="font-size: 14px; color: #888;">Se não foi você quem solicitou esta conta, por favor ignore este e-mail.</p>
    
    <br />
    <p style="font-size: 14px; color: #888;">Com os melhores cumprimentos,<br><strong>Equipa SoftSkills 💙</strong></p>
  </div>
</div>

`
  });
}

async function enviarEmailVerificaCode(destinatario, codigo) {
  return transporter.sendMail({
    from: '"SoftSkills" <softskills.service@gmail.com>',
    to: destinatario,
    subject: 'Codigo de Verificação da SoftSkills',
    html: `
       <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 40px 20px;">
        <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #3085d6; text-align: center; margin-bottom: 20px;">🚀 Verificação de Segurança</h2>
          <p style="font-size: 16px; color: #333333; text-align: center;">Utilize o código abaixo para continuar o seu processo de verificação.</p>
          <div style="margin: 30px 0; text-align: center;">
            <span style="font-size: 28px; font-weight: bold; background-color: #e6f7ff; color: #00A9E0; padding: 15px 25px; border-radius: 8px; display: inline-block; letter-spacing: 2px;">${codigo}</span>
          </div>
          <p style="font-size: 14px; color: #666666; text-align: center;">Este código é válido por <strong>1 minuto</strong>.</p>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
          <p style="font-size: 12px; color: #999999; text-align: center;">Se você não solicitou este código, pode ignorar este e-mail.</p>
          <p style="font-size: 12px; color: #999999; text-align: center;">Equipa SoftSkills 💙</p>
        </div>
      </div>
    `
  });
}

async function enviarEmailConfirmacaoInscricao(nome_formando, destinatario, nome_curso, data_inicio) {
  const dataInicio = data_inicio.split('T');
  return transporter.sendMail({
    from: '"SoftSkills" <softskills.service@gmail.com>',
    to: destinatario,
    subject: `✅ Bem-vindo ao curso ${nome_curso}`,
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 40px 20px;">
    <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
      <h2 style="color: #3085d6; text-align: center; margin-bottom: 20px;">🎓 Inscrição Confirmada</h2>
      <p style="font-size: 16px; color: #333333; text-align: center;">Olá <strong>${nome_formando}</strong>, sua inscrição no curso <strong>${nome_curso}</strong> foi realizada com sucesso!</p>
      
      <div style="margin: 30px 0; text-align: center;">
        <span style="font-size: 18px; font-weight: bold; background-color: #e6f7ff; color: #00A9E0; padding: 12px 20px; border-radius: 8px; display: inline-block;">
          📅 Início do curso: ${dataInicio}
        </span>
      </div>

      <div style="text-align: center; margin: 30px 0;">
        <a href="https://softskills-three.vercel.app/home" target="_blank" style="background-color: #3b5b84; color: #ffffff; padding: 12px 25px; text-decoration: none; font-weight: bold; border-radius: 8px; display: inline-block;">
          Ir para a SoftSkills
        </a>
      </div>

      <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
      <p style="font-size: 12px; color: #999999; text-align: center;">Se você não realizou esta inscrição, pode ignorar este e-mail.</p>
      <p style="font-size: 12px; color: #999999; text-align: center;">Equipa SoftSkills 💙</p>
    </div>
  </div>
    `
  });
}

async function enviarEmailUserBloqueado(destinatario) {
  return transporter.sendMail({
    from: '"SoftSkills" <softskills.service@gmail.com>',
    to: destinatario,
    subject: '⚠️ Conta Bloqueada - SoftSkills',
    html: `
       <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 40px 20px;">
        <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #d32f2f; text-align: center;">⚠️ A sua conta foi bloqueada</h2>
          <p style="font-size: 16px; color: #333333; line-height: 1.6;">
            Exmo.(a) Utilizador(a),<br><br>
            Informamos que a sua conta na plataforma <strong style="color: #1976d2;">SoftSkills</strong> foi <strong style="color: #d32f2f;">temporariamente bloqueada</strong> devido a atividades que violam os nossos termos de utilização ou políticas internas.<br><br>
            Caso considere que se trata de um erro, ou deseje obter mais informações sobre esta situação, poderá entrar em contacto com a nossa equipa de suporte através do endereço <a href="mailto:softskills.service@gmail.com" style="color: #1976d2; text-decoration: none;">softskills.service@gmail.com</a>.<br><br>
            Agradecemos a sua compreensão.<br><br>
            Com os melhores cumprimentos,<br>
            <strong>Equipa SoftSkills</strong> 💼
          </p>
        </div>
      </div>
    `
  });
}

async function enviarEmailUserDesbloqueado(destinatario) {
  return transporter.sendMail({
    from: '"SoftSkills" <softskills.service@gmail.com>',
    to: destinatario,
    subject: '✅ Conta Desbloqueada - SoftSkills',
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f6f8; padding: 40px 20px;">
        <div style="max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 10px; padding: 30px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);">
          <h2 style="color: #2e7d32; text-align: center;">✅ A sua conta foi desbloqueada</h2>
          <p style="font-size: 16px; color: #333333; line-height: 1.6;">
            Exmo.(a) Utilizador(a),<br><br>
            Temos o prazer de informar que a sua conta na plataforma <strong style="color: #1976d2;">SoftSkills</strong> foi <strong style="color: #2e7d32;">reativada</strong> com sucesso e já se encontra totalmente operacional.<br><br>
            Agradecemos a sua paciência durante o período de bloqueio e lamentamos qualquer inconveniente que a situação possa ter causado.<br><br>
            Se necessitar de algum esclarecimento adicional, estamos inteiramente ao dispor através do e-mail <a href="mailto:softskills.service@gmail.com" style="color: #1976d2; text-decoration: none;">softskills.service@gmail.com</a>.<br><br>
            Com os melhores cumprimentos,<br>
            <strong>Equipa SoftSkills</strong> 💼
          </p>
        </div>
      </div>
    `
  });
}


module.exports = { sendEmail, enviarEmailVerificaCode, enviarEmailConfirmacaoInscricao, enviarEmailUserBloqueado, enviarEmailUserDesbloqueado };