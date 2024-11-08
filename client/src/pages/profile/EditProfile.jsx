import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import "../../styles/EditProfile.css"

function EditProfile() {
    const[profile, setProfile] = useState({full_name:"",bio:"",image:""});
    const[image, setImage] = useState(null)
    const[error, setError] = useState("")
    const navigate = useNavigate()
    
    const token = localStorage.getItem('accessToken');
    const userId = token ? jwtDecode(token).user_id : null;

    useEffect(() => {
        const fetchProfile = async () => {
            try{
                const response = await axios.get(`http://localhost:8000/profile/${userId}/`)
                setProfile(response.data)
            }catch(error){
                setError('Error al cargar el perfil', error)
            }
        }
        if (userId) fetchProfile();
    },[userId])

    //editar campos del usuario 
    const handleChange = (e) => {
        setProfile({
            ...profile,//crea una copia de los valores actuales
            [e.target.name]: e.target.value
             //e.target.name obtiene el atributo del que campo que fue cambiado 
            //e.target.value tiene el nuevo valor que ingreso el usuario 
        })
    }

    //editor imagen del usuario 
    const handleImageChange = (e) => {
        const file = e.target.files[0]//es una lista de archivos seleccionados por el usuario 
        //file[0] representa el primer archivo que el usuario selecciono , se almace el archivo en la variable file 
        setImage(file)
        setProfile({...profile, image:URL.createObjectURL(File)})//actualiza el profile.image con una url temporal para que se pueda ver en la interfaz 
    }

    //actualizacion del perfil
    const handleSubmit = async(e) => {
        e.preventDefault()

        const formData = new FormData();//objeto que permite construir datos de formulario con pares de clave-valor 

        //se agregan los datos al formdata
        if(image){
            formData.append("image",image)
        }
        formData.append("full_name", profile.full_name)
        formData.append("bio", profile.bio)

        try{
            await axios.patch(`http://localhost:8000/profile/${userId}/`, formData,{
                headers: {
                    "Content-Type": "multipart/form-data",//ndica que la solicitud contiene datos de formulario y archivos.
                    "Authorization": `Bearer ${token}`
                }
            })
            alert("Perfil actualizado exitosamente");
            navigate("/profile")
        }catch(error){
            console.error("Error al actualizar el perfil:", error);
            setError("Error al actualizar el perfil");
        }
    }
  return (
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
      <button type="submit" className="submit-btn">Actualizar Perfil</button>
      <button type="button" onClick={() => navigate("/profile")} className="cancel-btn">Cancelar</button>
    </div>
  </form>
</div>

  )
}

export default EditProfile
