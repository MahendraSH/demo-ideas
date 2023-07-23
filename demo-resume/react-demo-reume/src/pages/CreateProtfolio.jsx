import React from "react";

const CreateProtfolio = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [discription, setDiscription] = React.useState("");
  const [preview, setPreview] = React.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, discription);
  };
  const handlePreview = () => {
    setPreview(!preview);
  };
  return preview ? (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content  shadow-md shadow-slate-600 ">
          <div className="indicator card card-side bg-base-100 shadow-xl">
            <button
              onClick={handlePreview}
              className="indicator-item badge badge-secondary"
            >
              {" "}
              back{" "}
            </button>

            <div className="card-body">
              <h2 className="card-title">{name}</h2>
              <p>{discription}</p>
              <div className="">
                <h3>{email}</h3>
              </div>
            </div>
            <figure>
              <img
                src="https://res.cloudinary.com/dranaclni/image/upload/v1686133460/cenIN/avatars/cf6k0nkbrqnldjok8r46.png"
                alt="Movie"
              />
            </figure>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>
      <div className="hero min-h-screen bg-base-200 m-0 p-0">
        <div className="hero-content w-full m-0 p-0">
          <div className="card  indicator shadow-xl bg-base-100  p-1 m-0 w-9/12 lg:w-7/12 shadow-slate-500">
            <button
              onClick={handlePreview}
              className="indicator-item badge badge-secondary"
            >
              preview
            </button>
            <form onSubmit={handleSubmit} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  className="input input-bordered"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">discription</span>
                </label>
                <textarea
                  className="textarea textarea-bordered  "
                  placeholder="discription"
                  value={discription}
                  onChange={(e) => setDiscription(e.target.value)}
                  required
                ></textarea>
              </div>
              <div className="form-control mt-6">
                <button type="submit" className="btn btn-primary">
                  create
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateProtfolio;
