import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { Loader } from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const ProductList = () => {
  const [data, setData] = useState([]);
  const [loader, setLoader] = useState(false);

  const localStorageWithExpiry = {
    setItem: function(key, value, expiry) {
      const newValue = {
        value, 
        expiry: Date.now() + expiry
      }
      localStorage.setItem(key, JSON.stringify(newValue))
    },
    getItem:   function(key) {
      let data = localStorage.getItem(key)
      data = JSON.parse(data)
      if(Date.now() >= data?.expiry) {
        localStorage.removeItem(key)
        return null
      }
      else return data?.value
    }
  }

  const getToken = async () => {
    setLoader(true);
    try {
      const res = await fetch("/api/getToken");
      const authToken = await res.json();
      localStorageWithExpiry.setItem("token", authToken?.data?.token, 5000 ) 
    } catch (e) {
      toast.error(e.message)
    }
    finally {
      setLoader(false);
    }
  };

  

  const getProductList = async (token) => {
    setLoader(true);
    console.log({token})
    try {
      const res = await fetch("/api/getProducts", {
        headers: {
          token
        }
      });
      const serverData = await res.json();
      if (serverData.status) {
        setData(serverData.data.electricity);
      } else {
        if (serverData.message === "Your token has been expired." || serverData.message === "Invalid Auth-Token.") {
          await getToken();
          toast.error(serverData.message)
        }
      }
    } catch (e) {
      toast.error(e.message)
    } finally {
      setLoader(false);
    }
  };

  

  useEffect(() => {
    (async () => { 
      await getToken(); 
      const token = localStorageWithExpiry.getItem("token")
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
      ) : 
      <div>
        <DataCount>Electricity : {data.length}</DataCount>
      {data ? (
        data.map((data, index) => <ProductCard key={index} data={data}/>)
      ) : (
        "No Data Found"
      )}
      </div>
}
    </div>
  );
};

export default ProductList;


const DataCount = styled.div`
  background: #2F5EA1;
  padding: 7px;
  color: #fff;
  display: inline-block;
  border-radius: 5px;
`