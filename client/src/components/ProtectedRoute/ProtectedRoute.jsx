import React from 'react'
import { ROUTES } from "../../utils/routes";
import { Navigate, Outlet } from 'react-router-dom';
const ProtectedRoute = ({isAllowed,user,children}) => {

	if (!isAllowed) {
		return <Navigate to={ROUTES.SIGNIN} replace />
	}
	return children ? children : <Outlet />
}

export default ProtectedRoute
