import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto:CreateAuthDto) {
    try {
    const isUser = await this.prisma.user.findUnique({
        where: { email: dto.email },
        select: { email: true },
      });

    if (isUser) {
      console.log(`Tentativa de cadastro com e-mail já existente: ${dto.email}`);
      throw new BadRequestException('Erro ao criar usuário');
    }

      const passwordHashed = await bcrypt.hash(dto.password, 10);

      const user = await this.prisma.user.create({
        data: { email: dto.email, password: passwordHashed, name: dto.name },
      });
      console.log('deu certo')
      return { uuid: user.uuid, email: user.email };
    } catch (error) {
      console.log('Falha ao criar usuário', error);
      throw new BadRequestException('Erro ao criar usuário');
    }
  }
  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new BadRequestException('Usuário ou senha inválido');
    }

    const senhaMatch = await bcrypt.compare(password, user.password);

    if (!senhaMatch) {
      throw new BadRequestException('Usuário ou senha inválido');
    }

    try {
      const token = jwt.sign({ uuid: user.uuid }, process.env.JWT_SECRET!, {
        expiresIn: '1d',
      });

      return { token };
    } catch (error) {
      console.log('Falha ao gerar token', error);
      throw new InternalServerErrorException('Erro ao realizar login');
    }
  }
}