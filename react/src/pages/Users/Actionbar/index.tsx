import "./index.css";
import EditUser from "./EditUser";
import AddUser from "./AddUser";
interface SidebarProps {
  isOpenAction: boolean;
  actionBarRef: any;
  userId?: any;
  type: any;
}
export default function Actionbar({
  isOpenAction,
  actionBarRef,
  userId,
  type,
}: SidebarProps) {
  return (
    <div id="actionBarComponent" className="actionBar-background">
      <aside
        className={`sidebar  ${isOpenAction ? "open" : "close"}`}
        ref={actionBarRef}
      >
        <div className="action-header">Take Action</div>
        {type == "edit" ? (<EditUser userId={userId} />) :
        (<AddUser />)}
      </aside>
    </div>
  );
}
