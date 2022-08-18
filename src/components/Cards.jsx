import React, {useEffect, useState} from 'react';
import axios from "axios";
import photoPlaceholder from "../assets/img/photo-cover.svg"
import {motion} from "framer-motion";
import Card from "./Card";

const Cards = ({users, isPageLast, loadMore, isLoading}) => {
	return (
		<div>
			<section className="cards">
				<div className="container">
					<h2 className="section__header">Working with GET request</h2>
					<div className="cards__list">
						{users.map(user =>
							<Card key={user.id} user={user}/>
						)}

					</div>
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