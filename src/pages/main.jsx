import MainCard from "../components/MainCard";
import englishData from "../englishData.json";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

console.log(englishData);

const Main = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="bg-green-500 min-h-screen max-w-screen-md mx-auto px-8 mt-20 rounded-full flex flex-col justify-center items-center gap-20 shadow-2xl">
      <div className="text-7xl font-extrabold text-yellow-500 font-kkkk">
        축하드립니다!
      </div>
      <div className="font-kkkk font-bold text-3xl animate-ping">
        만원 이벤트 당첨!
      </div>
      <img src="img/money_2_front.jpg" />

      <div className="flex justify-center items-center gap-10">
        <div className="text-center text-xl font-semibold animate-bounce ">
          맞출때마다 만원
        </div>

        <ul className="">
          {englishData.map((v, i) => (
            <MainCard key={i} title={v.title} day={v.day} />
          ))}
        </ul>

        <div className="text-center text-xl font-semibold animate-bounce ">
          맞출때마다 만원
        </div>
      </div>
    </div>
  );
};

export default Main;
