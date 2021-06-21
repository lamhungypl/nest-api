import { pickBy } from 'lodash';

export const notNullObject = <T extends object>(
  object: T | null | undefined,
) => {
  return pickBy<T>(object, (value) => value != null);
};
