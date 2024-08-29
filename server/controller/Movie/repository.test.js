const MovieRepository = require('../repositories/movieRepository');
const Database = require('../../controller/database');

// Mock the database instance
jest.mock('../../controller/database', () => ({
  getInstance: jest.fn().mockReturnValue({
    query: jest.fn(),
  }),
}));

describe('MovieRepository', () => {
  let movieRepository;
  let dbMock;

  beforeAll(() => {
    movieRepository = new MovieRepository();
    dbMock = Database.getInstance();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('search', () => {
    it('should search movies based on search text', async () => {
      const searchText = 'Action';
      const expectedResult = [{ movie_id: 1, title: 'Action Movie', genre_name: 'Action' }];
      dbMock.query.mockResolvedValue({ rows: expectedResult });

      const result = await movieRepository.search(searchText);

      expect(dbMock.query).toHaveBeenCalledWith(expect.any(String), ['%Action%', '%Action%', -1]);
      expect(result).toEqual(expectedResult);
    });

    it('should search movies based on numeric search text', async () => {
      const searchText = '2022';
      const expectedResult = [{ movie_id: 1, title: 'Movie 2022', genre_name: 'Action' }];
      dbMock.query.mockResolvedValue({ rows: expectedResult });

      const result = await movieRepository.search(searchText);

      expect(dbMock.query).toHaveBeenCalledWith(expect.any(String), ['%2022%', '%2022%', 2022]);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if the query fails', async () => {
      const searchText = 'Action';
      const expectedError = new Error('Query failed');
      dbMock.query.mockRejectedValue(expectedError);

      await expect(movieRepository.search(searchText)).rejects.toThrow(expectedError);
    });
  });

  describe('getById', () => {
    it('should get a movie by ID', async () => {
      const id = '1';
      const expectedResult = [{ movie_id: 1, title: 'Movie 1' }];
      dbMock.query.mockResolvedValue({ rows: expectedResult });

      const result = await movieRepository.getById(id);

      expect(dbMock.query).toHaveBeenCalledWith(expect.any(String), [id]);
      expect(result).toEqual(expectedResult);
    });

    it('should throw an error if the query fails', async () => {
      const id = '1';
      const expectedError = new Error('Query failed');
      dbMock.query.mockRejectedValue(expectedError);

      await expect(movieRepository.getById(id)).rejects.toThrow(expectedError);
    });
  });
});
