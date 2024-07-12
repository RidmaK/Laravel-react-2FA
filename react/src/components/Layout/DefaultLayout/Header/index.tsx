import { Link } from "react-router-dom";
import "./index.css";
import { FaPowerOff, FaUserTie } from "react-icons/fa";
import { MdForwardToInbox } from "react-icons/md";
interface HeaderProps {
  user: any;
  drawerRef: any;
  isOpenDrawer: boolean;
  toggleSidebar: () => void;
  toggleProfileDrawer: () => void;
  onLogout: any;
}
export default function HeaderSection({
  isOpenDrawer,
  drawerRef,
  toggleSidebar,
  toggleProfileDrawer,
  user,
  onLogout,
}: HeaderProps) {
  return (
    <div id="headerComponent">
      <header>
        <div>
          <button className="sidebar-toggle-dark" onClick={toggleSidebar}>
            ☰
          </button>
        </div>
        <div>
          <Link to="#" className="profile-info" onClick={toggleProfileDrawer}>
            <div>{user.name.charAt(0).toUpperCase()}</div>
          </Link>
          <div
            className={`profile-drawer ${isOpenDrawer ? "open" : ""}`}
            ref={drawerRef}
          >
            <Link to="#" className="profile-item">
              <FaUserTie /> {user?.name}
            </Link>
            <Link to="#" className="profile-item">
              <MdForwardToInbox /> Inbox
            </Link>
            <Link to="#" onClick={onLogout} className="profile-item">
              <FaPowerOff /> Logout
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}
