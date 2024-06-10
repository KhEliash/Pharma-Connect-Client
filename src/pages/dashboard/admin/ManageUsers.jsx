import { Helmet } from "react-helmet";
import useAxios from "../../../others/Axios/useAxios";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const axios = useAxios();
  const {
    data: allUsers = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userss"],
    queryFn: async () => {
      const res = await axios.get("/users");
      return res.data;
    },
  });
//   console.log(allUsers);
  const handleRole = (e, id) => {
    const role = { role: e.target.value };
    // console.log(role, id);
    axios
      .patch(`/users/${id}`, role)
      .then((res) => {
        // console.log(res.data);

        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Role updated successfully.",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div>
      <Helmet>
        <title>PharmaConnect | User Manage </title>
        <meta name="description" content="Nested component" />
      </Helmet>
      <h1 className="text-center my-12 font-bold text-2xl underline">
        Manage Users
      </h1>
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
                  <th>Change Role</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {allUsers.map((item, index) => (
                  <tr key={item._id}>
                    <th>{index + 1}</th>
                    <td>
                      <div>
                        <div className="font-bold">{item.name}</div>
                      </div>
                    </td>
                    <td>{item.email}</td>
                    <td>
                      <select
                        onChange={(e, id) => handleRole(e, item._id)}
                        defaultValue={item.role}
                        className="border p-2 rounded-md"
                      >
                        <option value={"user"}>User</option>
                        <option value={"seller"}>Seller</option>
                        <option value={"admin"}>Admin </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
