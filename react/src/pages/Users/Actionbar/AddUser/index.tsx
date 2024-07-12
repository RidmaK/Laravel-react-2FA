import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../../axios-client";
import Input from "../../../../components/common/Input";
import PasswordInput from "../../../../components/common/PasswordInput";
import Button from "../../../../components/common/Button";
import './index.css';
import { useStateContext } from "../../../../contexts/ContextProvider";


export default function AddUser() {
    const nameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const phoneNumberRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmationRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<any>(null);
    const [success, setSuccess] = useState<any>(null);
    const { setNotification } = useStateContext();
    const [user, setUser] = useState<any>({
        name: "",
        email: "",
        phone_number: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordConfirmationVisibility = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation);
    };

    const onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            phone_number: phoneNumberRef.current?.value,
            password: passwordRef.current?.value,
            password_confirmation: passwordConfirmationRef.current?.value,
        };

        axiosClient
            .post(`/users/`, payload)
            .then(({ data }) => {
                console.log("User updated successfully:", data);
                setErrors(null)
                setNotification("User was successfully added");
                setUser({
                    name: "",
                    email: "",
                    phone_number: "",
                });
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                    setSuccess(null);
                } else {
                    console.error("Error updating user:", err);
                }
            });
    };

    const handleChange = (key: string, value: string) => {
        setUser((prevUser: any) => ({
            ...prevUser,
            [key]: value,
        }));
    };

    return (
        <div className="form">
            <h1 className="title">Add New User</h1>
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
                    ref={nameRef}
                    type="text"
                    value={user.name}
                    placeholder="Full Name"
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <Input
                    ref={emailRef}
                    type="email"
                    value={user.email}
                    placeholder="Email Address"
                    onChange={(e) => handleChange("email", e.target.value)}
                />
                <Input
                    ref={phoneNumberRef}
                    type="text"
                    value={user.phone_number}
                    placeholder="Phone Number"
                    onChange={(e) =>
                        handleChange("phone_number", e.target.value)
                    }
                />
                <PasswordInput
                    ref={passwordRef}
                    placeholder="Password"
                    showPassword={showPassword}
                    onTogglePasswordVisibility={togglePasswordVisibility}
                />
                <PasswordInput
                    ref={passwordConfirmationRef}
                    placeholder="Confirm Password"
                    showPassword={showPasswordConfirmation}
                    onTogglePasswordVisibility={
                        togglePasswordConfirmationVisibility
                    }
                />
                <br />
                <Button type="submit" label="Add" btn="btn-edit btn-block" />
            </form>
        </div>
    );
}
