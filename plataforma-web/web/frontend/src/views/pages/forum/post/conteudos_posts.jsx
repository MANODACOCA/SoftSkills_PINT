import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Spinner, Alert, Image, ListGroup } from 'react-bootstrap';
import { FaFilePdf, FaImage, FaFileAlt } from 'react-icons/fa';

const ConteudosList = () => {
  const { postId } = useParams();
  const [conteudos, setConteudos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConteudos = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:3000/posts/${postId}/conteudos`);
        
        if (response.data.success) {
          setConteudos(response.data.data);
        } else {
          setError('Erro ao carregar conteúdos');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Erro ao conectar com o servidor');
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchConteudos();
    }
  }, [postId]);

  const getFormatoIcon = (idFormato) => {
    switch(idFormato) {
      case 2: // PDF
        return <FaFilePdf className="text-danger" size={24} />;
      case 7: // Infográfico
        return <FaImage className="text-primary" size={24} />;
      default:
        return <FaFileAlt className="text-secondary" size={24} />;
    }
  };

  const renderConteudo = (conteudo) => {
    switch(conteudo.formato.id_formato) {
      case 2: // PDF
        return (
          <Card.Text>
            <a href={conteudo.conteudo} target="_blank" rel="noopener noreferrer" className="btn btn-outline-danger">
              <FaFilePdf className="me-2" />
              Abrir Documento PDF
            </a>
          </Card.Text>
        );
      case 7: // Infográfico
        return (
          <div className="text-center mt-3">
            <Image 
              src={conteudo.conteudo} 
              alt="Infográfico" 
              fluid
              rounded
              className="border"
              style={{ maxHeight: '400px' }}
            />
            <div className="mt-2">
              <a href={conteudo.conteudo} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                Ver imagem em tamanho real
              </a>
            </div>
          </div>
        );
      default:
        return (
          <Card.Text className="mt-3">
            {conteudo.conteudo}
          </Card.Text>
        );
    }
  };

  if (loading) {
    return (
      <Container className="my-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Carregando...</span>
        </Spinner>
        <p className="mt-2">Carregando conteúdos...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">
          <Alert.Heading>Erro ao carregar conteúdos</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Row className="mb-4">
        <Col>
          <h2 className="border-bottom pb-2">Conteúdos do Post #{postId}</h2>
        </Col>
      </Row>

      {conteudos.length === 0 ? (
        <Alert variant="info">
          Nenhum conteúdo encontrado para este post.
        </Alert>
      ) : (
        <ListGroup variant="flush">
          {conteudos.map(conteudo => (
            <ListGroup.Item key={conteudo.id_conteudos_forum} className="mb-3 shadow-sm">
              <Card className="border-0">
                <Card.Body>
                  <div className="d-flex align-items-center mb-3">
                    {getFormatoIcon(conteudo.formato.id_formato)}
                    <div className="ms-3">
                      <Card.Title className="mb-0">{conteudo.formato.tipo}</Card.Title>
                      <small className="text-muted">ID: {conteudo.id_conteudos_forum}</small>
                    </div>
                  </div>
                  
                  {renderConteudo(conteudo)}
                </Card.Body>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default ConteudosList;