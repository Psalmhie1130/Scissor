import { useModals, useUser } from "@/store/UserStore";

const Header = () => {
  const { userLoggedIn } = useUser();
  const { setSignIn, setSignUp } = useModals();
  const logoutFunction = async () => {};
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
            Logout
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
