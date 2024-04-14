import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";

const useGetUserProfileById = (username) => {
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/users/profile/${username}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch user profile");
                }
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    setIsLoading(false);
                    return;
                }
                if (data.isFrozen) {
                    setUserProfile(null);
                    setIsLoading(false);
                    return;
                }
                setUserProfile(data);
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                showToast("Error", error.message, "error");
            }
        };
        if (username) {
            getUserProfile();
        }
        
    }, [username]);

    return { userProfile, isLoading };
};

export default useGetUserProfileById;
