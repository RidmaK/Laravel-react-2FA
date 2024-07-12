import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import { FaPlus } from "react-icons/fa";
import "./index.css";
import Actionbar from "./Actionbar";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpenAction, setIsOpenAction] = useState(false);
  const { setNotification } = useStateContext();
  const actionBarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    getUsers();
  }, []);

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

  const onDeleteClick = (user: any) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    axiosClient.delete(`/users/${user.id}`).then(() => {
      setNotification("User was successfully deleted");
      getUsers();
    });
  };

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

  const openActionView = () => {
    setIsOpenAction(!isOpenAction);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Users</h1>
        <Link className="btn-add" to="/users/new">
          <FaPlus />
        </Link>
      </div>
      <div className="card animated fadeInDown table-container">
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
                      onClick={openActionView}
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
      <Actionbar isOpenAction={isOpenAction} actionBarRef={actionBarRef} />
    </div>
  );
}
