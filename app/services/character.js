import gql from "graphql-tag";

export const CHARACTERS_SEARCH_QUERY = gql`
  query ($pageNumber: Int, $search: String) {
    Page(perPage: 10, page: $pageNumber) {
      characters(search: $search, sort: FAVOURITES_DESC) {
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

export const ON_LOAD_CHARACTERS_QUERY = gql`
  {
    characters: Page(page: 1, perPage: 30) {
      characters(sort: FAVOURITES_DESC) {
        id
        name {
          full
        }
        image {
          large
        }
      }
    }
    characterBirthdays: Page(page: 1, perPage: 30) {
      characters(isBirthday: true, sort: [FAVOURITES_DESC, ID_DESC]) {
        id
        name {
          full
        }
        image {
          large
        }
      }
    }
  }
`;
