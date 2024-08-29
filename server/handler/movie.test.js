
const MovieHandler = require('../controllers/movieHandler');
const { movieRepository } = require('../controller');

// Mock the movieRepository
jest.mock('../controller/movieRepository');

describe('MovieHandler', () => {
    let req, res, next;

    beforeEach(() => {
        req = {
            query: {},
            params: {}
        };
        res = {
            json: jest.fn()
        };
        next = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('search', () => {
        it('should search movies based on search text and return the result', async () => {
            const searchText = 'Action';
            req.query.searchText = searchText;
            const searchResult = [{ id: 1, title: 'Action Movie' }];
            movieRepository.search.mockResolvedValue(searchResult);

            await MovieHandler.search(req, res, next);

            expect(movieRepository.search).toHaveBeenCalledWith(searchText);
            expect(res.json).toHaveBeenCalledWith({ data: searchResult });
        });

        it('should call next with error if search fails', async () => {
            const searchText = 'Action';
            req.query.searchText = searchText;
            const error = new Error('Search failed');
            movieRepository.search.mockRejectedValue(error);

            await MovieHandler.search(req, res, next);

            expect(movieRepository.search).toHaveBeenCalledWith(searchText);
            expect(next).toHaveBeenCalledWith(error);
        });
    });

    describe('getById', () => {
        it('should get a movie by ID and return the result', async () => {
            const id = '1';
            req.params.id = id;
            const getByIdResult = { id: 1, title: 'Movie 1' };
            movieRepository.getById.mockResolvedValue(getByIdResult);

            await MovieHandler.getById(req, res, next);

            expect(movieRepository.getById).toHaveBeenCalledWith(id);
            expect(res.json).toHaveBeenCalledWith({ data: getByIdResult });
        });

        it('should call next with error if getById fails', async () => {
            const id = '1';
            req.params.id = id;
            const error = new Error('GetById failed');
            movieRepository.getById.mockRejectedValue(error);

            await MovieHandler.getById(req, res, next);

            expect(movieRepository.getById).toHaveBeenCalledWith(id);
            expect(next).toHaveBeenCalledWith(error);
        });
    });
});
