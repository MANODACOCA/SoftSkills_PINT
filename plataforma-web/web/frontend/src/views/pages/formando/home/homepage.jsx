import React, { useRef, useEffect, useState } from 'react';
import Slide from '../../../components/carrousel/Carrousel';
import Cardhighlight from '../../../components/card_highlight/CardHighlight';
import SpinnerBorder from '../../../components/spinner-border/spinner-border';
import './HomePage.css';
import { list_cursos, getCourseDestaqueAssincrono, getCourseDestaqueSincrono, getCousesWithMoreFormandos, getCourseForYou, getCourseNews, getCoursePopular } from '../../../../api/cursos_axios';
import ScrollableSection from '../../../components/scrollable_section/ScrollableSection';
import { useUser } from '../../../../utils/useUser';

const HomePage = () => {
  const { user } = useUser();
  const scrollRef = useRef(null);
  const scrollRef1 = useRef(null);
  const scrollRef2 = useRef(null);
  const [coursesForYou, setcoursesForYou] = useState([]);
  const [coursesPopular, setcoursesPopular] = useState([]);
  const [coursesNews, setcoursesNews] = useState([]);
  const [courseSincrono, setCourseSincrono] = useState(null);
  const [courseAssincrono, setCourseAssincrono] = useState(null);
  const [topCourses, setTopCourses] = useState(null);
  const [loading, setLoading] = useState(true);

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
      setLoading(true);
      const data = await getCourseForYou();
      setcoursesForYou(data);
    } catch (error) {
      console.error('Erro a encontrar cursos foryou:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchCursosPopular = async () => {
    try {
      setLoading(true);
      const data = await getCoursePopular();
      setcoursesPopular(data);
    } catch (error) {
      console.error('Erro a encontrar cursos popular:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchCursosNews = async () => {
    try {
      setLoading(true);
      const data = await getCourseNews();
      setcoursesNews(data);
    } catch (error) {
      console.error('Erro a encontrar cursos news:', error);
    } finally {
      setLoading(false);
    }
  }

  const fetchCoursesDestaque = async () => {
    try {
      setLoading(true);
      const topCourses = await getCousesWithMoreFormandos();//slide curso destaque(mais procurado)
      const courseSync = await getCourseDestaqueSincrono();//card destaque sicrono
      const courseAsync = await getCourseDestaqueAssincrono();//card destaque assicrono

      setCourseSincrono(courseSync);
      setCourseAssincrono(courseAsync);
      setTopCourses(topCourses);
    } catch (error) {
      console.error('Erro a procurar cursos em destaque:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchCursosForYou();
    fetchCursosPopular();
    fetchCursosNews();
    fetchCoursesDestaque();
  }, []);

  if (!coursesForYou || !coursesPopular || !coursesNews || !courseSincrono || !courseAssincrono || !topCourses || loading) {
    return <SpinnerBorder />;
  }

  return (
    <div className="">
      <div className='px-3'><Slide course={topCourses} /></div>

      <ScrollableSection title="Para si" courses={coursesForYou} scrollRef={scrollRef} onScroll={scroll}></ScrollableSection>
      <ScrollableSection title="Cursos mais populares" courses={coursesPopular} scrollRef={scrollRef1} onScroll={scroll}></ScrollableSection>

      <h1 className="mt-5 ps-3">Curso assíncrono em destaque</h1>
      <div className='px-3'><Cardhighlight course={courseAssincrono} userId={user.id_utilizador} /></div>

      <ScrollableSection title="Novidades" courses={coursesNews} scrollRef={scrollRef2} onScroll={scroll}></ScrollableSection>

      <h1 className="mt-5 ps-3">Curso síncrono em destaque</h1>
      <div className='px-3'><Cardhighlight course={courseSincrono} userId={user.id_utilizador} /></div>
    </div>
  );
};

export default HomePage;
