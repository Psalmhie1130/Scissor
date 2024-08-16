import { useParams, useNavigate } from "react-router-dom";
import Loader from "@/components/Loader";
import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";

const RedirectPage = () => {
  const { toast } = useToast();
  const { domainUrl } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirect = async () => {
      try {
        const response = await axios.get(
        "https://scissor-g95d.onrender.com/link/${domainUrl}`
        );
        if (response.status === 200) {
          const originalLink = response.data.originalLink;
          // Ensure the URL is valid
          const url =
            originalLink.startsWith("http://") ||
            originalLink.startsWith("https://")
              ? originalLink
              : "http://" + originalLink;

          // Navigate directly using the navigate function
          window.location.href = url;
        } else {
          toast({
            variant: "destructive",
            title: "Error",
            description: "Link does not exist",
          });
          navigate("/home");
        }
      } catch (err) {
        // Handle different error cases
        toast({
          variant: "destructive",
          title: "Error",
          description: "An error occurred while trying to redirect.",
        });
        navigate("/home");
        console.error(err);
      }
    };
    redirect();
  }, [domainUrl, toast]);

  return (
    <main className=" w-screen h-screen bg-[#131113] flex justify-center items-center">
      <Loader />
    </main>
  );
};

export default RedirectPage;
