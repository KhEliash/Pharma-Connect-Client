import { useQuery } from "@tanstack/react-query";
import useAxios from "../others/Axios/useAxios";
import { Link } from "react-router-dom";

const Category = () => {
  const axios = useAxios();

  const {
    data: category = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const res = await axios.get("/category");
      return res.data;
    },
    // refetchInterval: 1000,
  });
    // console.log(category);

  return (
    <div>
      {isLoading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
        </div>
      ) : (
        <div className=" my-24 ">
          <h1 className="text-3xl font-bold text-center my-12"> Category</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {category.map((item) => (
           <Link  key={item._id} to={`/categoryDetails/${item.name}`}>
              <div className="card  bg-base-100 shadow-xl">
                <figure>
                  <img
                    src={item.image}
                    alt="img"
                    className="h-[300px] w-full"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="text-2xl font-bold text-center">
                    {item.name}
                  </h2>
                </div>
              </div>
           </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
