import React, { Reducer } from "react";
import { Employee } from "../models/employee";

interface AuthState {
  isAuthed: boolean;
  user: Employee | null;
}

interface AuthLoginAction {
  type: "login";
  payload: Employee;
}

interface AuthLogoutAction {
  type: "logout";
}

type AuthAction = AuthLoginAction | AuthLogoutAction;

type AuthReducer = Reducer<AuthState, AuthAction>;

const initialAuthState: AuthState = {
  isAuthed: false,
  user: null,
};

const authReducer: AuthReducer = (
  state: AuthState = initialAuthState,
  action: AuthAction
) => {
  switch (action.type) {
    case "login": {
      return { isAuthed: true, user: action.payload };
    }
    case "logout": {
      return { isAuthed: false, user: null };
    }
    default: {
      return state;
    }
  }
};

const contextDefalutValue: {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} = {
  state: initialAuthState,
  dispatch: () => {},
};

const AuthContext = React.createContext(contextDefalutValue);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = React.useReducer<AuthReducer, AuthState>(
    authReducer,
    { isAuthed: false, user: null },
    (i) => i
  );
  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
