import { useQuery } from "@tanstack/react-query";
import useAxios from "../others/Axios/useAxios";
import { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { AiOutlineCloseSquare } from "react-icons/ai";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  const navigate = useNavigate();

  const {
    data: myCart = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/cart/${user?.email}`);
      return res.data;
    },
  });

  const [quantities, setQuantities] = useState({});

  const handleIncrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const handleDecrement = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1,
    }));
  };

  const handleChange = (id, value) => {
    const quantity = parseInt(value, 10);
    if (quantity >= 1) {
      setQuantities((prev) => ({
        ...prev,
        [id]: quantity,
      }));
    }
  };

  const handleRemove = async (id) => {
    await axios.delete(`/cart/${user?.email}/${id}`).then((res) => {
      // console.log(res);
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const handleClearCart = async () => {
    await axios.delete(`/cart/${user?.email}`).then((res) => {
      // console.log(res);
      if (res.data.deletedCount > 0) {
        Swal.fire({
          title: "Deleted!",
          text: "Your cart has been deleted.",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };

  const total = myCart.reduce(
    (total, item) =>
      total + item.price * (quantities[item._id] || item.quantity || 1),
    0
  );
  const handleCheckout = () => {
    navigate("/checkout", { state: { total } });
  };

  // console.log(total);

  return (
    <div>
      <Helmet>
        <title>PharmaConnect | Cart</title>
        <meta name="description" content="Your shopping cart" />
      </Helmet>
      {isLoading && <h1>Loading...</h1>}
      <div className="flex flex-col md:flex-row p-4">
        <div className="w-full md:w-3/4 flex flex-col gap-4">
          {myCart.map((item) => (
            <div key={item._id} className="flex p-4 border-b gap-5 relative">
              <div className="flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-32 rounded-md"
                />
              </div>
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <h2>Company: {item.company}</h2>
                <h2>Price: ${item.price}</h2>
                <p>Unit: {item.unit} mg/ml</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleDecrement(item._id)}
                    className="px-3 py-1 bg-red-500 text-white font-bold rounded-l hover:bg-red-600 focus:outline-none"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantities[item._id] || item.quantity || 1}
                    onChange={(e) => handleChange(item._id, e.target.value)}
                    className="w-12 text-center border-t  border-b border-gray-300 focus:outline-none "
                    min="1"
                  />
                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="px-3 py-1 bg-green-500 text-white font-bold rounded-r hover:bg-green-600 focus:outline-none"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => handleRemove(item._id)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <AiOutlineCloseSquare className="text-2xl" />
                </button>
              </div>
            </div>
          ))}
          {myCart.length > 0 && (
            <button
              onClick={handleClearCart}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Clear Cart
            </button>
          )}
        </div>
        <div className="md:w-1/4 bg-blue-200 p-4">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Total Items:</span>
            <span>{myCart.length}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Total Price:</span>
            <span>
              $
              {myCart.reduce(
                (total, item) =>
                  total +
                  item.price * (quantities[item._id] || item.quantity || 1),
                0
              )}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
