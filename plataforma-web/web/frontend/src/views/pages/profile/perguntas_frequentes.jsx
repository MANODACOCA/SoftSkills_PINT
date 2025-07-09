import React, { useEffect, useState } from 'react';
import { CiMail } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";


const PerguntasFrequentes = () => {
    const [open, setOpen] = useState(null);

    const toggleItem = (id) => {
        setOpen(open === id ? null : id);
    };

    const faqData = [
        {
            id: 1,
            question: "Os cursos têm prazo para conclusão?",
            answer: "Sim, cada curso tem um prazo específico definido no início."
        },
        {
            id: 2,
            question: "Como posso aceder ao curso depois da inscrição?",
            answer: "Após a inscrição, o curso estará disponível na sua área pessoal."
        },
        {
            id: 3,
            question: "Os cursos são em direto ou gravados?",
            answer: "Oferecemos tanto cursos em direto quanto gravados."
        },
        {
            id: 4,
            question: "Posso aceder ao curso a partir do telemóvel?",
            answer: "Sim, temos uma aplicação mobile para os colaboradores totalmente gratuita."
        },
        {
            id: 5,
            question: "Quem pode inscrever-se nos cursos?",
            answer: "Todos os colaboradores da empresa podem inscrever-se."
        },
        {
            id: 6,
            question: "O que devo fazer se tiver problemas de acesso?",
            answer: "Entre em contacto com o suporte técnico através do email: suporte@softinsa.com."
        }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div>
            {/* Perguntas Frequentes */}
            <div>
                <div className="d-flex align-items-center gap-4 w-50 mb-4">
                    <h2 className="mb-0">Perguntas Frequentes</h2>
                </div>
                <div className="accordion" id="faqAccordion">
                    {faqData.map((faq) => (
                        <div key={faq.id} className="accordion-item border rounded-3 mb-3" style={{ border: '1px solid #e9ecef' }}>
                            <h2 className="accordion-header">
                                <button
                                    onClick={() => toggleItem(faq.id)}
                                    className="accordion-button collapsed fw-normal text-dark bg-white"
                                    type="button"
                                    style={{
                                        boxShadow: 'none',
                                        borderRadius: '12px',
                                        padding: '1.25rem 1.5rem'
                                    }}
                                >
                                    <span className="me-3 fw-bold">{faq.id}.</span>
                                    {faq.question}
                                </button>
                            </h2>
                            {open === faq.id && (
                                <div className="accordion-body pt-0 px-4 pb-4">
                                    <p className="mb-0 text-muted" style={{ paddingLeft: '2rem' }}>
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            {/* CONTACTOS */}
            <div className='mt-5'>
                <div className="d-flex align-items-center mb-3">
                    <h2 className="mb-0">Contactos</h2>
                </div>
                <div className="d-flex flex-column">
                    <p>Tem alguma dúvida ou precisa de ajuda? A nossa equipa de suporte está disponível para o ajudar com quaisquer questões relacionadas com a plataforma de cursos</p>
                    <div>
                        <div className='d-flex align-items-center'>
                            <h5><CiMail /> E-mail de suporte:</h5>
                        </div>
                        <p>suporte@softinsa.com</p>
                    </div>
                    <div>
                        <div className='d-flex align-items-center'>
                            <h5><IoMdTime /> Horário de Atendimento:</h5>
                        </div>
                        <p>Segunda a Sexta-feira, das 9:00 às 18:00</p>
                    </div>
                    <p><strong>Responderemos o seu pedido o mais breve possível!</strong></p>
                </div>
            </div>

        </div>
    );
};

export default PerguntasFrequentes;
