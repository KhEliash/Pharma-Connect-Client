import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../others/Axios/useAxios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const AdManage = () => {
  const axios = useAxios();

  const {
    data: allAdReq = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sellerAdds"],
    queryFn: async () => {
      const res = await axios.get("/sellerAdds");
      return res.data;
    },
    refetchInterval: 1000,
  });
  // console.log(allAdReq);

  const handleToggle = (e, id) => {
    // console.log(e.target.checked);

    if (e.target.checked) {
      // console.log(id);
      axios
        .patch(`/sellerAdds/admin/${id}`)
        .then((res) => {
          //   console.log(res.data);
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Advertisement added successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
    } else {
      //   console.log("un", id);
      axios
        .patch(`/sellerAddsRemove/admin/${id}`)
        .then((res) => {
          //   console.log(res.data);
          if (res.data.modifiedCount > 0) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Advertisement removed successfully.",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
        .catch((error) => {
          console.log(error.message);
        });
      // refetch();
    }
  };

  return (
    <div>
      <Helmet>
        <title>PharmaConnect | Ad Manage</title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <h2 className="text-center my-4 font-bold ">
        Choose Image for Banner slider
      </h2>
      <hr />
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
        </div>
      ) : (
        <div>
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
                    <th>Accept/Deny</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {allAdReq.map((item, index) => (
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
                        {item.status === "confirmed" ? (
                          <>
                            <input
                              type="checkbox"
                              className="toggle"
                              checked
                              defaultValue={' '}
                              onChange={(e) => handleToggle(e, item._id)}
                            />
                          </>
                        ) : (
                          <>
                            <input
                              type="checkbox"
                              className="toggle"
                              defaultValue={' '}
                              onChange={(e) => handleToggle(e, item._id)}
                            />
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdManage;
