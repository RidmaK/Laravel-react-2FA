import { NavLink, useLocation } from "react-router-dom";
import "./index.css";
import EditUser from "./EditUser";
interface SidebarProps {
  isOpenAction: boolean;
  actionBarRef: any;
}
export default function Actionbar({
  isOpenAction,
  actionBarRef,
}: SidebarProps) {
  const location = useLocation();

  const isActive = (path: string): string => {
    return location.pathname === path ? "active" : "";
  };
  return (
    <div id="actionBarComponent">
      <aside
        className={`sidebar  ${isOpenAction ? "open" : "close"}`}
        ref={actionBarRef}
      >
        <div className="action-header">Take Action</div>
        <EditUser />
      </aside>
    </div>
  );
}
