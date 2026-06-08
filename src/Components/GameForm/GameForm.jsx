import { useState, useEffect } from "react";
import "./gameForm.css";

export function GameForm({ toggleAddGame, addGameToList, gameToEdit }) {
  const [formData, setFormData] = useState({
    gameName: "",
    plateform: "",
    date: "",
    hours: "",
    status: "",
    comments: "",
    note: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (gameToEdit) {
      setFormData({
        gameName: gameToEdit.gameName || "",
        plateform: gameToEdit.plateform || "",
        date: gameToEdit.date || "",
        hours: gameToEdit.hours || "",
        status: gameToEdit.status || "",
        comments: gameToEdit.comments || "",
        note: gameToEdit.note || "",
      });
      setImagePreview(gameToEdit.imagePreview || null);
    }
  }, [gameToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let finalImageUrl = imagePreview;
    let uploadError = false;

    if (imageFile) {
      setIsUploading(true);

      const cloudinaryData = new FormData();
      cloudinaryData.append("file", imageFile);
      cloudinaryData.append("upload_preset", "tamg_images");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/drncm14ot/image/upload",
          {
            method: "POST",
            body: cloudinaryData,
          },
        );

        const data = await response.json();
        finalImageUrl = data.secure_url;
      } catch (error) {
        console.error("Erreur lors du téléchargement :", error);
        alert("Une erreur est survenue lors de l'envoi de l'image.");
        uploadError = true;
      } finally {
        setIsUploading(false);
      }
    }

    if (uploadError) return;

    const finalData = {
      ...formData,
      id: gameToEdit ? gameToEdit.id : null,
      imagePreview: finalImageUrl,
    };

    addGameToList(finalData);

    setFormData({
      gameName: "",
      plateform: "",
      date: "",
      hours: "",
      status: "",
      comments: "",
      note: "",
    });
    setImageFile(null);
    setImagePreview(null);
    toggleAddGame();
  };

  const isFormValid =
    formData.gameName.trim().length > 0 &&
    formData.plateform.trim().length > 0 &&
    formData.status !== "";

  return (
    <div className="game-wrapper">
      <form className="game-form" onSubmit={handleSubmit}>
        <div className="columns-left">
          <div className="fields-group">
            <label htmlFor="gameName">Nom du jeu :</label>
            <input
              type="text"
              id="gameName"
              name="gameName"
              value={formData.gameName}
              onChange={handleChange}
              placeholder="Ex : The Last Of Us"
              required
            />
          </div>
          <div className="both-group">
            <div className="fields-group">
              <label htmlFor="plateform">Plateforme :</label>
              <input
                type="text"
                id="plateform"
                name="plateform"
                value={formData.plateform}
                onChange={handleChange}
                placeholder="Ex : PS3"
              />
            </div>
            <div className="fields-group">
              <label htmlFor="date">Date de début du jeu :</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="both-group">
            <div className="fields-group">
              <label htmlFor="hours">Nombre d’heures jouées :</label>
              <input
                type="number"
                id="hours"
                name="hours"
                value={formData.hours}
                onChange={handleChange}
                min="0"
                placeholder="Ex : 53"
              />
            </div>
            <div className="fields-group">
              <label htmlFor="status">Statut :</label>
              <select
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value=""></option>
                <option value="todo">À faire</option>
                <option value="inprogress">En cours</option>
                <option value="finished">Terminé</option>
                <option value="giveup">Abandonné</option>
              </select>
            </div>
          </div>
          <div className="fields-group">
            <label htmlFor="comments">Commentaire :</label>
            <textarea
              id="comments"
              name="comments"
              value={formData.comments}
              onChange={handleChange}
              rows="5"
              minLength="1"
              maxLength="300"
              placeholder="300 caractères maximum."
            />
          </div>
          <div className="fields-group">
            <label htmlFor="note">Note attribuée :</label>
            <input
              type="number"
              id="note"
              name="note"
              value={formData.note}
              onChange={handleChange}
              min="0"
              max="20"
              placeholder="Note sur 20"
            />
          </div>
        </div>
        <div className="columns-right">
          <div className="image-upload-container">
            <input
              type="file"
              id="gameImage"
              name="gameImage"
              accept="image/jpeg, image/png"
              onChange={handleImageChange}
              hidden
            />
            <label htmlFor="gameImage" className="image-upload-label">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Aperçu de la pochette du jeu"
                  className="image-preview"
                />
              ) : (
                <div className="image-upload-placeholder">
                  <span className="upload-icon-text">+ Ajouter une photo</span>
                  <span className="upload-format-text">Format JPEG, PNG</span>
                </div>
              )}
            </label>
          </div>
          <button
            type="submit"
            className="submit-game-btn"
            disabled={!isFormValid || isUploading}
          >
            {isUploading
              ? "Envoi en cours..."
              : gameToEdit
                ? "Modifier"
                : "Valider"}
          </button>
        </div>
      </form>
    </div>
  );
}
