import { Test, TestingModule } from '@nestjs/testing';
import { BooksService } from './books.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './book.entity';

describe('BooksService', () => {
  let booksService: BooksService;

  const mockBookRepository = {
    create: jest.fn(), // Mock the 'create' method
    save: jest.fn(),   // Mock the 'save' method
    find: jest.fn(),   // Mock the 'find' method
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    booksService = module.get<BooksService>(BooksService);
  });

  it('should create a book', async () => {
    const bookData = { title: 'Test Book', author: 'Test Author', isPublished: false };
    const mockBook = { id: 1, ...bookData };

    // Mock the `create` and `save` methods
    mockBookRepository.create.mockReturnValue(mockBook);
    mockBookRepository.save.mockResolvedValue(mockBook);

    const result = await booksService.createBook(bookData);

    // Assert the result
    expect(result).toEqual(mockBook);

    // Assert that `create` was called with the input data
    expect(mockBookRepository.create).toHaveBeenCalledWith(bookData);

    // Assert that `save` was called with the result of `create`
    expect(mockBookRepository.save).toHaveBeenCalledWith(mockBook);
  });
});
