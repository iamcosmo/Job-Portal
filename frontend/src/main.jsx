import React, { createContext, useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

export const Context = createContext({
  isAuthorized: false,
  user: null,
});

const AppWrapper = () => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState(null);

  // Optional: Load `isAuthorized` and `user` from localStorage/sessionStorage
  useEffect(() => {
    const storedAuthorization = JSON.parse(localStorage.getItem("isAuthorized"));
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedAuthorization) setIsAuthorized(storedAuthorization);
    if (storedUser) setUser(storedUser);
  }, []);

  // Update localStorage/sessionStorage when `isAuthorized` or `user` changes
  useEffect(() => {
    localStorage.setItem("isAuthorized", JSON.stringify(isAuthorized));
    localStorage.setItem("user", JSON.stringify(user));
  }, [isAuthorized, user]);

  return (
    <Context.Provider
      value={{
        isAuthorized,
        setIsAuthorized,
        user,
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
