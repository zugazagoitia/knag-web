import { defineStore } from "pinia";
import auth, {
  SuccessfulLoginResponse,
  SuccessfulSessionResponse,
} from "@/logic/auth";

export const useUserSession = defineStore("userSession", {
  state: () => {
    return {
      isLoggedIn: "true" === localStorage.getItem("isLoggedIn") || false,
      hasSession: "true" === localStorage.getItem("hasSession") || false,
      id: localStorage.getItem("id") || "",
      email: localStorage.getItem("email") || "",
      refreshToken: localStorage.getItem("refreshToken") || "",
      sessionToken: localStorage.getItem("sessionToken") || "",
    };
  },
  actions: {
    logout() {
      (this.id = ""),
        (this.email = ""),
        (this.refreshToken = ""),
        (this.sessionToken = ""),
        (this.isLoggedIn = false),
        (this.hasSession = false);
      localStorage.clear();
    },
    login(user: SuccessfulLoginResponse) {
      this.email = user.data.email;
      this.refreshToken = user.data.refresh_token;
      this.isLoggedIn = true;
      this.saveAll();
    },
    setSession(session: SuccessfulSessionResponse) {
      this.sessionToken = session.data.token;
    },
    saveAll() {
      localStorage.setItem("isLoggedIn", this.isLoggedIn.toString());
      localStorage.setItem("hasSession", this.hasSession.toString());
      localStorage.setItem("id", this.email);
      localStorage.setItem("email", this.email);
      localStorage.setItem("refreshToken", this.refreshToken);
      localStorage.setItem("sessionToken", this.sessionToken);
    },
  },
});
