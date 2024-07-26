import { NavLink, useLocation } from "react-router-dom";
import "./index.css";
interface SidebarProps {
    isOpen: boolean;
    sidebarRef: any;
    toggleSidebar: () => void;
}
export default function Sidebar({
    isOpen,
    toggleSidebar,
    sidebarRef,
}: SidebarProps) {
    const location = useLocation();

    const isActive = (path: string): string => {
        return location.pathname === path ? "active" : "";
    };
    return (
        <div id="sidebarComponent">
            <aside
                className={`sidebar  ${isOpen ? "open" : "close"}`}
                ref={sidebarRef}
            >
                <div className="brand-section">
                    <div className="brand">IM</div>
                    <div>
                        <button
                            className="sidebar-toggle"
                            onClick={toggleSidebar}
                        >
                            ☰
                        </button>
                    </div>
                </div>
                <NavLink
                    to="/dashboard"
                    className={`sidebar-link ${isActive("/dashboard")}`}
                >
                    Dashboard
                </NavLink>
                <NavLink
                    to="/users"
                    className={`sidebar-link ${isActive("/users")}`}
                >
                    Users{" "}
                </NavLink>
                <NavLink
                    to="/sequrity-data"
                    className={`sidebar-link ${isActive("/sequrity-data")}`}
                >
                    Sequrity Data{" "}
                </NavLink>
            </aside>
        </div>
    );
}
