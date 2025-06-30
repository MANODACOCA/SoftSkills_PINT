import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { BsHeart, BsChat, BsShare, BsThreeDots } from 'react-icons/bs';
import { AiOutlineLike } from "react-icons/ai";

const PostCard = ({ autor, tempo, texto, likes, comentarios, imagemAutor }) => {
  return (
    <Card className="mb-3 shadow-sm rounded-4 border-0">
      <Card.Body>
        {/* Header */}
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex align-items-center">
            <img
              src={imagemAutor}
              alt="Avatar"
              className="rounded-circle"
              width={40}
              height={40}
            />
            <div className="ms-2">
              <div className="fw-semibold">{autor}</div>
              <div className="text-muted small">{tempo}</div>
            </div>
          </div>
          <Button variant="light" size="sm">
            <BsThreeDots />
          </Button>
        </div>

        {/* Texto */}
        <div className="mt-3 mb-2">
          <p className="mb-1">{texto}</p>
        </div>

        <hr />

        {/* Ações */}
        <div className="d-flex justify-content-start align-items-center gap-5">
          <Button variant="btn btn-outline-primary" size="sm">
            <AiOutlineLike  className="me-1" /> {likes}
          </Button>

          <Button variant="outline-secondary" size="sm">
            <BsChat className="me-1" /> {comentarios} comentários
          </Button>
          
        </div>
      </Card.Body>
    </Card>
  );
};

export default PostCard;
