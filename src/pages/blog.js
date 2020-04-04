import React from 'react'
import { Link, graphql, useStaticQuery } from 'gatsby'

import Layout from '../components/layout'
import blogStyles from './blog.module.scss'
import Head from '../components/head'


const Blog = () => {
	const data = useStaticQuery(graphql`
		query {
			allMarkdownRemark {
				edges {
					node {
						frontmatter {
							title
							date
						}
						html
						excerpt
						fields {
							slug
						}
					}
				}
			}
			allContentfulBlogPost(sort: {fields: publishedDate, order: DESC}) {
				edges {
					node {
						title
						slug
						publishedDate(formatString:"MMMM Do, YYYY")
					}
				}
			}
		}
	`)

	// const data = useStaticQuery(graphql`
	// 	query {
	// 		allContentfulBlogPost(sort: {fields: publishedDate, order: DESC}) {
	// 			edges {
	// 				node {
	// 					title
	// 					slug
	// 					publishedDate(formatString:"MMMM Do, YYYY")
	// 				}
	// 			}
	// 		}
	// 	}	
	// `)

	let id = 1;

	return (
		<Layout>
			<Head title="Blog" />
			<h1>Blog</h1>
			<h3>Markdown data</h3>
			<ol className={blogStyles.posts}>
				{data.allMarkdownRemark.edges.map((edge) => {
					return (
						<li className={blogStyles.post} key={id++}>
							<Link to={`/blog/${edge.node.fields.slug}`}>
								<h2>{edge.node.frontmatter.title}</h2>
								<p>{edge.node.frontmatter.date}</p>
							</Link>
						</li>
					)
				})}
			</ol>
			<h3>Contentful data</h3>
			<ol className={blogStyles.posts}>
				{data.allContentfulBlogPost.edges.map((edge) => {
					return (
						<li className={blogStyles.post} key={id++}>
							<Link to={`/blog/${edge.node.slug}`}>
								<h2>{edge.node.title}</h2>
								<p>{edge.node.publishedDate}</p>
							</Link>
						</li>
					)
				})}
			</ol>
		</Layout>
	)
}

export default Blog