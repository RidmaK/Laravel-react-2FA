import { User } from "@firebase/auth";
import { enrollUser } from "../../firebase/authentication";
import { notify } from "../../utils/notify";
import { Code } from "./Code";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

type Props = {
    currentUser: User,
    verificationCodeId: string
}

export function CodeSignup({ currentUser, verificationCodeId }: Props) {
    const navigate = useNavigate();
    const { setOTP } = useStateContext();

    async function getCode(code: string) {
        console.log("Entered OTP code:", currentUser, verificationCodeId);
        const response = await enrollUser(
            currentUser,
            verificationCodeId,
            code
        );
        console.log("Enrollment response:", response);
        if (response) {
            setOTP(true);
            console.log("Navigating to dashboard...");
            navigate('/dashboard'); // Use navigate directly without await
        } else {
            console.log("Enrollment failed, notifying user...");
            notify('Something went wrong.');
        }
    }

    return <Code getCode={getCode} />
}
