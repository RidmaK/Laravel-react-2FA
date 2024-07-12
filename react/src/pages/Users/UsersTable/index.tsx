import { Link } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import Actionbar from "../Actionbar";
import "./index.css";

export default function UsersTable() {
    const [users, setUsers] = useState([]);
    const [userId, setUsersId] = useState(null);
    const [formType, setFormType] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [isOpenAction, setIsOpenAction] = useState(false);
    const { load } = useStateContext();
    const actionBarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        getUsers();
    }, []);

    useEffect(() => {
        getUsers();
        setIsOpenAction(false);
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

    const getUsers = () => {
        setLoading(true);
        axiosClient
            .get("/users")
            .then(({ data }) => {
                setLoading(false);
                setUsers(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const openActionView = (id: any) => {
        setIsOpenAction(!isOpenAction);
        setUsersId(id);
        setFormType("edit");
    };
    return (
        <>
        <div id="users-table" >
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Create Date</th>
                            {/* <th>Actions</th> */}
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" class="text-center">
                                    Loading...
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {users.map((u: any) => (
                                <tr key={u.id}>
                                    <td>{u.id}</td>
                                    <td>
                                        <Link
                                            to="#"
                                            className="user-action-link"
                                            onClick={() => openActionView(u.id)}
                                        >
                                            {u.name}
                                        </Link>
                                    </td>
                                    <td>{u.email}</td>
                                    <td>{u.phone_number}</td>
                                    <td>{u.created_at}</td>
                                    {/* <td>
                  <Link className="btn-edit" to={'/users/' + u.id}><FaUserEdit /></Link>
                  &nbsp;
                  <button className="btn-delete" onClick={(ev: any) => onDeleteClick(u)}><FaTrashAlt /></button>
                  &nbsp;
                  <Link className="btn-show" to={'/users/' + u.id}><FaUserEdit /></Link>
                </td> */}
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>

        </div>
        <Actionbar
                isOpenAction={isOpenAction}
                actionBarRef={actionBarRef}
                userId={userId}
                type={formType}
            />
        </>

    );
}