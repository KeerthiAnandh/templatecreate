export interface Item {
  id: string;
  content: string;
  imageUrl: string;
  showDeleteButton?: boolean;
}

export type ItemsMap = {
  header: Item[];
  body: Item[];
  footer: Item[];
  productlist: Item[];
  Productdetail : Item[]
};
