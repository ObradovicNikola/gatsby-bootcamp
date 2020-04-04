import React from 'react'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from '../components/layout'
import Head from '../components/head'


// export const query = graphql`
// 	query($slug: String!){
// 		markdownRemark(fields: {slug: {eq: $slug}}) {
// 			frontmatter {
// 				title
// 				date
// 			}
// 			html
// 		}
// 	}
// `

export const query = graphql`
	query($slug: String!){
		markdownRemark(fields: {slug: {eq: $slug}}) {
			frontmatter {
				title
				date
			}
			html
		}
		contentfulBlogPost(slug: {eq: $slug}) {
			title
			publishedDate(formatString: "MMMM Do, YYYY")
			body {
				json
			}
		}
	}
`
const Blog = (props) => {
	// return (
	// <Layout>
	// {/* <h1>{props.data.markdownRemark.frontmatter.title}</h1>
	// 		<p>{props.data.markdownRemark.frontmatter.date}</p>
	// 		<div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div> */}

	// {/* <h1>{props.data.contentfulBlogPost.title}</h1>
	// 		<p>{props.data.contentfulBlogPost.publishedDate}</p>
	// 		{documentToReactComponents(props.data.contentfulBlogPost.body.json, options)} */}
	// </Layout>
	// )


	if (props.data.markdownRemark !== null)
		return (
			<Layout>
				<Head title={props.data.markdownRemark.frontmatter.title} />
				<h1>{props.data.markdownRemark.frontmatter.title}</h1>
				<p>{props.data.markdownRemark.frontmatter.date}</p>
				<div dangerouslySetInnerHTML={{ __html: props.data.markdownRemark.html }}></div>
			</Layout>
		)
	else if (props.data.contentfulBlogPost !== null) {
		const options = {
			renderNode: {
				"embedded-asset-block": (node) => {
					const alt = node.data.target.fields.title['en-US']
					const url = node.data.target.fields.file['en-US'].url
					return <img alt={alt} src={url} />
				}
			}
		}
		return (
			<Layout>
				<Head title={props.data.contentfulBlogPost.title} />
				<h1>{props.data.contentfulBlogPost.title}</h1>
				<p>{props.data.contentfulBlogPost.publishedDate}</p>
				{documentToReactComponents(props.data.contentfulBlogPost.body.json, options)}
			</Layout>
		)
	}
	else return (
		<Layout>
			<Head />
			<h1>Unable to retreive post data...</h1>
		</Layout>
	)
}

export default Blog