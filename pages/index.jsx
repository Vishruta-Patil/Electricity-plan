import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Loader } from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import { API } from "./api/apiHandler";


const ProductList = () => {
  const {data, loader, cookies, getToken, getProductList} = API()

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
