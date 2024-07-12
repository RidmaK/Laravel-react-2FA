import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import UsersTable from "./ProductTable";
import "./index.css";
import Actionbar from "./Actionbar";
import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import ProductTable from "./ProductTable";

export default function Product() {
    const [isOpenAction, setIsOpenAction] = useState(false);
    const [formType, setFormType] = useState<any>(null);
    const actionBarRef = useRef<HTMLDivElement | null>(null);
    const { notification,load } = useStateContext();

    const openActionView = () => {
        setIsOpenAction(!isOpenAction);
    };

    useEffect(() => {
        setIsOpenAction(false)
    }, [load]);

    const handleClickOutside = (event: MouseEvent) => {
        if (
            actionBarRef.current &&
            !actionBarRef.current.contains(event.target as Node)
        ) {
            setIsOpenAction(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    return (
        <div className="users-container">
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>Products </h1>
                <Link to="#" className="btn-add" onClick={() => openActionView()}>
                    <FaPlus />
                </Link>
            </div>
            <div className="user-table">
                <ProductTable />
            </div>
            <Actionbar
                isOpenAction={isOpenAction}
                actionBarRef={actionBarRef}
                type={formType}
            />
            {notification && (
                <div className="success">
                    <p>{notification}</p>
                </div>
            )}
        </div>
    );
}
