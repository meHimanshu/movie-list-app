const Database = require("../../controller/database");

class MovieRepository {
  constructor() {
    this.db = Database.getInstance();
  }

   /**
   * Searches for movies based on the search text provided.
   * The search text can match genre name, movie title, or a specific day, month, or year of the release date.
   * @param {string} searchText - The search text to look for.
   * @returns {Promise<Array>} - A promise that resolves to an array of movies.
   */
  async search(searchText) {
    console.log("MovieRepository:::::getAll");
    let searchString = '';
    let searchDate = -1;
    if (searchText) {
        searchString = `%${searchText}%`
    }
    const seartTextNumeric = Number(searchText)
    if (!isNaN(seartTextNumeric)) {
        searchDate = seartTextNumeric
    }
    
    const query = {
        text: `
        SELECT *
        FROM movie 
        LEFT JOIN movie_genre ON movie.movie_id = movie_genre.movie_id
        JOIN genre ON movie_genre.genre_id = genre.genre_id
        WHERE genre.genre_name ILIKE $1 
        OR movie.title ILIKE $2 
        OR EXTRACT(DAY FROM movie.release_date) = $3
        OR EXTRACT(MONTH FROM movie.release_date) = $3
        OR EXTRACT(YEAR FROM movie.release_date) = $3;
        `,
        values: [searchString, searchString, searchDate],
    };
    try {
        const res = await this.db.query(query.text, query.values);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
  }

  /**
   * Retrieves a movie by its ID.
   * @param {string} id - The ID of the movie to retrieve.
   * @returns {Promise<Array>} - A promise that resolves to an array containing the movie data.
   */
  async getById(id) {
    console.log("MovieRepository:::::getById");   
    const query = {
        text: `
        Select * From movie Where movie.movie_id=$1;
        `,
        values: [id],
    };
    try {
        const res = await this.db.query(query.text, query.values);
        return res.rows;
    } catch (error) {
        console.error(error);
        throw error;
    }
  }

}

module.exports = new MovieRepository();
