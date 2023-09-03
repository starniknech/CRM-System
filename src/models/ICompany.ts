



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
  country: string;
  region: string;
  worktimeStarts: number;
  worktimeEnds: number;
  direction: string;
  category: CategoriesEnum;
  isFavourite: boolean;
}