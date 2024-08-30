// src/page-component/templete-creation/helper-comonent/types.ts

export interface Item {
  id: string;
  content: string;
  imageUrl: string;
  type: string;
  value:string;
}

export type ItemsMap = {
  header: Item[];
  body: Item[];
  footer: Item[];
  productlist: Item[];
  Productdetail: Item[];
};
