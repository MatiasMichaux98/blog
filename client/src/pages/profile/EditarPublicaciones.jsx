import  { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const [posteo, setPosteo] = useState({title:""})
  const[, setError] = useState("")
  
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate()
  const {id} = useParams()
useEffect(() =>{
    //Tomar datos para actualizar  
    const fetchPosteo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/post/${id}/`);
        setPosteo(response.data);
        
      } catch (error) {
        setError("Error al cargar el perfil");
        console.error(error);
        }
      }
    if (id)  fetchPosteo()
},[id])
   
  //editar campos usuario 
  const handleChange = (e) => {
    setPosteo({
      ...posteo,
      [e.target.name]: e.target.value
    })
  }
  const formData = new FormData()
  formData.append('title',posteo.title)
  console.log('pepepito',formData)
  //actualizar perfil 
  const handleSubmit = async(e) => {
    e.preventDefault()
   
    try{
      await axios.patch(`http://localhost:8000/post/${id}/`,formData,{
        
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
      }
      })
      alert('Post Actualizado')
      navigate("/profile")

    }catch(error){
        console.error("Error al actualizar publicacion:", error);
          setError("Error al actualizar publicacion");
    }
  }
  return (
    <div className="edit-post">
      <h1>Editar Publicación</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="title"
            value={posteo.title}
            onChange={handleChange}
          />
        </label>
        
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditPost;
