import MainCard from "../components/MainCard";
import englishData from "../englishData.json";

console.log(englishData);

const Main = () => {
  return (
    <div className="bg-green-500 min-h-screen max-w-screen-md mx-auto px-8 mt-20 rounded-full flex flex-col justify-center items-center gap-20 shadow-2xl">
      <div className="text-7xl font-extrabold text-yellow-500 font-kkkk translate-y-10">
        축하드립니다!
      </div>
      <div className="font-kkkk font-bold text-3xl animate-ping">
        만원 이벤트 당첨!
      </div>
      <img src="img/money_2_front.jpg" />

      <div className="flex justify-center items-center gap-10 mb-10">
        <div className="text-center text-xl font-semibold animate-bounce ">
          맞출때마다 만원
        </div>

        <ul className="mb-10">
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
