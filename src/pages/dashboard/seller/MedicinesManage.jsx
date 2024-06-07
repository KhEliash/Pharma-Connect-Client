import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../provider/AuthProvider";

const MedicinesManage = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const adItem = {
      name: data.name,
      image: data.image,
      email: user.email,
      description: data.description,
    };
    console.log(data);
  };
  return (
    <div>
      <div className="flex justify-center flex-col items-center my-12 space-y-2">
        <h3 className="text-center">Do you wanna add a Medicine?</h3>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Add Medicine
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
    </div>
  );
};

export default MedicinesManage;
