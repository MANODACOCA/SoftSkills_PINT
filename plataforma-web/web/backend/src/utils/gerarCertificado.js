function gerarHtmlCertificado({ nomeFormando, nomeCurso, dataConclusao, notaFinal }) {
  return `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          h1 { color: #2c3e50; }
          .certificado { border: 2px solid #2980b9; border-radius: 20px; padding: 40px; }
        </style>
      </head>
      <body>
        <div class="certificado">
          <h1>Certificado de Conclusão</h1>
          <p>O colaborador <strong>${nomeFormando}</strong> concluiu o curso <strong>${nomeCurso}</strong> em ${dataConclusao} com nota final ${notaFinal ?? 'N/A'}.</p>
        </div>
      </body>
    </html>
  `;
}
module.exports = { gerarHtmlCertificado };