import React, {useEffect, useState} from 'react';
import axios from "axios";
import photoPlaceholder from "../assets/img/photo-cover.svg"
import {motion} from "framer-motion";

const Cards = ({users, isPageLast, loadMore, isLoading}) => {
	return (
		<div>
			<section className="cards">
				<div className="container">
					<h2 className="section__header">Working with GET request</h2>
					<motion.div layout className="cards__list">
						{users.map(user =>
							<motion.div animate={{opacity: 1}} initial={{opacity: 0}} exit={{opacity: 0}} layout key={user.id} className="card">
								<div className="card__avatar">
									<img src={user.photo.endsWith("placeholder.png") ? photoPlaceholder : user.photo} alt=""/>
								</div>
								<h3 className="card__text card__name">{user.name}</h3>
								<p className="card__text">{user.position}</p>
								<a href="mailto:frontend_develop@gmail.com" className="card__link card__email">{user.email}</a>
								<a href="tel:+38 (098) 278 44 24" className="card__link">{user.phone}</a>
							</motion.div>
						)}

					</motion.div>
					{
						!isPageLast &&
						<div className="section__nav">
							<button
								onClick={loadMore}
								className={`btn btn--yellow ${isLoading && 'btn--loading'}`}
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