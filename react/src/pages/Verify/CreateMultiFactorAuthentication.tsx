import { useState } from "react";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useRecaptcha } from "../../hooks/useRecaptcha";
import { verifyPhoneNumber } from "../../firebase/authentication";
import { notify } from "../../utils/notify";
import { PhoneRegistration } from "./PhoneRegistration";
import { CodeSignup } from "./CodeSignup";

export function CreateMultiFactorAuthentication() {
    const currentUser: any = useCurrentUser();
    const recaptcha = useRecaptcha("sign-up");
    const [verificationCodeId, setVerificationCodeId] = useState<string | null>(
        null
    );

    async function getPhoneNumber(phoneNumber: string) {
        if (!currentUser || !recaptcha) {
            return;
        }

        const verificationId = await verifyPhoneNumber(
            currentUser,
            phoneNumber,
            recaptcha
        );

        if (!verificationId) {
            notify("Something went wrong.");
        } else {
            setVerificationCodeId(verificationId);
        }
    }

    return (
        <>
            {
                !verificationCodeId &&
                <PhoneRegistration
                    getPhoneNumber={getPhoneNumber}
                />
            }
            {
                verificationCodeId &&
                currentUser &&
                <CodeSignup
                    currentUser={currentUser}
                    verificationCodeId={verificationCodeId}
                />
            }
            <div id='sign-up'></div>
        </>
    )
}
