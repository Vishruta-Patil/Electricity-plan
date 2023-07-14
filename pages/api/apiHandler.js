import DOMPurify from "dompurify";
import { useCookies } from 'react-cookie'
import { useState } from "react";

export const API = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [cookies, setCookie] = useCookies(['auth_token'])
    const getToken = async () => {
        setLoader(true);
        try {
          const res = await fetch("/api/getToken");
          const authToken = await res.json();
          let expires = new Date();
          expires.setTime(
            expires.getTime() + Date.parse(authToken?.data?.token_expire_time)
          );
          setCookie("auth_token", authToken?.data?.token, { path: "/", expires });
        } catch (e) {
          toast.error(e.message);
        } finally {
          setLoader(false);
        }
      };
    
      const getProductList = async (token) => {
        setLoader(true);
        try {
          const res = await fetch("/api/getProducts", {
            headers: {
              token
            }
          });
          const serverData = await res.json();
          if (serverData.status) {
            const sanitizeData = serverData.data.electricity.map((item) => ({
              ...item,
              view_benefit: DOMPurify.sanitize(item.view_benefit),
              view_bonus: DOMPurify.sanitize(item.view_bonus),
              view_contract: DOMPurify.sanitize(item.view_contract),
              view_exit_fee: DOMPurify.sanitize(item.view_exit_fee)
            }));
    
            setData(sanitizeData);
          } else {
            if (
              serverData.message === "Your token has been expired." ||
              serverData.message === "Invalid Auth-Token."
            ) {
              await getToken();
              toast.error(serverData.message);
            }
          }
        } catch (e) {
          toast.error(e.message);
        } finally {
          setLoader(false);
        }
      };

      return {data, loader, cookies, getToken, getProductList}
}