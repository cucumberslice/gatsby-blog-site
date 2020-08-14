import React from 'react';
import Slider from 'react-slick';
import { HelmetDatoCms } from 'gatsby-source-datocms';
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import Scroll from '../components/scroll';

export default ({ data }) => (
  <Layout>
    <Scroll showBelow={50} />
    <article className="sheet">
      <HelmetDatoCms seo={data.datoCmsWork.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{data.datoCmsWork.title}</h1>
        <p>
          {data.datoCmsWork.meta.createdAt} -{' '}
          {
            data.datoCmsWork.descriptionNode.childMarkdownRemark.fields
              .readingTime.text
          }
        </p>
        <br />

        <p className="sheet__lead">{data.datoCmsWork.excerpt}</p>
        <div className="sheet__slider">
          <Slider infinite={true} slidesToShow={2} arrows>
            {data.datoCmsWork.gallery.map(({ fluid }) => (
              <img
                alt={data.datoCmsWork.title}
                key={fluid.src}
                src={fluid.src}
              />
            ))}
          </Slider>
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: data.datoCmsWork.descriptionNode.childMarkdownRemark.html,
          }}
        />
        <div className="sheet__gallery">
          <Img fluid={data.datoCmsWork.coverImage.fluid} />
        </div>
      </div>
    </article>
  </Layout>
);

export const query = graphql`
  query WorkQuery($slug: String!) {
    datoCmsWork(slug: { eq: $slug }) {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      excerpt
      gallery {
        fluid(maxWidth: 200, imgixParams: { fm: "jpg", auto: "compress" }) {
          src
        }
      }
      descriptionNode {
        childMarkdownRemark {
          html
          fields {
            readingTime {
              text
            }
          }
        }
      }
      meta {
        createdAt(formatString: "MMM DD, YYYY")
      }
      coverImage {
        url
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
    }
  }
`;
