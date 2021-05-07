import { Navigate, Route } from "react-router";
import { useVideoDataContext } from "./context/videoDataContext";

export const PrivateRoute = ({ path, ...props }) => {
	const {
		state: { isAuthenticated },
	} = useVideoDataContext();
	return isAuthenticated ? (
		<Route path={path} {...props} />
	) : (
		<Navigate state={{ from: path }} replace to="/my-account" />
	);
};
