import React, {useEffect, useState} from 'react';
import axios from "axios";
import photoPlaceholder from "../assets/img/photo-cover.svg"

const Cards = () => {
	const [users, setUsers] = useState([])
	const [page, setPage] = useState(1)
	const [count, setCount] = useState(6)
	const [isPageLast, setIsPageLast] = useState(false)


	const fetchData = (page, count) => {
		axios.get('https://frontend-test-assignment-api.abz.agency/api/v1/users', {
			params: {
				page: page,
				count: count
			}
		}).then(response => {
			setIsPageLast(!!response.data.links.next_url)
			setPage(prev => prev + 1)
			setUsers(prev => [...prev, ...response.data.users])
		})
	}

	useEffect(() => {
		fetchData(page, 6)
	}, [])

	const loadMore = () => {
		fetchData(page, count)
	}

	return (
		<div>
			<section className="cards">
				<div className="container">
					<h2 className="section__header">Working with GET request</h2>
					<div className="cards__list">
						{users.map(user =>
							<div key={user.id} className="card">
								<div className="card__avatar">
									<img src={user.photo.endsWith("placeholder.png") ? photoPlaceholder : user.photo} alt=""/>
								</div>
								<h3 className="card__text card__name">{user.name}</h3>
								<p className="card__text">{user.position}</p>
								<a href="mailto:frontend_develop@gmail.com" className="card__link card__email">{user.email}</a>
								<a href="tel:+38 (098) 278 44 24" className="card__link">{user.phone}</a>
							</div>
						)}

					</div>
					{
						isPageLast &&
						<div className="section__nav">
							<button
								onClick={loadMore}
								className="btn btn--yellow"
							>
								Show more
							</button>
						</div>
					}

				</div>
			</section>
		</div>
	);
};

export default Cards;