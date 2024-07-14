import { useEffect, useState } from "react";
import SimpleCharts from "./Chart/BarChart";
import BasicPie from "./Chart/PieChart";
import "./index.css";
import axiosClient from "../../axios-client";

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [lastMonthCount, setLastMonthCount] = useState(0);

    useEffect(() => {
        getProducts();
        getUsersCount();
    }, []);

    const getProducts = () => {
        setLoading(true);
        axiosClient
            .get("/products")
            .then(({ data }) => {
                setLoading(false);
                setProducts(data.data);
                setTotalProducts(data.data.length);
                setLastMonthCount(calculateLastMonthCount(data.data));
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const getUsersCount = () => {
        setLoading(true);
        axiosClient
            .get("/users/count")
            .then(({ data }) => {
                setLoading(false);
                console.log(data)
                // setTotalUsers(data.data.length);
            })
            .catch(() => {
                setLoading(false);
            });
    };


    const calculateLastMonthCount = (products: any) => {
        const lastMonth = new Date();
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        return products.filter((product: any) => new Date(product.created_at) >= lastMonth).length;
    };
    return (
        <div className="main">
            <div>
                <div className="container-dashboard pt-5">
                    <div className="c-dashboardInfo col-lg-3 col-md-6">
                        <div className="wrap">
                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                Total Users
                                <svg
                                    className="MuiSvgIcon-root-19"
                                    focusable="false"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    role="presentation"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                                </svg>
                            </h4>
                            <span className="hind-font caption-12 c-dashboardInfo__count">

                            {loading ? "" : totalUsers}
                            </span>
                        </div>
                    </div>
                    <div className="c-dashboardInfo col-lg-3 col-md-6">
                        <div className="wrap">
                            <h4 className="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">
                                Total Products
                                <svg
                                    className="MuiSvgIcon-root-19"
                                    focusable="false"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    role="presentation"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path>
                                </svg>
                            </h4>
                            <span className="hind-font caption-12 c-dashboardInfo__count">
                                {loading ? "" : totalProducts}
                            </span>
                            <span className="hind-font caption-12 c-dashboardInfo__subInfo">
                                Last month: {loading ? "" : lastMonthCount}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="component-div">
                <div className="chart-div card">
                    <SimpleCharts  loading={loading} products={products}/>
                </div>
                <div className="chart-div card">
                    <BasicPie loading={loading} products={products} />
                </div>
            </div>
        </div>
    );
}
