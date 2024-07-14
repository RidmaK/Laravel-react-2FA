import { Link } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useEffect, useRef, useState } from "react";
import { useStateContext } from "../../../contexts/ContextProvider";
import Actionbar from "../Actionbar";
import "./index.css";

export default function ProductTable() {
    const [products, setProducts] = useState([]);
    const [productId, setProductsId] = useState(null);
    const [formType, setFormType] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [isOpenAction, setIsOpenAction] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { load } = useStateContext();
    const actionBarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        getProducts(currentPage);
    }, [currentPage]);

    useEffect(() => {
        getProducts(currentPage);
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

    const getProducts = (page: number) => {
        setLoading(true);
        axiosClient
            .get(`/products?page=${page}`)
            .then(({ data }) => {
                setLoading(false);
                setProducts(data.data);
                setTotalPages(data.meta.last_page); // Assuming Laravel paginator meta structure
                console.log(data);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const openActionView = (id: any) => {
        setIsOpenAction(!isOpenAction);
        setProductsId(id);
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
                                <th>Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>User</th>
                                <th>Create Date</th>
                                {/* <th>Actions</th> */}
                            </tr>
                        </thead>
                        {loading && (
                            <tbody>
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        Loading...
                                    </td>
                                </tr>
                            </tbody>
                        )}
                        {!loading && (
                            <tbody>
                                {products.map((p: any) => (
                                    <tr key={p.id}>
                                        <td>{p.id}</td>
                                        <td>
                                            <Link
                                                to="#"
                                                className="user-action-link"
                                                onClick={() =>
                                                    openActionView(p.id)
                                                }
                                            >
                                                {p.name}
                                            </Link>
                                        </td>
                                        <td>{p.price}</td>
                                        <td>{p.quantity}</td>
                                        <td>{p.user.name}</td>
                                        <td>{p.created_at}</td>
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
                productId={productId}
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
