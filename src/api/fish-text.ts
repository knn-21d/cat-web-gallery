import { fetchWrapper } from './fetch';
import { FishResponse } from './fish-text.types';

const BASE_URl = 'https://fish-text.ru/get';

export async function getFishText(): Promise<string> {
  const resp = await fetchWrapper<FishResponse>(BASE_URl);
  return resp?.text ?? '';
}
