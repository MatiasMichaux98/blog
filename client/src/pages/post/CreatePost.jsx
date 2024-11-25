import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);
  const [categories, setCategories] = useState([]);

  //cargar las categorias al montar el componente
  const loadCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/categories/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Category selected:", category);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", parseInt(category));
    formData.append("tags", tags);
    if (image) formData.append("image", image);

    const token = localStorage.getItem("accessToken");

    try {
      await axios.post("http://localhost:8000/create-post/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Post creado exitosamente!");
      console.log("token", token);
    } catch (error) {
      console.error(
        "Error al crear el post:",
        error.response ? error.response.data : error.message
      );
      alert("Error al crear el post");
    }
  };
  return (
    <div className="grid grid-rows-1 sm:grid-cols-[0.3fr_3fr]  md:grid-cols-[0.3fr_3fr] laptop-md:grid-cols-[0.9fr_3fr]  lg:grid-cols-[0.3fr_3fr] bg-[#202020] ">
      <div className="">
        <Sidebar />
      </div>
      <div className=" sm:p-8  min-h-screen overflow-hidden ">
        <div className="flex flex-col  items-center">
            <div className=" relative inline-flex items-center">
                <span className="hidden sm:block w-12 h-1 bg-[#9147FF] rounded-lg ml-4"></span>
                <h2 className=" sm:text-3xl font-bold text-white text-center">
                Agregar nueva publicación
                </h2>
                <span className="hidden sm:block w-12 h-1 bg-[#9147FF] rounded-lg ml-4"></span>
            </div>
            <p className="text-gray-400 text-base mt-3 max-w-prose text-center ">
            Completa los campos a continuación para crear un nuevo artículo o publicación.
            </p>
        </div>
        <hr className="border-neutral-700 p-4" />

    <div className="max-w-screen-sm w-full mx-auto p-4">
        
    </div>
        <form
      className="space-y-6 bg-[#1A1A1A] p-6 rounded-lg shadow-md w-full max-w-full mx-auto"
      onSubmit={handleSubmit}
    >
      {/* Campo: Título */}
      <div>
        <label
          className="block text-lg font-medium text-gray-300 mb-2"
          htmlFor="title"
        >
          Título
        </label>
        <input
          id="title"
          className="w-full p-3 rounded border border-gray-600 bg-[#2A2A2A] text-white focus:ring-2 focus:ring-[#9147FF] focus:outline-none"
          type="text"
          placeholder="Título de la publicación"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      {/* Campo: Descripción */}
      <div>
        <label
          className="block text-lg font-medium text-gray-300 mb-2"
          htmlFor="description"
        >
          Descripción
        </label>
        <textarea
          id="description"
          className="w-full p-3 rounded border border-gray-600 bg-[#2A2A2A] text-white focus:ring-2 focus:ring-[#9147FF] focus:outline-none"
          placeholder="Escribe una descripción..."
          rows="6"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>

      {/* Campo: Categoría */}
      <div>
        <label
          className="block text-lg font-medium text-gray-300 mb-2"
          htmlFor="category"
        >
          Categoría
        </label>
        <select
          id="category"
          className="w-full p-3 rounded border border-gray-600 bg-[#2A2A2A] text-white focus:ring-2 focus:ring-[#9147FF] focus:outline-none"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Campo: Tags */}
      <div>
        <label
          className="block text-lg font-medium text-gray-300 mb-2"
          htmlFor="tags"
        >
          Tags
        </label>
        <input
          id="tags"
          className="w-full p-3 rounded border border-gray-600 bg-[#2A2A2A] text-white focus:ring-2 focus:ring-[#9147FF] focus:outline-none"
          type="text"
          placeholder="Escribe algunos tags separados por comas"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          required
        />
      </div>

      {/* Campo: Imagen */}
      <div>
        <label
          className="block text-lg font-medium text-gray-300 mb-2"
          htmlFor="image"
        >
          Selecciona una imagen
        </label>
        <input
          id="image"
          className="w-full p-3 rounded border border-gray-600 bg-[#2A2A2A] text-white focus:ring-2 focus:ring-[#9147FF] focus:outline-none"
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      {/* Botón de enviar */}
      <div className="text-center">
        <button
          className="px-6 py-3 bg-[#9147FF] rounded-lg font-semibold text-white hover:bg-[#7329cc] focus:outline-none focus:ring-4 focus:ring-[#9147FF]/50 transition"
          type="submit"
        >
          Crear Publicación
        </button>
      </div>
    </form>
      </div>
    </div>
  );
}

export default CreatePost;
