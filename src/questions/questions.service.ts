import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface CreateQuestionDto {
    question: string;
    answer: string;
    imageUrl?: string | null;
    duration?: number;
}

interface UpdateQuestionDto {
    question?: string;
    answer?: string;
    imageUrl?: string | null;
    duration?: number;
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
                duration: data.duration ?? 30,
                user: { connect: { id: userId } },
            },
            select: {
                id: true,
                question: true,
                answer: true,
                imageUrl: true,
                duration: true,
                createdAt: true,
            }
        });
    }

    async findAll(userId: number) {
        return this.prisma.question.findMany({
            where: { userId },
            orderBy: { id: 'asc' },
            select: {
                id: true,
                question: true,
                answer: true,
                imageUrl: true,
                duration: true,    // ← PENTING!
            }
        });
    }

    async findOne(userId: number, id: number) {
        return this.prisma.question.findFirst({
        where: { id, userId },
        select: {
            id: true,
            question: true,
            answer: true,
            imageUrl: true,
            duration: true,
            createdAt: true,
        }
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
            duration: data.duration ?? undefined,
        },
        });

        if (res.count === 0) {
        throw new NotFoundException('Question not found or not owned by user');
        }
        // kalau mau return updated row, ambil lagi:
        return this.prisma.question.findFirst({ where: { id, userId },
            select: {
                id: true,
                question: true,
                answer: true,
                imageUrl: true,
                duration: true,
                createdAt: true,
            }
        });
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