import { Controller, Get, Param, Render } from '@nestjs/common';
import { AppService } from './app.service';
import { quotes } from './quotes';
import { parse } from 'path';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }

  @Get('quotes')
  @Render('quotes')
  getQuotes () {
    return {quotes: quotes.quotes};
  }

  @Get('randomQuote')
  @Render('randomQuote')
  getRandomQuote () {
    return {quotes: quotes.quotes}
  }

  @Get('topAuthors')
  @Render('topAuthors')
  getTopAuthors()
  {
    
  }

  @Get('quotes/:id')
  @Render('i_quote')
  oneQuote(@Param('id') id: string)
  {
    return {quotes: quotes.quotes[parseInt(id) - 1]}
  }

  @Get('deleteQuote/:id')
  @Render('deleteQuote')
  deleteQuote(@Param('id') id: string)
  {
    let deletSuccessful = "";
    if (parseInt(id) - 1 <= quotes.limit) {
      quotes.quotes.splice(parseInt(id) - 1, 1)
      deletSuccessful = "Sikeres törlés";
      return {message: deletSuccessful};
    }
    else {
      deletSuccessful = "Ismeretlen idézet";
      return {message: deletSuccessful};
    }
  }
}