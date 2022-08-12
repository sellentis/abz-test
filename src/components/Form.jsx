import React, {useEffect, useState} from 'react';
import axios from "axios";
import imageSuccess from "../assets/img/success-image.svg"

const _URL = window.URL || window.webkitURL;

const Form = ({setUsers, fetchData, setPage}) => {
	const [positions, setPositions] = useState([])
	// form data
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [phone, setPhone] = useState("")
	const [position, setPosition] = useState(1)
	const [photo, setPhoto] = useState("")
	const [photoTitle, setPhotoTitle] = useState("")
	const [postToken, setPostToken] = useState("")

	//form data visited
	const [nameVisited, setNameVisited] = useState(false)
	const [emailVisited, setEmailVisited] = useState(false)
	const [phoneVisited, setPhoneVisited] = useState(false)
	const [photoVisited, setPhotoVisited] = useState(false)
	//form data errors
	const [nameError, setNameError] = useState("Username can't be empty")
	const [emailError, setEmailError] = useState("Email can't be empty")
	const [phoneError, setPhoneError] = useState("Phone can't be empty")
	const [photoError, setPhotoError] = useState("The photo format must be jpeg/jpg type")
	const [formValid, setFormValid] = useState(false)
	//form send success
	const [isPostSuccess, setIsPostSuccess] = useState(false)

	const fetchPositions = () => {
		axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/positions')
			.then(response => {
				setPositions(response.data.positions)
			})
	}
	useEffect(() => {
		fetchPositions()
	}, [])
	useEffect(() => {
		if (nameError || emailError || phoneError || photoError) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [nameError, emailError, phoneError, photoError])

	useEffect(() => {
		if (isPostSuccess) {
			setUsers([])
			setPage(1)
			fetchData(1, 6)
		}
		console.log("render")
	}, [isPostSuccess])

	const nameHandler = (e) => {
		setName(e.target.value)
		if (e.target.value.length < 2 || e.target.value.length > 60) {
			setNameError("Username should be 2-60 characters")
		} else {
			setNameError("")
		}
	}
	const emailHandler = (e) => {
		setEmail(e.target.value)
		if (e.target.value.length < 2 || e.target.value.length > 60) {
			setEmailError("Email should be 2-100 characters")
		} else if (!String(e.target.value).toLowerCase().match(/^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/)) {
			setEmailError("Incorrect email")
		} else {
			setEmailError("")
		}
	}
	const phoneHandler = (e) => {
		setPhone(e.target.value)
		if (!String(e.target.value).match(/^[\+]380([0-9]{9})$/)) {
			setPhoneError("Incorrect phone")
		} else {
			setPhoneError("")
		}
	}
	const positionHandler = (e) => {
		setPosition(e.target.value)
	}
	const photoHandler = (e) => {
		setPhotoTitle(e.target.files[0].name)
		setPhoto(e.target.files[0])
		const file = e.target.files[0]
		const img = new Image();
		img.src = _URL.createObjectURL(file);
		img.onload = function () {
			if (this.width < 70 || this.height < 70) {
				setPhotoError("Minimum size of photo 70x70px")
			} else if (this.size >= 5000000) {
				setPhotoError("The photo size must not be greater than 5 Mb")
			} else {
				setPhotoError("")
			}
		};
	}
	const formSendHandler = (e) => {
		e.preventDefault()
		axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/token')
			.then(response => {
				let formData = new FormData()
				formData.append('name', name)
				formData.append('email', email)
				formData.append('phone', phone)
				formData.append('position_id', position)
				formData.append('photo', photo)
				axios.post(
					'https://frontend-test-assignment-api.abz.agency/api/v1/users',
					formData,
					{
						headers: {
							'Token': response.data.token
						}
					})
					.then(response => {
						if (response.data.success) {
							setIsPostSuccess(true)
						}
					})
			})
	}
	const blurHandler = (e) => {
		switch (e.target.name) {
			case "name":
				setNameVisited(true)
				break
			case "email":
				setEmailVisited(true)
				break
			case "phone":
				setPhoneVisited(true)
				break
		}
	}
	return (
		<section className="contact">
			<div className="container">
				{!isPostSuccess ?
					<>
						<h2 className="section__header">Working with POST request</h2>
						<form onSubmit={formSendHandler} className="form">
							<fieldset>
								<div className="field">
									<div className="field__inner">
										<input
											type="text"
											value={name}
											onBlur={e => blurHandler(e)}
											onChange={e => nameHandler(e)}
											name="name"
											className="field__input"
											placeholder="Your name"
										/>
										<span className="field__placeholder">Your name</span>
									</div>
									<p className="field__error">
										{(nameVisited && nameError) && <span>{nameError}</span>}
									</p>
								</div>
								<div className="field">
									<div className="field__inner">
										<input
											type="text"
											value={email}
											onBlur={e => blurHandler(e)}
											onChange={e => emailHandler(e)}
											name="email"
											className="field__input"
											placeholder="Email"
										/>
										<span className="field__placeholder">Email</span>
									</div>
									<p className="field__error">
										{(emailVisited && emailError) && <span>{emailError}</span>}
									</p>
								</div>
								<div className="field">
									<div className="field__inner">
										<input
											type="text"
											value={phone}
											onBlur={e => blurHandler(e)}
											onChange={e => phoneHandler(e)}
											name="phone"
											className="field__input"
											placeholder="Phone"
										/>
										<span className="field__placeholder">Phone</span>
									</div>
									<p className="field__hint">+38 (XXX) XXX - XX - XX</p>
									<p className="field__error">
										{(phoneVisited && phoneError) && <span>{phoneError}</span>}
									</p>
								</div>
							</fieldset>
							<fieldset>
								<legend className="form__title">Select your position</legend>
								<div className="radio__group">
									{positions.map((pos, index) =>
										<label key={pos.id} className="radio">
											<input
												type="radio"
												name="position"
												value={pos.id}
												className="radio__input"
												onChange={e => positionHandler(e)}
												defaultChecked={index === 0}
											/>
											<div className="radio__box"/>
											<span className="radio__hint">{pos.name}</span>
										</label>
									)}
								</div>
							</fieldset>
							<fieldset className="file__wrap">
								<label className="file" onClick={() => setPhotoVisited(true)}>
									<div className="file__hint">Upload</div>
									<div className="file__preview">{photoTitle ? photoTitle : "Upload your photo"}</div>
									<input
										type="file"
										className="file__input"
										name="photo"
										onChange={e => photoHandler(e)}
										accept="image/jpg, image/jpeg"
									/>
								</label>
								<p className="field__error">
									{(photoVisited && photoError) && <span>{photoError}</span>}
								</p>
							</fieldset>
							<fieldset className="form__nav">
								<button
									className={formValid ? "btn btn--yellow" : "btn btn--yellow btn--disabled"}
									type={"submit"}
								>
									Sign up
								</button>
							</fieldset>
						</form>
					</>
					:
					<>
						<h2 className="section__header">User successfully registered</h2>
						<img src={imageSuccess} alt="Done!" style={{margin: "0 auto", display: "block", maxWidth: "100%"}}/>
					</>
				}
			</div>
		</section>
	);
};

export default Form;