import { useParams } from "react-router-dom";
import useAxios from "../others/Axios/useAxios";
import { useQuery } from "@tanstack/react-query";
import { BsEye } from "react-icons/bs";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CategoryDetails = () => {
  const { category } = useParams();
  console.log(category);
  const axios = useAxios();
  const {
    data: myCategory = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get(`/medicines/${category}`);
      return res.data;
    },
  });
  console.log(myCategory);

  return (
    <div>
      <h1 className="text-center text-3xl font-bold mt-6 mb-6">{category}</h1>
      <div>
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
              {myCategory.map((item, index) => (
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
                     <FaEye className="text-xl"/>
                    </button>
                    <dialog
                      id="my_modal_5"
                      className="modal modal-bottom sm:modal-middle"
                    >
                      <div className="modal-box">
                        <h3 className="font-bold text-lg">Hello!</h3>
                        <p className="py-4">
                          Press ESC key or click the button below to close
                        </p>
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
                    <button className="btn btn-primary">Select</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;
