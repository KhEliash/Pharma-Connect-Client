import { useQuery } from "@tanstack/react-query";
import useAxios from "../others/Axios/useAxios";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
 
import { AiOutlineCloseSquare } from "react-icons/ai";
import { Helmet } from "react-helmet";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  const {
    data: myCart = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get(`/cart/${user?.email}`);
      return res.data;
    },
  });
  console.log(myCart);

  const [value, setValue] = useState(0);

  return (
    <div>
      <Helmet>
        <title>PharmaConnect | Cart</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      {isLoading && <h1>Loading</h1>}
      <div className="flex flex-col md:flex-row ">
        <div className="w-3/4 flex flex-col gap-2 ">
          {myCart.map((item) => (
            <div key={item._id} className="flex pb-4 border-b-2 gap-5 relative">
              <div className="flex items-center justify-center">
                <img
                  src={item.image}
                  alt=""
                  className="w-[120px] h-[166px]  rounded-md"
                />
              </div>

              <div>
                <h2>{item.name}</h2>
                <h2>{item.price}</h2>
                <h2>{item.quantity}</h2>
                <h2>{item.price}</h2>
                <input
                  type="number"
                  name="number"
                  id="number"
                  value={"0"}
                  className="border"
                />
                <div className="absolute top-2 right-3">
                  <button>
                    <AiOutlineCloseSquare className="text-xl text-red-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="md:w-1/4 bg-blue-200">s</div>
      </div>
    </div>
  );
};

export default Cart;
