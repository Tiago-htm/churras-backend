import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({ example: 'teste@teste.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  senha: string;

  @ApiProperty({ example: 'Tiago' })
  name: string;
}