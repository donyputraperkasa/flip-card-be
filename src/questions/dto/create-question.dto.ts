import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    question: string;

    @IsNotEmpty()
    @IsString()
    answer: string;

    @IsNotEmpty()
    @IsInt()
    duration: number;

    @IsOptional()
    @IsString()
    imageUrl?: string;
}