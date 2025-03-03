"use client";

import Image from "next/image";
import loginBg from "../../assets/loginbg.jpg";
import { FaEnvelope, FaLock } from "react-icons/fa6";
import { useState } from "react";
import useUserStore from "../../store/userStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleLogin = async () => {
    setEmailError(false);
    setPasswordError(false);
    setMessage("");

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 8 characters long.");
    }

    if (emailError || passwordError) {
      return;
    }

    const url = "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token";
    const headers = {
      "Content-Type": "application/json",
    };
    const body = JSON.stringify({
      email: email,
      password: password,
      isEmployee: true,
    });

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set("auth_token", data.token, {
          expires: 7,
          secure: true,
          sameSite: "strict",
        });
        setMessage("Login successful");
        await getUserInfo();
        router.push("/dashboard");
      } else {
        setMessage("Invalid Email or Password");
      }
    } catch (error) {
      setMessage(`Request failed: ${error.message}`);
    }
  };

  const getUserInfo = async () => {
    const token = Cookies.get("auth_token");
    const url = "https://api-yeshtery.dev.meetusvr.com/v1/user/info";
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };

    try {
      const response = await fetch(url, { method: "GET", headers: headers });
      if (response.ok) {
        const userInfo = await response.json();
        useUserStore.getState().setUserInfo(userInfo);
      } else {
        console.error("Failed to retrieve user info");
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  const handleChange = (value, type) => {
    if (type === "email") {
      setEmail(value);
      if (!validateEmail(value)) {
        setEmailError("Please enter a valid email address.");
      } else {
        setEmailError(false);
      }
    } else if (type === "password") {
      setPassword(value);
      if (!validatePassword(value)) {
        setPasswordError("Password must be at least 8 characters long.");
      } else {
        setPasswordError(false);
      }
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Image
        src={loginBg}
        alt="Background"
        layout="fill"
        quality={100}
        priority
      />

      <div className="flex relative w-1/2 items-center justify-center h-screen">
        <div className="w-1/3 flex flex-col items-center">
          <p className="text-3xl text-[#1A1A1E] text-center">Welcome Back</p>

          <p className="text-[#62626B] text-center mt-2 mb-4 text-xs">
            Step into our shopping metaverse for an unforgettable shopping
            experience
          </p>

          <div className="w-full mt-4 flex items-center bg-white rounded-lg">
            <span className="p-2 text-[#62626B]">
              <FaEnvelope className="w-5 h-5" />
            </span>
            <input
              type="email"
              placeholder="Email"
              className="w-full text-xs text-black h-10 rounded-lg placeholder-[#62626B] focus:outline-none p-2"
              onChange={(e) => handleChange(e.target.value, "email")}
              // onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <p className="text-center text-xs text-red-500">{emailError}</p>

          <div className="w-full mt-4 flex items-center bg-white rounded-lg">
            <span className="p-2 text-[#62626B]">
              <FaLock className="w-5 h-5" />
            </span>
            <input
              type="password"
              placeholder="Password"
              className="w-full text-xs text-black h-10 rounded-lg placeholder-[#62626B] focus:outline-none p-2"
              onChange={(e) => handleChange(e.target.value, "password")}
              // onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-center text-xs text-red-500">{passwordError}</p>

          <button
            onClick={handleLogin}
            disabled={
              !validateEmail(email) ||
              !validatePassword(password) ||
              !email.length ||
              !password.length
            }
            className={`w-full mt-4 py-2 px-4 rounded-lg ${
              !validateEmail(email) ||
              !validatePassword(password) ||
              !email.length ||
              !password.length
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-[#9414FF] text-white cursor-pointer"
            }`}
          >
            Login
          </button>

          <button>
            <p className="text-[#62626B] text-xs mt-4 cursor-pointer">
              Dont have an account? Sign up
            </p>
          </button>
          {message && (
            <p
              className={`text-center mt-4 text-sm ${
                message === "Login successful"
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
