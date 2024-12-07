import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function EditPost() {
  const [posteo, setPosteo] = useState({ title: "", image: "", description: "" });
  const [image, setImage] = useState(null);
  const [category, setCategory] = useState(""); 
  const [categories, setCategories] = useState([]);

  const [, setError] = useState("");

  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const { id } = useParams();

  const loadCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  };

  useEffect(() => {
    // Tomar datos para actualizar  
    const fetchPosteo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/post/${id}/`);
        setPosteo(response.data);
        setCategory(response.data.category.id); // Asigna la categoría correctamente
      } catch (error) {
        setError("Error al cargar la publicación");
        console.error(error);
      }
    };

    if (id) fetchPosteo();
    loadCategories();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPosteo({ ...posteo, image: URL.createObjectURL(file) });
  };

  // Editar campos del post
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Actualizar el estado del posteo
    setPosteo((prevPosteo) => ({
      ...prevPosteo,
      [name]: value,
    }));

  };
  const handleOnChange = (e) => {
    const value = e.target.value;
    setCategory(value);
  };
  

  // Actualizar post
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (image) {
      formData.append('image', image);
    }
    formData.append('title', posteo.title);
    formData.append('category_id',category); 
    formData.append('description', posteo.description);
    console.log('pepe',category)

    try {
      const response = await axios.patch(`http://localhost:8000/post/${id}/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
      });
      setPosteo(response.data);
      alert('Post Actualizado');
      navigate("/profile");
    } catch (error) {
      console.error("Error al actualizar publicación:", error);
      setError("Error al actualizar publicación");
    }
  };

  return (
    <div className="edit-post">
      <h1>Editar Publicación</h1>
      <form onSubmit={handleSubmit}>
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
          <label htmlFor="title" className="form-label">Nombre Completo</label>
          <input
            type="text"
            id="title"
            name="title"
            className="form-input"
            value={posteo.title}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Descripción</label>
          <input
            type="text"
            id="description"
            name="description"
            className="form-input"
            value={posteo.description}
            onChange={handleChange}
          />
        </div>
        <select
        id="category"
        className="w-full p-3 rounded border border-gray-600 bg-[#2A2A2A] text-white focus:ring-2 focus:ring-[#9147FF] focus:outline-none"
        value={category} 
        onChange={handleOnChange} 
        name="category" 
      >
        <option value="">Selecciona una categoría</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  );
}

export default EditPost;
