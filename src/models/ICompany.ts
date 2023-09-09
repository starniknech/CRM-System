export enum CountriesEnum {
  UZBEKISTAN = 'Узбекистан',
  GERMANY = 'Германия',
  SPAIN = 'Испания',
}

export enum RegionsEnum {
  TASHKENT = 'Узбекистан',
  BERLIN = 'Берлин',
  MADRID = 'Мадрид',
  SAMARKAND = 'Самарканд',
  MUNICH = 'Мюнхен',
  BARCELONA = 'Барселона',
}

export enum CategoriesEnum {
  MY_KOMPANIES = 'Мои компании',
  PARTNERS = 'Партнеры',
  CLIENTS = 'Клиенты',
  CUSTOMERS = 'Заказчики',
  BLACK_LIST = 'Черный список',
  CLOSED = 'Закрытые',
}

export interface ICompany {
  id: number;
  name: string;
  legalName: string;
  country: CountriesEnum;
  region: RegionsEnum;
  worktimeStarts: number;
  worktimeEnds: number;
  direction: string;
  category: CategoriesEnum;
  isFavourite: boolean;
}