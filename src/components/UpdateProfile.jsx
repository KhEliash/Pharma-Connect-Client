import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../provider/AuthProvider";

const UpdateProfile = () => {
    const {updateUserProfile}=useContext(AuthContext);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
      } = useForm();
      const onSubmit = (data) => {
        console.log(data);
        updateUserProfile(data.name, data.photo).then((res) => {
            console.log(res);
            reset();
        })
        .catch((error)=>{
            console.log(error);
        })
      };
  return (
    <div className="">
      <div className="w-full min-h-screen bg-fuchsia-500 flex items-center justify-center">
        <form className=" bg-base-100 p-5 rounded-xl w-2/3 my-12" onSubmit={handleSubmit(onSubmit)}>
          <h1 className="text-5xl text-center my-5 font-bold">
            Update Profile
          </h1>
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text">Name</span>
            </div>
            <input
              type="text"
              {...register("name")}
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
              {...register("photo")}
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
