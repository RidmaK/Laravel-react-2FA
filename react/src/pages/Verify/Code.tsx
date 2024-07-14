import { useNavigate } from "react-router-dom";
import { Input } from "./Input";
import './index.css'


type Props = {
    getCode: (code: string) => void;
};

export function Code({ getCode }: Props) {
    const router = useNavigate();
    let code = new Array<string>(6).fill('');

    function handleClick() {
        const finalCode = code.reduce((previousValue, currentValue) => {
            return previousValue.concat(currentValue);
        });
        getCode(finalCode);
    }

    return (
        <div className="container">
            <div className="form-wrapper">
                <div className="header">
                    <h1 className="heading">Verify your phone</h1>
                    <p className="subheading">We sent you an SMS code to your phone number</p>
                </div>
                <div className="input-group">
                    {
                        code.map((value, index) => (
                            <Input
                                key={index}
                                index={index}
                                getValue={(value, index) => {
                                    code[index] = value;
                                }}
                            />
                        ))
                    }
                </div>
                <div className="button-group">
                    <button
                        onClick={() => router('/verify-user')}
                        className="button-cancel">
                        Cancel
                    </button>
                    <button
                        onClick={handleClick}
                        className="button-submit">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
