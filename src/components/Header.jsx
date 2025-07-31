import { NavLink } from "react-router-dom"

const Header = () => {
    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" className="nav-link">Tasks</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/add-task" className="nav-link text-light">Aggiungi task</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Header
