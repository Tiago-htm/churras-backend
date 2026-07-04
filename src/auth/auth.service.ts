import { Injectable, BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

    async create(email: string, senha: string, name: string) {
    const existeUser = await this.prisma.user.findUnique({ where: { email } });

    if (existeUser) {
        throw new BadRequestException('Erro ao criar usuário');
    }

    const senhaHashed = await bcrypt.hash(senha, 10);

    const user = await this.prisma.user.create({
        data: { email, password: senhaHashed, name },
    });

    return { uuid: user.uuid, email: user.email };
    }

  async login(email: string, senha: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new BadRequestException('Usuário ou senha inválido');
    }

    const senhaMatch = await bcrypt.compare(senha, user.password);

    if (!senhaMatch) {
      throw new BadRequestException('Usuário ou senha inválido');
    }

    const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_SECRET!, {
      expiresIn: '1d',
    });

    return { token };
  }
}