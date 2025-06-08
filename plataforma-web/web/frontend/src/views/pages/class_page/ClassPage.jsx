import './ClassPage.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ClassHeader from '../../components/class_header/ClassHeader';
import VideoPlayer from '../../components/video_player/VideoPlayer';
import CourseModule from '../../components/course_module/CourseModule';
import { Spinner, Alert, Tabs, Tab, Card } from 'react-bootstrap';
import { get_aulas, verificar_acesso_aula } from '../../../api/aulas_axios';
import { FaFilePdf, FaFileAlt, FaLink, FaUserTie } from 'react-icons/fa';


const ClassPage = () => {
    const navigate = useNavigate();
    const [curso, setCurso] = useState(null);
    const [aulas, setAulas] = useState([]);
    const [aulaAtual, setAulaAtual] = useState(null); // Add state for current class
    const [materialApoio, setMaterialApoio] = useState([]);
    const [carregar, setCarregar] = useState(true);
    const [erro, setErro] = useState(null); 

    const userId = 4;
    const { cursoId, aulaId } = useParams();

    const carregarAula = async () => {
        try {
            setCarregar(true);

            // Log the API call parameters
            console.log(`Chamando API com userId=${userId}, cursoId=${cursoId}`);
            
            const dados = await verificar_acesso_aula(userId, cursoId);
            console.log("Dados recebidos da API:", dados);
            
            setCurso(dados.curso || null);
            setAulas(dados.todasAulas || []);
            setMaterialApoio(dados.materialApoio || []);
            
            // Find the current aula from the list of aulas
            if (dados.todasAulas && dados.todasAulas.length > 0) {
                const aulaEncontrada = dados.todasAulas.find(aula => 
                    aula.id_aula.toString() === aulaId.toString()
                );
                
                if (aulaEncontrada) {
                    console.log("Aula encontrada:", aulaEncontrada);
                    setAulaAtual(aulaEncontrada);
                } else {
                    console.error("Aula não encontrada com ID:", aulaId);
                    setErro("Aula não encontrada");
                }
            } else {
                setErro("Nenhuma aula disponível para este curso");
            }
                
        } catch (error) {
            console.error("Erro ao carregar aula:", error);
            setErro("Ocorreu um erro ao carregar a aula. Tente novamente.");
        } finally {
            setCarregar(false);
        }
    };

    const handlePrevious = () => {
        if (!aulaAtual || !aulas.length) return;
        
        const index = aulas.findIndex(a => a.id_aula.toString() === aulaAtual.id_aula.toString());
        console.log("aulaAtual.id_aula:", aulaAtual?.id_aula);
        console.log("IDs das aulas:", aulas.map(a => a.id_aula));

        if (index > 0) {
            const anterior = aulas[index - 1];
            navigate(`/my/cursos/inscritos/curso/${cursoId}/aula/${anterior.id_aula}`);
            console.log("Navegando para aula anterior:", anterior.id_aula);
        }
    };

    const handleNext = () => {
        if (!aulaAtual || !aulas.length) return;
        
        const index = aulas.findIndex(a => a.id_aula.toString() === aulaAtual.id_aula.toString());
        if (index < aulas.length - 1) {
            const proxima = aulas[index + 1];
            navigate(`/my/cursos/inscritos/curso/${cursoId}/aula/${proxima.id_aula}`);
            console.log("Navegando para próxima aula:", proxima.id_aula);
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
    const tipoCurso = curso ? (curso.issincrono ? 'Síncrono' : 'Assíncrono') : "N/D";
    const numeroAulas = aulas ? aulas.length : 0;
    const tempoTotal = curso ? (curso.horas_curso || "N/D") : "N/D";
    const videoUrl = aulaAtual ? aulaAtual.caminho_url : "";
    const tituloAula = aulaAtual ? aulaAtual.nome_aula : "Aula não disponível";
    const descricaoAula = aulaAtual ? aulaAtual.descricao || "Sem descrição disponível." : "";

    const renderIconoFormato = (idFormato) => {
        switch (idFormato) {
            case 1: // PDF
                return <FaFilePdf className="fs-4 me-2 text-danger" />;
            case 2: // Link
                return <FaLink className="fs-4 me-2 text-primary" />;
            default: // Outros documentos
                return <FaFileAlt className="fs-4 me-2 text-secondary" />;
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        if (cursoId && aulaId) {
            carregarAula();
        }
    }, [cursoId, aulaId]);

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
                        <VideoPlayer
                            videoUrl={videoUrl}
                            erro={erro}
                        />

                        <h1 className="mb-3 mt-3">{tituloAula}</h1>

                        <Tabs defaultActiveKey="aulas" className="mb-4 nav-justified custom-tabs">
                            <Tab eventKey="aulas" title="Aulas">

                                <div className="mt-4">
                                    <h1>Conteúdos</h1>
                                    <CourseModule
                                        module={moduleData}
                                        index={0}
                                    />
                                </div>
                            </Tab>

                            <Tab eventKey="material" title="Material de Apoio">
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
                                                                <h5 className="mb-0">
                                                                    Material {material.id_material_apoio}
                                                                </h5>
                                                            </div>
                                                            <Card.Text>
                                                                {material.conteudo}
                                                            </Card.Text>
                                                            {material.id_formato === 2 && (
                                                                <a
                                                                    href={material.conteudo}
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    className="btn btn-primary btn-sm mt-2"
                                                                >
                                                                    Acessar Link
                                                                </a>
                                                            )}
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

                            <Tab eventKey="eventos" title="Eventos">
                                <div className="mt-4">
                                    <h2>Eventos</h2>
                                    <p>Não há eventos programados para esta aula no momento.</p>
                                    Quando a tabela de trabalhos estiver disponível, substituir por conteúdo dinâmico 
                                </div>
                            </Tab>

                            <Tab eventKey="sobre" title="Sobre">
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
