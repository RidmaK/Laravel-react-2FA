import React from "react";
import "./index.css"; // Import the drawer CSS
import { FiX } from "react-icons/fi";
import TabContent from "./TabContent";

interface DrawerProps {
    isOpen: boolean;
    onClose: () => void;
    securityData: any;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, securityData }) => {
    return (
        <div className={`drawer ${isOpen ? "open" : "closed"}`}>
            <div className="drawer-header">
                <h2>Security Data Details</h2>
                <button className="close-button" onClick={onClose}>
                    <FiX />
                </button>
            </div>
            <div className="drawer-content">
                <TabContent securityData={securityData} />
            </div>
        </div>
    );
};

export default Drawer;
