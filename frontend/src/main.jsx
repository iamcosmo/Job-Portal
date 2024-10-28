import React, { createContext, useEffect, useReducer } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({
  isAuthorized: false,
  user: null,
});

// Initial state
const initialState = {
  isAuthorized: false,
  user: null,
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, isAuthorized: true, user: action.payload };
    case "LOGOUT":
      return { ...state, isAuthorized: false, user: null };
    case "SET_USER":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const AppWrapper = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage on component mount
  useEffect(() => {
    const storedAuthorization = JSON.parse(localStorage.getItem("isAuthorized"));
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedAuthorization) dispatch({ type: "LOGIN", payload: storedUser });
    else dispatch({ type: "LOGOUT" });
  }, []);

  // Save to localStorage when `state.isAuthorized` or `state.user` changes
  useEffect(() => {
    localStorage.setItem("isAuthorized", JSON.stringify(state.isAuthorized));
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.isAuthorized, state.user]);

  const login = (user) => dispatch({ type: "LOGIN", payload: user });
  const logout = () => dispatch({ type: "LOGOUT" });
  const setUser = (user) => dispatch({ type: "SET_USER", payload: user });

  return (
    <Context.Provider
      value={{
        isAuthorized: state.isAuthorized,
        user: state.user,
        login,
        logout,
        setUser,
      }}
    >
      <App />
    </Context.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
