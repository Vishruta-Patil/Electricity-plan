import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";

const ProductList = () => {
  const [data, setData] = useState([]);

  const getToken = async () => {
    try {
      const res = await fetch("/api/getToken");
      const authToken = await res.json();
      localStorage.setItem("token", authToken?.data?.token);
    } catch (e) {
      console.log("error", e);
    }
  };

  const getProductList = async (token) => {
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
        if (serverData.message === "Your token has been expired.") {
          await getToken();
        }
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  useEffect(() => {
    (async () => {
      await getToken();
      const token = JSON.stringify(localStorage.getItem("token"));
      if (token) {
        const data = JSON.parse(token);
        getProductList(data);
      } else {
        await getToken();
      }
    })();
  }, []);

  return (
    <div>
      {data
        ? data.map((data, index) => <ProductCard key={index} data={data} />)
        : "No Data Found"}
    </div>
  );
};

export default ProductList;
