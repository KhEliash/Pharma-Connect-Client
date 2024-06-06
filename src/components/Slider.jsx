import { useQuery } from "@tanstack/react-query";
import useAxios from "../others/Axios/useAxios";
// import Swiper core and required modules
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const Slider = () => {
  const axios = useAxios();

  const {
    data: allAdReq = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["confirmed"],
    queryFn: async () => {
      const res = await axios.get(`/bannerAdds/${"confirmed"}`);
      return res.data;
    },
    refetchInterval: 1000,
  });

  // console.log(allAdReq);
  return (
    <div>
      {isLoading ? (
        <>
          <div className="w-full h-screen flex items-center justify-center">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-600"></div>
          </div>
        </>
      ) : (
        <>
          <div>
            <Swiper
              // install Swiper modules
              modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
              spaceBetween={50}
              slidesPerView={1}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              loop={true}
              navigation={true}
              pagination={{ clickable: true }}
              className="rounded-md"
            >
              {allAdReq.map((e) => (
                <SwiperSlide key={e._id} className="rounded-md">
                  <div className="flex bg-base-200">
                    <div className="flex flex-1 flex-col justify-center items-center space-y-2">
                      <h1 className="text-5xl font-bold ">{e.name}</h1>
                      <p>{e.description}</p>
                    </div>
                    <div className="flex-1">
                      <img src={e.image} alt="" className="w-full h-[500px]" />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default Slider;
