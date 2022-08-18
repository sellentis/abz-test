import React from 'react';
import photoPlaceholder from "../assets/img/photo-cover.svg";
import {motion} from "framer-motion";
import ReactTooltip from 'react-tooltip';

const Card = ({user}) => {
	return (
		<motion.div
			animate={{opacity: 1}}
			initial={{opacity: 0}}
			exit={{opacity: 0}}
			className="card"
			layout
		>
			<div className="card__avatar">
				<img loading="lazy" src={user.photo.endsWith("placeholder.png") ? photoPlaceholder : user.photo} alt={user.name}/>
			</div>
			<h3 className="card__text card__name">{user.name}</h3>
			<p className="card__text">{user.position}</p>
			<a
				href={`mailto:${user.email}`}
				className="card__link card__email"
				data-tip
				data-for={`userEmail_${user.id}`}
			>
				{user.email}
			</a>
			<ReactTooltip className="tooltip" place='bottom' id={`userEmail_${user.id}`} aria-haspopup='true'>{user.email}</ReactTooltip>
			<a href={`tel:${user.phone}`} className="card__link">{user.phone}</a>
		</motion.div>
	);
};

export default Card;