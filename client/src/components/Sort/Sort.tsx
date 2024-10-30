/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import "./sort.css"

interface ISort {
	type: number | string,
	value: {
		category1: string;
		category2: string;
	},
	onChangeSort: (category1: string, category2: string) => void

}

const Sort = ({ value, onChangeSort, type }: ISort) => {
	const [open, setOpen] = useState(false);
	const [openSort, setOpenSort] = useState(false);

	let list: string[] = []
	if (type === 1) {
		list = ['title', 'price']
	} else if (type === 2) {
		list = ['total_cost', 'order_date']
	}
	const listSort = ['DESC','ASC' ]
	const [category, setCategory] = useState(list[0]);
	const [category2, setCategory2] = useState(listSort[0]);


	const onClickListItem = (category:string,type:number) => {
		if (type === 0) {
			setCategory(category)
		}
		if (type === 1) {
			setCategory2(category)
		}
		setOpen(false);
		setOpenSort(false);
	};

	useEffect(() => {
		onChangeSort(category, category2)
		
	}, [category, category2])


	return (
		<div className="sort">
			<div className="sort__label">
				<b>Сортировка по:</b>
				<span onClick={() => setOpen(!open)} >{category}</span>
				<svg
					onClick={() => setOpenSort(!openSort)}
					width="16"
					height="12"
					viewBox="0 0 10 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
						fill="#2C2C2C"
					/>
				</svg>
			</div>
			{open && (
				<div className="sort__popup">
					<ul className='sort__ul'>
						{list.map((name, i) => (
							<li
								key={i}
								onClick={() => onClickListItem(name,0)}
								className={""}>
								{name}
							</li>
						))}
					</ul>
				</div>
			)}
			{openSort && (
				<div className="sort__popup">
					<ul className='sort__ul'>
						{listSort.map((name, i) => (
							<li
								key={i}
								onClick={() => onClickListItem(name,1)}
								className={""}>
								{name}
							</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);

}

export default Sort
