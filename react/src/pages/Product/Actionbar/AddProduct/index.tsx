import { useRef, useState } from "react";
import axiosClient from "../../../../axios-client";
import Input from "../../../../components/common/Input";
import Button from "../../../../components/common/Button";
import "./index.css";
import { useStateContext } from "../../../../contexts/ContextProvider";
import TextArea from "../../../../components/common/TextArea";

export default function AddProduct() {
    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<any>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const [errors, setErrors] = useState<any>(null);
    const [success, setSuccess] = useState<any>(null);
    const { setNotification, user } = useStateContext();
    const [product, setProduct] = useState<any>({
        name: "",
        description: "",
        price: "",
        quantity: "",
    });

    const onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();

        const payload = {
            user_id: user.id,
            name: nameRef.current?.value,
            description: descriptionRef.current?.value,
            email: emailRef.current?.value,
            price: priceRef.current?.value,
            quantity: quantityRef.current?.value,
        };

        axiosClient
            .post(`/products/`, payload)
            .then(({ data }) => {
                console.log("Product added successfully:", data);
                setErrors(null);
                setNotification("Product was successfully added");
                setProduct({
                    name: "",
                    description: "",
                    price: "",
                    quantity: "",
                })
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
        setProduct((prevUser: any) => ({
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
                    value={product.name}
                    placeholder="Product Name"
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <TextArea
                    placeholder="Enter your Description here..."
                    value={product.description}
                    onChange={(e) =>
                        handleChange("description", e.target.value)
                    }
                    ref={descriptionRef}
                />
                <Input
                    ref={priceRef}
                    type="text"
                    value={product.price}
                    placeholder="Price"
                    onChange={(e) => handleChange("price", e.target.value)}
                />
                <Input
                    ref={quantityRef}
                    type="number"
                    value={product.quantity}
                    placeholder="quantity"
                    onChange={(e) => handleChange("quantity", e.target.value)}
                />
                <br />
                <Button type="submit" label="Add" btn="btn-edit btn-block" />
            </form>
        </div>
    );
}
