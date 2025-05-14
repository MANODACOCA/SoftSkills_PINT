import React, { useRef } from 'react';
import Slide from '../../components/carrousel/Carrousel';
import Card from '../../components/card/Card';
import Cardhighlight from '../../components/card_highlight/CardHighlight';
import './HomePage.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const HomePage = () => {
  const scrollRef = useRef(null);
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      <Slide />
      <h1 className="mt-4 ps-3">Para si</h1>
      <div className="position-relative px-3">
        <button className="btn btn-light position-absolute top-50 start-0 translate-middle-y z-1 arrow-click"
          onClick={() => scroll(scrollRef, 'left')}>
          <FaChevronLeft />
        </button>
        <div className="scroll-container" ref={scrollRef}>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
        </div>
        <button className="btn btn-light position-absolute top-50 end-0 translate-middle-y z-1 arrow-click"
          onClick={() => scroll(scrollRef, 'right')}>
          <FaChevronRight />
        </button>
      </div>


      <h1 className="mt-4 ps-3">Cursos mais populares</h1>
      <div className="position-relative px-3">
        <button className="btn btn-light position-absolute top-50 start-0 translate-middle-y z-1 arrow-click"
          onClick={() => scroll(scrollRef1, 'left')}>
          <FaChevronLeft />
        </button>
        <div className="scroll-container" ref={scrollRef1}>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
        </div>
        <button className="btn btn-light position-absolute top-50 end-0 translate-middle-y z-1 arrow-click"
          onClick={() => scroll(scrollRef1, 'right')}>
          <FaChevronRight />
        </button>
      </div>

      <h1 className="mt-5 ps-3">Curso assíncrono em destaque</h1>
      <Cardhighlight />

      <h1 className="mt-4 ps-3">Novidades</h1>
      <div className="position-relative px-3">
        <button className="btn btn-light position-absolute top-50 start-0 translate-middle-y z-1 arrow-click"
          onClick={() => scroll(scrollRef2, 'left')}>
          <FaChevronLeft />
        </button>
        <div className="scroll-container" ref={scrollRef2}>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
          <div className="card-wrapper"><Card /></div>
        </div>
        <button className="btn btn-light position-absolute top-50 end-0 translate-middle-y z-1 arrow-click"
          onClick={() => scroll(scrollRef2, 'right')}>
          <FaChevronRight />
        </button>
      </div>

      <h1 className="mt-5 ps-3">Curso síncrono em destaque</h1>
      <Cardhighlight />
    </div>
  );
};

export default HomePage;
