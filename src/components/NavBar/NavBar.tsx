import "./NavBar.scss";
import { useNavigate, useLocation } from 'react-router-dom';
import { BsArrowLeftSquareFill  } from "react-icons/bs";

export type INavBarProps = {
};

function NavBar({}: INavBarProps) {
  const location = useLocation();
  const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
	}
  return (
    <div className="NavBar">
      {location.pathname !== '/' && <button className="NavBar__Back" onClick={goBack}><BsArrowLeftSquareFill /></button>	}
    </div>
  )
}

export default NavBar;
