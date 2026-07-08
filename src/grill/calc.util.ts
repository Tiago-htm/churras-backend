import { Meat, Drinks } from '../../generated/prisma/client';

const MEAT_KG_POR_PESSOA: Record<Meat, number> = {
  BOVINA: 0.2,
  SUINA: 0.15,
  FRANGO: 0.12,
  LINGUICA: 0.12,
};

const DRINK_L_POR_PESSOA: Record<Drinks, number> = {
  CERVEJA: 0.5,
  REFRIGERANTE: 0.3,
  AGUA: 0.3,
  SUCO: 0.3,
  ENERGETICO: 0.15,
};

export function calcularPessoas(adults: number, kids: number): number {
  return adults + kids * 0.5;
}

export function calcularCarne(meat: Meat, pessoas: number): number {
  return Number((MEAT_KG_POR_PESSOA[meat] * pessoas).toFixed(2));
}

export function calcularBebida(drink: Drinks, pessoas: number): number {
  return Number((DRINK_L_POR_PESSOA[drink] * pessoas).toFixed(2));
}

export function calcularCarvao(pessoas: number): number {
  return Math.ceil(pessoas / 4);
}

export function calcularGelo(carvao: number): number {
  return Number((carvao * 0.5).toFixed(2));
}