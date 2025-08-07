// function gerarHtmlCertificado({ nomeFormando, nomeCurso, dataConclusao, notaFinal }) {
//   return `
//     <html>
//       <head>
//         <style>
//           body { font-family: Arial, sans-serif; padding: 40px; }
//           h1 { color: #2c3e50; }
//           .certificado { border: 2px solid #2980b9; border-radius: 20px; padding: 40px; }
//         </style>
//       </head>
//       <body>
//         <div class="certificado">
//           <h1>Certificado de Conclusão</h1>
//           <p>O colaborador <strong>${nomeFormando}</strong> concluiu o curso <strong>${nomeCurso}</strong> em ${dataConclusao} com nota final ${notaFinal ?? 'N/A'}.</p>
//         </div>
//       </body>
//     </html>
//   `;
// }
// module.exports = { gerarHtmlCertificado };


function gerarHtmlCertificado({
  nomeFormando,
  nomeCurso,
  dataInicio,
  dataConclusao,
  notaFinal,
  nomeFormador = '',
  dataEmissao = new Date().toLocaleDateString('pt-PT'),
  logoUrl = ''
}) {
  return `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8" />
  <title>Certificado de Conclusão</title>
  <style>
    :root {
      --cor-principal: #3b5b84;
      --cor-secundaria: #00A9E0;
      --cor-secundaria-rgba: #00a8e024;
    }

    @page {
      size: A4;
      margin: 0;
    }

    * {
      box-sizing: border-box;
    }

  body {
  margin: 0;
  background: #f2f2f2;
  font-family: 'Times New Roman', serif;

  /* Centralização com Flexbox */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

    .certificado {
      width: 210mm;
      height: 297mm;
      background: white;
      padding: 40mm 30mm;
      position: relative;
      border: 8px double var(--cor-principal);
    }

    .faixa-topo {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 15mm;
      background-color: var(--cor-principal);
    }

    .faixa-baixo {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 10mm;
      background-color: var(--cor-secundaria);
    }

    .cabecalho {
      text-align: center;
      margin-top: 20px;
    }

    .titulo {
      font-size: 42px;
      font-weight: bold;
      color: var(--cor-principal);
      margin-bottom: 0;
    }

    .linha-decorativa {
      width: 100px;
      height: 3px;
      background-color: var(--cor-secundaria);
      margin: 15px auto;
    }

    .subtitulo {
      font-size: 20px;
      color: #333;
      margin-bottom: 40px;
    }

    .conteudo {
      text-align: center;
      font-size: 18px;
      line-height: 1.8;
      max-width: 700px;
      margin: 0 auto;
      color: #111;
    }

    .nome-formando {
      font-size: 26px;
      font-weight: bold;
      color: var(--cor-secundaria);
      margin: 20px 0;
    }

    .curso {
      font-style: italic;
      color: #222;
    }

.assinaturas {
  display: flex;
  justify-content: center; /* Em vez de space-between */
  margin-top: 60px;
  padding: 0 20px;
}

.assinatura {
  text-align: center;
  width: auto; /* Ou remova o width */
}

    .assinatura hr {
      border: none;
      border-top: 1px solid #333;
      margin-bottom: 5px;
    }

    .rodape {
      position: absolute;
      bottom: 25mm;
      left: 0;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #777;
    }

    .logo {
      position: absolute;
      top: 20mm;
      left: 30mm;
      height: 50px;
    }
  </style>
</head>
<body>
  <div class="certificado">
    <div class="faixa-topo"></div>
    <div class="faixa-baixo"></div>

     ${logoUrl ? `<img class="logo" src="${logoUrl}" alt="Logo da Empresa">` : ''}

    <div class="cabecalho">
  <h1 class="titulo">Certificado de Conclusão</h1>
  <div class="linha-decorativa"></div>
  <p class="subtitulo">Certificamos que</p>
</div>

<div class="conteudo">
  <div class="nome-formando">${nomeFormando}</div>
  concluiu, com aproveitamento, o curso <span class="curso">${nomeCurso}</span>, realizado no período de 
  <strong>>${dataInicio || '-'}</strong> a <strong>${dataConclusao || '-'}</strong>, tendo obtido a classificação final de <strong>[NOTA]</strong>.
  <br /><br />
  Este certificado é emitido como reconhecimento da conclusão e do cumprimento de todos os requisitos.
</div>

<div class="assinaturas">
  <div class="assinatura">
      <div>${nomeFormador || ''}</div>
    <hr />
    <div>Formador Responsável</div>
  </div>
</div>

<div class="rodape">
  Emitido em ${dataEmissao} &nbsp;•&nbsp; https://softskills-three.vercel.app/
</div>

</body>
</html>
  `;
}

module.exports = { gerarHtmlCertificado };