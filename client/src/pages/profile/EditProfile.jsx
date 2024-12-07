import ReactModal from 'react-modal';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import "../../styles/EditProfile.css";
import PropTypes from 'prop-types';

ReactModal.setAppElement('#root'); // Establece el elemento raíz para accesibilidad

function EditProfileModal({ isOpen, onClose, currentProfile, updateProfile }) {
    const [profile, setProfile] = useState({ full_name: "", bio: "", image: "" });
    const [image, setImage] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Estado de carga

    const token = localStorage.getItem('accessToken');
    const userId = token ? jwtDecode(token).user_id : null;

    
    useEffect(() => {
        if (currentProfile) {
            setProfile(currentProfile); 
        }
    }, [currentProfile]);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setProfile({ ...profile, image: URL.createObjectURL(file) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
    
        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }
        formData.append("full_name", profile.full_name);
        formData.append("bio", profile.bio);
    
        try {
            const response = await axios.patch(`http://localhost:8000/profile/${userId}/`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                },
            });
    
            updateProfile(response.data);
            onClose();
            setTimeout(() => alert("Perfil actualizado exitosamente"), 100);
        } catch (error) {
            console.error("Error al actualizar el perfil:", error);
            setError("Error al actualizar el perfil");
        } finally {
            setIsLoading(false);
        }
    };
    
  
    return (
        <ReactModal
            isOpen={isOpen}
            onRequestClose={onClose}
            contentLabel="Editar Perfil"
            className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50"
            overlayClassName="modal-overlay"
        >
            <div className="profile-container">
                <h3 className="profile-title">Editar Perfil</h3>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-group">
                        <label htmlFor="profile-image" className="form-label">Imagen de perfil</label>
                        <input
                            type="file"
                            id="profile-image"
                            className="form-input"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="full-name" className="form-label">Nombre Completo</label>
                        <input
                            type="text"
                            id="full-name"
                            name="full_name"
                            className="form-input"
                            value={profile.full_name}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bio" className="form-label">Biografía:</label>
                        <textarea
                            id="bio"
                            name="bio"
                            className="form-input"
                            value={profile.bio}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-actions">
                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? "Actualizando..." : "Actualizar Perfil"}
                        </button>
                        <button type="button" onClick={onClose} className="cancel-btn">Cancelar</button>
                    </div>
                </form>
            </div>
        </ReactModal>
    );
}

EditProfileModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    currentProfile: PropTypes.object.isRequired,
    updateProfile: PropTypes.func.isRequired,
};

export default EditProfileModal;
