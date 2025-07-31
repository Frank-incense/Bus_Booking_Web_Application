import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [images, setImages] = useState({})

  const login = async (credentials) => {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(credentials),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("access_token", data.access_token);
      setUser(data.user);
    } else {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  const getImages = async()=>{
    try {
      const res = await fetch("/api/images");

      if (res.ok) {
        const data = await res.json();
        setImages(data)
        console.log(data)
        
      } else {
        logout();
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } 
  }

  const getUser = async () => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      return;
    }

    try {
      const res = await fetch("/api/me", {
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        
        setUser(data.user);
      } else {
        logout();
      }
    } catch (err) {
      console.error("Failed to fetch user:", err);
    } 
  };

  useEffect(() => {
    getUser();
    getImages()
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, images }}>
      {children}
    </AuthContext.Provider>
  );
};

