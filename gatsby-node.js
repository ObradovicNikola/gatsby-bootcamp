const path = require('path')

module.exports.onCreateNode = ({ node, actions }) => {
	const { createNodeField } = actions

	if (node.internal.type === 'MarkdownRemark') {
		const slug = path.basename(node.fileAbsolutePath, '.md')

		// console.log(JSON.stringify(node, undefined, 4));
		// console.log('---------');
		// console.log(slug);
		// console.log('---------');

		createNodeField({
			node,
			name: 'slug',
			value: slug
		})
	}
}

module.exports.createPages = async ({ graphql, actions }) => {
	const { createPage } = actions
	const blogTemplate = path.resolve('./src/templates/blogPost.js')

	const res = await graphql(`
		query {
			allMarkdownRemark {
				edges {
					node {
						fields {
							slug
						}
					}
				}
			}
			allContentfulBlogPost(sort: {fields: publishedDate, order: DESC}) {
				edges {
					node {
						slug
					}
				}
			}
		}
	`)

	res.data.allMarkdownRemark.edges.forEach((edge) => {
		createPage({
			component: blogTemplate,
			path: `/blog/${edge.node.fields.slug}`,
			context: {
				slug: edge.node.fields.slug
			}
		})
	})

	res.data.allContentfulBlogPost.edges.forEach((edge) => {
		createPage({
			component: blogTemplate,
			path: `/blog/${edge.node.slug}`,
			context: {
				slug: edge.node.slug
			}
		})
	})
}