import { Button } from "@/lib/ui/button";
import {
  GoogleOAuthProvider,
  useGoogleLogin,
  TokenResponse,
} from "@react-oauth/google";
import Image from "next/image";
import googleicon from "../../../public/Google.svg";
import { HttpUtil } from "@/utils/http-util";
import { BASE_URL, PROVIDER_TOKEN } from "@/utils/apiConstants";

const GoogleAuthButton = () => {
  const handleGoogleAuth = (response: TokenResponse) => {
    const { access_token } = response; // Extract access token from response
    if (access_token) {
      const payload = {
        provider: "google",
        process: "login",
        token: {
          client_id: "123.apps.googleusercontent.com",
          access_token, // Access token from Google response
        },
      };

      HttpUtil.makePOST(`${BASE_URL}${PROVIDER_TOKEN}`, payload)
        .then((res) => {
          console.log("Response:", res);
        })
        .catch((err: any) => {
          console.error("Error:", err);
        });
    } else {
      console.error("No access token found in the response.");
    }
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => handleGoogleAuth(tokenResponse),
    onError: () => {
      console.error("Google Login Failed");
    },
  });

  return (
    <Button
      variant="outline"
      type="button"
      className="rounded-[20px] flex items-center gap-4 w-full"
      onClick={() => login()}
    >
      <Image src={googleicon} alt="Google Icon" className="w-6 h-6" />
      Continue with Google
    </Button>
  );
};

const GoogleAuthContainer = () => {
  return (
    <GoogleOAuthProvider clientId="1088482495941-e4jgbnmnda3q1k498aa9rp1qrljevit8.apps.googleusercontent.com">
      <GoogleAuthButton />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthContainer;
