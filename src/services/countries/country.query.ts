import { ICountry } from '../../types/Country.types';
import { getCountryBySearchText } from './country.repository';

export const getCountry = async (_: any, args: { text: string }): Promise<ICountry[]> => {
  try {
    const countries = await getCountryBySearchText(args.text);
    return countries;
  } catch (err) {
    return err;
  }
};
