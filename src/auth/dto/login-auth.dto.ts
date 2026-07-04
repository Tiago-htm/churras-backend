import { ApiProperty } from '@nestjs/swagger';

export class LoginAuthDto {
  @ApiProperty({ example: 'teste@teste.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  senha: string;
}