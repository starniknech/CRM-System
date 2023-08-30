
export enum PathEnum{
  COMPANIES = 'COMPANIES',
  PEOPLE = 'PEOPLE',
}

export const checkUrl = (pathname: string): PathEnum => {
  switch (pathname) {
    case '/companies':
      return PathEnum.COMPANIES;
    case '/people':
      return PathEnum.PEOPLE;
    default:
      return PathEnum.PEOPLE;
  }
}