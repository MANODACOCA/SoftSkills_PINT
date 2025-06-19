

const CreateCourse = () => {
    
    
    const handleChange = () => {
    }

    return (
    <div className='form-group'>
        {error && <div className="alert alert-danger mt-2">{error}</div>}
        {successMessage && <div className="alert alert-success mt-2">{successMessage}</div>}

        <form onSubmit={handleSubmit}>
        <div className='col-md-10 mx-auto'>

            <div className='mt-2'>
            <label className='form-label'>Nome do Curso</label>
            <input type="text" name="nome_curso" className='form-control' value={formData.nome_curso} onChange={handleChange} required />
            </div>

            <div className='mt-2'>
            <label className='form-label'>Descrição do Curso</label>
            <textarea name="descricao_curso" className='form-control' rows="4" value={formData.descricao_curso} onChange={handleChange} required />
            </div>

            <div className='row mt-2'>
            <div className='col'>
                <label className='form-label'>Início da Inscrição</label>
                <input type="date" name="data_inicio_inscricao" className='form-control' value={formData.data_inicio_inscricao} onChange={handleChange} required />
            </div>
            <div className='col'>
                <label className='form-label'>Fim da Inscrição</label>
                <input type="date" name="data_fim_inscricao" className='form-control' value={formData.data_fim_inscricao} onChange={handleChange} required />
            </div>
            </div>

            <div className='row mt-2'>
            <div className='col'>
                <label className='form-label'>Início do Curso</label>
                <input type="date" name="data_inicio_curso" className='form-control' value={formData.data_inicio_curso} onChange={handleChange} required />
            </div>
            <div className='col'>
                <label className='form-label'>Fim do Curso</label>
                <input type="date" name="data_fim_curso" className='form-control' value={formData.data_fim_curso} onChange={handleChange} required />
            </div>
            </div>

            <div className='mt-2'>
            <label className='form-label'>Idioma</label>
            <input type="text" name="idioma" className='form-control' value={formData.idioma} onChange={handleChange} required />
            </div>

            <div className='mt-2'>
            <label className='form-label'>Horas do Curso</label>
            <input type="number" step="0.5" name="horas_curso" className='form-control' value={formData.horas_curso} onChange={handleChange} required />
            </div>

            <div className='mt-2'>
            <label className='form-label'>Contador de Formandos</label>
            <input type="number" name="contador_formandos" className='form-control' value={formData.contador_formandos} onChange={handleChange} required />
            </div>

            <div className='mt-2'>
            <label className='form-label'>Imagem (URL ou nome de ficheiro)</label>
            <input type="text" name="imagem" className='form-control' value={formData.imagem} onChange={handleChange} required />
            </div>

            <div className='row mt-2'>
            <div className='col'>
                <label className='form-label'>Curso Assíncrono</label>
                <select name="isassincrono" className='form-select' value={formData.isassincrono} onChange={handleChange}>
                <option value="">--Escolher--</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
                </select>
            </div>
            <div className='col'>
                <label className='form-label'>Curso Síncrono</label>
                <select name="issincrono" className='form-select' value={formData.issincrono} onChange={handleChange}>
                <option value="">--Escolher--</option>
                <option value="true">Sim</option>
                <option value="false">Não</option>
                </select>
            </div>
            </div>

            <div className='mt-2'>
            <label className='form-label'>Tópico</label>
            <select name="id_topico" className='form-select' value={formData.id_topico} onChange={handleChange} required>
                <option value="">--Escolher tópico--</option>
                {topicos.map(t => (
                <option key={t.id_topico} value={t.id_topico}>{t.nome_topico}</option>
                ))}
            </select>
            </div>

            {/* Este campo depende de autenticação */}
            <input type="hidden" name="id_gestor_administrador" value={formData.id_gestor_administrador} />

            <button type="submit" className='btn btn-success mt-3'>Criar Curso</button>
        </div>
        </form>
    </div>
    );

}

export default CreateCourse;