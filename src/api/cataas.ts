import { DEFAULT_LIMIT, pageToOffLim } from '../utils/pagination';
import {
  CataasCatModel,
  CataasCountModel,
  MockedCataasCatsModel,
} from './cataas.types';
import { fetchWrapper } from './fetch';

const BASE_URL = 'https://cataas.com/';

export function catIdToUrl(id: string) {
  return `${BASE_URL}cat/${id}`;
}

export async function getCatsPageAPI(
  page: number,
  count = DEFAULT_LIMIT,
  tag?: string,
): Promise<MockedCataasCatsModel[]> {
  const { limit, skip } = pageToOffLim(page, count);
  let url = `${BASE_URL}api/cats?limit=${limit}&skip=${skip}`;
  if (tag) {
    url += `&tags=${tag}`;
  }
  const cats = await fetchWrapper<CataasCatModel[]>(url);
  return cats.map((cat) => ({
    ...cat,
    isOwn: Math.random() > 0.5,
    url: catIdToUrl(cat._id),
  }));
}

export async function getCatsCountAPI(): Promise<CataasCountModel> {
  return await fetchWrapper<CataasCountModel>(`${BASE_URL}api/count`);
}

export async function getTags(): Promise<string[]> {
  return await fetchWrapper<string[]>(`${BASE_URL}api/tags`);
}
