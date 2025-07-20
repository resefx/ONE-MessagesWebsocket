import { Injectable } from '@nestjs/common';
import { Messages } from '../../../../../generated/prisma';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class MessagesService {
    constructor(private readonly prisma: PrismaService) { }

    async getMessages({ limit }: { limit: number }): Promise<Partial<Messages>[] | Error> {
        return await this.prisma.messages.findMany({
            select: {
                id: true,
                text: true,
                userId: true,
            },
            take: limit > 100 ? 100 : limit,
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
