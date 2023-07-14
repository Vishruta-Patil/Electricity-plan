import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Loader } from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import DOMPurify from "dompurify";
import { useCookies } from 'react-cookie'

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [cookies, setCookie] = useCookies(['auth_token'])

  const getToken = async () => {
    setLoader(true);
    try {
      const res = await fetch("/api/getToken");
      const authToken = await res.json();

      let expires = new Date();
      const tk = authToken?.data?.token_expire_time
      console.log(Date.parse(tk))
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

  useEffect(() => {
    (async () => {
      await getToken();
      const token = cookies.auth_token;
      if (token) {
        getProductList(token);
      } else {
        await getToken();
      }
    })();
  }, []);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loader ? (
        <Loader />
      ) : (
        <div>
          <DataCount>Electricity : {data.length}</DataCount>
          {data
            ? data.map((data, index) => <ProductCard key={index} data={data} />)
            : "No Data Found"}
        </div>
      )}
    </div>
  );
};

export default ProductList;

const DataCount = styled.div`
  background: #2f5ea1;
  padding: 7px;
  color: #fff;
  display: inline-block;
  border-radius: 5px;
`;
