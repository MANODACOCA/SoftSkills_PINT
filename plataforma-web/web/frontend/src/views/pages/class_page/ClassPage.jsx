import './ClassPage.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClassHeader from '../../components/class_header/ClassHeader';
import VideoPlayer from '../../components/video_player/VideoPlayer';
import CourseModule from '../../components/course_module/CourseModule';
import TrabalhosList from '../../components/envents_(trabalhos)/trabalhos_list';
import { Spinner, Alert, Tabs, Tab, Card } from 'react-bootstrap';
import { getAulasAndMateriaApoioForCurso } from '../../../api/aulas_axios';
import {
    FaVideo,
    FaFileAlt,
    FaFilePowerpoint,
    FaFileImage,
    FaFileAudio,
    FaFilePdf,
    FaLink,
    FaFile,
    FaInfoCircle,
    FaUserTie
} from 'react-icons/fa';



const ClassPage = () => {
    const navigate = useNavigate();
    const [curso, setCurso] = useState(null);
    const [aulas, setAulas] = useState([]);
    const [aulaAtual, setAulaAtual] = useState(null); // Add state for current class
    const [materialApoio, setMaterialApoio] = useState([]);
    const [carregar, setCarregar] = useState(true);
    const [erro, setErro] = useState(null);

    const { cursoId } = useParams();

    const carregarAulasEMaterialApoio = async () => {
        try {
            setCarregar(true);

            const dados = await getAulasAndMateriaApoioForCurso(cursoId);

            setCurso(dados.dadosCurso || []);
            setAulas(dados.todasAulas || []);
            setMaterialApoio(dados.materialApoio || []);
            setAulaAtual((dados.todasAulas && dados.todasAulas.length > 0) ? dados.todasAulas[0] : null);

        } catch (error) {
            console.error("Erro ao carregar aula, conteudos e material de apoio:", error);
            setErro("Ocorreu um erro ao carregar a aula. Tente novamente mais tarde.");
        } finally {
            setCarregar(false);
        }
    };

    //vai andar uma aula para atrás
    const handlePrevious = () => {
        if (!aulaAtual || !aulas.length) return;

        const index = aulas.findIndex(a => a.id_aula.toString() === aulaAtual.id_aula.toString());

        if (index > 0) {
            const anterior = aulas[index - 1];
            setAulaAtual(anterior);
        }
    };

    //vai andar uma aula para frente
    const handleNext = () => {
        if (!aulaAtual || !aulas.length) return;

        const index = aulas.findIndex(a => a.id_aula.toString() === aulaAtual.id_aula.toString());
        if (index < aulas.length - 1) {
            const proxima = aulas[index + 1];
            setAulaAtual(proxima);
        }
    };


    const moduleData = aulaAtual ? {
        title: aulaAtual.nome_aula,
        aulas: aulaAtual.conteudos ? aulaAtual.conteudos.map(c => ({
            id: c.id_conteudo,
            titulo: c.nome_conteudo,
            tipo: c.id_formato === 1 ? 'video' : 'documento',
            duracao: c.tempo_duracao
        })) : []
    } : { title: "Aula não disponível", aulas: [] };

    const nomeCurso = curso ? curso.nome_curso : "Curso não encontrado";
    const imagemCurso = curso ? curso.imagem : `https://ui-avatars.com/api/?name=${encodeURIComponent(nomeCurso)}&background=random&bold=true`;
    const tipoCurso = curso ? (curso.issincrono ? 'Síncrono' : 'Assíncrono') : "N/D";
    const numeroAulas = aulas ? aulas.length : 0;
    const tempoTotal = curso ? (curso.horas_curso || "N/D") : "N/D";
    const videoUrl = aulaAtual ? aulaAtual.caminho_url : "";
    const tituloAula = aulaAtual ? aulaAtual.nome_aula : "Aula não disponível";

    const iconMapById = {
        1: <FaVideo className="text-primary" />,
        2: <FaFilePdf className="text-danger" />,
        3: <FaFilePowerpoint className="text-warning" />,
        4: <FaFileAlt className="text-success" />,
        5: <FaFileImage className="text-pink-500" />,
        6: <FaFileAudio className="text-indigo-500" />,
        7: <FaInfoCircle className="text-cyan-600" />,
        8: <FaLink className="text-blue-500" />,
    };

    const renderIconoFormato = (id) => {
        return iconMapById[id] || <FaFile className="text-secondary" />;
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (cursoId) {
            carregarAulasEMaterialApoio();
        }
    }, [cursoId]);

    useEffect(() => {
        if (aulaAtual) {
            console.log(aulaAtual);
        }
    }, [aulaAtual]);

    return (
        <div className="container-fluid pt-4">

            <div className="row">
                <div className="col-12">
                    <ClassHeader
                        nomeCurso={nomeCurso}
                        tipo={tipoCurso}
                        totalAulas={numeroAulas}
                        tempoTotal={tempoTotal}
                        onPrevious={handlePrevious}
                        onNext={handleNext}
                        cursoTipo={curso?.issincrono ? 'sincrono' : 'assincrono'}
                    />
                </div>
            </div>

            <div className="col-12">
                {carregar ? (
                    <div className="text-center py-5">
                        <Spinner animation="border" />
                    </div>
                ) : (
                    <>
                        {tipoCurso === 'Assíncrono' && (
                            <VideoPlayer
                                key={videoUrl}
                                videoUrl={videoUrl}
                                erro={erro}
                            />
                        )}
                        {tipoCurso === 'Síncrono' && (
                            <img
                                className='rounded-4'
                                src={imagemCurso} alt="imagem do curso"
                                style={{ width: "100%", height: "575px", objectFit: "cover" }}
                            />
                        )}

                        <h1 className="mb-3 mt-3">{tituloAula}</h1>

                        <Tabs defaultActiveKey="aulas" className="mb-4 nav-justified custom-tabs">
                            <Tab eventKey="aulas" title={<span className='fw-bold'>AULAS</span>}>

                                <div className="mt-4">
                                    <h1>Conteúdos</h1>
                                    {aulas && aulas.length > 0 ? aulas.map((aula, index) => (
                                        <CourseModule
                                            key={aula.id_aula}
                                            module={{
                                                id: aula.id_aula,
                                                title: aula.nome_aula,
                                                tempo_duracao: aula.tempo_duracao,
                                                conteudo: aula.caminho_url,
                                                dataAula: aula.data_aula,
                                                aulas: aula.conteudos.map(c => ({
                                                    id: c.id_conteudo,
                                                    titulo: c.nome_conteudo,
                                                    tipo: c.id_formato,
                                                    conteudo: c.conteudo
                                                }))
                                            }}
                                            index={index}
                                            aulaAtualId={aulaAtual?.id_aula}
                                            usarAulaAtualId
                                            onChangeAula={() => {
                                                if (curso.issincrono) {
                                                    setAulaAtual(aula); 
                                                } else {
                                                    setAulaAtual(aula);
                                                    window.scrollTo(0, 0);
                                                }
                                            }}
                                            cursoTipo={curso.issincrono ? 'sincrono' : 'assincrono'}
                                        />
                                    )) : "Sem aulas disponíveis para este curso."}
                                </div>
                            </Tab>

                            <Tab eventKey="material" title={<span className='fw-bold'>MATERIAL DE APOIO</span>}>
                                {materialApoio && materialApoio.length > 0 ? (
                                    <div className="mt-4">
                                        <h2>Material de Apoio</h2>
                                        <div className="row g-4 mt-3">
                                            {materialApoio.map((material) => (
                                                <div className="col-md-6 col-lg-4" key={material.id_material_apoio}>
                                                    <Card className="h-100 shadow-sm">
                                                        <Card.Body>
                                                            <div className="d-flex align-items-center mb-3">
                                                                {renderIconoFormato(material.id_formato)}
                                                                <h5 className="mb-0 ms-2">
                                                                    Material {material.id_material_apoio}
                                                                </h5>
                                                            </div>
                                                            <Card.Text>
                                                                {material.conteudo}
                                                            </Card.Text>
                                                            <div className='text-end'>
                                                                <a
                                                                    href={material.conteudo}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="btn btn-primary btn-sm mt-2"
                                                                >
                                                                    Acessar Link
                                                                </a>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <p className="mt-4">Não há material de apoio disponível para esta aula.</p>
                                )}
                            </Tab>

                            {curso.issincrono && (
                                <Tab eventKey="eventos" title={<span className='fw-bold'>TRABALHOS</span>}>
                                    
                                    <div className="mt-4">
                                        <h2>Trabalhos</h2>
                                        <p>Não há trabalhos programados para este curso no momento.</p>
                                    </div> 
                                </Tab>
                            )}

                            <Tab eventKey="sobre" title={<span className='fw-bold'>SOBRE</span>}>
                                {curso ? (
                                    <div className="mt-4">
                                        <h2>Sobre o Curso</h2>
                                        <p className="mt-3">{curso.descricao_curso}</p>

                                        {curso.issincrono && curso.sincrono && curso.sincrono.id_formador_formadore && (
                                            <div className="mt-4">
                                                <h2>Formador</h2>
                                                <div className="d-flex align-items-start mt-3">
                                                    <div className="me-3">
                                                        <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                                                            <FaUserTie className="text-white fs-3" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <h4>
                                                            {curso.sincrono.id_formador_formadore.id_formador_utilizador?.nome_util || "Formador não especificado"}
                                                        </h4>
                                                        <p className="text-muted mb-3">
                                                            {curso.sincrono.id_formador_formadore.email_formador || ""}
                                                        </p>
                                                        <p>
                                                            {curso.sincrono.id_formador_formadore.descricao_formador || "Sem descrição disponível para este formador."}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <p className="mt-4">Informações não disponíveis para este curso.</p>
                                )}
                            </Tab>
                        </Tabs>
                    </>
                )}
            </div>
        </div>
    );
};

export default ClassPage;
