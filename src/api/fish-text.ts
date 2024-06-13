import { fetchWrapper } from './fetch';
import { MockedCommentType, FishResponse } from './fish-text.types';

const BASE_URl = 'https://fish-text.ru/get';

export async function getFishText(): Promise<MockedCommentType> {
  const resp = await fetchWrapper<FishResponse>(BASE_URl);
  return { text: resp?.text ?? '', isOwn: false, id: Date.now() };
}
