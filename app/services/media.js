export const variables = {
  //nextSeason: "SPRING",
  //nextYear: 2021,
  //season: "WINTER",
  //seasonYear: 2021,
  type: "MANGA",
};

// Query
export var query = `
    query {
        top: Page(page: 1, perPage: 50) {
            media(sort: SCORE_DESC, type: ANIME, isAdult: false) {
                ...media
            }
        }
    }
    fragment media on Media {
        id
        title {
            userPreferred
            english
        }
        coverImage {
            extraLarge
            large
            color
        }
        startDate {
            year
            month
            day
        }
        endDate {
            year
            month
            day
        }
        bannerImage
        season
        description
        type
        format
        status(version: 2)
        episodes
        duration
        chapters
        volumes
        genres
        isAdult
        averageScore
        popularity
        mediaListEntry {
            id
            status
        }
    }
`;

export const url = "https://graphql.anilist.co",
  options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      query: query,
      variables: variables,
    }),
  };

export const getData = async () => {
  fetch(url, options).then(handleResponse).then(handleData).catch(handleError);
};

// Utils

function handleResponse(response) {
  return response.json().then(function (json) {
    return response.ok ? json : Promise.reject(json);
  });
}

function handleData(data) {
  //console.log(data.data.top.media);
  //setAnimeData(data.data.top.media);
}

function handleError(error) {
  alert("Error, check console");
  console.error(error);
}
