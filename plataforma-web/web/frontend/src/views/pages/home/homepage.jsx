import React, { useRef, useEffect, useState } from 'react';
import Slide from '../../components/carrousel/Carrousel';
import Cardhighlight from '../../components/card_highlight/CardHighlight';
import './HomePage.css';
import { list_cursos } from '../../../api/cursos_axios';
import ScrollableSection from '../../components/scrollable_section/ScrollableSection';

const HomePage = () => {
  const scrollRef = useRef(null);
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const [courses, setCursos] = useState([]);

  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  const fetchCursos = async () => {
    try {
      const data = await list_cursos();
      setCursos(data);
    } catch (error) {
      console.error('Erro a encontrar cursos:', error);
    }
  }

  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <div>
      <div className='px-3'><Slide /></div>

      <ScrollableSection title="Para si" courses={courses} scrollRef={scrollRef} onScroll={scroll}></ScrollableSection>
      <ScrollableSection title="Cursos mais populares" courses={courses} scrollRef={scrollRef1} onScroll={scroll}></ScrollableSection>

      <h1 className="mt-5 ps-3">Curso assíncrono em destaque</h1>
      <div><Cardhighlight /></div>

     <ScrollableSection title="Novidades" courses={courses} scrollRef={scrollRef2} onScroll={scroll}></ScrollableSection>

      <h1 className="mt-5 ps-3">Curso síncrono em destaque</h1>
      <Cardhighlight />
    </div>
  );
};

export default HomePage;
