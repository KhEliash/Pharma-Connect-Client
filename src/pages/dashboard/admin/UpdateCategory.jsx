import { useParams } from "react-router-dom";
import useAxios from "../../../others/Axios/useAxios";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UpdateCategory = () => {
  const { id } = useParams();
  //   console.log(id);

  const axios = useAxios();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    // console.log(data);
    const info = {
      name: data.name,
      image: data.image,
    };
    axios
      .put(`/category/${id}`, info)
      .then((res) => {
        console.log(res);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Category updated successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="flex justify-center items-center w-full h-full">
      <div className="">
        <h3 className="font-bold text-lg">Update Category!</h3>
        <div className=" bg-base-200 rounded-lg mt-2 p-3 ">
          <form action="" className="w-full" onSubmit={handleSubmit(onSubmit)}>
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

            <button className="btn btn-primary w-full mt-3">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategory;
