import React, { useEffect, useState } from 'react'
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../../utils/routes";


import Signin from "../../pages/Signin/Signin";
import Signup from "../../pages/Signup/Signup";
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import MainPage from '../../pages/MainPage/MainPage';
import Basket from '../../pages/Basket/Basket';
import MyOrders from '../../pages/MyOrders/MyOrders';
import Product from '../../pages/Product/Product';


const AppRoutes = () => {
	const { currentUser } = useSelector(({ user }) => user)
	const [user, setUser] = useState(localStorage ? JSON.parse(localStorage.getItem('user')) : null)



	useEffect(() => {
		if (currentUser) {
			localStorage.setItem('user', JSON.stringify(currentUser));
			setUser(currentUser)
		}

	}, [currentUser])

	return (
		<Routes>
			
			<Route exact path={ROUTES.SIGNIN} element={<Signin />} />
			<Route exact path={ROUTES.SIGNUP} element={<Signup />} />
			<Route exact path={ROUTES.HOME} element={< MainPage />} />
			<Route exact path="/" element={<MainPage />} />

			<Route element={<ProtectedRoute redirectPath={ROUTES.HOME} isAllowed={!!user && user.user.role.includes('USER')} />}>

				<Route exact path={ROUTES.CART} element={<Basket />} />
				<Route exact path={ROUTES.MY_ORDERS} element={<MyOrders />} />
				<Route exact path={ROUTES.PRODUCT + '/:id'} element={<Product />} />

			</Route>

		</Routes>
	)
}

export default AppRoutes;