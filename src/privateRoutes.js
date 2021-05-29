import { Navigate, Route } from "react-router";

const checkAuthenticated = () => {
	const userAuthenticated = localStorage.getItem("isAuthenticated");
	return userAuthenticated;
};

export const PrivateRoute = ({ path, ...props }) => {
	return checkAuthenticated() ? (
		<Route path={path} {...props} />
	) : (
		<Navigate state={{ from: path }} replace to="/my-account" />
	);
};
