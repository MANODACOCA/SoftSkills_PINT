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
  <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h2 style="color: #3085d6;">Bem-vindo à SoftSkills!</h2>
      <p>Olá,</p>
      <p>A sua conta foi criada com sucesso.</p>
      <p><strong>Password temporária:</strong></p>
      <p style="font-size: 18px; font-weight: bold; color: #00A9E0;">${passwordTemporaria}</p>
      <p>Será necessário alterar esta password no seu primeiro login.</p>
      <hr style="margin: 30px 0;">
      <p>Para ativar a sua conta, clique no botão abaixo:</p>
      <div style="text-align: center; margin: 20px 0;">
       <a href="http://localhost:5173/login?email=${destinatario}&password_util=${passwordTemporaria}" target="_blank" style="background-color: #3085d6; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">Ativar Conta</a>
      </div>
      <p>Se não foi você que solicitou esta conta, por favor ignore este e-mail.</p>
      <br>
      <p style="font-size: 14px; color: #888;">Com os melhores cumprimentos,<br>Equipa SoftSkills</p>
    </div>
  </div>
`
  });
}

async function enviarEmailVerificaCode(destinatario, codigo){
  return transporter.sendMail({
     from: '"SoftSkills" <softskills.service@gmail.com>',
     to: destinatario,
     subject: 'Codigo de Verificação da SoftSkills',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="color: #3085d6;">Código de Verificação</h2>
        <p>O seu código de verificação é:</p>
        <p style="font-size: 22px; font-weight: bold; color: #00A9E0;">${codigo}</p>
        <p>Este código é válido por 1 minuto.</p>
      </div>
    `
  });
}


module.exports = { sendEmail, enviarEmailVerificaCode };