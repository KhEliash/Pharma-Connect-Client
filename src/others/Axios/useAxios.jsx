import axios from "axios";

 const axioS = axios.create({
    // baseURL: "http://localhost:5000"
    baseURL: "https://pharm-connect-serveer.vercel.app"
 })

const useAxios = () => {
    return axioS;
};

export default useAxios;