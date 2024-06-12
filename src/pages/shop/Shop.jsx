import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../provider/AuthProvider";
import useAxios from "../../others/Axios/useAxios";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const { user } = useContext(AuthContext);
  // const { category } = useParams();
  // console.log(category);
  const axios = useAxios();
  const navigate = useNavigate();
  const {
    data: allMedicine = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await axios.get("/medicines");
      return res.data;
    },
  });
  // console.log(allMedicine);

  const handleSelect = (item) => {
    if(!user){
      return  navigate('/login')
    
    }
    const { category, company, genericName, name, image, price, unit, _id } =
      item;
    const cartItem = {
      ID: _id,
      email: user?.email,
      name,
      image,
      category,
      company,
      genericName,
      price,
      unit,
    };
    axios.post("/cart", cartItem).then((res) => {
      // console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Medicine added to cart successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Medicine already added to cart.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  return (
    <div>
      <Helmet>
        <title>PharmaConnect | Shop</title>
        <meta name="description" content="Nested component" />
      </Helmet>

      <div>
        <h1 className="text-center text-3xl font-bold mt-6 mb-6">Shop</h1>
        <div>
          {allMedicine == "" && (
            <>
              {" "}
              <p className="text-center text-red-500 font-bold w-full">
                No medicine added yet
              </p>
            </>
          )}
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Medicine Name</th>
                  <th>Image</th>
                  <th>Details</th>
                  <th>Add to cart</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {allMedicine.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </td>
                    <td>
                      <img
                        src={item.image}
                        alt=""
                        className="w-24 h-12 rounded-md"
                      />
                    </td>
                    <td>
                      {/* Open the modal using document.getElementById('ID').showModal() method */}
                      <button
                        className="btn btn-ghost text-blue-600 text-2xl"
                        onClick={() =>
                          document.getElementById("my_modal_5").showModal()
                        }
                      >
                        <FaEye className="text-xl" />
                      </button>
                      <dialog
                        id="my_modal_5"
                        className="modal modal-bottom sm:modal-middle"
                      >
                        <div className="modal-box">
                          <h3 className="font-bold text-lg"> {item.name}</h3>
                          <div className="py-4">
                            <div className="flex items-center justify-center">
                              <img
                                src={item.image}
                                alt="img"
                                className="w-full h-[250px] rounded-md"
                              />
                            </div>
                            <div className="space-y-4 mt-3">
                              <p>
                                <span className="text-blue-600 font-bold">
                                  Description :
                                </span>{" "}
                                {item.description}
                              </p>

                              <div className="flex justify-between">
                                <p className="text-xl text-green-600">
                                  <span className="text-blue-600 font-bold">
                                    Price :
                                  </span>{" "}
                                  {item.price} tk
                                </p>
                                <p>
                                  <span className="text-blue-600 font-bold">
                                    Unit :
                                  </span>{" "}
                                  {item.unit} ml/mg
                                </p>
                              </div>
                              <p>
                                <span className="text-blue-600 font-bold">
                                  Generic Name:
                                </span>{" "}
                                {item.genericName}
                              </p>
                              <p>
                                {" "}
                                <span className="text-blue-600 font-bold">
                                  Discount :
                                </span>{" "}
                                {item.discount} %
                              </p>
                              <p>
                                <span className="text-blue-600 font-bold">
                                  Company :
                                </span>{" "}
                                {item.company}
                              </p>
                            </div>
                          </div>
                          <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn">Close</button>
                            </form>
                          </div>
                        </div>
                      </dialog>
                    </td>
                    <td className="flex gap-1">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleSelect(item)}
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
