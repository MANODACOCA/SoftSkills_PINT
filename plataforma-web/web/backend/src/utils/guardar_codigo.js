
const codigos = new Map();

function guardarCodigo(email, codigo){
    codigos.set(email, { codigo, criadoEm: Date.now() });
}

function verificarCodigoCerto(email, inputCodigo){
    const entrada = codigos.get(email);
    if(!entrada) return false;

    const expirou = Date.now() - entrada.criadoEm > 1.5 * 60 * 1000; 
    if(expirou) {
        codigos.delete(email);
        return false;
    }

    return entrada.codigo === inputCodigo;
}

function apagarCodigo(email) {
    codigos.delete(email);
}

module.exports = { guardarCodigo, verificarCodigoCerto, apagarCodigo };
