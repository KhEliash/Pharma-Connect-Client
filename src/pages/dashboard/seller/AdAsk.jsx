import { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../provider/AuthProvider";

import useAxios from "../../../others/Axios/useAxios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

const AdAsk = () => {
  const { user } = useContext(AuthContext);
  const axios = useAxios();

  const { data: myAdReq = [], refetch,isLoading } = useQuery({
    queryKey: ["email", user?.email],
    queryFn: async () => {
      const res = await axios.get(`/sellerAdds/${user?.email}`);
      return res.data;
    },
  });
  // console.log(myAdReq);

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
        refetch();
      }
    });
    // console.log(adItem);
  };
  return (
    <div>
      <Helmet>
        <title>PharmaConnect | Ask For Ad </title>
        <meta name="description" content="Nested component" />
      </Helmet>
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
     {isLoading?
      <div className="w-full h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
    </div>:
     <div>
     <div className="overflow-x-auto">
       <table className="table">
         {/* head */}
         <thead>
           <tr>
             <th>No.</th>
             <th>Name</th>
             <th>Email</th>
             <th>Favorite Color</th>
             <th>Confirm/Pending</th>
           </tr>
         </thead>
         <tbody>
           {/* row 1 */}
           {myAdReq.map((item, index) => (
             <tr key={item._id}>
               <th>{index + 1}</th>
               <td>
                 <div>
                   <div className="font-bold">{item.name}</div>
                 </div>
               </td>
               <td>{item.email}</td>
               <td>
                 <img
                   src={item.image}
                   alt=""
                   className="w-24 h-12 rounded-md"
                 />
               </td>
               <td>
                {
                  item.status !== ' '? (
                    <span className="text-green-500">Confirmed</span>
                  ) : (
                    <span className="text-red-500">Pending</span>
                  )
                }
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
   </div>}
    </div>
  );
};

export default AdAsk;
