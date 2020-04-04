import React from "react"
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/head'

const IndexPage = () => {
	return (
		<Layout>
			<Head title="Home" />
			<h1>oh cmon</h1>
			<h2>just fking work</h2>
			<h2>that's the catch</h2>
			<h3>loooooooool</h3>
			<p>Need a developer? <a href="/contact">Contact me.</a></p>
			<p>Need a developer? <Link to="/contact">Contact me.</Link></p>
		</Layout>
	)
}

export default IndexPage