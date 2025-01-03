import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { MailerService } from '@nestjs-modules/mailer';

export interface InquiryBody {
  fullName: string,
  email: string,
  address: string,
  jobType: string,
  message: string,
  contact: string
}

@Injectable()
export class AppService {
  constructor(
    private prisma: PrismaService,
    private mailerService: MailerService
  ) { }

  async getInquiries() {
    return this.prisma.inquiry.findMany({ orderBy: { id: 'asc' } });
  }

  async createInquiry(data: InquiryBody) {
    // First create the inquiry
    const createdInquiry = await this.prisma.inquiry.create({ data });

    // Then send the email
    await this.sendInquiryConfirmationEmail(data.email);

    return createdInquiry;
  }

  async deleteInquiries(ids: number[]) {
    return this.prisma.inquiry.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  private async sendInquiryConfirmationEmail(email: string) {
    await this.mailerService.sendMail({
      from: "Sunil Shah <suniltraveler2004@gmail.com>",
      to: email,
      subject: 'Inquiry Confirmation',
      text: 'Your inquiry has been received. We will get back to you soon.',
      context: {
        email,
        date: new Date().toLocaleDateString(),
      },
    });
  }
}