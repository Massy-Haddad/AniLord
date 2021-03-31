import gql from "graphql-tag";

export const CHARACTERS_QUERY = gql`
  query($pageNumber: Int) {
    Page(perPage: 10, page: $pageNumber) {
      characters(sort: FAVOURITES_DESC) {
        id
        siteUrl
        image {
          large
        }
        name {
          full
        }
        media(perPage: 1, sort: POPULARITY_DESC) {
          nodes {
            title {
              romaji
            }
          }
        }
      }
    }
  }
`;
