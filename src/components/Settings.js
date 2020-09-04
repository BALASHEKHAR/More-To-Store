import React from 'react';
import { Link } from "react-router-dom";

class Settings extends React.Component {
	render() {
		return (
			<div>
				<h1>welcome to Settings page</h1>
				<Link to="favourite">
				 <button>go to Favourite page</button>
				</Link>
				<Link to="/Home">
				 <button>go to home page</button>
				</Link>
			</div>
		)
	}
}

export default Settings