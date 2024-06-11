import { useQuery } from "@tanstack/react-query";
import useAxios from "../others/Axios/useAxios";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

const Discount = () => {
  const axios = useAxios();
  const {
    data: allMedicine = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["medicines"],
    queryFn: async () => {
      const res = await axios.get("/medicines");
      return res.data;
    },
  });
  // console.log(allMedicine);
  const discountProduct = allMedicine.filter(
    (item) => parseInt(item.discount) > 0
  );
//   console.log(discountProduct);
  return (
    <div>
      <h1 className="text-3xl font-bold  text-center my-24">
        Discount Products
      </h1>
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={30}
        slidesPerView={3}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log("slide change")}
      >
        {discountProduct.map((i) => (
          <SwiperSlide key={i._id} className=" rounded-md h-[300px]">
            <img src={i.image} alt="" className="rounded-md h-[300px] w-full" />
            <div className="absolute top-0 right-0 bg-orange-500 text-white p-4 rounded-md">
              <h1 className="text-sm lg:text-2xl font-bold">Name: {i.name}</h1>
              <h1 className="text-sm lg:text-2xl font-bold">Discount: {i.discount} %</h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Discount;
