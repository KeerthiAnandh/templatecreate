// src/page-component/templete-creation/helper-comonent/types.ts

export interface Item {
  id: string;
  content: string;
  imageUrl: string;
}

export type ItemsMap = {
  header: Item[];
  body: Item[];
  footer: Item[];
  productlist: Item[];
  Productdetail: Item[];
};
