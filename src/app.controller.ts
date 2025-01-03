import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { AppService, InquiryBody } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get("/inquiries")
  async getInquiries() {
    const inquiries = await this.appService.getInquiries();
    return {
      message: "Inquiries retrieved successfully ",
      results: inquiries
    }
  }

  @Post("/inquiries")
  async createInquiry(@Body() data: InquiryBody) {
    const contact = await this.appService.createInquiry(data);
    return {
      message: "Inquiry created successfully",
      results: contact
    }
  }

  @Delete("/inquiries")
  async deleteInquiries(@Body() ids: number[] ) {
    await this.appService.deleteInquiries(ids);

    return {
      message: "Deleted inquiries successfully"
    }
  }
}
