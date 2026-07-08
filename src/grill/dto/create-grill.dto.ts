import { Meat, Sides, Vegetables, Drinks, Extras } from '../../../generated/prisma/client';

export class CreateGrillDto {
  name: string;
  date: string;
  duration: number;
  adult: number;
  kids: number;
  isVegan: boolean;
  city: string;
  meats?: Meat[];
  sides?: Sides[];
  vegetables?: Vegetables[];
  drinks?: Drinks[];
  extras?: Extras[]; //depois arrumar pra funcionar conforme pedido da nicole...
}