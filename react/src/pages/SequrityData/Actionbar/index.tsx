import "./index.css";
import AddSecurityData from "./AddSecurityData";
import EditSecurityData from "./EditSecurityData";
import { Link } from "react-router-dom";
import axiosClient from "../../../axios-client";
import { useEffect, useState } from "react";
import Drawer from "./Drawer"; // Import the Drawer component

interface SidebarProps {
    isOpenAction: boolean;
    actionBarRef: any;
    securityDataId?: any;
    type: any;
}

export default function Actionbar({
    isOpenAction,
    actionBarRef,
    securityDataId,
    type,
}: SidebarProps) {
    const [securityData, setSecurityData] = useState<any>({
        type: "",
        description: "",
        severity: "",
        detected_at: "",
        status: "",
        assigned_to: "",
        response_time: "",
        threat_source: "",
    });

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    useEffect(() => {
        if (securityDataId !== undefined && securityDataId !== null) {
            axiosClient
                .get(`/security-data/${securityDataId}`)
                .then(({ data }) => {
                    setSecurityData(data?.data);
                })
                .catch((err) => {
                    console.error("Error fetching security data:", err);
                });
        }
    }, [securityDataId]);

    const showMore = () => {
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    return (
        <>
            <div id="actionBarComponent" className="actionBar-background">
                <aside
                    className={`sidebar ${isOpenAction ? "open" : "close"}`}
                    ref={actionBarRef}
                >
                    <div className="action-header">
                        <div>Take Action</div>
                        <div>
                            <Link
                                onClick={showMore}
                                to="#"
                                className="view-more btn btn-show"
                            >
                                view more
                            </Link>
                        </div>
                    </div>
                    {type == "edit" ? (
                        <EditSecurityData securityDataId={securityDataId} />
                    ) : (
                        <AddSecurityData />
                    )}
                </aside>
            </div>
            <Drawer
                isOpen={isDrawerOpen}
                onClose={closeDrawer}
                securityData={securityData}
            />
        </>
    );
}
