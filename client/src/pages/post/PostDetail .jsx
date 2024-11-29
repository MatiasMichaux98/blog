import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { getColorClass } from "../../utils/getColorClass";
import Sidebar from "../../components/Sidebar";

function PostDetail() {
  const { id } = useParams(); // params para obtner el id de la url
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/post/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error al cargar el post:", error);
      }
    };
    loadPost();
  }, [id]);

  return (

    <div className="grid grid-rows-1 sm:grid-cols-[0.3fr_3fr] md:grid-cols-[0.3fr_3fr] laptop-md:grid-cols-[0.9fr_3fr] lg:grid-cols-[0.3fr_3fr]  bg-[#202020]">
        <div>
        <Sidebar />

        </div>
        <div className="bg-[#202020]">
      {post ? (
        <div className="p-8">
          <hr className="mt-5 border-neutral-700 p-4" />
          <div className="flex justify-center items-center bg-gray-100 py-10 px-4">
              <div className="shadow-lg overflow-hidden w-full max-w-4xl   "> 
              <h1 className="text-3xl text-black mt-3 mb-3 text-center">{post.title}</h1>

                <div className="overflow-hidden relative"> 
                  <img src={post.image} className=" w-full h-52 object-cover object-[50%_20%]" />
                  <div className="absolute top-5 left-5">
                    <div className="grid grid-cols-1 grid-rows-3 w-[70px] h-[70px] shadow-2xl ">
                      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#AA0E11] to-[#E41B23] rounded-t-lg">
                        <span className="text-lg text-[#FFE4E9]">{post.month}</span>
                      </div>
                      <div className="row-span-2 flex flex-col items-center bg-gradient-to-r from-[#EDEBEC] to-[#FDFDFD] rounded-b-lg ">
                        <span className="text-xl text-[#646464]"  >{post.day}</span>
                        <span className="text-[#A6A6A6]">{post.year}</span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-5 right-5">
                      <p
                    className={`rounded-lg flex justify-center text-white text-sm px-3 py-1 rounded ${getColorClass(
                      post.category?.name || "Sin categoría"
                    )}`}
                  >
                    {post.category?.name || "Sin categoría"}
                  </p>
                  </div>
                </div>
              </div>
          </div>
          
          <div className="p-10 text-justify">
            <hr className="mt-5 border-neutral-700 p-4" />
            <p className="text-lg mt-2 text-white ">{post.description}</p>
          </div>
          <hr className="mt-5 border-neutral-700 p-4" />
          <div className="flex flex-row justify-between	gap-1 button-wrapper">
           <div className="flex items-center ">
           <img
              className="  rounded-full w-10 h-10 border-[#9147FF] "
              src={`http://localhost:8000${post.profile_image}`} // Concatenamos la URL base con la ruta relativa
              alt="Perfil"
            />
            <span className="text-xs text-white ml-2">{post.username}</span>
           </div>
            <div className="flex items-center">
              <span className="far fa-clock mr-3  text-white "></span>
              <p className="text-white">{post.date}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
    </div>

    
  );
}

export default PostDetail;
