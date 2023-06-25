import { createContext, useContext, useState } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, setLoggedIn, username, setUsername }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthCtx = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthCtx must be used within AuthCtx");
  }

  return context;
};

export default useAuthCtx;
