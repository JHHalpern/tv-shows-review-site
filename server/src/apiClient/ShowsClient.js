import got from "got";

const TMDBShowApiKey = ""

class ShowsClient {
  static async getShows(pageNumber) {
    try{
      const url = `https://api.themoviedb.org/3/movie/${pageNumber}?api_key=${TMDBShowApiKey}`
      const apiResponse = await got(url)
      const responseBody = apiResponse.body
      return responseBody
    } catch (error){
      return {error: error.message}
    }
  }

}

export default ShowsClient;

