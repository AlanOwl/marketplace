/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import './cartitem.css'
import { useAppDispatch} from '../../store/hooks';
import { addItemToCart, pushProductToCart } from '../../store/user/userSlice';
import { getCart, createOrder } from '../../store/user/userSlice';


interface ICart {
	data: {
		id?: number;
		quantity?: number;
		createdAt?: string;
		updatedAt?: string;
		basketId?: number;
		productId?: number;
		product: {
			id: number;
			title: string;
			price: number;
			img: string;
			vendor: string;
			description: string;
			createdAt: string;
			updatedAt: string;
		};
	};
	quantity: number,
	userId: number,
}


const CartItem = ({ data, quantity, userId }: ICart) => {
	const user = JSON.parse(localStorage.getItem('user') || '""')
	const dispatch = useAppDispatch()
	const { title, price, img, description,id } = data.product
	const [quantityCart, setQuantity] = useState(quantity)
	const [sign,setSign] = useState('')
	const plus = "+"
	const minus = "-"

	const changeQuantity = (quantity: number, sign: string) => {
		
		setSign(sign)
		setQuantity(quantity)
	}

	const dataForPush = {
		basketId: userId,
		productId: id,
		sign: sign
	}


	useEffect(() => {
		dispatch(pushProductToCart(dataForPush))
		dispatch(getCart(user.user.id))
	}, [quantityCart])

	
	return (

			 <div className="cart-item">
				<div className="cart-photo">
				<img src={img} alt="" />
				</div>
				<div className="cart-info">
					<span>{title}</span>
					<span>{description}</span>
				</div>
				<div className="cart-change">
				<span>Price: {price * quantityCart} $</span>
					<div className="product-quantity" >
					<button onClick={() => changeQuantity(Math.max(0, quantityCart - 1), minus)} className="minus">-</button>
					<span>{quantityCart}</span>
					<button onClick={() => changeQuantity(quantityCart + 1,plus)} className="plus">+</button>
					</div>
				</div>
			</div>

		
	)
}

export default CartItem
