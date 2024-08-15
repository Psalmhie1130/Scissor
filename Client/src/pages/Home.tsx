import Header from "@/components/Header";
import Input from "@/components/Input";
import Loader from "@/components/Loader";
import SigninModal from "@/components/SigninModal";
import SignupModal from "@/components/SignupModal";
import { toast } from "@/components/ui/use-toast";
import ViewAccountLinks from "@/components/ViewAccountLinks";
import axios from "axios";
import { useAllUserLinks, useUser } from "@/store/UserStore";
import { useState, useEffect } from "react";
interface ErrorResponse {
  response: {
    status: number;
    data: {
      error: string;
    };
  };
}
interface UserLink {
  originalLink: string;
  shortenedLink: string;
  qrCodeUrl: string;
  clicks: { count: number; country: string }[];
}
const Home = () => {
  axios.defaults.withCredentials = true;
  const [isLoading, setIsLoading] = useState(true);
  const { userLoggedIn, setUserLoggedIn } = useUser();
  const [open, setOpen] = useState(false);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const { setAllMyLinks } = useAllUserLinks();
  const [domain, setDomain] = useState("");
  const [link, setLink] = useState("");
  const shortenFunction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userLoggedIn) {
      return toast({
        variant: "destructive",
        title: "Error",
        description: "You must be logged in to use this feature",
      });
    }
    setIsSubmitLoading(true);
    try {
      const response = await axios.post(
        "https://scissor-7s2y.onrender.com/create",
        {
          link: link,
          domain: domain,
        }
      );
      if (response.status === 200) {
        const newDomain: UserLink = response.data.newLink;
        setAllMyLinks((prevLinks) => [...prevLinks, newDomain]);

        toast({
          title: "Success",
          description: "URL shortened successfully",
        });
      }
      setDomain("");
      setLink("");
    } catch (err) {
      const error = err as ErrorResponse;
      if (error.response.status === 401) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Please login to use this feature",
        });
      } else if (error.response.status === 400) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Domain already taken",
        });
        toast({
          variant: "destructive",
          title: "Error",
          description:
            error.response.data.error || "An unexpected error occurred",
        });
      }
    } finally {
      setDomain("");
      setLink("");
    }
  };
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await axios.get(
          "https://scissor-7s2y.onrender.com/verify"
        );
        setUserLoggedIn(response.status === 200);
      } catch {
        setUserLoggedIn(false);
      } finally {
        setIsLoading(false);
      }
    };
    verify();
  }, []);
  if (isLoading)
    return (
      <main className=" w-screen h-screen bg-[#131113] flex justify-center items-center">
        <Loader />
      </main>
    );
  return (
    <section className=" bg-[#131113] w-screen h-screen p-0 m-0">
      <Header />
      <section className=" mt-12 lg:mt-24 px-3 lg:px-24 w-screen flex flex-col gap-4  py-0 h-fit items-center">
        <h1 className=" text-white text-3xl text-center font-thin break-words lg:text-5xl mb-1 lg:mv-2 lg:px-24">
          Transforming long ugly links into exquisite, customizable high quality
          shortened links
        </h1>
        {/* Caption */}
        <p className=" text-gray-600 text-center text-lg break-words">
          Pioneering shortened links solution designed to expedite and economize
          your profile prodution process
        </p>
        {/* searchbar */}
        <form
          onSubmit={shortenFunction}
          className=" flex gap-3 flex-col lg:flex-row "
        >
          <Input
            placeholder="Enter looong link"
            value={link}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setLink(e.target.value)
            }
            src="/icons/link.svg"
          />
          <Input
            placeholder="Enter preferred domain"
            value={domain}
            handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setDomain(e.target.value)
            }
            src="/icons/link.svg"
          />
          <button
            className=" text-gray-600 font-semibold hover:brightness-75 transition-all duration-300 text-xl rounded-l-full rounded-br-full bg-[aliceblue] lg:px-3 py-2"
            type="submit"
          >
            {isSubmitLoading ? <Loader /> : "Shorten"}
          </button>
        </form>
        {!userLoggedIn && (
          <button
            type="button"
            onClick={() => {
              if (userLoggedIn) {
                setOpen(true);
              } else {
                return toast({
                  variant: "destructive",
                  title: "Error",
                  description: "You must be logged in to use this feature",
                });
              }
            }}
            className=" text-gray-800 font-semibold bg-[#e2e1df] rounded-full px-4 lg:px-6 hover:brightness-75 transition-all ease-in-out duration-300 py-2"
          >
            View your snipped links
          </button>
        )}
      </section>
      <SignupModal />
      <SigninModal />
      <ViewAccountLinks
        open={open}
        setOpenChange={(e: boolean) => setOpen(e)}
      />
    </section>
  );
};

export default Home;
