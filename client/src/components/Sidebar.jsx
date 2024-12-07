import { NavLink } from "react-router-dom";
import ButtonHamburger from "./ButtonHamburger";
import  { useEffect, useState } from "react";
import axios from "axios";

function Sidebar() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/categories/");
        setCategories(response.data); // Asegúrate de que `response.data` contiene un array de categorías
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      }
    };

    fetchCategories();
  }, []);
  return (
    <div>
      <nav className="mx-auto w-full max-w-5xl bg-gradient-to-r from-[#6C6C6C] to-[#B3B3B3] mt-12 rounded-lg h-12 shadow-lg">
        <ButtonHamburger />
        <div className="space-x-6 h-full flex items-center">
          <ul className="hidden mediummore:flex justify-start cursor-pointer h-full text-center">
          
            <li className="border-r border-gray-400 h-full flex items-center text-white hover:bg-gradient-to-r from-[#6E6E6E] to-[#2A2A2A] hover:rounded-l-lg">
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive
                    ? "bg-gradient-to-r from-[#6E6E6E] to-[#2A2A2A]  px-4 py-3 rounded-l-lg"
                    : "p-4 text-[#3B3B3B] hover:text-[#B7B4B4]"
                }
              >
                <span className="fa-solid fa-house text-lg"></span>
              </NavLink>
            </li>
            <li className="border-r border-gray-400 h-full flex items-center text-white hover:bg-gradient-to-r from-[#6E6E6E] to-[#2A2A2A]">
              <NavLink
                to="/create-post"
                className={({ isActive }) =>
                  isActive ? "bg-gradient-to-r from-[#6E6E6E] to-[#2A2A2A]  p-3" : "p-4"
                }
              >
                CREATE-POST
              </NavLink>
            </li>
            <li className="relative group border-r border-gray-400 h-full flex items-center">
              <div className="h-full flex items-center text-white hover:bg-gradient-to-r from-[#6E6E6E] to-[#2A2A2A]">
                <a className="p-4" href="#">
                  CATEGORY
                </a>
              </div>
             <ul className="absolute top-full hidden group-hover:block bg-[#FFFFFF] shadow-lg cursor-pointer rounded-md z-[99999]">
                {categories.map((category) => (
                  <li
                    key={category.id}
                    className="block px-4 py-2 hover:bg-[#F3F3F3]"
                  >
                    <NavLink to={`/category/${category.id}`}
                    className={({ isActive }) =>
                      isActive ? "block px-4 py-2 bg-[#B8B8B8]  " : "p-4"
                    }>
                      {category.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
            <li className="border-r border-gray-400 h-full flex items-center text-white hover:bg-gradient-to-r from-[#6E6E6E] to-[#2A2A2A]">
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  isActive ? "bg-gradient-to-r from-[#6E6E6E] to-[#2A2A2A]  p-3" : "p-4"
                }
              >
                PERFIL
              </NavLink>
            </li>

          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
