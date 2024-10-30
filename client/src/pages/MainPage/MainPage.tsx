/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sort from '../../components/Sort/Sort'
import Item from '../../components/Item/Item'
import img from "../../img/search.svg"

import "./main.css"
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getProducts } from '../../store/products/productsSlice'
import { getCart } from '../../store/user/userSlice'

const MainPage = () => {
	interface ICategory {
		category1: string;
		category2: string;
	}

	const [searchValue, setSearchValue] = useState("");
	const [sortType, setSortType] = useState<ICategory>({
		category1: "title",
		category2: "DESC",
	});
	let user = null
	if (localStorage.getItem('user') !== null) {
		user = JSON.parse(localStorage.getItem('user') || '""')
	}

	const data = useAppSelector(state => state.products.list)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(getProducts(sortType))
	}, [sortType])

	useEffect(() => {
		if (user) {
			dispatch(getCart(user.user.id))
		}
	}, [])

	const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value);

	};

	const filteredData = data.rows.filter((item) => {
		return item.title.toLowerCase().includes(searchValue.toLowerCase())
	})


	return (
		<div>
			<Navbar />
			<div className="main-wrapper">
				<div className="main-header">
					<div className="search-input">
						<input
							type="search"
							name="search"
							placeholder="Search for anyting..."
							autoComplete="off"
							onChange={handleSearch}
							value={searchValue}
						/>
						<img className="search-img" src={img} alt="" />
					</div>
					<Sort type={1} value={sortType} onChangeSort={(category1, category2) => {
						const item = { category1, category2 }
						setSortType(item)
					}
					} />
				</div>
				<div className="main-products">
					{filteredData.map((el, i) => {
						return (
							<Item key={el.id} user={user} data={el} />
						)

					})}
				</div>
			</div>
		</div>
	)
}

export default MainPage
