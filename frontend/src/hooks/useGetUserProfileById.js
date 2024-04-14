import { useEffect, useState } from "react";
import useShowToast from "./useShowToast";

const useGetUserProfileById = (username) => {
    const [userProfile, setUserProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const showToast = useShowToast();

    useEffect(() => {
        const getUserProfile = async () => {
            try {
                const res = await fetch(`/api/users/profile/${username}`);
                if (!res.ok) {
                    throw new Error("Failed to fetch user profile");
                }
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                if (data.isFrozen) {
                    setUserProfile(null);
                    setIsLoading(false);
                    return;
                }
                setUserProfile(data);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally {
                setIsLoading(false);
            }
        };

        getUserProfile();
    }, [username]);

    return { userProfile, isLoading };
};

export default useGetUserProfileById;
