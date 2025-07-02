import '../post/post.css';
import { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Image, Button, Row, Col, Dropdown, Modal, Form } from "react-bootstrap";
import { BsThreeDots, BsFillTrash3Fill, BsExclamationTriangleFill } from 'react-icons/bs';
import Swal from "sweetalert2";
import { useUser } from '../../../../utils/useUser';
import { list_tipo_denuncia } from "../../../../api/tipo_denuncia_axios";
import { create_denuncia } from "../../../../api/denuncia_axios";

function Comentario({ avatar, name, time, text, likes, idComentario, idAutorComentario, onDeleted }) {
  const { user } = useUser();

  const [liked, setLiked] = useState(false);
  const handleLike = () => setLiked(!liked);

  /* Dropdown / Modal report */
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [tipoDenunciaList, setTipoDenunciaList] = useState([]);

  const fetchDenuncias = async () => {
    try {
      const data = await list_tipo_denuncia();
      setTipoDenunciaList(data);
    } catch (err) {
      console.error("Erro ao listar tipo de denúncias:", err);
      Swal.fire("Erro", "Não foi possível listar tipos de denúncias. Tente novamente.", "error");
    }
  };

  const handleReportSubmit = async () => {
    try {
      const denunciaData = {
        id_comentario: idComentario,
        id_utilizador: user.id_utilizador,
        id_post: null,
        id_tipo_denuncia: reportReason,
      };

      await create_denuncia(denunciaData);

      Swal.fire({
        icon: 'success',
        title: 'Denúncia enviada',
        text: 'Obrigado por ajudar a manter a comunidade segura!',
        timer: 3000,
        showConfirmButton: false,
      });

      setReportReason('');
      setShowReportModal(false);
    } catch (err) {
      console.error("Erro ao reportar comentário:", err);
      Swal.fire("Erro", "Não foi possível reportar o comentário. Tente novamente.", "error");
    }
  };

  const handleDeleteComment = async () => {
    const result = await Swal.fire({
      title: 'Tem certeza que deseja eliminar este comentário?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, eliminar!',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        // Exemplo de chamada para deletar comentário (implementar conforme backend)
        // await delete_comment(idComentario);
        Swal.fire('Eliminado!', 'Comentário removido com sucesso.', 'success');
        if (onDeleted) onDeleted(idComentario);
      } catch (error) {
        Swal.fire('Erro!', 'Não foi possível eliminar o comentário.', 'error');
      }
    }
  };

  // Fetch denuncias quando abrir modal
  const onShowReportModal = () => {
    fetchDenuncias();
    setShowReportModal(true);
  };

  return (
    <div className="comentario-container mb-3 pb-3 border-bottom">
      <Row className="align-items-start">
        <Col xs="auto">
          <Image
            src={avatar}
            roundedCircle
            alt={`${name} avatar`}
            width={48}
            height={48}
            className="comentario-avatar"
          />
        </Col>

        <Col>
          <div className="d-flex justify-content-between align-items-start">
            <div>
              <Row className="align-items-center mb-1">
                <Col xs="auto" className="fw-semibold pe-0">{name}</Col>
                <Col xs="auto" className="comentario-time small ps-1">{time}</Col>
              </Row>
              <p className="comentario-texto">{text}</p>
            </div>

            <Dropdown align="end" drop="down">
              <Dropdown.Toggle
                variant="light"
                size="sm"
                className="p-1 dropdown-toggle-no-caret"
                aria-label="Mais opções do comentário"
              >
                <BsThreeDots style={{ fontSize: '1.25rem' }} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {idAutorComentario !== user?.id_utilizador && (
                  <Dropdown.Item className="text-danger" onClick={onShowReportModal}>
                    <BsExclamationTriangleFill className="me-2" /> Denunciar
                  </Dropdown.Item>
                )}
                {idAutorComentario === user?.id_utilizador && (
                  <Dropdown.Item className="text-danger" onClick={handleDeleteComment}>
                    <BsFillTrash3Fill className="me-2" /> Eliminar
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </div>

          <Button
            variant={liked ? "danger" : "outline-danger"}
            size="sm"
            onClick={handleLike}
            className="mt-1"
          >
            <FaHeart className="me-1" />
            {likes + (liked ? 1 : 0)}
          </Button>
        </Col>
      </Row>

      {/* Modal de denúncia */}
      <Modal show={showReportModal} onHide={() => setShowReportModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Denunciar Comentário</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Selecione o motivo da denúncia</Form.Label>
            <Form.Select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
            >
              <option value="">-- Selecione um motivo --</option>
              {tipoDenunciaList.map((tipo) => (
                <option key={tipo.id_tipo_denuncia} value={tipo.id_tipo_denuncia}>
                  {tipo.tipo_denuncia}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => { setShowReportModal(false); setReportReason(''); }}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleReportSubmit} disabled={!reportReason}>
            Enviar denúncia
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Comentario;
