import { useEffect, useRef, useState } from "react";
import axiosClient from "../../../../axios-client";
import Input from "../../../../components/common/Input";
import Button from "../../../../components/common/Button";
import { useStateContext } from "../../../../contexts/ContextProvider";
import TextArea from "../../../../components/common/TextArea";

interface Props {
    productId: any;
}

export default function EditProduct({ productId }: Props) {
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

    useEffect(() => {
        setErrors(null);
        setSuccess(null);
        axiosClient
            .get(`/products/${productId}`)
            .then(({ data }) => {
                setProduct(data?.data);
            })
            .catch((err) => {
                console.error("Error fetching user:", err);
            });
    }, [productId]);

    const onSubmit = (ev: React.FormEvent) => {
        ev.preventDefault();

        const payload = {
            id: productId,
            user_id: user.id,
            name: nameRef.current?.value,
            description: descriptionRef.current?.value,
            email: emailRef.current?.value,
            price: priceRef.current?.value,
            quantity: quantityRef.current?.value,
        };

        axiosClient
            .put(`/products/${productId}`, payload)
            .then(({ data }) => {
                console.log("Product updated successfully:", data);
                setErrors(null);
                setNotification("Product updated successfully");
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

    const onDeleteClick = (product: any) => {
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/products/${product.id}`).then(() => {
            setNotification("Product was successfully deleted");
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
                    placeholder="Product Name"
                    value={product.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                />
                <TextArea
                    placeholder="Enter your Description here..."
                    value={product.description}
                    onChange={(e) => handleChange("description",e.target.value)}
                    ref={descriptionRef}
                />
                <Input
                    ref={priceRef}
                    type="text"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) =>
                        handleChange("price", e.target.value)
                    }
                />
                <Input
                    ref={quantityRef}
                    type="number"
                    placeholder="quantity"
                    value={product.quantity}
                    onChange={(e) =>
                        handleChange("quantity", e.target.value)
                    }
                />
                <Button type="submit" label="Edit" btn="btn-edit btn-block" />
            </form>
            <br />
            <Button
                type="button"
                onClick={() => onDeleteClick(product)}
                label="Delete"
                btn="btn-delete btn-block"
            />
        </div>
    );
}
