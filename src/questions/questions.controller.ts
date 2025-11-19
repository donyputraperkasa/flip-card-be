import {
    Controller,
    Post,
    Get,
    Body,
    UploadedFile,
    UseInterceptors,
    Patch,
    Param,
    Delete
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { QuestionsService } from './questions.service';

import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Controller('questions')
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
        storage: diskStorage({
            destination: join(__dirname, '..', '..', 'uploads'),
            filename: (req, file, cb) => {
            const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, unique + extname(file.originalname));
            },
        }),
        }),
    )
    async create(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: CreateQuestionDto,
    ) {
        return this.questionsService.create({
        ...body,
        imageUrl: file ? file.filename : null,
        });
    }

    @Get()
    findAll() {
        return this.questionsService.findAll();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
        return this.questionsService.update(Number(id), dto);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.questionsService.delete(Number(id));
    }
}