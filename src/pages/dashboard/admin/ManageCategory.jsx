import { useForm } from "react-hook-form";
import useAxios from "../../../others/Axios/useAxios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { FcDeleteDatabase } from "react-icons/fc";
import { MdDelete, MdSecurityUpdateGood } from "react-icons/md";

const ManageCategory = () => {
  const axios = useAxios();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const info = {
      name: data.name,
      image: data.image,
    };
    axios.post("/category", info).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Category created successfully.",
        });
      } else {
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Something went wrong.",
        });
      }
    });
    console.log(info);
    // reset();
  };

  const { data: category = [], refetch } = useQuery({
    queryKey: ["email"],
    queryFn: async () => {
      const res = await axios.get("/category");
      return res.data;
    },
    refetchInterval: 1000,
  });
  console.log(category);
  return (
    <div>
      <div>
        <div className="flex justify-center flex-col items-center my-12 space-y-2">
          <h3 className="text-center">Do you wanna add category?</h3>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn"
            onClick={() => document.getElementById("my_modal_5").showModal()}
          >
            Add Category
          </button>
          <dialog
            id="my_modal_5"
            className="modal modal-bottom sm:modal-middle"
          >
            <div className="modal-box">
              <h3 className="font-bold text-lg">Add Category!</h3>
              <div className=" bg-base-200 rounded-lg mt-2 p-3 ">
                <form
                  action=""
                  className="w-full"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <label className="form-control w-full ">
                    <div className="label">
                      <span className="label-text">Category Name</span>
                    </div>
                    <input
                      type="text"
                      {...register("name", { required: true })}
                      placeholder="Category name"
                      className="input input-bordered w-full"
                    />
                  </label>
                  <label className="form-control w-full ">
                    <div className="label">
                      <span className="label-text">Category Image URL</span>
                    </div>
                    <input
                      type="text"
                      {...register("image", { required: true })}
                      placeholder="Image URL"
                      className="input input-bordered w-full"
                    />
                  </label>

                  <button className="btn btn-primary w-full mt-3">Add</button>
                </form>
              </div>

              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn btn-sm">Close</button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
        <hr />
        <div>
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Update</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {category.map((item, index) => (
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
                        <button className="btn-ghost text-green-500 text-xl">
                          <MdSecurityUpdateGood />
                        </button>
                      </td>
                      <td>
                        <button className="btn-ghost">
                          <MdDelete className="text-red-500 text-xl" />
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
    </div>
  );
};

export default ManageCategory;
