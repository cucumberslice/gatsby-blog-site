require('dotenv').config();

module.exports = {
  siteMetadata: {
    title: `Tech Blog`,
    description: `Whether you're a tech geek or not, the times are changing and we must be aware of what's new out there `,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-transformer-remark`,
    `gatsby-remark-reading-time`,
    {
      resolve: `gatsby-source-datocms`,
      options: {
        apiToken: process.env.DATO_API_TOKEN,
      },
    },
  ],
};
