import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const userContext = React.createContext();

const UserContext = ({ children }) => {
    const [userLoading, setUserLoading] = useState(true);
    const [userError, setUserError] = useState({ status: false, message: "" });
    const [user, setUser] = useState({});

    const handleFetchMe = async () => {
        setUserLoading(true);
        try {
            const response = await axios.get(
                `https://full-stack-job-portal-server-main.vercel.app/api/auth/me`,
                { withCredentials: true }
            );
            setUserError({ status: false, message: "" });
            setUser(response?.data?.result);
        } catch (error) {
            setUserError({ status: true, message: error?.message });
            setUser({ status: false });
        }
        setUserLoading(false);
    };

    const handleGoogleAuth = async (googleUser) => {
        setUserLoading(true);
        try {
            const response = await axios.post(
                "https://full-stack-job-portal-server-main.vercel.app/api/auth/google",
                {
                    email: googleUser.email,
                    full_name: googleUser.displayName,
                    profile_photo: googleUser.photoURL,
                    google_uid: googleUser.uid,
                    signup_type: "g"
                },
                { withCredentials: true }
            );
            await handleFetchMe();
            return { success: true, message: response?.data?.message };
        } catch (error) {
            setUserError({ status: true, message: error?.message });
            return { success: false, message: error?.response?.data || error.message };
        } finally {
            setUserLoading(false);
        }
    };

    useEffect(() => {
        handleFetchMe();
    }, []);

    const passing = { userLoading, userError, user, handleFetchMe, handleGoogleAuth };
    return (
        <userContext.Provider value={passing}>{children}</userContext.Provider>
    );
};

const useUserContext = () => useContext(userContext);

export { useUserContext, UserContext };