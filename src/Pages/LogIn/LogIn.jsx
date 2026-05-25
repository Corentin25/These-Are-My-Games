import { AuthForm } from "../../Components/AuthForm/AuthForm";

import Logo from "../../Assets/TAMG-Logo.png";
import "./login.css";

export function LogIn() {
  return (
    <main>
      <img src={Logo} alt="Logo These Are My Games" className="logoLogin" />
      <AuthForm />
    </main>
  );
}
