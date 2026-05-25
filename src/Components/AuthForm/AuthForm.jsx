import { useState } from "react";
import "./authForm.css";

export function AuthForm() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
    return regex.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoginMode && !validatePassword(formData.password)) {
      console.error(
        "Erreur : Le mot de passe ne respecte pas les critères de sécurité.",
      );
      return;
    }
    // Simulation temporaire du traitement des données avant mise en place API.
    console.log("Action soumise :", isLoginMode ? "Connexion" : "Inscription");
    console.log("Données :", formData);
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setFormData({ email: "", password: "", confirmPassword: "" });
  };

  const isEmailValid = validateEmail(formData.email);
  const isPasswordValid = validatePassword(formData.password);
  const doPasswordsMatch = formData.password === formData.confirmPassword;

  const isFormValid = isLoginMode
    ? isEmailValid && formData.password.length > 0
    : isEmailValid && isPasswordValid && doPasswordsMatch;

  return (
    <div className="auth-wrapper">
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">
            {isLoginMode ? "Identifiant :" : "Adresse courriel :"}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Ex : johndoe@gmail.com"
            required
          />
          {!isLoginMode && formData.email.length > 0 && !isEmailValid && (
            <div className="input-feedback error-msg">
              Veuillez entrer une adresse courriel valide.
            </div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={!isLoginMode ? "Ex : Toutsauf1234!" : ""}
            required
          />
          {!isLoginMode && formData.password.length > 0 && (
            <div className="input-feedback">
              {isPasswordValid ? (
                <span className="success-msg">Mot de passe accepté !</span>
              ) : (
                <span className="error-msg">
                  Votre mot de passe doit contenir au minimum :
                  <ul>
                    <li>8 caractères</li>
                    <li>Une majuscule</li>
                    <li>Un chiffre</li>
                    <li>Un caractère spécial</li>
                  </ul>
                </span>
              )}
            </div>
          )}
        </div>
        {!isLoginMode && (
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmer le mot de passe :</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {formData.confirmPassword.length > 0 && (
              <div className="input-feedback">
                {doPasswordsMatch ? (
                  <span className="success-msg">
                    Les mots de passe correspondent.
                  </span>
                ) : (
                  <span className="error-msg">
                    Erreur : Les mots de passe ne sont pas identiques.
                  </span>
                )}
              </div>
            )}
          </div>
        )}
        <button type="submit" className="submit-btn" disabled={!isFormValid}>
          {isLoginMode ? "Connexion" : "Valider"}
        </button>
      </form>
      <button type="button" className="toggle-mode-btn" onClick={toggleMode}>
        {isLoginMode ? "Créer un compte" : "Se connecter"}
      </button>
    </div>
  );
}
