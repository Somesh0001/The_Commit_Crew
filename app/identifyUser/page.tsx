"use client";
import { useUserContext } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

const VerifyPage = () => {
  const { isUserIdentified, setIsUserIdentified } = useUserContext();
  const router = useRouter();

  function handleVerificationSuccess() {
    setIsUserIdentified(true); 
    console.log("isUserIdentified value is : " + isUserIdentified);  
    router.push("/attendance"); 
  }

  return (
    <div className="p-4 h-[60vh] flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold mb-4">Verification Page</h1>
      <p className="mb-4">Click the button below to verify yourself.</p>
      <Button onClick={handleVerificationSuccess} className="mb-4">
        Verify Me
      </Button>
    </div>
  );
};

export default VerifyPage;
