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

/*************  ✨ Windsurf Command ⭐  *************/
    /**
     * Create a new question for a user
     * @param userId The user ID creating the question
     * @param data The question data
     * @returns The created question
     */
/*******  627fce8d-6607-4481-9da2-be10f6e39fdf  *******/
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

    async findAll(userId: number) {
        return this.prisma.question.findMany({
        where: { userId },
        orderBy: { id: 'asc' },
        });
    }

    async findOne(userId: number, id: number) {
        return this.prisma.question.findFirst({
        where: { id, userId }, // findFirst supports composite condition
        });
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

    async random(userId: number) {
        const list = await this.prisma.question.findMany({ where: { userId } });
        if (!list.length) return null;
        return list[Math.floor(Math.random() * list.length)];
    }
}