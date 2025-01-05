import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

interface UserData {
  fullName: string | null;
  email: string | null;
  setUser: (token: string) => void;
}

export const userUserStore = create<UserData>((set) => ({
  email: null,
  fullName: null,
  setUser: (token: string) => {
    const decoded: { email: string; fullName: string } = jwtDecode(token);
    set({ email: decoded.email, fullName: decoded.fullName });
  },
}));
