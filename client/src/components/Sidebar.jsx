import "../styles/Sidebar.css"

function Sidebar() {
  return (
    <div id="sidebar-container" className="sidebar-expanded d-none d-md-block">
        <ul className="list-group">
            <li className="list-group-item">
                <small className="Title" >MAIN MENU</small>
            </li>
            <li className="sidebar-separator menu-collapsed"><hr /></li>  
           <a href=""  className="bg-dark list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex">
                <span id="collapse-icon" className=" fa fa-dashboard fa-fw mr-3"></span> 
                    <span className="menu-collapsed">Dashboard</span>
                </div>
           </a>
           <a href="" className="bg-dark list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex">
            <span id="collapse-icon" className="fa fa-user fa-fw mr-3"></span>
                    <span className="menu-collapsed">Profile</span>
                    <span className="submenu-icon ml-auto"></span>
            </div>
           </a>
           <a href="" className="bg-dark list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex">
                <span id="collapse-icon" className=" fa fa-tasks fa-fw mr-3"></span>
                <span className="menu-collapsed">Tasks</span>    
                </div>
           </a>
           <li className="list-group-item sidebar-separator menu-collapsed"><hr /></li>  
           <a href="" className="bg-dark list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex">
            <span id="collapse-icon" className=" fa fa-question fa-fw mr-3"></span>
            <span className="menu-collapsed">Help</span>
            </div>
           </a>
           <a href="" className="bg-dark list-group-item list-group-item-action flex-column align-items-start">
            <div className="d-flex">
            <span id="collapse-icon" className="fa fa-2x mr-3"></span>
            <span id="collapse-text" className="menu-collapsed">Collapse</span>
            </div>
           </a>
        </ul>

        <ul className="list-group-two">
          <div className="d-flex-two">
              <a href="">
                      <span id="collapse-icon" className="fa fa-user fa-fw mr-3"></span>
                      <span className="menu-collapsed">Profile</span>
                      <span className="submenu-icon ml-auto"></span>
              </a>
          </div>
        </ul>
    </div>
  )
}

export default Sidebar
