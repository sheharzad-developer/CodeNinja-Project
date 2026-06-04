import React from 'react';
import NavBar from '../../components/Header/Header';
import './blogs.css'
const Blogs = () => {
	return (
		<div>
			<NavBar />
			<div class="blogs-section">
				<h1>Blogs Page</h1>
				<h2><p>Some text about who we are and what we do.</p></h2>
				<h3><p>Resize the browser window to see that this page is responsive by the way.</p></h3>
			</div>
		</div>
	);
};

export default Blogs;
