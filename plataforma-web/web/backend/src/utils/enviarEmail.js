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
    from: '"Alberto Cunha" <11j.esam2021@gmail.com>',
    to: destinatario,
    subject: 'A sua conta na SoftSkills foi criada com sucesso',
    html: `<p>Olá,</p><p>A sua conta foi criada. A password temporária é: <strong>${passwordTemporaria}</strong></p><p>Irá ter de alterar a password no seu primeiro login..</p>
          <p>Use o seguinte link para ativar a conta:</p>`
  });
}

module.exports = sendEmail;