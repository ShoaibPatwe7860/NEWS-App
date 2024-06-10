import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const login = async () => {
    setLoading(true);
    try {
      const payload = {
        email,
        password,
      };
      const result = await axios.post(
        "http://localhost:5000/api/users/login",
        payload
      );
      console.log(result.data);
      toast("Login Successfull");
      localStorage.setItem("user", JSON.stringify(result.data));
      navigate("/home");
      setLoading(false);
    } catch (error) {
      toast("Something went wrong");
      setLoading(false);
    }
  };

  const register = async () => {
    setLoading(true);
    try {
      const payload = {
        email,
        password,
        name,
      };
      await axios.post("http://localhost:5000/api/users/register", payload);
      toast("Registration successfull , Please login");
      setName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      setShowRegisterForm(false);
      setShowLoginForm(true);
    } catch (error) {
      toast("Something went wrong");
      setLoading(false);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("user")) navigate("/home");
  }, []);

  return (
    <div className="h-screen flex items-center sm:flex-col">
      {loading && <Spinner />}
      <div className={`w-1/2 px-10 space-y-5 sm:w-screen `}>
        <h1>
          <b className="text-[#2B8F74] text-8xl">good</b>
          <b className="text-8xl text-gray-700">NEWS</b>
        </h1>
        <p className="text-lg">
          Introducing Shoaib Patwe's pioneering goodNEWS platform, leveraging
          the formidable MERN stack to revolutionize online news consumption.
          With a dedication to innovation and user-centric design, Shoaib's
          project marks a significant leap in digital media evolution. Explore
          the groundbreaking features and impactful capabilities of this
          cutting-edge platform, crafted by Shoaib Patwe.
        </p>
        <div className="space-x-5">
          <button
            className="bg-gray-300 px-10 py-3"
            onClick={() => {
              setShowRegisterForm(false);
              setShowLoginForm(true);
            }}
          >
            LOGIN
          </button>
          <button
            className="bg-[#2B8F74] px-10 py-3 text-white"
            onClick={() => {
              setShowLoginForm(false);
              setShowRegisterForm(true);
            }}
          >
            REGISTER
          </button>
        </div>
      </div>
      <div className="w-1/2 sm:w-screen">
        {!showLoginForm && !showRegisterForm && (
          <lottie-player
            src="https://assets10.lottiefiles.com/packages/lf20_KLaN10ftkY.json"
            background="transparent"
            speed="1"
            loop
            controls
            autoplay
          ></lottie-player>
        )}
        {showLoginForm && (
          <div className="ml-40 sm:ml-0">
            <div className="flex flex-col bg-primary h-screen justify-center items-center px-20 space-y-5">
              <h1 className="text-6xl text-gray-500 text-left w-full font-semibold my-5">
                LOGIN
              </h1>

              <input
                type="text"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-500"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-500"
                placeholder="password"
              />
              <div className="flex justify-end w-full">
                <button
                  className="bg-gray-400 px-10 py-3 text-black"
                  onClick={login}
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        )}
        {showRegisterForm && (
          <div className="ml-40 sm:ml-0">
            <div className="flex flex-col bg-primary h-screen justify-center items-center px-20 space-y-5">
              <h1 className="text-6xl text-gray-500 text-left w-full font-semibold my-5">
                REGISTER
              </h1>
              <input
                type="text"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-500"
                placeholder="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-500"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="border-2 h-10 w-full border-gray-500 px-5 bg-transparent text-gray-500"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex justify-end w-full">
                <button
                  className="bg-gray-400 px-10 py-3 text-black"
                  onClick={register}
                >
                  REGISTER
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      {(showLoginForm || showRegisterForm) && (
        <AiOutlineClose
          className="absolute top-5 right-5 z-10 cursor-pointer hover:bg-gray-100 hover:rounded-full hover:p-2 hover:text-white"
          size={30}
          color="gray"
          onClick={() => {
            setShowLoginForm(false);
            setShowRegisterForm(false);
          }}
        />
      )}
    </div>
  );
}

export default LandingPage;
