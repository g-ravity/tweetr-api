import Country, { CountryModel } from './Country';

export const getCountryBySearchText = async (text: string): Promise<CountryModel[]> => {
  const countries = await Country.find({ name: { $regex: `^${text[0].toUpperCase() + text.substring(1, text.length)}` } });
  return countries;
};
