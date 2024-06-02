import { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import useAxios from "../../others/Axios/useAxios";
import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const axios = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const handleSignUp = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photo.value;
    const password = e.target.password.value;
    const role = e.target.role.value;
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        updateUserProfile(name, photo).then(() => {
          const userInfo = {
            name: name,
            email: email,
            photo: photo,
            role: role,
          };
          axios.post("/users", userInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "User created successfully.",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(location?.state ? location.state : "/");
            }
          });
        });
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
  };

  return (
    <div>
       
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse w-full">
          <div className="text-center lg:text-left"></div>
          <div className="card shrink-0 w-full max-w-md shadow-2xl bg-base-100">
            <div>
              <h1 className="text-5xl text-center my-5 font-bold">
                SignUP now!
              </h1>
            </div>

            <form className="card-body" onSubmit={handleSignUp}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  name="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo</span>
                </label>
                <input
                  type="text"
                  placeholder="Photo url"
                  name="photo"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
              </div>
              {/* Role Select */}
              <div className="form-control">
                <label htmlFor="role" className="label">
                  <span className="label-text">Select Role</span>
                </label>
                <select
                  id="role"
                  name="role"
                  className="select select-bordered w-full"
                  required
                  defaultValue={"hi"}
                >
                  <option value="hi" disabled>
                    Select your role
                  </option>
                  <option value="user">User</option>
                  <option value="seller">Seller</option>
                </select>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">SignUp</button>
              </div>
            </form>

            <div>
              <p className=" text-center mb-2">
                Already SignUp ? Please
                <Link to={"/login"} className="text-blue-500 text-lg ml-2">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
