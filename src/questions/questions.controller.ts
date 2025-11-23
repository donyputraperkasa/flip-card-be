import {
    Controller,
    Post,
    Get,
    Patch,
    Delete,
    Body,
    Param,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { QuestionsService } from './questions.service';

// Helper: generate nama file unik
const storageConfig = {
    storage: diskStorage({
        destination: join(__dirname, '..', '..', 'uploads'),
        filename: (req, file, cb) => {
            const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
            cb(null, unique + extname(file.originalname));
        },
    }),
};

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    /* =======================================================
     *  CREATE QUESTION
     * ======================================================= */
    @Post()
    @UseInterceptors(FileInterceptor('file', storageConfig))
    async create(
        @Req() req,
        @UploadedFile() file: Express.Multer.File,
        @Body() body: any,
    ) {
        console.log('Received body:', body);
        return this.questionsService.create(req.user.id, {
            question: body.question,
            answer: body.answer,
            imageUrl: file ? file.filename : null,
            duration: body.duration ? Number(body.duration) : undefined,
        });
    }

    /* =======================================================
     *  GET ALL QUESTIONS BY USER
     * ======================================================= */
    @Get()
    findAll(@Req() req) {
        return this.questionsService.findAll(req.user.id);
    }

    /* =======================================================
     *  UPDATE QUESTION (JSON OR FORM-DATA)
     * ======================================================= */
    @Patch(':id')
    @UseInterceptors(FileInterceptor('file', storageConfig))
    async update(
        @Req() req,
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() body: any,
    ) {
        console.log('Received body:', body);
        return this.questionsService.update(req.user.id, Number(id), {
            question: body.question,
            answer: body.answer,
            imageUrl: file ? file.filename : body.imageUrl ?? null,
            duration: body.duration ? Number(body.duration) : undefined,
        });
    }

    /* =======================================================
     *  DELETE QUESTION
     * ======================================================= */
    @Delete(':id')
    delete(@Req() req, @Param('id') id: string) {
        return this.questionsService.delete(req.user.id, Number(id));
    }
}