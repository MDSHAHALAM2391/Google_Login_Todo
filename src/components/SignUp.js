/* eslint-disable jsx-a11y/no-redundant-roles */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../utils/firebase";
import GoogleLogo from '../assests/Image/Google.png'
import { getAuth, onAuthStateChanged } from "firebase/auth";
function Signup() {
    useEffect(() => { localStorage.setItem("authState", JSON.stringify({})) }, [])
    const navigate = useNavigate()
    const onSubmitForm = () => {
        navigate("/Dashboard")
    }
    const signInWithGoogle = () => {
        auth.signInWithPopup(googleProvider).then((res) => {
            console.log(res.user)
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    const uid = user.uid;
                    console.log(user);
                    localStorage.setItem("authState", JSON.stringify(user));
                }
            });
            navigate("/Dashboard")
        }).catch((error) => {
            console.log(error.message)
        })
    }
    return (
        <>
            <div className="login">
                <div className="row" style={{ backgroundColor: "#fff" }}>
                    <div className="col-12">
                        <div class="middle-box border rounded px-5 py-4">
                            <div>

                                <h2 className="mb-4">Welcome to Todo</h2>
                                <form
                                    className="m-t"
                                    role="form"
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        onSubmitForm();
                                    }}
                                >
                                    <div className="form-group mb-2">
                                        <input
                                            type="email"
                                            className="form-control loginInput shadow-none"
                                            placeholder="Enter email address"
                                            name="email"
                                            required
                                        />
                                    </div>
                                    <div className="form-group mb-4">
                                        <input
                                            className="form-control shadow-none"
                                            placeholder="Enter password"
                                            name="password"
                                            data-ng-pattern="/^\S*$/"
                                            required
                                        />

                                    </div>
                                    <button
                                        type="submit"
                                        className="btn btn-primary block full-width mb-2 w-100"
                                    >
                                        Login
                                    </button>
                                </form>
                                <button onClick={signInWithGoogle}
                                    className="btn btn-primary w-100 bg-transparent text-dark">
                                    <img alt="" className="GoogleLogo" src={GoogleLogo} />
                                    Login with Google</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Signup;
