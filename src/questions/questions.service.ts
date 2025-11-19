import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface CreateQuestionDto {
    question: string;
    answer: string;
    imageUrl?: string | null; // penting untuk upload file
}

interface UpdateQuestionDto {
    question?: string;
    answer?: string;
    imageUrl?: string | null;
}

@Injectable()
export class QuestionsService {
    constructor(private prisma: PrismaService) {}

    // CREATE
    async create(data: CreateQuestionDto) {
        return this.prisma.question.create({
        data: {
            question: data.question,
            answer: data.answer,
            imageUrl: data.imageUrl ?? null,
        },
        });
    }

    // GET ALL
    async findAll() {
        return this.prisma.question.findMany({
        orderBy: { id: 'asc' },
        });
    }

    // GET ONE
    async findOne(id: number) {
        return this.prisma.question.findUnique({
        where: { id },
        });
    }

    // UPDATE
    async update(id: number, data: UpdateQuestionDto) {
        return this.prisma.question.update({
        where: { id },
        data: {
            question: data.question,
            answer: data.answer,
            imageUrl: data.imageUrl ?? undefined, 
            // undefined = tidak update field
        },
        });
    }

    // DELETE
    async delete(id: number) {
        return this.prisma.question.delete({
        where: { id },
        });
    }

    // GET RANDOM
    async random() {
        const list = await this.prisma.question.findMany();

        if (!list.length) return null;

        const randomIndex = Math.floor(Math.random() * list.length);
        return list[randomIndex];
    }
}