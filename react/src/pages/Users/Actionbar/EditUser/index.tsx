import { Link } from "react-router-dom";
import { createRef, useState } from "react";
import axiosClient from "../../../../axios-client";
import Input from "../../../../components/common/Input";
import PasswordInput from "../../../../components/common/PasswordInput";
import Button from "../../../../components/common/Button";

export default function EditUser() {
  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const phoneNumberRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const passwordConfirmationRef = createRef<HTMLInputElement>();
  const [errors, setErrors] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordConfirmationVisibility = () => {
    setShowPasswordConfirmation(!showPasswordConfirmation);
  };

  const onSubmit = (ev: any) => {
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
        console.log("first");
      })
      .catch((err) => {
        const response = err.response;
        if (response && response.status === 422) {
          setErrors(response.data.errors);
        }
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
        <Input ref={nameRef} type="text" placeholder="Full Name" label="Full Name" />
        <Input ref={emailRef} type="email" placeholder="Email Address" label="Email Address" />
        <Input ref={phoneNumberRef} type="text" placeholder="Phone Number" label="Phone Number" />
        <PasswordInput
          ref={passwordRef}
          placeholder="Password"
          label="Password"
          showPassword={showPassword}
          onTogglePasswordVisibility={togglePasswordVisibility}
        />
        <PasswordInput
          ref={passwordConfirmationRef}
          placeholder="Confirm Password"
          label="Confirm Password"
          showPassword={showPasswordConfirmation}
          onTogglePasswordVisibility={togglePasswordConfirmationVisibility}
        />
        <Button type="submit" label="Edit" btn="btn-edit btn-block" />
      </form>
      <br />
      <Button type="submit" label="Delete" btn="btn-delete btn-block" />
    </div>
  );
}
