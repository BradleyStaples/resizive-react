module.exports = {
  siteMetadata: {
    siteUrl: 'https://resizive.bradleystaples.com',
    title: 'Resizive',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: '###',
        head: true
      }
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-gatsby-cloud',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-use-query-params'
  ],
};
