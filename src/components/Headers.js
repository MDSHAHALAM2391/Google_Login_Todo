import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
function Headers() {
  const navigate = useNavigate()
  const [state, setState] = useState("")
  useEffect(() => {
    console.log('running');
    const localAuthState = JSON.parse(localStorage.getItem("authState"));
    setState(localAuthState)
  }, [localStorage.getItem("authState")])

  console.log(state);

  const signout = () =>
    auth.signOut().then(() => {
      navigate("/")
    })
  return (
    <div className="dashboard-header d-flex align-items-center justify-content-between p-4" style={{ background: 'lightgray' }}>
      <div className="d-flex align-items-center">

        <h5 className="fw-medium mb-0 ms-5 d-flex">
          <span>
            Hi,
            <span className="fw-bold name"> {state?.displayName}</span>
          </span>
        </h5>
        <h5 className="fw-medium mb-0 ms-4 d-flex">
          <span>
            Email:
            <span className="fw-bold name">{state?.email}</span>
          </span>
        </h5>
      </div>
      <div className="d-flex align-items-center header-content">
        <Link
          style={{ textDecoration: "none" }}
          to=""
          type="button"
          className="btn btn-primary sideBarColor"
        >
          <span className="nav-label" onClick={signout}>Logout</span>
        </Link>
      </div>
    </div >
  )
}
export default Headers;