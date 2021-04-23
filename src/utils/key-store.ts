import { createSWRStore } from 'swr-store';
import { getKeys } from './read-memory';

const keys = createSWRStore({
  get: () => getKeys(),
  refreshInterval: 2000,
  revalidateOnFocus: true,
  revalidateOnVisibility: true,
});

export default keys;
