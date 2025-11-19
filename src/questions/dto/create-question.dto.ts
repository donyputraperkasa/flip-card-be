import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    question: string;

    @IsNotEmpty()
    @IsString()
    answer: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;
}