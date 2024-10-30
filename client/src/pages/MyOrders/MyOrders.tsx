/* eslint-disable prefer-const */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './myorders.css'
import Sort from '../../components/Sort/Sort'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getOrders } from '../../store/orders/ordersSlice';
import OrderItem from '../../components/OrderItem/OrderItem';

const MyOrders = () => {
	const [sortType, setSortType] = useState({
		category1: "total_cost",
		category2: "DESC",
	});
	const user = JSON.parse(localStorage.getItem('user') || '""')

	let obj = {
		userId: user.user.id,
		sortType: sortType

	}

	const { list } = useAppSelector((state) => state.orders)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (user) {
			dispatch(getOrders(obj))
		}

	}, [sortType])
	
	useEffect(() => {
		if (user) {
			dispatch(getOrders(obj))
		}
		

	}, [])

	return (
		<div>
			<Navbar />
			<div className="orders-wrapper">
				<div className="orders-header">
					<Sort type={2} value={sortType} onChangeSort={(category1, category2) => {
						let item = { category1, category2 }
						setSortType(item)
					}
					} />
				</div>
				<div className="orders-products">
					{list.map((el,id) => {
						return (
							<OrderItem key={id} list={el} />
						)

					})}
				</div>
			</div>
		</div>
	)
}

export default MyOrders
