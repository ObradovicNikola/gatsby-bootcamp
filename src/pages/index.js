import React from "react"
import { Link } from 'gatsby'

import Layout from '../components/layout'
import Head from '../components/head'

const IndexPage = () => {
	return (
		<Layout>
			<Head title="Home" />
			<h1>This is the front page of the internet.</h1>
			<h3>Check out this design (:</h3>
			<p>Need a developer? <a href="/contact">Contact me.</a></p>
			<p>Need a developer? <Link to="/contact">Contact me.</Link></p>
		</Layout>
	)
}

export default IndexPage