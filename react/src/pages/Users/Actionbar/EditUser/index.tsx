import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../../axios-client";
import Input from "../../../../components/common/Input";
import PasswordInput from "../../../../components/common/PasswordInput";
import Button from "../../../../components/common/Button";
import { useStateContext } from "../../../../contexts/ContextProvider";

interface Props {
    userId: any;
}

export default function EditUser({ userId }: Props) {
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

    useEffect(() => {
        setErrors(null)
        setSuccess(null)
        axiosClient
            .get(`/users/${userId}`)
            .then(({ data }) => {
                setUser(data?.data);
            })
            .catch((err) => {
                console.error("Error fetching user:", err);
            });
    }, [userId]);

    const onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();

        const payload = {
            id: userId,
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            phone_number: phoneNumberRef.current?.value,
            password: passwordRef.current?.value,
            password_confirmation: passwordConfirmationRef.current?.value,
        };

        axiosClient
            .put(`/users/${userId}`, payload)
            .then(({ data }) => {
                console.log("User updated successfully:", data);
                setErrors(null)
                setNotification("User updated successfully");
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                    setSuccess(null)
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

    const onDeleteClick = (user: any) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/users/${user.id}`).then(() => {
            setNotification("User was successfully deleted");
        });
    };

    return (
        <div className="form">
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
                    placeholder="Full Name"
                    value={user.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <Input
                    ref={emailRef}
                    type="email"
                    placeholder="Email Address"
                    value={user.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                />
                <Input
                    ref={phoneNumberRef}
                    type="text"
                    placeholder="Phone Number"
                    value={user.phone_number}
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
                <Button type="submit" label="Edit" btn="btn-edit btn-block" />
            </form>
            <br />
            <Button type="button" onClick={() => onDeleteClick(user)} label="Delete" btn="btn-delete btn-block" />
        </div>
    );
}
