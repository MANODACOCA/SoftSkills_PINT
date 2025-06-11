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
      <p style="font-size: 20px; font-weight: bold; background-color: #e6f7ff; color: #00A9E0; padding: 12px 20px; border-radius: 8px; display: inline-block; letter-spacing: 1px;">${passwordTemporaria}</p>
    </div>

    <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />

    <p style="font-size: 15px; color: #333;">Para ativar a sua conta, clique no botão abaixo:</p>
    <div style="text-align: center; margin: 30px 0;">
      <a href="http://localhost:5173/login?email=${destinatario}&password_util=${passwordTemporaria}" target="_blank" style="background-color: #3085d6; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; font-size: 16px;">Ativar Conta</a>
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
          <p style="font-size: 12px; color: #999999; text-align: center;">Equipe SoftSkills 💙</p>
        </div>
      </div>
    `
  });
}


module.exports = { sendEmail, enviarEmailVerificaCode };