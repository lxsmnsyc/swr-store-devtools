import { createSWRStore } from 'swr-store';
import { getData } from './read-memory';

const data = createSWRStore({
  get: (...keys: string[]) => Promise.all(keys.map((key) => getData(key))),
  refreshInterval: 2000,
  revalidateOnFocus: true,
  revalidateOnVisibility: true,
});

export default data;
