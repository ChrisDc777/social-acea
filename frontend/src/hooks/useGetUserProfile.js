import { useState, useEffect } from 'react';

const useGetUserProfile = (username) => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/users/profile/${username}`);
        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }
        const data = await response.json();
        setUserProfile(data);
        setLoading(false);
      } catch (error) {
		showToast("Error", error.message, "error");
        console.error(error);
        setLoading(false);
      }
    };

    if (username) {
      fetchUserProfile();
    }

  }, [username]);

  return { userProfile, loading };
};

export default useGetUserProfile;
