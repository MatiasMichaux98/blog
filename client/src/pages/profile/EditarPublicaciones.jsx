import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
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
    <div  className="grid grid-cols-1 grid-rows-[auto,1fr] bg-cover bg-center bg-no-repeat "
    style={{
      backgroundImage:
        "url('https://w.wallhaven.cc/full/rr/wallhaven-rr9qzw.png')",
    }}
    >
      <div className="1">
        <Sidebar />
      </div>

      <div className="mx-auto w-full max-w-5xl p-4 sm:p-6 md:p-8 min-h-screen  mt-6 sm:mt-8 rounded-lg bg-[#EBEBEB] cursor-pointer">
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
          <textarea
            type="textarea"
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

      <a href="#_" className="mt-3 relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium tracking-tighter text-white bg-gray-800 rounded-md group">
    <span className="absolute inset-0 w-full h-full mt-1 ml-1 transition-all duration-300 ease-in-out bg-purple-600 rounded-md group-hover:mt-0 group-hover:ml-0"></span>
    <span className="absolute inset-0 w-full h-full bg-white rounded-md "></span>
    <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-in-out delay-100 bg-purple-600 rounded-md opacity-0 group-hover:opacity-100 "></span>
    <span className="relative text-purple-600 transition-colors duration-200 ease-in-out delay-100 group-hover:text-white"><button className="" type="submit">Guardar Cambios</button></span>
</a>
        
      </form>
    </div>
    </div>

    
  );
}

export default EditPost;
