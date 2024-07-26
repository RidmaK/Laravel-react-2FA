import { useNavigate } from "react-router-dom";
import { useRef } from "react";

type Props = {
    getPhoneNumber: (phoneNumber: string) => void;
};

export function PhoneRegistration({ getPhoneNumber }: Props) {
    const router = useNavigate();
    const phoneNumber = useRef<HTMLInputElement>(null);

    function handleClick() {
        if (phoneNumber.current) {
            getPhoneNumber(phoneNumber.current.value);
            console.log(phoneNumber.current)
        }
    }

    return (
        <div className="container">
            <div className="form-wrapper">
                <div className="header">
                    <h1 className="heading">Provide your phone</h1>
                    <p className="subheading">Fill in your phone number to receive the code</p>
                </div>
                <div className="input-group">
                    <div className="input-wrapper">
                        <input
                            ref={phoneNumber}
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="Insert your phone number"
                            className="input"
                        />
                    </div>
                </div>
                <div className="button-group">
                    <button
                        onClick={() => void router('/dashboard')}
                        className="button-cancel">
                        Cancel
                    </button>
                    <button
                        onClick={handleClick}
                        className="button-submit">
                        Send SMS
                    </button>
                </div>
            </div>
        </div>
    );
}
