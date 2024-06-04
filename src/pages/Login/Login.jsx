import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
 import useAxios from "../../others/Axios/useAxios";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signIn ,googleLogIn} = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const axios = useAxios();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    signIn(data.email, data.password)
      .then((res) => {
        console.log(res);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "User log In successfully.",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state ? location.state : "/");
        reset();
      })
      .catch((error) => {
        console.log(error.message);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
      });

    console.log(data);
  };
  const handleGoogle =()=>{
    googleLogIn()
   .then((res) => {
     console.log(res);
     Swal.fire({
       position: "top-end",
       icon: "success",
       title: "User log In successfully.",
       showConfirmButton: false,
       timer: 1500,
     });
     const userInfo = {
       name: res.user.displayName,
       email: res.user.email,
       photo: res.user.photoURL,
       role: "user",
     }
     axios.post("/users", userInfo)
     navigate(location?.state? location.state : "/");
     
   })
   .catch((error)=>{
     console.log(error.message);
     Swal.fire({
       icon: "error",
       title: "Oops...",
       text: `${error.message}`,
       
     });
   })
  }
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="text-center lg:text-left"></div>
          <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <div>
              <h1 className="text-5xl text-center my-5 font-bold">
                Log In now!
              </h1>
            </div>

            <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                  className="input input-bordered"
                />
                {/* errors will return when field validation fails  */}
                {errors.email && (
                  <span className="text-red-500">Email field is required</span>
                )}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  {...register("password", { required: true, minLength: 6 })}
                  className="input input-bordered"
                />
                {/* errors will return when field validation fails  */}
                {errors.password && (
                  <span className="text-red-500">
                    Password should be 6 character
                  </span>
                )}
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>

            <div className="divider mt-0"></div>
            <div className=" flex justify-center">
              <button
              onClick={handleGoogle}
              className="flex items-center gap-2 btn btn-md bg-[#F8F8F8] shadow-md mb-3">
                <FcGoogle  className="text-lg" />
                Google
              </button>
            </div>
            <div>
              <p className=" text-center mb-2">
                Do not register ? Please
                <Link to={"/signUp"} className="text-blue-500 text-lg ml-2">
                  SignUp
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
