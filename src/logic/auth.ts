import axios from "axios";

const API_BASE = "http://localhost:8080/v1";

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
    const endpoint = API_BASE + "/auth";
    const loginForm = { email, password };

    return await axios.post(endpoint, loginForm);
  },
  async getSession(refreshToken: string): Promise<ApiResponse> {
    const endpoint = API_BASE + "/session";
    return await axios.post(endpoint, "", {
      headers: {
        Authorization: "Bearer " + refreshToken,
      },
    });
  },
  async logout(refreshToken: string): Promise<ApiResponse> {
    const endpoint = API_BASE + "/logout";
    return await axios.post(endpoint, "", {
      headers: {
        Authorization: "Bearer " + refreshToken,
      },
    });
  },
};
