export enum PathEnum{
  COMPANIES = 'COMPANIES',
  PEOPLE = 'PEOPLE',
}

export const checkUrl = (pathname: string): PathEnum => {
  if (pathname.includes('companies')) {
    return PathEnum.COMPANIES;
  } else if (pathname.includes('people')) {
    return PathEnum.PEOPLE;
  }
  return PathEnum.PEOPLE;
}