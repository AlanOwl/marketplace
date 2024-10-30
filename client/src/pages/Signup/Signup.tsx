
import "./signup.css"
import React, { useEffect, useState } from 'react'
import { ROUTES } from "../../utils/routes";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { createUser } from '../../store/user/userSlice';
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const { currentUser } = useAppSelector(({ user }) => user)
	const { loading } = useAppSelector(({ user }) => user)
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const [values, setValues] = useState({
		login: '',
		password: '',
	});
	const [repeatPassword, setRepeatPassword] = useState("");
	const [passwordError, setPasswordError] = useState(false);
	const [EmptyError, setEmptyError] = useState(false);
	const [userError, setUserError] = useState(false);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setValues({ ...values, [e.target.name]: e.target.value })
	}
	const handleChangeRepeatPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRepeatPassword(e.target.value)
	}

	const checkPassordError = () => {
		if (repeatPassword !== values.password) {
			setPasswordError(true)
			setValues({
				login: '',
				password: '',
			})
			setRepeatPassword('')
			setTimeout(() => {
				setPasswordError(false)
			}, 2500);
			return false
		}
		return true
	}
	const checkUserError = () => {
		if (!loading) {
			setUserError(true)
			setTimeout(() => {
				setUserError(false)
			}, 2500);
			setValues({
				login: '',
				password: '',
			})
			setRepeatPassword('')
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
			setRepeatPassword('')
		}
	}, [currentUser])


	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()

		const isNotEmpty = Object.values(values).every((val) => val)
		const passErr = checkPassordError()
		if (!passErr) return;
		if (!isNotEmpty) {
			setEmptyError(true)
			setTimeout(() => {
				setEmptyError(false)
			}, 2500);
			return
		};
		dispatch(createUser(values))
		checkUserError()
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
					<div className="input__login-wrapper">
						<label>repeat password</label>
						<input
							className="input_field"
							type="password"
							name="repeatPassword"
							value={repeatPassword}
							autoComplete='off'
							onChange={handleChangeRepeatPassword}
							required
						/>
					</div>
					<div className='str-info'>
						{passwordError && (
							<p>Пароли не совпадают</p>
						)}
						{EmptyError && (
							<p>Не указаны данные</p>
						)}
						{userError && (
							<p>Пользователь с таким именем уже существует</p>
						)}
					</div>
					<div className="login_info">Already have an account? <a className="login_link" href="/login">Sign in</a></div>
					<div className="input_bottom">
						<button  className="login_form__btn signup_btn" type="submit">Sign up</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Signup
