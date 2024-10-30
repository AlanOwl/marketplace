import React, { useEffect, useState } from 'react'
import './item.css'
// import { useDispatch } from 'react-redux'
import {  pushProductToCart } from '../../store/user/userSlice';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { useAppDispatch } from '../../store/hooks';

interface Iitem {
	data: {
		id: number | string;
		title: string;
		price: number | string;
		img: string;
		vendor: string;
		description: string;
	};
	user: {
		user:{
			id: number;
			login: string;
			password: string;
			role: string;
			createdAt: string;
			updatedAt: string;
		};
		token:string
	};
}

const Item = ({ data, user }: Iitem) => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [quantity, setQuantity] = useState(0)
	const [sign, setSign] = useState('+')
	const plus = "+"
	const minus = "-"

	const addToCart = () => {
		if (user !== null) {
		setQuantity(1)

		} else {
			navigate(ROUTES.SIGNIN)
		}

	};

	const dataForPush = {
		basketId: user ? user.user.id : null,
		productId: data.id,
		sign: sign
	}

	const changeQuantity = (quantity:number, sign:string) => {
		
		setSign(sign)
		setQuantity(quantity)
	}

	useEffect(() => {
		if (quantity !== 0) {
			dispatch(pushProductToCart(dataForPush))
		}
		
	}, [quantity])

	return (
		<div className='product-item'>
			<div className="product-photo">
				<img src={data.img} alt="" />
			</div>
			<div className="product-info">
				<span>{data.title}</span>
				<span>{data.price}</span>
				{quantity === 0 && <button onClick={addToCart} className="product-btn">Add to cart</button>}
				{quantity !== 0 &&
					<div className="product-quantity" >
						<button onClick={() => changeQuantity( Math.max(1, quantity - 1), minus)} className="minus">-</button>
						<span>{quantity}</span>
						<button onClick={() => changeQuantity( quantity + 1, plus)} className="plus">+</button>
					</div>

				}

			</div>

		</div>
	)
}

export default Item
