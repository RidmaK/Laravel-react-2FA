import { useState } from "react";
import "./index.css";
import { Link } from "react-router-dom";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";
interface Props {
    securityData: any;
}

const TabContent = ({ securityData }: Props) => {
    const [activeTab, setActiveTab] = useState("in");

    const handleTabClick = (tab: any) => {
        setActiveTab(tab);
    };

    // Prepare data for charts
    const barData = {
        labels: ["Severity", "Response Time"],
        datasets: [
            {
                label: "Security Data Metrics",
                data: [securityData.severity, securityData.response_time],
                backgroundColor: [
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                ],
                borderColor: [
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };

    const pieData = {
        labels: ["Assigned", "Unassigned"],
        datasets: [
            {
                data: [
                    securityData.assigned_to ? 1 : 0,
                    securityData.assigned_to ? 0 : 1,
                ],
                backgroundColor: [
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 99, 132, 0.2)",
                ],
                borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="col-4">
            <div className="row">
                <div className="col-12">
                    <div className="card-primary card-tabs">
                        <div className="card-header p-0 pt-1">
                            <ul className="nav-tabs" role="tablist">
                                <li
                                    className="nav-item"
                                    onClick={() => handleTabClick("in")}
                                >
                                    <Link
                                        className={`nav-link ${
                                            activeTab === "in" ? "active" : ""
                                        }`}
                                        data-toggle="pill"
                                        to="#in"
                                        role="tab"
                                        aria-selected={activeTab === "in"}
                                    >
                                        Deatals
                                    </Link>
                                </li>
                                <li
                                    className="nav-item"
                                    onClick={() => handleTabClick("out")}
                                >
                                    <Link
                                        className={`nav-link ${
                                            activeTab === "out" ? "active" : ""
                                        }`}
                                        data-toggle="pill"
                                        to="#out"
                                        role="tab"
                                        aria-selected={activeTab === "out"}
                                    >
                                        Chart
                                    </Link>
                                </li>
                                <li
                                    className="nav-item"
                                    onClick={() => handleTabClick("return")}
                                >
                                    <Link
                                        className={`nav-link ${
                                            activeTab === "return"
                                                ? "active"
                                                : ""
                                        }`}
                                        data-toggle="pill"
                                        to="#return"
                                        role="tab"
                                        aria-selected={activeTab === "return"}
                                    >
                                        Process
                                    </Link>
                                </li>
                            </ul>
                        </div>
                        <div className="card-body">
                            <div className="tab-content">
                                <div
                                    className={`tab-pane fade ${
                                        activeTab === "in" ? "show active" : ""
                                    }`}
                                    id="in"
                                    role="tabpanel"
                                >
                                    <div className="security-details">
                                        <h4>Security Details</h4>
                                        <div className="detail-item">
                                            <span className="detail-label">
                                                Type:
                                            </span>
                                            <span className="detail-value">
                                                {securityData.type}
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">
                                                Description:
                                            </span>
                                            <span className="detail-value">
                                                {securityData.description}
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">
                                                Severity:
                                            </span>
                                            <span className="detail-value">
                                                {securityData.severity}
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">
                                                Detected At:
                                            </span>
                                            <span className="detail-value">
                                                {securityData.detected_at}
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">
                                                Status:
                                            </span>
                                            <span className="detail-value">
                                                {securityData.status}
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">
                                                Assigned To:
                                            </span>
                                            <span className="detail-value">
                                                {securityData.assigned_to}
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">
                                                Response Time:
                                            </span>
                                            <span className="detail-value">
                                                {securityData.response_time}
                                            </span>
                                        </div>
                                        <div className="detail-item">
                                            <span className="detail-label">
                                                Threat Source:
                                            </span>
                                            <span className="detail-value">
                                                {securityData.threat_source}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`tab-pane fade ${
                                        activeTab === "out" ? "show active" : ""
                                    }`}
                                    id="out"
                                    role="tabpanel"
                                >
                                    <div className="chart-main">
                                        <div className="chart-bar">
                                            <h5>Bar Chart</h5>
                                            <Bar data={barData} />
                                        </div>
                                        <div className="chart-pie">
                                            <h5>Pie Chart</h5>
                                            <Pie data={pieData} />
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={`tab-pane fade ${
                                        activeTab === "return"
                                            ? "show active"
                                            : ""
                                    }`}
                                    id="return"
                                    role="tabpanel"
                                ></div>
                            </div>
                        </div>
                        {/* /.card */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TabContent;
