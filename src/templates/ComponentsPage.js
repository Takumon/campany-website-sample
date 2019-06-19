import React from 'react'
import { graphql } from 'gatsby'

import PageHeader from '../components/PageHeader'
import Content from '../components/Content.js'
import Layout from '../components/Layout.js'
import Accordion from '../components/Accordion'
import BackgroundVideo from '../components/BackgroundVideo'
import Gallery from '../components/Gallery'

// Export Template for use in CMS preview
export const ComponentsPageTemplate = ({
  title,
  subtitle,
  featuredImage,
  movies,
  videos,
  accordion,
  body,
  gallery
}) => (
  <main>
    <PageHeader
      title={title}
      subtitle={subtitle}
      backgroundImage={featuredImage}
    />
    {/* <section className="section">
      <div className="container">
        <Content source={section1} />
      </div>
    </section> */}

    <section className="section">
      <div className="container">
        <h2>Our gallery component</h2>
        <Gallery images={gallery} />
      </div>
    </section>

    {movies.map(movie => {
      return (
        <section className="section">
          <div className="container">
            <Content source={movie} />
          </div>
        </section>
      );
    })}


    {videos.map(video => {
      return (
        <section className="BackgroundVideo-section section">
          <BackgroundVideo
            poster={video.poster}
            videoTitle={video.title}
          >
            {video && <source src={video.url} type="video/mp4" />}
          </BackgroundVideo>
        </section>
      );
    })}

    <section className="section">
      <div className="container">
        <Accordion items={accordion} />
      </div>
    </section>
  </main>
)

const ComponentsPage = ({ data: { page } }) => (
  <Layout
    meta={page.frontmatter.meta || false}
    title={page.frontmatter.title || false}
  >
    <ComponentsPageTemplate {...page} {...page.frontmatter} body={page.html} />
  </Layout>
)

export default ComponentsPage

export const pageQuery = graphql`
  query ComponentsPage($id: String!) {
    page: markdownRemark(id: { eq: $id }) {
      ...Meta
      ...Gallery
      html
      frontmatter {
        title
        template
        subtitle
        featuredImage
        movies
        videos {
          url
          title
          poster
        }
        accordion {
          title
          description
        }
      }
    }
  }
`
