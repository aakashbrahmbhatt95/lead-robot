import { Button } from "@/lib/ui/button";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import Image from "next/image";
import googleicon from "../../../public/Google.svg";
import { HttpUtil } from "@/utils/http-util";
import { BASE_URL, PROVIDER_TOKEN } from "@/utils/apiConstants";
import { toast } from "react-toastify";
import { setCookie } from "cookies-next";
import {
  NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  SESSION_KEY,
  TOKEN_KEY,
} from "@/utils/constants";
import { useRouter } from "next/navigation";

const GoogleAuthButton = () => {
  const router = useRouter();
  const handleGoogleAuth = (credentialResponse: any) => {
    const { credential: id_token } = credentialResponse;

    if (id_token) {
      const payload = {
        provider: "google",
        process: "login",
        token: {
          client_id: NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          access_token: "", // Not required in this flow
          id_token,
        },
      };

      HttpUtil.makePOST(`${BASE_URL}${PROVIDER_TOKEN}`, payload)
        .then((res) => {
          toast.success("User Logged In Successfully");
          setCookie(TOKEN_KEY, res.data.meta.access_token);
          setCookie(SESSION_KEY, res.data.meta.session_token);
          router.push("/campaigns");
        })
        .catch((err: any) => {
          console.error("Error:", err);
        });
    } else {
      console.error("No ID token found in the response.");
    }
  };

  return (
    // @ts-ignore
    <GoogleLogin
      onSuccess={handleGoogleAuth}
      onError={() => {
        console.error("Google Login Failed");
      }}
      useOneTap
    >
      <Button
        variant="outline"
        type="button"
        className="rounded-[20px] flex items-center gap-4 w-full"
      >
        <Image src={googleicon} alt="Google Icon" className="w-6 h-6" />
        Continue with Google
      </Button>
    </GoogleLogin>
  );
};

const GoogleAuthContainer = () => {
  return (
    <GoogleOAuthProvider clientId={`${NEXT_PUBLIC_GOOGLE_CLIENT_ID}`}>
      <GoogleAuthButton />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthContainer;
