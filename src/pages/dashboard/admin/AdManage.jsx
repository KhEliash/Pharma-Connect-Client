import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../others/Axios/useAxios";

const AdManage = () => {
  const axios = useAxios();

  const { data: allAdReq = [], refetch } = useQuery({
    queryKey: ["email"],
    queryFn: async () => {
      const res = await axios.get("/sellerAdds");
      return res.data;
    },
  });
  console.log(allAdReq);

  const handleToggle = (e, id) => {
    console.log(e.target.checked);
    console.log(id);
  };

  return (
    <div>
      <h2 className="text-center my-4 font-bold ">
        Choose Image for Banner slider
      </h2>
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
                      <input
                        type="checkbox"
                        className="toggle"
                        onChange={(e) => handleToggle(e, item._id)}
                      />
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

export default AdManage;
