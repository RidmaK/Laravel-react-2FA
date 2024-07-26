import { Link } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import Actionbar from "../Actionbar";
import "./index.css";

export default function SecurityDataTable() {
    const [securityData, setSecurityData] = useState([]);
    const [securityDataId, setSecurityDataId] = useState(null);
    const [formType, setFormType] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [isOpenAction, setIsOpenAction] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { load } = useStateContext();
    const actionBarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        getSecurityData(currentPage);
    }, [currentPage]);

    useEffect(() => {
        getSecurityData(currentPage);
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

    const getSecurityData = (page: number) => {
        setLoading(true);
        axiosClient
            .get(`/security-data?page=${page}`)
            .then(({ data }) => {
                setLoading(false);
                setSecurityData(data.data);
                setTotalPages(data.meta.last_page); // Assuming Laravel paginator meta structure
                console.log(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const openActionView = (id: any) => {
        setIsOpenAction(!isOpenAction);
        setSecurityDataId(id);
        setFormType("edit");
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <div id="users-table">
                <div className="card animated fadeInDown">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Type</th>
                                <th>Severity</th>
                                <th>Detected At</th>
                                <th>Status</th>
                                <th>Assigned To</th>
                                <th>Response Time</th>
                                <th>Threat Source</th>
                            </tr>
                        </thead>
                        {loading && (
                            <tbody>
                                <tr>
                                    <td colSpan="8" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        {!loading && (
                            <tbody>
                                {securityData.map((sd: any) => (
                                    <tr key={sd.id}>
                                        <td>{sd.id}</td>
                                        <td>
                                            <Link
                                                to="#"
                                                className="user-action-link"
                                                onClick={() =>
                                                    openActionView(sd.id)
                                                }
                                            >
                                                {sd.type}
                                            </Link>
                                        </td>
                                        <td>{sd.severity}</td>
                                        <td>{sd.detected_at}</td>
                                        <td>{sd.status}</td>
                                        <td>{sd.assigned_to}</td>
                                        <td>{sd.response_time}</td>
                                        <td>{sd.threat_source}</td>
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
                securityDataId={securityDataId}
                type={formType}
            />
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </>
    );
}
