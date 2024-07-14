import { Link, Navigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { logout, verifyIfUserIsEnrolled, verifyUserEmail } from "../../firebase/authentication";
import { notify } from "../../utils/notify";
import './index.css';

export default function Verify() {
    let currentUser: any = useCurrentUser();

    if (currentUser === 'loading') {
        return (
            <div className="loading-container">loading...</div>
        );
    }

    if (!currentUser) {
        return <Navigate to="/login" />;
    }

    async function sendEmail() {
        if (currentUser) {
            const response = await verifyUserEmail(currentUser);

            if (response) {
                notify('An Email has been sent to you');
            } else {
                notify('Something went wrong');
            }
        }
    }

    return (
        <div className="container">
            <div className="form-wrapper">
                <h2 className="heading">Hello 👋</h2>
                {
                    currentUser && currentUser.emailVerified && !verifyIfUserIsEnrolled(currentUser) &&
                    <Link className="link" to="/mfa">
                        Activate the multifactor authentication
                    </Link>
                }
                {
                    currentUser && !currentUser.emailVerified && !verifyIfUserIsEnrolled(currentUser) &&
                    <button
                        onClick={sendEmail}
                        className="button">
                        Verify your email
                    </button>
                }
                <button
                    onClick={logout}
                    className="logout-button">
                    Disconnect
                </button>
            </div>
        </div>
    );
}
