import { useQuery } from "@tanstack/react-query";
import useAxios from "../others/Axios/useAxios";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
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

  console.log(allAdReq);
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
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={50}
              slidesPerView={1}
              //   navigation
              pagination={{ clickable: true }}
              //   scrollbar={{ draggable: true }}
              //   onSwiper={(swiper) => console.log(swiper)}
              //   onSlideChange={() => console.log("slide change")}
            >
              {allAdReq.map((e) => (
                <SwiperSlide key={e._id}>
                    <div className="flex bg-red-300">
                        <div className="flex-1">
                            <h1>{e.name}</h1>
                            <p>{e.description}</p>
                        </div>
                       <div className="flex-1">
                       <img src={e.image} alt="" className="w-full h-[500px]"/>
                       </div>
                    </div>
                    </SwiperSlide>
              ))}
              ...
            </Swiper>
          </div>
        </>
      )}
    </div>
  );
};

export default Slider;
