import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService,
    ) {}

    // REGISTER
    async register(email: string, password: string) {
        const hashed = await bcrypt.hash(password, 10);

        const user = await this.prisma.user.create({
        data: { email, password: hashed },
        });

        return { message: 'User registered', userId: user.id };
    }

    // LOGIN
    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
        where: { email },
        });

        if (!user) throw new UnauthorizedException('Email tidak terdaftar');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new UnauthorizedException('Password salah');

        const token = this.jwt.sign({
        id: user.id,
        email: user.email,
        });

        return {
        message: 'Login berhasil',
        token,
        user: { id: user.id, email: user.email },
        };
    }
}