export enum CompaniesEnum {
  GLOBAL_SOLUTIONS = "Global Solutions",
  GLOBAL_SOLUTIONS_DEVELOPMENT = "Global Solutions Development",
  PROMO_REPUBLIC = "Promo Republic",
  IT_FORMULA = "IT Formula"
}

export enum PositionsEnum{
  HEAD_OF_IT_DEPARTMENT = 'Начальник IT отдела',
  OFFICE_MANAGER = 'Офис менеджер',
  SECURITY_GUARD = 'Охранник',
  FRONTEND_DEVELOPER = 'Frontend разработчик',
  MARKETER_SMM_SPECIALIST = 'Маркетолог / SMM специалист'
}

export enum CategoriesEnum {
  STAFF = 'Штатные',
  PIECEWORK = 'Сдельные',
  CANDIDATES = 'Кандидаты',
  ARCHIVE = 'Архив',
  PARTNERS = 'Партнеры',
  REQUESTS = 'Запросы'
}

export interface IPerson {
  id: number;
  name: string;
  position: string;
  company: string;
  isFavourite: boolean;
  avatar: string;
  category: CategoriesEnum;
}