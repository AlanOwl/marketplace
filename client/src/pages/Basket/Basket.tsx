/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import CartItem from '../../components/CartItem/CartItem'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import './basket.css'
import { getCart, createOrder } from '../../store/user/userSlice';

const Basket = () => {
	const user = JSON.parse(localStorage.getItem('user') || '""')
	const cart = useAppSelector(state => state.user.cart)
	const [totalPrice, setTotalPrice] = useState(0)
	const dispatch = useAppDispatch()



	
	const onClickHandle = () => {
		interface IProduct {
			productId: number,
			quantity: number,
		}

		let product: IProduct[] = []
		
		for (let index = 0; index < cart.length; index++) {
				const obj = {
					productId: cart[index].productId,
					quantity: cart[index].quantity
				}
			product.push(obj)
		}
		dispatch(createOrder({
			total_cost: totalPrice,
			userId: user.user.id,
			basketId: user.user.id,
			products: product
		}))
	}
	useEffect(() => {
		dispatch(getCart(user.user.id))
	}, [])

	useEffect(() => {
		let price = 0
		cart.forEach(element => {
			price = price + (element.quantity * element.product.price)
		});
		setTotalPrice(price)
	}, [cart])


	return (
		<>
			<Navbar />
			<div className='basket-wrapper'>
				<div className="basket-items">
					{cart.map((el) => {
						return (
							<CartItem userId={user.user.id} key={el.id} quantity={el.quantity} data={el} />
						)

					})}
				</div>
				<div className="basket-order">
					<button onClick={onClickHandle} type='button' className='basket-button'>Create order</button>
					<span>Product count: {cart.length}</span>
					<span>Total price: {totalPrice}</span>
				</div>
			</div>
		</>
	)
}

export default Basket
