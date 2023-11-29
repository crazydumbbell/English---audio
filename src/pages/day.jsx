import { useParams } from "react-router-dom";
import englishData from "../englishData.json";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

englishData.map((v) => console.log(v));

const Day = () => {
  const [dailyData, setDailyData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const { day } = useParams();

  const onClickNext = () => {
    currentPage === dailyData.sentences.length - 1
      ? setCurrentPage(0)
      : setCurrentPage(currentPage + 1);
  };

  const onClickPrev = () => {
    if (currentPage === 0) {
      return;
    }
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // ////////////////////
  useEffect(() => {
    englishData.map((v) => {
      if (v.day === +day) setDailyData(v);
      // +형변환 해줘야됨 그리고setDailyData에 v를 담아줘야됨 day가 아닌
    });
  }, [day]);

  useEffect(() => console.log(dailyData), [dailyData]);
  // /////////////////// 요렇게가 이제 데이터를 담기!

  if (!dailyData) return <div>Loading...</div>;
  // dailyData가 처음에는 비어있어서 그럼
  // 위의 useEffect에서 담아주긴 하는데 담겨있는상태이거나 비어져있는상태임
  // 그래서 비어져 있으면 리턴해주고 담겨있으면 밑으로가서 리턴해주면됨
  // useParams의 day도 있고 dailyData의 day도 있음 우리가 건드는것은 params의 day

  return (
    <div className="bg-red-100 container relative">
      <div className="absolute top-0 left-0 p-8">
        <Link to="/" className="btn-style">
          Back
        </Link>
      </div>

      <h1 className="text-center text-2xl font-semibold">
        Day {dailyData.day} - {dailyData.title}
      </h1>
      <div className="mt-12">
        <div>
          {currentPage + 1}
          {". "}
          {dailyData.sentences[currentPage].english}
        </div>
        <button
          className={`${!isVisible && "bg-black"}`}
          onClick={() => setIsVisible(!isVisible)}
        >
          {dailyData.sentences[currentPage].korean}
        </button>
        <div className="mt-4">
          <button className="btn-style" onClick={onClickPrev}>
            Prev
          </button>
          <button className="btn-style " onClick={onClickNext}>
            Next
          </button>
          <button className="btn-style">Sound</button>
        </div>
      </div>
    </div>
  );
};

export default Day;
