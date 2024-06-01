const SignUp = () => {
    const handleSignUp = e =>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const photo = e.target.photo.value;
        const password = e.target.password.value;
        const role = e.target.role.value;
        const user = {
            name: name,
            email: email,
            photo: photo,
            password: password,
            role: role,
        }
        console.log(user);
       
    }

  return (
    <div>
      sign up
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
                >
                  <option value="" disabled selected>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
