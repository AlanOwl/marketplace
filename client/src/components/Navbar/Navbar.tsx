/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import exit from "../../img/exit.svg"
import cart from "../../img/cart.svg"
import list from "../../img/list.svg"
import "./navbar.css"


const Navbar = () => {
	const user = JSON.parse(localStorage.getItem('user') || '""')
	const handleClick = () => {
		localStorage.clear();
	}
	
	return (
		<div className='navbar'>
			<Link to={ROUTES.HOME}>
				<span>BestMarketPlace</span>
			</Link>
			
				<ul  className="navbar-menu">
					{user &&
					<li>
					<Link to={ROUTES.MY_ORDERS}>
							<img src={list} alt="#" className="navbar-img" />
						</Link>
					</li>
					}
				{user &&
					<li>
					<Link to={ROUTES.CART}>
							<img src={cart} alt="#" className="navbar-img" />
						</Link>
					</li>
				}
					<li>
					{user &&
					<div className="" onClick={handleClick}>
						<a href="/login" className="info-link" >
							<img onClick={handleClick} src={exit} alt="#" className="navbar-img" />
						</a>
					</div>
					}
						

					</li>
				</ul>
		</div>
	)
}

export default Navbar
