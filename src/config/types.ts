import { ImageSourcePropType } from "react-native";

type Specs_Prop = {
  key: string;
  value: string;
};

type Main_Category_Props = {
  name: string;
  icon: any;
};

type Brands_Category_Props = {
  name: string;
  icon: any;
};

type Care_Detail_Props = {
  id: number;
  icon: string;
  heading: string;
  sub_heading: string;
  delivery_date: string;
};

type Seller_Info_Props = {
  img: ImageSourcePropType | string | undefined;
  name: string;
  location: string;
  sold_items: number;
  active_items: number;
};

interface Deal_Props {
  id: string;
  name: string;
  price: string;
  img: ImageSourcePropType | undefined;
  condition: string;
  production_year: string;
  delivery_scope: string;
  specifications?: Specs_Prop[];
  date: Date;
  detail_name: string;
  description: string;
  care_detail: Care_Detail_Props[];
  seller_information: Seller_Info_Props;
}

interface Product extends Deal_Props {
  specifications?: Specs_Prop[];
}

interface Watches_Props {
  name: string;
  brand: string;
  img: ImageSourcePropType | undefined;
}

export {
  Brands_Category_Props,
  Deal_Props,
  Main_Category_Props,
  Product,
  Watches_Props,
};
