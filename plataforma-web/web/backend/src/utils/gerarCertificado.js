const logoUrl = '../assets/images/logoCertificado.png';

function gerarHtmlCertificado({
  nomeFormando,
  nomeCurso,
  dataInicio,
  dataConclusao,
  notaFinal,
  nomeFormador,
  isSincrono,
  dataEmissao = new Date().toLocaleDateString('pt-PT')
}) {
  return `
<!DOCTYPE html>
<html lang="pt">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Certificado de Conclusão</title>
  <style>
    :root {
      --brand-primary: #3b5b84;
      --brand-accent: #00A9E0;
      --brand-sky: #e9f2fa;
      --ink: #1a1a1a;
      --paper: #fff;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html,
    body {
      height: 100%;
    }

    body {
      font-family: 'Segoe UI', system-ui, sans-serif;
      background-color: var(--brand-sky);
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 20px;
    }

    .wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .certificado {
      position: relative;
      width: 210mm;
      height: 297mm;
      background: var(--paper);
      border-radius: 10px;
      border: 10px double var(--brand-primary);
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
      padding: 40mm 30mm;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .faixa-topo,
    .faixa-baixo {
      position: absolute;
      left: 0;
      right: 0;
    }

    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 250px;
      margin-bottom: 40px;
    }

    h1 {
      margin-top: 40px;
      font-size: 36px;
      font-weight: bold;
      color: var(--brand-primary);
    }

    .hr {
      width: 80px;
      height: 4px;
      background: var(--brand-accent);
      border-radius: 2px;
      margin: 10px auto 20px;
    }

    .lead {
      font-size: 18px;
      color: #333;
    }

    .nome {
      margin-top: 18px;
      font-size: 26px;
      font-weight: bold;
      color: var(--brand-accent);
    }

    .texto {
      margin-top: 14px;
      font-size: 18px;
      line-height: 1.6;
      max-width: 700px;
    }

    .curso {
      font-style: italic;
      color: var(--brand-primary);
    }

    .assinaturas {
      margin-top: 50px;
    }

    .assinatura {
      text-align: center;
    }

    .assinatura hr {
      width: 200px;
      margin: 8px auto 6px;
      border: none;
      border-top: 1px solid #444;
    }

    .rodape {
      position: absolute;
      bottom: 20mm;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #777;
    }

    .botao-container {
      padding: 35px;
    }

    .botao-imprimir {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      background-color: var(--brand-primary);
      color: white;
      border: none;
      padding: 12px 24px;
      font-size: 16px;
      cursor: pointer;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }

    .botao-imprimir:hover {
      background-color: #2c4665;
    }

    /* Impressão A4 */
    @media print {
      .botao-container {
        display: none;
      }

      body {
        background: white;
        padding: 0;
      }

      .certificado {
        width: 210mm;
        height: 297mm;
        box-shadow: none;
        border-radius: 0;
      }
    }

    @page {
      size: A4;
      margin: 0;
    }
  </style>
</head>

<body>

  <div class="wrapper">
    <article class="certificado">
      <div class="faixa-topo"></div>
      <div class="faixa-baixo"></div>

      ${logoUrl ? `<img class="logo" src="${logoUrl}" alt="Logo da Empresa">` : ''}

      <h1>Certificado de Conclusão</h1>
      <div class="hr"></div>
      <p class="lead">Certificamos que</p>

      <div class="nome">${nomeFormando}</div>

      <p class="texto">
        concluiu, com aproveitamento, o curso <span class="curso">"${nomeCurso}"</span>, realizado no período de
        <strong>${dataInicio || '-'}</strong> a <strong>${dataConclusao || '-'}</strong>
        ${isSincrono && notaFinal !== null ? `, tendo obtido a classificação final de <strong>${notaFinal}</strong>.` : '.'}
        <br><br>
        Este certificado é emitido como reconhecimento da conclusão e do cumprimento de todos os requisitos.
      </p>
      ${isSincrono && nomeFormador ? `
      <div class="assinaturas">
        <div class="assinatura">
          <div>${nomeFormador}</div>
          <hr />
          <div>Formador Responsável</div>
        </div>
      </div>
      ` : ''}

      <div class="rodape">
        Emitido em ${dataEmissao} • https://softskills-three.vercel.app/
      </div>
    </article>
  </div>

  <div class="botao-container">
    <button onclick="window.print()" class="botao-imprimir">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-download"
        viewBox="0 0 16 16">
        <path
          d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
        <path
          d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
      </svg>
      Transferir Certificado</button>
  </div>

</body>

</html>
  `;
}
module.exports = { gerarHtmlCertificado };