import { useState } from "react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { auth } from "../Services/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getUser, useLoginMutation } from "../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../types/api-type";
import { useDispatch } from "react-redux";
import { userExist, userNotExist } from "../redux/reducers/userReducers";

const Login = () => {
    const [gender, setGender] = useState("");
    const [date, setDate] = useState("");

    const [login] = useLoginMutation();
    const dispatch = useDispatch();

    const loginHandler = async () => {
        try {
            if (gender == "" || date == "") {
                toast.error("All field required")
                return
            };
            const provider = new GoogleAuthProvider();
            const { user } = (await signInWithPopup(auth, provider));

            const res = await login({
                name: user.displayName!,
                photo: user.photoURL!,
                email: user.email!,
                gender,
                dob: date,
                role: "user",
                _id: user.uid
            })

            if ("data" in res) {
                const userData = await getUser(user.uid);
                dispatch(userExist(userData.user))
                toast.success(res.data.message);
            } else {
                const error = res.error as FetchBaseQueryError;
                const message = (error.data as MessageResponse).message;
                console.log(message);
                toast.error(message);
                dispatch(userNotExist());
            }

        } catch (error: any) {
            toast.error(error.message);
        }
    }

    return (
        <div className="login">
            <main>
                <h1 className="heading">Login</h1>
                <div>
                    <label>Gender</label>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <label>Date of birth</label>
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <p>Already Signed In Once</p>
                    <button onClick={loginHandler}>
                        <FcGoogle /> <span>Sign in with Google</span>
                    </button>
                </div>
            </main>
        </div>
    );
};

export default Login;