import {MultiFactorResolver} from "@firebase/auth";
import { verifyUserEnrolled } from "../../firebase/authentication";
import { notify } from "../../utils/notify";
import { Code } from "./Code";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";

type Props = {
    verificationId: string,
    resolver: MultiFactorResolver
}
export function CodeSignIn({verificationId, resolver}: Props) {
    const router = useNavigate();
    const { setOTP } = useStateContext();

    async function getCode(code: string) {
        const response = await verifyUserEnrolled(
            {
                verificationId,
                resolver
            },
            code
        );

        if (response) {
            setOTP(true);
            await router('/dashboard');
        }else {
            notify('Something went wrong.');
        }
    }
    return (
        <Code
            getCode={getCode}
        />
    )
}
