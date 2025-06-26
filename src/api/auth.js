import axios from 'axios';

const API_LOGIN_URL = "https://freshtrack.azurewebsites.net/api/auth/login";

export const loginUser = async (credentials) => {
    const { data } = await axios.post(API_LOGIN_URL, credentials);
    return data;
};

const API_LOGOUT_URL = "https://freshtrack.azurewebsites.net/api/auth/logout";

export const logoutUser = async () => {
    const accessToken = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type");
    await axios.post(API_LOGOUT_URL, {}, {
        headers: {
        Authorization: `${tokenType} ${accessToken}`
    }
});
};