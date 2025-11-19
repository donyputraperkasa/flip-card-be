import {
    Controller,
    Post,
    Get,
    Body,
    UploadedFile,
    UseInterceptors,
    Patch,
    Param,
    Delete,
    Req,
    UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

import { QuestionsService } from './questions.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class QuestionsController {
    constructor(private readonly questionsService: QuestionsService) {}

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: join(__dirname, '..', '..', 'uploads'),
                filename: (req, file, cb) => {
                    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                    cb(null, unique + extname(file.originalname));
                },
            }),
        }),
    )
    async create(
        @Req() req,
        @UploadedFile() file: Express.Multer.File,
        @Body() body: CreateQuestionDto,
    ) {
        return this.questionsService.create(req.user.id, {
            ...body,
            imageUrl: file ? file.filename : null,
        });
    }

    @Get()
    findAll(@Req() req) {
        return this.questionsService.findAll(req.user.id);
    }

    @Patch(':id')
    update(
        @Req() req,
        @Param('id') id: string,
        @Body() dto: UpdateQuestionDto,
    ) {
        return this.questionsService.update(req.user.id, Number(id), dto);
    }

    @Delete(':id')
    delete(@Req() req, @Param('id') id: string) {
        return this.questionsService.delete(req.user.id, Number(id));
    }
}