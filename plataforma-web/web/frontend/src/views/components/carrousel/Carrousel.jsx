import React from 'react';
import {Carousel, CarouselItem} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Img1 from '../../../assets/images/logos/comfundo.png';
import './Carrousel.css';


const MyCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100 rounded-4 object-fit-cover carrousel-img" src={Img1} alt="First slide"/>
        <Carousel.Caption>
          <h3>First Slide Label</h3>
          <p>Description for the first slide.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100 rounded-4 object-fit-cover carrousel-img" src={Img1} alt="Second slide"/>
        <Carousel.Caption>
          <h3>Second Slide Label</h3>
          <p>Description for the second slide.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img className="d-block w-100 rounded-4 object-fit-cover carrousel-img" src={Img1} alt="Third slide"/>
        <Carousel.Caption>
          <h3>Third Slide Label</h3>
          <p>Description for the third slide.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MyCarousel;