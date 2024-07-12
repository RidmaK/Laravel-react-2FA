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
    const { load } = useStateContext();
    const actionBarRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        getProducts();
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

    const getProducts = () => {
        setLoading(true);
        axiosClient
            .get("/products")
            .then(({ data }) => {
                setLoading(false);
                setProducts(data.data);
                console.log(data)
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
    return (
        <>
        <div id="users-table" className="card animated fadeInDown">
            <div>
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
                                <td colSpan="5" class="text-center">
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
                                            onClick={() => openActionView(p.id)}
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
        </>

    );
}
