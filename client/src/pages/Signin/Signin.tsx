import React, { useEffect, useState } from 'react'
import { ROUTES } from "../../utils/routes";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { loginUser } from '../../store/user/userSlice';
import { useNavigate } from "react-router-dom";
import "./signin.css"



const Signin = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const { currentUser } = useAppSelector(({ user }) => user)
	const { loading } = useAppSelector(({ user }) => user)
	const [values, setValues] = useState({
		login: '',
		password: '',
	});
	const [authError, setAuthError] = useState(false);
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}

	const checkAuthError = async () => {
		await loading
		if (!loading) {
			setAuthError(true)
			setTimeout(() => {
				setAuthError(false)
			}, 2500);
			setValues({
				login: '',
				password: '',
			})
		}
	}


	useEffect(() => {
			if (loading) {
			navigate(ROUTES.HOME)
		} else {
			setValues({
				login: '',
				password: '',
			})
		}
	}, [currentUser])


	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		dispatch(loginUser(values))
		checkAuthError()

	}


	return (

		<div className="login_wrapper">
			<div className="login_form__main">

				<form className="login_form" onSubmit={handleSubmit}>

					<div className="input__login-wrapper">
						<label>login</label>
						<input
							className="input_field"
							type="login"
							name="login"
							value={values.login}
							autoComplete='off'
							onChange={handleChange}
							required
						/>
					</div>

					<div className="input__login-wrapper">
						<label>password</label>
						<input
							className="input_field"
							type="password"
							name="password"
							value={values.password}
							autoComplete='off'
							onChange={handleChange}
							required
						/>
					</div>
					<div className='str-info'>
						{authError && (
							<p>Неверно указан логин или пароль</p>
						)}
					</div>

					<div className="login_info">New to BestMarketplace? <a className="login_link" href="/signup">Create an account</a></div>
					<div className="input_bottom">
						<button className="login_form__btn" type="submit">Sign in</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Signin
