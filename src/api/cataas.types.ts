export type CataasCatModel = {
  _id: string;
  mimetype: string;
  size: number;
  tags: string[];
};

export type MockedCataasCatsModel = CataasCatModel & {
  isOwn: boolean;
  url: string;
};

export type CataasCountModel = {
  count: number;
};
