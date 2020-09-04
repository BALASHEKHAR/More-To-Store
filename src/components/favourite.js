import React from 'react';
import { Link } from "react-router-dom";

class Favourite extends React.Component {
	render() {
		return (
			<div>
				<h1>welcome to Favourite page</h1>
				<Link to="/Home">
				 <button>go to home page</button>
				</Link>
				<Link to="/Settings">
				 <button>go to home settings</button>
				</Link>
			</div>
		)
	}
}

export default Favourite