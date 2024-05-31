import { loginReducer } from '../reducer/login-reducer';
import { AppDispatch } from '../store';
import { HttpUtil } from "../../utils/http-util"
import { BASE_URL, LOGIN_URL } from "../../utils/apiConstants";

  export const loginAction = (body: any) => async (dispatch :AppDispatch) => {
    HttpUtil.makePOST(`${BASE_URL}${LOGIN_URL}`, body)
      .then((res) => {
         console.log('res',res)
         dispatch(loginReducer(res))
      })
      .catch((err:any) => {
        // dispatch(loginReducer("API fails"))
      })
      .finally(() => {
      });
  };