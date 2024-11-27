import { decodeJwt } from "jose";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { TokenPayload } from "../types/TokenPayload";

const AuthContext = createContext<AuthContextType>({
  token: null,
  setToken: () => {},
  claims: null,
});

interface AuthContextType {
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  claims: TokenPayload | null;
}

interface AuthProviderProps {
  children?: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  // State to hold the authentication token
  const [token, setToken] = useState(localStorage.getItem("token"));

  const claims = useMemo(() => {
    if (!token) {
      return null;
    }

    try {
      return decodeJwt<TokenPayload>(token);
    } catch {
      setToken(null);
      return null;
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      if (!claims?.exp) {
        setToken(null);
        return;
      }

      const expTime = claims.exp * 1000;
      if (expTime < Date.now()) {
        setToken(null);
        return;
      }

      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      claims,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
