import { useState } from "react";
import { useVideoDataContext } from "../../context/videoDataContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { SET__LOGOUT } from "../../constants";
import { useDocumentTitle } from "../../utils/useDocumentTitle";

export default function RegisterPage() {
	useDocumentTitle("Account | CricTube");
	const initialValues = {
		email: "",
		password: "",
	};
	const [{ email, password }, setState] = useState(initialValues);
	const { state, dispatch, registerUser } = useVideoDataContext();

	const onChangeHandler = (event) => {
		const name = event.target.name;
		const value = event.target.value;
		return setState((prevState) => ({ ...prevState, [name]: value }));
	};

	const signInClickHandler = () => {
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
					<input
						type="text"
						className="input__control mt-16 mb-16"
						name="email"
						value={email}
						onChange={onChangeHandler}
						placeholder="Enter your email"
						required
					/>
					<input
						type="password"
						className="input__control mt-16 mb-16"
						name="password"
						value={password}
						onChange={onChangeHandler}
						placeholder="Enter your password"
						required
					/>
					<button
						className="button navbar--button font-color--white mt-16 mb-16"
						onClick={signInClickHandler}
					>
						Register
					</button>
					<p>
						Already have an account? <Link to="/my-account"> Login </Link>
						here
					</p>
				</>
			)}
		</div>
	);
}
