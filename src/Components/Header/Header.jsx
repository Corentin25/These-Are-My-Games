import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPowerOff } from "@fortawesome/free-solid-svg-icons";

import Logo from "../../Assets/TAMG-Logo.png";
import "./header.css";

export function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Ici : logique pour vider le token d'authentification
    console.log("Déconnexion de l'utilisateur");
    navigate("/");
  };
  return (
    <header>
      <img src={Logo} alt="Logo These Are My Games" className="logoHeader" />
      <div className="logOut">
        <button className="logOutButton" onClick={handleLogout}>
          Déconnexion
        </button>
        <FontAwesomeIcon
          icon={faPowerOff}
          className="logOutIcon"
          onClick={handleLogout}
          role="button"
          aria-label="Se déconnecter"
          tabIndex="0"
        />
      </div>
    </header>
  );
}
