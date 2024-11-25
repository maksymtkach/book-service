import { Body, Controller, Post, Query, Get } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './create-book.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('books') // Groups endpoints under the "books" category in Swagger
@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'The book has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.booksService.createBook(createBookDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get a list of books' })
  @ApiResponse({ status: 200, description: 'List of books returned successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid query parameters.' })
  getBooks(
    @Query('limit') limit: number,
    @Query('start') start: number,
  ) {
    return this.booksService.getBooks(limit, start);
  }
}
