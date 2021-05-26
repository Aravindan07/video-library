import { useState } from "react";
import { useVideoDataContext } from "../../context/videoDataContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SET__LOGOUT } from "../../constants";
import { useDocumentTitle } from "../../utils/useDocumentTitle";
import "../Accountpage/styles.css";

export default function RegisterPage() {
	useDocumentTitle("Account | CricTube");
	const initialValues = {
		email: "",
		password: "",
	};
	const initialActive = {
		isEmailActive: false,
		isPasswordActive: false,
	};
	const [{ email, password }, setState] = useState(initialValues);
	const { state, dispatch, registerUser } = useVideoDataContext();
	const [{ isEmailActive, isPasswordActive }, setIsActive] = useState(initialActive);

	const onChangeHandler = (event, sentName) => {
		const name = event.target.name;
		const value = event.target.value;
		const labelName = sentName;
		setState((prevState) => ({ ...prevState, [name]: value }));
		if (value !== "") {
			return setIsActive((prevState) => ({ ...prevState, [labelName]: true }));
		} else {
			return setIsActive((prevState) => ({ ...prevState, [labelName]: false }));
		}
	};

	const signInClickHandler = () => {
		if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
			return toast.error("Invalid Email address", {
				style: { backgroundColor: "#b91538" },
				autoClose: 2000,
				hideProgressBar: true,
			});
		}
		return registerUser(email, password);
	};

	const logoutClickHandler = () => {
		dispatch({ type: SET__LOGOUT });
		return toast.error("Logged out successfully", {
			style: { backgroundColor: "#b91538" },
			autoClose: 2000,
			hideProgressBar: true,
		});
	};
	return (
		<div className="flex-col-center">
			{state.isAuthenticated ? (
				<>
					<h2>Thanks for using our application. We hope you like us!</h2>
					<button
						className="button button--error font-color--white mt-16 mb-16"
						onClick={logoutClickHandler}
					>
						Logout
					</button>
					<Link to="/">Home</Link>
				</>
			) : (
				<>
					<h2>Create your account</h2>
					<div className="input-wrap mt-16">
						<label
							htmlFor="email"
							className={`${isEmailActive ? "label transformed-label" : "label"}`}
						>
							Email
						</label>
						<input
							type="text"
							id="email"
							className={`${
								isEmailActive
									? "input mt-16 mb-16 focused-input"
									: "input mt-16 mb-16"
							}`}
							name="email"
							value={email}
							onChange={(e) => onChangeHandler(e, "isEmailActive")}
							required
						/>
					</div>
					<div className="input-wrap">
						<label
							htmlFor="password"
							className={`${isPasswordActive ? "label transformed-label" : "label"}`}
						>
							Password
						</label>
						<input
							type="password"
							id="password"
							className={`${
								isPasswordActive
									? "input mt-16 mb-16 focused-input"
									: "input mt-16 mb-16"
							}`}
							name="password"
							value={password}
							onChange={(e) => onChangeHandler(e, "isPasswordActive")}
							required
						/>
					</div>
					<button
						className="button navbar--button font-color--white mt-16 mb-16"
						onClick={signInClickHandler}
					>
						Register
					</button>
					<p>
						Already have an account?
						<Link
							to="/my-account"
							className="color-success ls-1 fw-600 ml-5 mr-5 link-text"
						>
							Login
						</Link>
						here
					</p>
				</>
			)}
		</div>
	);
}
