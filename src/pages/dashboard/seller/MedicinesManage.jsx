import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxios from "../../../others/Axios/useAxios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const MedicinesManage = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const {
    data: myMedicine = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["medicinesSeller", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/medicinesSeller/${user?.email}`);
      return res.data;
    },
  });
  console.log(myMedicine);

  const onSubmit = (data) => {
    const medicine = {
      name: data.name,
      image: data.image,
      email: user.email,
      description: data.description,
      price: data.price,
      category: data.category,
      discount: data.discount,
      genericName: data.genericName,
      company: data.company,
      unit: data.unit,
    };
    axios
      .post("/medicines", medicine)
      .then((res) => {
        // console.log(res.data);
        if (res.data.insertedId) {
          reset();
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Medicine created successfully.",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
        });
      });
  };
  return (
    <div>
      <Helmet>
        <title>PharmaConnect | Medicine Manage </title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <div className="flex justify-center flex-col items-center my-12 space-y-2">
        <h3 className="text-center">Do you wanna add a Medicine?</h3>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Medicine
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add your Medicine!</h3>
            <div className=" bg-base-200 rounded-lg mt-2 p-3 ">
              <form
                // action=""
                className="w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Medicine Image </span>
                  </div>
                  <input
                    type="text"
                    {...register("image", { required: true })}
                    placeholder="Image URL"
                    className="input input-bordered w-full"
                  />
                </label>

                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Medicine Name</span>
                  </div>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    placeholder="Medicine name"
                    className="input input-bordered w-full"
                  />
                </label>

                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Medicine Generic Name</span>
                  </div>
                  <input
                    type="text"
                    {...register("genericName", { required: true })}
                    placeholder="Medicine name"
                    className="input input-bordered w-full"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Medicine Description</span>
                  </div>
                  <input
                    type="text"
                    {...register("description", { required: true })}
                    placeholder="Description"
                    className="input input-bordered w-full"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Medicine Category</span>
                  </div>
                  <select
                    className=" p-3 rounded-md   w-full"
                    //   id="selectmethod"
                    defaultValue=""
                    name="exampleRequired"
                    {...register("category", { required: true })}
                  >
                    <option value="" disabled>
                      Select Category
                    </option>
                    <option value="Tablets">Tablets </option>
                    <option value="Syrups">Syrups </option>
                    <option value="Capsules">Capsules </option>
                    <option value="Injections">Injections </option>
                    <option value="Tablets">Inhalers </option>
                    <option value="Creams">Creams </option>
                  </select>
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Medicine Company</span>
                  </div>
                  <select
                    className=" p-3 rounded-md   w-full"
                    //   id="selectmethod"
                    defaultValue=""
                    name="exampleRequired"
                    {...register("company", { required: true })}
                  >
                    <option value="" disabled>
                      Select Company
                    </option>
                    <option value="Square Pharmaceuticals Ltd.">
                      Square Pharmaceuticals Ltd.{" "}
                    </option>
                    <option value="Beximco Pharmaceuticals Ltd.">
                      Beximco Pharmaceuticals Ltd.{" "}
                    </option>
                    <option value="Incepta Pharmaceuticals Ltd">
                      Incepta Pharmaceuticals Ltd{" "}
                    </option>
                    <option value="Renata Limited">Renata Limited </option>
                    <option value="ACME Laboratories Ltd.">
                      ACME Laboratories Ltd.{" "}
                    </option>
                  </select>
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">
                      Item Mass Unit (Mg or ML)
                    </span>
                  </div>
                  <input
                    type="number"
                    {...register("unit", { required: true })}
                    placeholder="Unit"
                    className="input input-bordered w-full"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Unit Price</span>
                  </div>
                  <input
                    type="number"
                    {...register("price", { required: true })}
                    placeholder="Price"
                    className="input input-bordered w-full"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Discount Percentage</span>
                  </div>
                  <input
                    type="number"
                    {...register("discount", { required: true })}
                    placeholder="Discount"
                    defaultValue={0}
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
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
        </div>
      ) : (
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Medicine Name</th>
                  <th>Category</th>
                  <th>Image</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {myMedicine.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </td>
                    <td>{item.category}</td>
                    <td>
                      <img
                        src={item.image}
                        alt=""
                        className="w-24 h-12 rounded-md"
                      />
                    </td>
                    <td className="flex gap-1">
                      {item.price} <span>tk</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicinesManage;
