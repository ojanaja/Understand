import { request, gql } from 'graphql-request';

const MASTER_URL = "https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clq12t8470rty01uhdfiaay25/master";

export const getCourseList = async (level) => {
  const query = gql`
    query CourseList {
  courses(where: {level: `+ level + `}) {
    id
    name
    price
    level
    tags
    time
    description {
      markdown
    }
    author
    banner {
      url
    }
    chapters {
      title
      id
    }
  }
}
  `;

  try {
    const result = await request(MASTER_URL, query);
    return result;
  } catch (error) {
    console.error('Error fetching course list:', error);
  }
};
