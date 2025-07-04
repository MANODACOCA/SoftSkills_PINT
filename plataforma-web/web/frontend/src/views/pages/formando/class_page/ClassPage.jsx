import './ClassPage.css';
import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import ClassHeader from '../../../components/class_header/ClassHeader';
import VideoPlayer from '../../../components/video_player/VideoPlayer';
import CourseModule from '../../../components/course_module/CourseModule';
import TrabalhosList from '../../../components/envents_(trabalhos)/trabalhos_list';
import TrabalhosEntrega from '../../../components/envents_(trabalhos)/trabalhos_entrega';
import { Spinner, Alert, Tabs, Tab, Card } from 'react-bootstrap';
import { getAulasAndMateriaApoioForCurso } from '../../../../api/aulas_axios';
import {
    FaFileAlt,
    FaFilePowerpoint,
    FaFileExcel,
    FaFileImage,
    FaFilePdf,
    FaLink,
    FaFile
} from 'react-icons/fa';
import { BsFiletypeTxt } from "react-icons/bs";

const ClassPage = () => {
    const API_URL = 'https://softskills-api.onrender.com/';
    const navigate = useNavigate();
    const [curso, setCurso] = useState(null);
    const [aulas, setAulas] = useState([]);
    const [aulaAtual, setAulaAtual] = useState(null);//aula atual
    const [materialApoio, setMaterialApoio] = useState([]);
    const [trabalhos, setTrabalhos] = useState([]);
    const [carregar, setCarregar] = useState(true);
    const [erro, setErro] = useState(null);

    const { cursoId } = useParams();

    const [searchParams, setSearchParams] = useSearchParams();
    const activeTab = searchParams.get('tab');

    const trabalhoIdSelecionado = searchParams.get('trabalho');
    const trabalhoSelecionado = trabalhos.find(t => t.id_trabalho.toString() === trabalhoIdSelecionado);

    const carregarAulasEMaterialApoio = async () => {
        try {
            setCarregar(true);

            const dados = await getAulasAndMateriaApoioForCurso(cursoId);
            console.log(dados);
            setCurso(dados.dadosCurso || []);
            setAulas(dados.todasAulas || []);
            setMaterialApoio(dados.materialApoio || []);
            setAulaAtual((dados.todasAulas && dados.todasAulas.length > 0) ? dados.todasAulas[0] : null);
            setTrabalhos(dados.dadosCurso.trabalhos || []);

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
        1: <FaFilePdf className="text-danger" />,
        2: <FaFilePowerpoint className="text-warning" />,
        3: <FaFileAlt className="text-success" />,
        4: <FaFileExcel className="text-success" />,
        5: <BsFiletypeTxt className="text-cyan-600" />,
        6: <FaFileImage className="text-pink-500" />,
        7: <FaLink className="text-blue-500" />,
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
        <>
            {carregar ? (
                <div className="text-center py-5">
                    <Spinner animation="border" />
                </div>
            ) : (
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

                                <h3 className="mb-3 mt-3">{tituloAula}</h3>

                                <Tabs defaultActiveKey="aulas"
                                    className="mb-4 nav-justified custom-tabs"
                                    activeKey={activeTab}
                                    onSelect={(tab) => setSearchParams({ tab: tab })}
                                >
                                    <Tab eventKey="aulas" title={<span className='fw-bold'>AULAS</span>}>

                                        <div className="mt-4">
                                            <h3 className='mb-4'>Conteúdos</h3>
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
                                                <h3>Material de Apoio</h3>
                                                <div className="row g-4 mt-1">
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
                                                {trabalhoIdSelecionado ? (
                                                    <TrabalhosEntrega
                                                        trabalho={trabalhoSelecionado}
                                                    />
                                                ) : (
                                                    <>
                                                        <h3 className='mb-4'>Trabalhos</h3>
                                                        {trabalhos && trabalhos.length > 0 ? trabalhos.map((trabalho, index) => (
                                                            <TrabalhosList
                                                                key={trabalho.id_trabalho}
                                                                trabalho={trabalho}
                                                                index={index}
                                                            />
                                                        )) : (
                                                            <p>Não há trabalhos programados para este curso no momento.</p>
                                                        )
                                                        }
                                                    </>
                                                )}
                                            </div>
                                        </Tab>
                                    )}

                                    <Tab eventKey="sobre" title={<span className='fw-bold'>SOBRE</span>}>
                                        {curso ? (
                                            <div className="bg-white p-4 rounded-4 shadow-sm mt-4 border-bottom">
                                                <h3 className='mb-4'>Sobre o Curso</h3>
                                                <p className="mt-3">{curso.descricao_curso}</p>

                                                {curso.issincrono && curso.sincrono && curso.sincrono.id_formador_formadore && (
                                                    <div className="mt-4">
                                                        <h3>Formador</h3>
                                                        <div className="d-flex align-items-start mt-4">
                                                            <div className="me-3">
                                                                <div className="rounded-circle bg-primary d-flex align-items-center justify-content-center" style={{ width: '60px', height: '60px' }}>
                                                                    <img
                                                                        src={curso.sincrono.id_formador_formadore.id_formador_utilizador?.img_util || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(curso.sincrono.id_formador_formadore.id_formador_utilizador?.nome_util || 'Formador')}`}
                                                                        onError={(e) => {
                                                                            e.target.onerror = null;
                                                                            e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(curso.sincrono.id_formador_formadore.id_formador_utilizador?.nome_util)}&background=random&bold=true`;
                                                                        }}
                                                                        alt="Foto do formador"
                                                                        className='rounded-circle'
                                                                        width="60"
                                                                        height="60"
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className='d-flex justify-content-between gap-5 mb-0'>
                                                                    <h4 className='mb-0'>
                                                                        {curso.sincrono.id_formador_formadore.id_formador_utilizador?.nome_util || "Formador não especificado"}
                                                                    </h4>
                                                                    <div>
                                                                        {curso.sincrono.id_formador_formadore.id_formador_utilizador.pais &&
                                                                            <small className='alert alert-success mb-0 py-1 px-2'>
                                                                                <i className='bi bi-geo-alt me-2'></i>
                                                                                {curso.sincrono.id_formador_formadore.id_formador_utilizador.pais}
                                                                            </small>
                                                                        }
                                                                    </div>

                                                                </div>
                                                                <small className="text-muted">
                                                                    {curso.sincrono.id_formador_formadore.id_formador_utilizador.email || ""}
                                                                </small>
                                                                <p className='mt-3'>
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
                </div >
            )}
        </>
    );
};

export default ClassPage;
