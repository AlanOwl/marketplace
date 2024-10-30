/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Navbar from '../../components/Navbar/Navbar'
import React, { useEffect, useState } from 'react'
import './product.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addItemToCart, pushProductToCart } from '../../store/user/userSlice';

interface IItem {
	id: number | string,
	title: string,
	price: number | string,
	img: string,
	vendor: string,
	description: string
}


const Product = () => {
	const [item, setItems] = useState<IItem>({
		id: 0,
		title: "",
		price: 0,
		img: "",
		vendor: "",
		description: ""
	})
	const [quantity, setQuantity] = useState(1)
	const currentUrl = window.location.href.slice(-1);
	const dispatch = useAppDispatch()
	const user = JSON.parse(localStorage.getItem('user') || '""')
	const addToCart = () => {
		let dataForPush = {
			basketId: user.user.id,
			productId: item.id,
			sign: "+"
		}

		dispatch(pushProductToCart(dataForPush))
		setQuantity(quantity + 1)
	};



	async function request() {
		const responce = await fetch(`/api/product/${currentUrl}`)
		const data = await responce.json()
		if (data) {
			setItems(data)
		}
		else {
			setItems({
				id: 0,
				title: "",
				price: 0,
				img: "",
				vendor: "",
				description: ""
			})
		}
	}


	useEffect(() => {
		request()
	}, [])

	return (
		<div>
			<Navbar />
			<div className="product-wrapper">
				<div className="product-left">
					<span>{item.title}</span>
					<img className="product-img" src={item.img} alt="" />
					<p className="product-vendor">{item.vendor}</p>
				</div>

				<div className="product-right">
					<p className="product-desc">{item.description}</p>
					<span>Price: {item.price} $</span>
					<button onClick={addToCart} className="product-button">add to cart</button>
				</div>
			</div>
		</div>
	)
}

export default Product
