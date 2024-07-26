import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import "./index.css";
import Actionbar from "./Actionbar";
import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import SecurityDataTable from "./SecurityDataTable";

export default function SequrityData() {
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
                <h1>Security Data </h1>
                <Link to="#" className="btn-add" onClick={() => openActionView()}>
                    <FaPlus />
                </Link>
            </div>
            <div className="user-table">
                <SecurityDataTable />
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
