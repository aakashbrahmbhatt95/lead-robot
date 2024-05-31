import { BASE_URL, DELETE_SESSION } from '@/utils/apiConstants';
import { SESSION_KEY } from '@/utils/constants';
import { deleteCookie } from "cookies-next";
import { useRouter } from 'next/navigation'
import { TOKEN_KEY } from '@/utils/constants';
// import { HttpUtil } from '@/utils/http-util';

const useLogout = () => {
    const router = useRouter();

    const logout = async () => {
        // await HttpUtil.makeDELETE(`${BASE_URL}${DELETE_SESSION}`)
        deleteCookie(TOKEN_KEY);
        deleteCookie(SESSION_KEY);
        router.push('/login')
    }

    return {
        logout
    }
}

export default useLogout;