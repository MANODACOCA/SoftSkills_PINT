import React, { useRef, useEffect, useState } from 'react';
import Slide from '../../components/carrousel/Carrousel';
import Cardhighlight from '../../components/card_highlight/CardHighlight';
import './HomePage.css';
import { list_cursos, getCourseDestaqueAssincrono, getCourseDestaqueSincrono, getCousesWithMoreFormandos, getCourseForYou, getCourseNews, getCoursePopular } from '../../../api/cursos_axios';
import ScrollableSection from '../../components/scrollable_section/ScrollableSection';

const HomePage = () => {
  const scrollRef = useRef(null);
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const [coursesForYou, setcoursesForYou] = useState([]);
  const [coursesPopular, setcoursesPopular] = useState([]);
  const [coursesNews, setcoursesNews] = useState([]);
  const [courseSincrono, setCourseSincrono] = useState(null);
  const [courseAssincrono, setCourseAssincrono] = useState(null);
  const [topCourses, setTopCourses] = useState(null);

  const scroll = (ref, direction) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: direction === 'left' ? -300 : 300,
        behavior: 'smooth',
      });
    }
  };

  const fetchCursosForYou = async () => {
    try {
      const data = await getCourseForYou();
      setcoursesForYou(data);
    } catch (error) {
      console.error('Erro a encontrar cursos foryou:', error);
    }
  }

  const fetchCursosPopular = async () => {
    try {
      const data = await getCoursePopular();
      setcoursesPopular(data);
    } catch (error) {
      console.error('Erro a encontrar cursos popular:', error);
    }
  }

  const fetchCursosNews = async () => {
    try {
      const data = await getCourseNews();
      setcoursesNews(data);
    } catch (error) {
      console.error('Erro a encontrar cursos news:', error);
    }
  }

  const fetchCoursesDestaque = async () => {
    try {
      const topCourses = await getCousesWithMoreFormandos();//slide curso destaque(mais procurado)
      const courseSync = await getCourseDestaqueSincrono();//card destaque sicrono
      const courseAsync = await getCourseDestaqueAssincrono();//card destaque assicrono

      console.log('Sincrono:', courseSync);
      console.log('Assincrono:', courseAsync);
      console.log('Top:', topCourses);

      setCourseSincrono(courseSync);
      setCourseAssincrono(courseAsync);
      setTopCourses(topCourses);
    } catch (error) {
      console.error('Erro a procurar cursos em destaque:', error);
    }
  };

  useEffect(() => {
    fetchCursosForYou();
    fetchCursosPopular();
    fetchCursosNews();
    fetchCoursesDestaque();
  }, []);

  useEffect(() => {
    console.log("Estado atual:", {
      topCourses,
      courseSincrono,
      courseAssincrono
    });
  }, [topCourses, courseSincrono, courseAssincrono]);

  return (
    <div className="">
      <div className='px-3'><Slide course={topCourses} /></div>

      <ScrollableSection title="Para si" courses={coursesForYou} scrollRef={scrollRef} onScroll={scroll}></ScrollableSection>
      <ScrollableSection title="Cursos mais populares" courses={coursesPopular} scrollRef={scrollRef1} onScroll={scroll}></ScrollableSection>

      <h1 className="mt-5 ps-3">Curso assíncrono em destaque</h1>
      <div className='px-3'><Cardhighlight course={courseAssincrono} /></div>

      <ScrollableSection title="Novidades" courses={coursesNews} scrollRef={scrollRef2} onScroll={scroll}></ScrollableSection>

      <h1 className="mt-5 ps-3">Curso síncrono em destaque</h1>
      <div className='px-3'><Cardhighlight course={courseSincrono} /></div>
    </div>
  );
};

export default HomePage;
