import { Link, Navigate } from "react-router-dom";
import { createRef, useState } from "react";
import { useStateContext } from "../../contexts/ContextProvider";
import axiosClient from "../../axios-client";
import Input from "../../components/common/Input";
import PasswordInput from "../../components/common/PasswordInput";
import Button from "../../components/common/Button";
import { signUp } from "../../firebase/authentication";

export default function Signup() {
    const nameRef = createRef<HTMLInputElement>();
    const emailRef = createRef<HTMLInputElement>();
    const phoneNumberRef = createRef<HTMLInputElement>();
    const passwordRef = createRef<HTMLInputElement>();
    const passwordConfirmationRef = createRef<HTMLInputElement>();
    const { setUser, setToken } = useStateContext();
    const [errors, setErrors] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] =
        useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const togglePasswordConfirmationVisibility = () => {
        setShowPasswordConfirmation(!showPasswordConfirmation);
    };

    const onSubmit = async (ev: any) => {
        ev.preventDefault();

        const payload = {
            name: nameRef.current?.value,
            email: emailRef.current?.value,
            phone_number: phoneNumberRef.current?.value,
            password: passwordRef.current?.value,
            password_confirmation: passwordConfirmationRef.current?.value,
        };
        axiosClient
            .post("/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                if (emailRef.current?.value && passwordRef.current?.value) {
                    signUpWithEmailAndPassword(emailRef.current?.value, passwordRef.current?.value);
                }
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setErrors(response.data.errors);
                }
            });
    };

    async function signUpWithEmailAndPassword(email: string, password: string) {
        const response = await signUp(
            email,
            password
        );
        if (response) {
            setRedirect(true);
        }
        console.log(response);
    }

    if (redirect) {
        return <Navigate to="/verify-user" />;
    }

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={onSubmit}>
                    <h1 className="title">Signup for Free</h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <Input ref={nameRef} type="text" placeholder="Full Name" />
                    <Input
                        ref={emailRef}
                        type="email"
                        placeholder="Email Address"
                    />
                    <Input
                        ref={phoneNumberRef}
                        type="text"
                        placeholder="Phone Number"
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
                    <Button
                        type="submit"
                        label="Signup"
                        btn="btn-block btn-auth"
                    />
                    <p className="message">
                        Already registered? <Link to="/login">Sign In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
