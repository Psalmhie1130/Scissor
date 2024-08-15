import { useModals, useUser, useForm } from "@/store/UserStore";
import { useState } from "react";
import { useToast } from "./ui/use-toast";
import axios from "axios";
import Loader from "./Loader";

const Header = () => {
  axios.defaults.withCredentials = true;
  const { toast } = useToast();
  const { userLoggedIn, setUserLoggedIn } = useUser();
  const { setSignIn, setSignUp } = useModals();
  const { setEmail, setPassword } = useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const logoutFunction = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post("https://scissor3.onrender.com/logout");
      if (response.status === 200) {
        setUserLoggedIn(false);
        toast({
          title: "Logged out",
          description: "Logged out successfully",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "An unknown error occoured",
        });
      }
    } catch (err) {
      console.log(err);
      toast({
        variant: "destructive",
        title: "Error",
        description: "An uknown error occoured",
      });
    } finally {
      setIsLoading(false);
      setPassword("");
      setEmail("");
    }
  };
  return (
    <nav className=" w-screen  bg-[#131113] text-white px-4 py-3 lg:px-8 flex justify-between items-center">
      <h1 className="text-3xl font-semibold lg:text-4xl hover:brightness-75 transition-all ease-in-out duration-300">
        Scissor
      </h1>
      <div className=" flex gap-6 justify-between items-center px-3 h-fit w-fit ">
        {userLoggedIn ? (
          <button
            type="button"
            onClick={logoutFunction}
            className=" text-gray-400 hover:text-white text-xl transition-all ease-in-out duration-300 hover:shadow-lg"
          >
            {isLoading ? <Loader /> : "Logout"}
          </button>
        ) : (
          <>
            {" "}
            <button
              className=" text-gray-400 hover:text-white text-xl transition-all ease-in-out duration-300 hover:shadow-lg"
              type="button"
              onClick={() => setSignIn(true)}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setSignUp(true)}
              className=" text-gray-400 hover:text-white text-xl hidden lg:flex justify-center items-center transition-all ease-in-out duration-300 hover:shadow-lg"
            >
              Signup
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
