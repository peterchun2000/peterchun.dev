import React from 'react';
import Radium from 'radium';
import color from 'color';
import { Link, graphql } from 'gatsby';
import kebabCase from 'lodash/kebabCase';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import Page from '../components/Page';
import MovableSidebarContent from '../components/MovableSidebarContent';
var bgColors = { "Default": "#81b71a",
                    "Purple": "#612766",
                    "White": "rgb(236, 236, 236)",
                    "Green": "rgb(103, 167, 130)",
};
var styles = {
  base: {
    fontWeight: 'bold',
    fontSize: '12.5px',
    textTransform: 'uppercase',
  },
};
var styles2 = {
  base: {
    padding: '5px' && '4px',
    display: 'inline-block',
    backgroundColor: bgColors.White,
    textAlign: 'center',
  },
}

const TagsListTemplate = ({ data }) => {
  const {
    title,
    subtitle
  } = data.site.siteMetadata;
  const { group } = data.allMarkdownRemark;

  return (
    <div>
      <Layout title={`Tags - ${title}`} description={subtitle}>
        <Sidebar />
        <Page title="Tags">
          <ul>
            {group.map((tag) => (
              <li key={tag.fieldValue} style={styles2.base}>
                <Link to={`/tag/${kebabCase(tag.fieldValue)}/`} style={styles.base} >
                  {tag.fieldValue}
                  {/* {tag.totalCount} */}
                </Link>
              </li>
            ))}
          </ul>
        </Page>
      </Layout>
      <MovableSidebarContent mobile />
    </div>
  );
};

export const query = graphql`
  query TagsListQuery {
    site {
      siteMetadata {
        title,
        subtitle
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`;

export default TagsListTemplate;
