import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { Link } from "react-router-dom";
import { getColorClass } from "../../utils/getColorClass";

function PostCategory() {
    const [posts, setPosts] = useState([]);
    const [postsError] = useState("");
    const { id } = useParams();  // Tomamos el 'id' de la categoría desde la URL

    // Cargamos los posts cuando el componente se monta o el id de la categoría cambia
    useEffect(() => {
        const fetchCategoryPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/category/${id}/`);
                console.log(response.data); // Verifica lo que llega
                setPosts(response.data);
            } catch (error) {
                console.error("Error al cargar los posts:", error);
            }
        };
    
        fetchCategoryPosts();
    }, [id]);



    return (
        <div
      className="grid grid-cols-1 grid-rows-[auto,1fr] bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage:
          "url('https://w.wallhaven.cc/full/rr/wallhaven-rr9qzw.png')",
      }}
    >
      {/* Sidebar */}
      <div className="1">
        <Sidebar />
      </div>

      {/* Main content */}
      <div className="mx-auto w-full max-w-5xl p-4 sm:p-6 md:p-8 min-h-screen  mt-6 sm:mt-8 rounded-lg bg-[#EBEBEB] cursor-pointer">
        {postsError ? (
          <div className="col-span-full text-center text-red-500 font-semibold text-lg">
            {postsError}
          </div>
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={index} className="mb-4">
              <div className="  bg-[#ECE9E6] bg-custom-gradient">
                {/* Texto con Image */}
                <div className="  p-8  overflow-hidden rounded-lg shadow-md">
                  <div className="flex items-center">
                    <div className="grid grid-cols-1 grid-rows-3 w-[70px] h-[70px] shadow-2xl mb-3 ">
                      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-[#AA0E11] to-[#E41B23] rounded-t-lg">
                        <span className="text-lg text-[#FFE4E9]">
                          {post.month}
                        </span>
                      </div>
                      <div className="row-span-2 flex flex-col items-center bg-gradient-to-r from-[#EDEBEC] to-[#FDFDFD] rounded-b-lg ">
                        <span className="text-xl text-[#646464]">
                          {post.day}
                        </span>
                        <span className="text-[#A6A6A6]">{post.year}</span>
                      </div>
                    </div>
                    <h3 className="text-[24px] font-playfair-display line-clamp-1 ml-5">
                      {" "}
                      {post.title}{" "}
                    </h3>
                  </div>
                  <div className="relative ">
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-52 object-cover object-[50%_20%] hover:scale-105"
                  />
                   <div className="absolute top-2 right-2 categoria w-[90px]">
                          <p
                            className={`rounded-lg flex justify-center p-1 text-white text-sm ${getColorClass(
                              post.category?.name || "Sin categoría"
                            )}`}
                          >
                            {post.category?.name || "Sin categoría"}
                          </p>
                        </div>

                  </div>
                  {/* Description */}
                  <p className="post-description-two text-sm text-[#212121] leading-relaxed line-clamp-3 font-quicksand text-lg mt-5">
                    {post.description}
                  </p>
                </div>
                {/* barra de abajo  */}
                <div className="flex items-center justify-between">
                      <div className="hidden sm:block flex items-center ">
                        <img
                          className="  rounded-full w-10 h-10 border-[#9147FF] ml-5 "
                          src={`http://localhost:8000${post.profile_image}`} // Concatenamos la URL base con la ruta relativa
                          alt="Perfil"
                        />
                                                  
                          <span className="text-md ml-5">{post.username}</span>
                        </div>
                        <Link
                          className="text-md text-[#454EDE] hover:underline"
                          to={`/post/${post.id}`}
                        >
                          Sigue leyendo →
                        </Link>

                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-black">
            No hay posts disponibles
          </div>
        )}
      </div>
    </div>
    );
}

export default PostCategory;
