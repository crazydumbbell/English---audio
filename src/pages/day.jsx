import { useParams } from "react-router-dom";
import englishData from "../englishData.json";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

console.log(process.env.REACT_APP_API_KEY);

const Day = () => {
  const [dailyData, setDailyData] = useState();
  const [isVisible, setIsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  const onClickSound = async () => {
    try {
      setIsLoading(true);

      if (isLoading) return;
      // setIsLoading만 만들고 끝이아니라 여기서 if를 걸어줘야됨

      const response = await axios.post(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${process.env.REACT_APP_API_KEY}`,
        {
          input: {
            text: dailyData.sentences[currentPage].english,
          },
          // 읽어줄 텍스트파일
          voice: {
            languageCode: "en-gb",
            name: "en-GB-Standard-A",
            ssmlGender: "FEMALE",
          },
          audioConfig: {
            audioEncoding: "MP3",
            speakingRate: 1,
            pitch: 5,
          },
        }
      );

      console.log(response);

      // 받은파일은 디코딩(atob함수 쓰면됨)
      const binaryData = atob(response.data.audioContent);
      // //////////////

      const byteArray = new Uint8Array(binaryData.length);

      for (let i = 0; i < binaryData.length; i++) {
        byteArray[i] = binaryData.charCodeAt(i);
      }
      // charCodeAt은 byte 단위로 자르면서 변환까지 시켜주는 함수
      // 자른 형태를 Blob이라는 배열에 담자
      const blob = new Blob([byteArray.buffer], { type: "audio/mp3 " });

      const newAudio = new Audio(URL.createObjectURL(blob));
      console.log(newAudio);

      document.body.appendChild(newAudio);
      newAudio.play();

      setTimeout(() => setIsLoading(false), 3000);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
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
          <button className="btn-style" onClick={onClickSound}>
            Sound
          </button>
        </div>
      </div>
    </div>
  );
};

export default Day;
