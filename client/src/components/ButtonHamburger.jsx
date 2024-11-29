import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (e) => {
    // Verifica si el clic fue fuera del menú y cierra el menú
    if (!e.target.closest('.menu') && !e.target.closest('button')) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <nav>
      {/* Botón para abrir o cerrar el menú */}
      <button
        onClick={toggleMenu}
        className="mediummore:hidden text-2xl bg-transparent p-2 rounded-lg hover:bg-white hover:text-black transition-all duration-300"
      >
        ☰
      </button>

      {/* El menú se muestra solo si isOpen es true */}
      {isOpen && (
        <div className="menu bg-black absolute top-12 left-0 right-0 z-10 max-h-screen overflow-y-auto">
          {/* Botón para cerrar el menú */}
          <button onClick={toggleMenu} className="text-white flex justify-start ml-5 text-2xl">
            x
          </button>
          {/* Contenido del menú */}
          <ul className="flex flex-col items-center">
            <Link className="text-white p-4" to={'/home'}>Home</Link>
            <Link className="text-white p-4" to={'/create-Post'}>Create</Link>
            <Link className="text-white p-4" to={'/#'}>Category</Link>
            <Link className="text-white p-4" to={'/profile'}>Profile</Link>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
