import axios from "axios";

const BASE_URL = "https://api.github.com";

export const searchUser = async (username) => {
  try {
    const res = await axios.get(`${BASE_URL}/users/${username}`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
