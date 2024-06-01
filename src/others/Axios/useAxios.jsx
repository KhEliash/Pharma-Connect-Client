import axios from "axios";

 const axioS = axios.create({
    baseURL: "http://localhost:5000"
 })

const useAxios = () => {
    return axioS;
};

export default useAxios;