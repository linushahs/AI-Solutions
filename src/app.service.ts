import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

export interface ContactBody {
  fullName: string,
  email: string,
  address: string,
  jobType: string,
  message: string,
  contact: string
}

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) { }

  async getContacts() {
    return this.prisma.contact.findMany({ orderBy: { fullName: "asc" } });
  }

  async createContact(data: ContactBody) {
    return this.prisma.contact.create({ data });
  }
}
