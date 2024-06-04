import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../provider/AuthProvider";

import useAxios from "../../../others/Axios/useAxios";
import Swal from "sweetalert2";

const AdAsk = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();
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
    axios.post("/sellerAdds", adItem).then((res) => {
      // console.log(res);
      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Advertisement created successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    // console.log(adItem);
  };
  return (
    <div>
      <div className="flex justify-center flex-col items-center my-12 space-y-2">
        <h3 className="text-center">
          Do you wanna ask Admin for Banner slider?
        </h3>
        {/* Open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_5").showModal()}
        >
          Ask For Ad
        </button>
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add your Advertisement!</h3>
            <div className=" bg-base-200 rounded-lg mt-2 p-3 ">
              <form
                action=""
                className="w-full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text">Image URL</span>
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

export default AdAsk;
