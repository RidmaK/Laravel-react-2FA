import "./index.css";
import EditProduct from "./EditProduct";
import AddProduct from "./AddProduct";
interface SidebarProps {
  isOpenAction: boolean;
  actionBarRef: any;
  productId?: any;
  type: any;
}
export default function Actionbar({
  isOpenAction,
  actionBarRef,
  productId,
  type,
}: SidebarProps) {
  return (
    <div id="actionBarComponent" className="actionBar-background">
      <aside
        className={`sidebar  ${isOpenAction ? "open" : "close"}`}
        ref={actionBarRef}
      >
        <div className="action-header">Take Action</div>
        {type == "edit" ? (<EditProduct productId={productId} />) :
        (<AddProduct />)}
      </aside>
    </div>
  );
}
