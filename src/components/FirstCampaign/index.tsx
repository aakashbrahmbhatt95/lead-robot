import Image from "next/image";
import ChatCenteredDots from "../../../public/ChatCenteredDots.svg";
import PlusWhite from "../../../public/Plus-white.svg";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const FirstCampaign = () => {
  const router = useRouter()
  return (
    <div className="h-calc-100vh-minus-20 w-full bg-[#f4f4f5] mt-4 rounded-lg flex flex-col justify-center items-center">
      <Image src={ChatCenteredDots} alt="ChatCenteredDots" />
      <p className="mt-2 text-lg font-semibold text-[#18181B]">
        Create your first campaign
      </p>
      <p className="mt-2 text-sm font-normal text-[#71717A]">
        All campaigns will show here
      </p>
      <Button className="mt-10" type="button" onClick={()=>router.push("/create-campaign/create")}>
        <Image src={PlusWhite} className="mr-2" alt="Logo" />
        Create campaign
      </Button>
    </div>
  );
};

export default FirstCampaign;
