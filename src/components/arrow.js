import React from "react";
import '../styles/mainstyle.css'

function PrevArrow(props) {
  const { onClick } = props;
  return <img src="./img/SliderArrowLeft.svg" alt="Arrow_Left" onClick={onClick} className="arrow_left" />;
}

function NextArrow(props) {
  const { onClick } = props;
  return <img src="./img/SliderArrowRight.svg" alt="Arrow_Right" onClick={onClick} className="arrrow_right" />;
}

export { PrevArrow, NextArrow };