import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface CreateQuestionDto {
    question: string;
    answer: string;
    imageUrl?: string | null;
}

interface UpdateQuestionDto {
    question?: string;
    answer?: string;
    imageUrl?: string | null;
}

@Injectable()
export class QuestionsService {
    constructor(private prisma: PrismaService) {}

    async create(userId: number, data: CreateQuestionDto) {
        return this.prisma.question.create({
        data: {
            question: data.question,
            answer: data.answer,
            imageUrl: data.imageUrl ?? null,
            user: { connect: { id: userId } }, // connect relation
        },
        });
    }

    async findAll() {
        return this.prisma.question.findMany({
        orderBy: { id: 'asc' },
        });
    }

    async findOne(id: number) {
        return this.prisma.question.findUnique({ where: { id } });
    }

    async update(userId: number, id: number, data: UpdateQuestionDto) {
        // updateMany karena juga memastikan userId match
        const res = await this.prisma.question.updateMany({
        where: { id, userId },
        data: {
            question: data.question ?? undefined,
            answer: data.answer ?? undefined,
            imageUrl: data.imageUrl ?? undefined,
        },
        });

        if (res.count === 0) {
        throw new NotFoundException('Question not found or not owned by user');
        }
        // kalau mau return updated row, ambil lagi:
        return this.prisma.question.findFirst({ where: { id, userId } });
    }

    async delete(userId: number, id: number) {
        const res = await this.prisma.question.deleteMany({
        where: { id, userId },
        });
        if (res.count === 0) {
        throw new NotFoundException('Question not found or not owned by user');
        }
        return { deleted: true };
    }

    async random() {
        const list = await this.prisma.question.findMany();
        if (!list.length) return null;
        return list[Math.floor(Math.random() * list.length)];
    }
}