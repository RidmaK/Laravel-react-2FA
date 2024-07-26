import { useRef, useState } from "react";
import axiosClient from "../../../../axios-client";
import Input from "../../../../components/common/Input";
import Button from "../../../../components/common/Button";
import "./index.css";
import { useStateContext } from "../../../../contexts/ContextProvider";
import TextArea from "../../../../components/common/TextArea";

export default function AddSecurityData() {
    const typeRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<any>(null);
    const severityRef = useRef<HTMLInputElement>(null);
    const detectedAtRef = useRef<HTMLInputElement>(null);
    const statusRef = useRef<HTMLInputElement>(null);
    const assignedToRef = useRef<HTMLInputElement>(null);
    const responseTimeRef = useRef<HTMLInputElement>(null);
    const threatSourceRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<any>(null);
    const [success, setSuccess] = useState<any>(null);
    const { setNotification, user } = useStateContext();
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

    const onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();

        const payload = {
            type: typeRef.current?.value,
            description: descriptionRef.current?.value,
            severity: severityRef.current?.value,
            detected_at: detectedAtRef.current?.value,
            status: statusRef.current?.value,
            assigned_to: assignedToRef.current?.value,
            response_time: responseTimeRef.current?.value,
            threat_source: threatSourceRef.current?.value,
        };

        axiosClient
            .post(`/security-data`, payload)
            .then(({ data }) => {
                console.log("Security data added successfully:", data);
                setErrors(null);
                setNotification("Security data was successfully added");
                setSecurityData({
                    type: "",
                    description: "",
                    severity: "",
                    detected_at: "",
                    status: "",
                    assigned_to: "",
                    response_time: "",
                    threat_source: "",
                });
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                    setSuccess(null);
                } else {
                    console.error("Error adding security data:", err);
                }
            });
    };

    const handleChange = (key: string, value: string) => {
        setSecurityData((prevData: any) => ({
            ...prevData,
            [key]: value,
        }));
    };

    return (
        <div className="form">
            <h1 className="title">Add New Security Data</h1>
            <form onSubmit={onSubmit}>
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {success && (
                    <div className="success">
                        <p>{success}</p>
                    </div>
                )}

                <Input
                    ref={typeRef}
                    type="text"
                    value={securityData.type}
                    placeholder="Type"
                    onChange={(e) => handleChange("type", e.target.value)}
                />
                <TextArea
                    placeholder="Enter the Description here..."
                    value={securityData.description}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                    ref={descriptionRef}
                />
                <Input
                    ref={severityRef}
                    type="text"
                    value={securityData.severity}
                    placeholder="Severity"
                    onChange={(e) => handleChange("severity", e.target.value)}
                />
                <Input
                    ref={detectedAtRef}
                    type="datetime-local"
                    value={securityData.detected_at}
                    placeholder="Detected At"
                    onChange={(e) => handleChange("detected_at", e.target.value)}
                />
                <Input
                    ref={statusRef}
                    type="text"
                    value={securityData.status}
                    placeholder="Status"
                    onChange={(e) => handleChange("status", e.target.value)}
                />
                <Input
                    ref={assignedToRef}
                    type="text"
                    value={securityData.assigned_to}
                    placeholder="Assigned To"
                    onChange={(e) => handleChange("assigned_to", e.target.value)}
                />
                <Input
                    ref={responseTimeRef}
                    type="datetime-local"
                    value={securityData.response_time}
                    placeholder="Response Time"
                    onChange={(e) => handleChange("response_time", e.target.value)}
                />
                <Input
                    ref={threatSourceRef}
                    type="text"
                    value={securityData.threat_source}
                    placeholder="Threat Source"
                    onChange={(e) => handleChange("threat_source", e.target.value)}
                />
                <br />
                <Button type="submit" label="Add" btn="btn-edit btn-block" />
            </form>
        </div>
    );
}
