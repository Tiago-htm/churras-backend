import { PartialType } from '@nestjs/swagger';
import { CreateGrillDto } from './create-grill.dto';

export class UpdateGrillDto extends PartialType(CreateGrillDto) {}