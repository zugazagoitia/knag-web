import axios from "axios";

const API_BASE = import.meta.env.VITE_API_ENDPOINT;

const instance = axios.create({
  baseURL: API_BASE,
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});

export interface ApiResponse {
  data: {
    status: number;
    response: string;
  };
}

export interface SuccessfulLoginResponse extends ApiResponse {
  data: {
    status: number;
    response: string;
    email: string;
    refresh_token: string;
    token_type: string;
    creation: number;
    expiration: number;
  };
}

export interface SuccessfulSessionResponse extends ApiResponse {
  data: {
    status: number;
    response: string;
    token: string;
    token_type: string;
  };
}

export default {
  async login(email: string, password: string): Promise<ApiResponse> {
    const endpoint = API_BASE + "/auth/login";
    const loginForm = { email, password };

    return await axios.post(endpoint, loginForm);
  },
  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    captcha: string
  ): Promise<ApiResponse> {
    const endpoint = API_BASE + "/account/register";
    const registerForm = {
      email: email,
      password: password,
      name: firstName,
      surname: lastName,
      captcha: captcha,
    };

    return await axios.post(endpoint, registerForm);
  },
  async getSession(refreshToken: string): Promise<ApiResponse> {
    const endpoint = API_BASE + "/auth/refresh";
    return await axios.post(endpoint, "", {
      headers: {
        Authorization: "Bearer " + refreshToken,
      },
    });
  },
  async logout(refreshToken: string): Promise<ApiResponse> {
    const endpoint = API_BASE + "/auth/logout";
    return await axios.post(endpoint, "", {
      headers: {
        Authorization: "Bearer " + refreshToken,
      },
    });
  },
  async verifyEmail(token: string): Promise<ApiResponse> {
    const endpoint = API_BASE + "/account/verifyEmail/" + token;
    return await axios.post(endpoint);
  },
};
