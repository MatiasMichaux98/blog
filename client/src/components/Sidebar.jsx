import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="bg-[#171717] h-screen p-[20px_0px_20px_20px] fixed z-[1000] w-[230px]         max-laptop-md:w-[70px] max-laptop-md:p-[20px_0px_20px_10px] max-sm:relative max-sm:w-screen max-sm:h-[60px]">
      <ul id="list-side hover:bg-[#272727] ">
        <div className=" max-sm:flex max-sm:justify-center max-sm:pl-[0] max-sm:mr-[0] ">
          <li className="list-group-item">
            <small className="flex justify-center text-[#E5E5E5] p[10px] text-sm max-laptop-md:hidden">
              MAIN MENU
            </small>
          </li>
          <li>
            <hr className="border-slate-700" />
          </li>

          <Link to="/home">
            <div className="p[10px] text-[#E5E5E5] p-2 hover:bg-[#272727] rounded-lg max-laptop-md:text-center">
              <span
                id="collapse-icon"
                className="fa fa-home mr-3 max-laptop-md:text-base max-sm:text-center "
              ></span>
              <span
                id="collapse-text"
                className="text-sm max-laptop-md:hidden "
              >
                Inicio
              </span>
            </div>
          </Link>

          <Link
            to="/create-post"
            className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="p[10px] text-[#E5E5E5] p-2 text-sm hover:bg-[#272727] rounded-lg max-laptop-md:text-center">
              <span
                id="collapse-icon"
                className="fa fa-edit fa-fw mr-3 max-laptop-md:text-base max-sm:text-center "
              ></span>
              <span id="collapse-text" className="text-sm max-laptop-md:hidden">
                Crear
              </span>
            </div>
          </Link>

          <li>
            <hr className="border-slate-700" />
          </li>
          <a
            href="#"
            className="bg-dark list-group-item list-group-item-action flex-column align-items-start"
          >
            <div className="p[10px] text-[#E5E5E5] p-2 text-sm hover:bg-[#272727] rounded-lg max-laptop-md:text-center">
              <span
                id="collapse-icon"
                className="fa fa-question fa-fw mr-3 max-laptop-md:text-base max-sm:text-center "
              ></span>
              <span id="collapse-text" className="text-sm max-laptop-md:hidden">
                Help
              </span>
            </div>
          </a>
          <li>
            <hr className="border-slate-700" />
          </li>
          <Link to="/profile">
            <div
              id="d-flex-two"
              className="p[10px] text-[#E5E5E5] p-2 hover:bg-[#272727] rounded-lg max-laptop-md:text-center "
            >
              <span
                id="collapse-icon"
                className="fa fa-user fa-fw mr-3 max-laptop-md:text-base max-sm:text-center "
              ></span>
              <span id="collapse-text" className="text-sm max-laptop-md:hidden">
                Perfil
              </span>
              <span className="submenu-icon ml-auto"></span>
            </div>
          </Link>
        </div>
      </ul>
    </div>
  );
}

export default Sidebar;
