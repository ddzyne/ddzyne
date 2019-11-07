import React from 'react'

const foodAmount = 11
const foodItems = []
for ( var i=1; i <= foodAmount; i++ ){
	foodItems.push(i)
}

const PacmanLoader = (props) =>
	<div className={"loader-wrap " + props.className}>
    <div className="loader">
			<div className="overlay" />
			<div className="pacman pacman-real">
				<div className="pacman-mask">
					<div className="pacman-inner"></div>
				</div>
			</div>
			<div className="pacman pacman-mirror">
				<div className="pacman-mask">
					<div className="pacman-inner"></div>
				</div>
			</div>
			{ foodItems.map( (item)=> <div key={item} className={`food food-${item}`} /> ) }
		</div>
	</div>

export default PacmanLoader