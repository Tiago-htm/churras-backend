import { Meat, Sides, Vegetables, Drinks } from '../../../generated/prisma/client';

export class CreateGrillDto {
  name: string;
  date: string;
  duration: number;
  adult: number;
  kids: number;
  isVegan: boolean;
  city: string;
  userUuid: string;
  meats: Meat[];
  sides: Sides[];
  vegetables: Vegetables[];
  drinks: Drinks[];
}