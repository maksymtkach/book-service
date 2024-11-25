import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BooksController } from './books/books.controller';
import { BooksService } from './books/books.service';
import { CreateBookDto } from './books/create-book.dto';

describe('BooksController', () => {
  let booksController: BooksController;
  let booksService: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: {
            createBook: jest.fn(),
            getBooks: jest.fn(),
          },
        },
      ],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
    booksService = module.get<BooksService>(BooksService);
  });

  it('should create a new book', async () => {
    const createBookDto: CreateBookDto = { title: 'Test Book', author: 'Test Author' };
    const result = { id: 1, title: 'Test Book', author: 'Test Author', isPublished: false };
    jest.spyOn(booksService, 'createBook').mockResolvedValue(result);
    expect(await booksController.createBook(createBookDto)).toEqual(result);
    
    expect(booksService.createBook).toHaveBeenCalledWith(createBookDto);
  });

  it('should return a list of books', async () => {
    const books = [
      { id: 1, title: 'Test Book', author: 'Test Author', isPublished: false },
    ];
    jest.spyOn(booksService, 'getBooks').mockResolvedValue(books);
    
    expect(await booksController.getBooks(10, 0)).toEqual(books);
  
    expect(booksService.getBooks).toHaveBeenCalledWith(10, 0);
  });
});
