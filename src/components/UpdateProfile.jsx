import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../provider/AuthProvider";

const UpdateProfile = () => {
  const { updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    updateUserProfile(data.name, data.photo)
      .then((res) => {
        console.log(res);
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="">
      <div className="w-full min-h-screen   flex items-center justify-center">
        <form
          className=" bg-base-200 p-5 rounded-xl w-2/3 my-12 shadow-md"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-5xl text-center my-5 font-bold">
            Update Profile
          </h1>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              {...register("name", { required: true })}
              placeholder="Name"
              className="input input-bordered w-full"
            />
          </label>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Photo</span>
            </div>
            <input
              type="text"
              {...register("photo", { required: true })}
              placeholder="Photo URL"
              className="input input-bordered w-full"
            />
          </label>

          <button className="btn btn-primary w-full mt-3">Update</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;