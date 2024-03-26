import React from "react";
import { data } from "../data/sliderFirstData";
import "../styles/mainstyle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { PrevArrow, NextArrow } from "./arrow";

function FirstSlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    centerMode: true,
  };
  return (
    <div className="firstslider__block">
      <h5 className="heading__2">Почему именно мы</h5>
      <div className="firstslider">
        <Slider {...settings}>
          {data.map((el, index) => (
            <div key={index} className="firstslider__card">
              <img src={el.img} alt="Slider_Icon" />
              <p className="firstslider__card-text">{el.text}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default FirstSlider;
