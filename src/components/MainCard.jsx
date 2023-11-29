import { Link } from "react-router-dom";

const MainCard = ({ title, day }) => {
  return (
    <Link to={`/${day}`}>
      <li className="font-jjjj text-2xl mb-4 hover:text-gray-700">
        <span className="font-semibold mr-2">Day {day}</span>
        <span>{title}</span>
      </li>
    </Link>
  );
};

export default MainCard;
