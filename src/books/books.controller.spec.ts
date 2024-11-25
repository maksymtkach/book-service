import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { CreateBookDto } from './create-book.dto';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  const mockBooksService = {
    createBook: jest.fn(),
    getBooks: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  it('should create a new book', async () => {
    const createBookDto: CreateBookDto = { title: 'Test Book', author: 'Test Author' };
    const result = { id: 1, ...createBookDto };

    mockBooksService.createBook.mockResolvedValue(result);

    expect(await booksController.createBook(createBookDto)).toEqual(result);
    expect(mockBooksService.createBook).toHaveBeenCalledWith(createBookDto);
  });

  it('should return a list of books', async () => {
    const books = [{ id: 1, title: 'Test Book', author: 'Test Author', isPublished: false }];
    mockBooksService.getBooks.mockResolvedValue(books);

    expect(await booksController.getBooks(10, 0)).toEqual(books);
    expect(mockBooksService.getBooks).toHaveBeenCalledWith(10, 0);
  });
});

