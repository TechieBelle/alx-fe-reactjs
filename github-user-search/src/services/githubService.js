import axios from "axios";

const BASE_URL = "https://api.github.com/users";

// Function to fetch user data
export const fetchUserData = async (username) => {
   const response = await axios.get(`${BASE_URL}/${username}`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`, // optional
      },
    });
    return response.data;
    }