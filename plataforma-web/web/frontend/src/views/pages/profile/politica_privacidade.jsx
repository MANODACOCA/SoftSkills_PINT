import React, { useEffect, useState } from 'react';
import { CiMail } from "react-icons/ci";
import { IoMdTime } from "react-icons/io";


const PoliticaPrivacidade = () => {
    const [open, setOpen] = useState(null);

    const toggleItem = (id) => {
        setOpen(open === id ? null : id);
    };

    const faqData = [
        {
            id: 1,
            question: "Tipos de dados que recolhemos",
            answer: "Neste projeto, são recolhidas apenas as informações estritamente necessárias para o seu funcionamento, como dados de identificação, contactos ou informações de uso da aplicação. Estes dados permitem melhorar a experiência do utilizador, garantir a segurança do sistema e acompanhar o desempenho do projeto. Toda a informação é tratada de forma confidencial e em conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD)."
        },
        {
            id: 2,
            question: "Utilização dos seus dados pessoais",
            answer: "Utilizamos as tuas informações pessoais apenas para os fins a que deste consentimento, como melhorar a tua experiência, prestar serviços personalizados e garantir o bom funcionamento da plataforma. Os teus dados são tratados com segurança, não são partilhados com terceiros sem autorização, e podes, a qualquer momento, consultar, alterar ou eliminar as tuas informações. Respeitamos sempre a tua privacidade e cumprimos a legislação em vigor, nomeadamente o RGPD."
        },
        {
            id: 3,
            question: "Divulgação dos seus dados pessoais",
            answer: "As informações pessoais que partilhas podem ser acedidas por entidades autorizadas, como empresas, plataformas digitais ou serviços públicos, conforme o teu consentimento e a legislação aplicável, como o Regulamento Geral sobre a Proteção de Dados (RGPD). Esses dados podem ser utilizados para finalidades específicas, como melhorar serviços, personalizar conteúdos, enviar comunicações ou cumprir obrigações legais. Tens sempre o direito de saber quem tem acesso aos teus dados, para que fins são usados, e podes solicitar a sua correção ou eliminação a qualquer momento."
        },
        {
            id: 4,
            question: "Direitos do titular dos dados",
            answer: "Enquanto titular dos dados, tens o direito de aceder às tuas informações pessoais, solicitar a sua correção, eliminação ou portabilidade, bem como limitar ou opor-te ao seu tratamento. Podes exercer estes direitos a qualquer momento, entrando em contacto com a equipa responsável pela proteção de dados. Respeitamos integralmente os teus direitos, conforme definido pelo Regulamento Geral sobre a Proteção de Dados (RGPD)."
        },
        {
            id: 5,
            question: "Conservação dos dados",
            answer: "Os teus dados pessoais são armazenados apenas durante o período necessário para cumprir as finalidades para as quais foram recolhidos, ou conforme exigido por lei. Após esse período, os dados serão eliminados ou anonimizados de forma segura. Mantemos práticas rigorosas de segurança e retenção, garantindo a integridade e confidencialidade das tuas informações."
        },
        {
            id: 6,
            question: "Segurança no tratamento de dados",
            answer: "Adotamos medidas técnicas e organizativas para proteger os teus dados contra acesso não autorizado, perda, destruição ou alteração indevida. Utilizamos encriptação, autenticação e controlos de acesso para garantir a segurança das informações que tratamos. A segurança dos teus dados é uma prioridade e revemos regularmente os nossos procedimentos para garantir conformidade e eficácia."
        },
        {
            id: 7,
            question: "Partilha de dados com terceiros",
            answer: "Os teus dados apenas serão partilhados com terceiros quando necessário para fornecer os serviços solicitados ou quando exigido por lei. Nestes casos, garantimos que esses terceiros cumprem as mesmas normas de proteção de dados que nós. Nunca venderemos as tuas informações a outras entidades. Qualquer partilha é realizada com base na transparência e no teu consentimento."
        },
        {
            id: 8,
            question: "Cookies e tecnologias semelhantes",
            answer: "Utilizamos cookies apenas para fins essenciais ao funcionamento da aplicação e para melhorar a tua experiência de navegação. Podes gerir as preferências de cookies nas definições do teu navegador. Não utilizamos cookies para rastrear a tua atividade fora da plataforma nem partilhamos essa informação com terceiros sem o teu consentimento."
        },
        {
            id: 9,
            question: "Como exercer os teus direitos",
            answer: "Podes entrar em contacto connosco a qualquer momento para exercer os teus direitos de privacidade, através do e-mail de suporte ou do responsável pela proteção de dados. Iremos responder com a maior brevidade possível e garantir que os teus pedidos são tratados com a devida atenção e confidencialidade."
        }
    ];

    useEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div>
            {/* Política Privacidade */}
            <div>
                <div className="d-flex align-items-center gap-4 w-50 mb-4">
                    <h2 className="mb-0">Política Privacidade</h2>
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
        </div>
    );
};

export default PoliticaPrivacidade;
