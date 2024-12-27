import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService, ContactBody } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("/contacts")
  async getContacts() {
    const contacts = await this.appService.getContacts();
    return {
      message: "Contacts successfully retrieved",
      results: contacts
    }
  }

  @Post("/contacts")
  async createContact(@Body() data: ContactBody) {
    const contact = await this.appService.createContact(data);
    return {
      message: "Contact successfully created",
      results: contact
    }
  }
}
