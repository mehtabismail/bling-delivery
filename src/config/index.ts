import {
  Brands_Category_Props,
  Main_Category_Props,
  Product,
  Watches_Props,
} from "./types";

const main_category: Main_Category_Props[] = [
  { name: "Jewelry", icon: "Diamond" },
  { name: "Watch", icon: "Watch" },
  { name: "Jewelry", icon: "Diamond" },
];

const brands_list: Brands_Category_Props[] = [
  { name: "Omega", icon: "Omega_Light" },
  { name: "Rolex", icon: "Rolex" },
  { name: "Omega", icon: "Omega_Light" },
  { name: "Omega", icon: "Omega_Light" },
  { name: "Rolex", icon: "Rolex" },
];

const bullet_dots: number[] = [1, 2, 3, 4, 5];

const best_deals = {
  left: [
    {
      text: "Best Deals",
    },
  ],
  right: [{ text: "All", onPress: () => {} }],
};

const top_brands = {
  left: [
    {
      text: "Top Brands",
    },
  ],
  right: [{ text: "All", onPress: () => {} }],
};
const top_models = {
  left: [
    {
      text: "Top Models",
    },
  ],
  right: [{ text: "All", onPress: () => {} }],
};

const recent_view = {
  left: [
    {
      text: "Recent View",
    },
  ],
  right: [{ text: "All", onPress: () => {} }],
};
const top_watches = {
  left: [
    {
      text: "Top Watches",
    },
  ],
  right: [{ text: "All", onPress: () => {} }],
};

const best_deals_list: Product[] = [
  {
    id: "1432254",
    name: "Rolex Submariner Date",
    price: "12,500 SA",
    img: require("../theme/assets/images/Deal_1.png"),
    condition: "Used (Very good)",
    production_year: "2015",
    delivery_scope: "original box, No original papers",
    specifications: [
      { key: "Brand", value: "OLEVS" },
      { key: "Model Number", value: "XLYUK-S-G5885GS-BLV" },
      { key: "Model Year", value: "2022" },
      { key: "Movement", value: "Quartz" },
      { key: "Display", value: "Analog" },
      { key: "Dial Color", value: "Green" },
      { key: "Band Color", value: "Silver" },
      { key: "Band Material", value: "Stainless Steel" },
      { key: "Clasp Type", value: "Fold-over Clasp with Safety" },
      { key: "Case Material", value: "Stainless Steel" },
      { key: "Case Diameter", value: "41 mm" },
      { key: "Case Thickness", value: "11 mm" },
      { key: "Band Width", value: "20 mm" },
      { key: "Water Resistance", value: "3 ATM (30 meters)" },
      { key: "Dial Window Material", value: "Mineral Glass" },
      { key: "Bezel Function", value: "Stationary" },
      {
        key: "Special Features",
        value: "Waterproof, Luminous, Day/Date Display, Scratch-resistant",
      },
    ],
    date: new Date(),
    detail_name: "1603 Gold Buckley Dial Datejuest 36",
    description:
      "This exquisite luxury watch embodies elegance and precision. Its perfect fit gently contours to the wrist, providing a comfortable yet secure feel. The design allows for ample movement in the sleeves and waist, making it an ideal accessory for any occasion.",
    care_detail: [
      {
        id: 1,
        icon: "Delivery",
        heading: "Free Flat Rate Shipping",
        sub_heading: "Estimated to be delivered on ",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 2,
        icon: "COD",
        sub_heading: "Estimated to be delivered on ",
        heading: "COD Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 3,
        icon: "Return",
        sub_heading: "Estimated to be delivered on ",
        heading: "Return Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
    ],
    seller_information: {
      img: "Seller",
      name: "Seller Plus Name",
      location: "Saudi, Riyadh",
      sold_items: 23,
      active_items: 58,
    },
  },
  {
    id: "1432255",
    name: "Rolex Submariner Date",
    price: "12,500 SA",
    img: require("../theme/assets/images/Deal_2.png"),
    condition: "Used (Very good)",
    production_year: "2015",
    delivery_scope: "original box, No original papers",
    specifications: [
      { key: "Brand", value: "OLEVS" },
      { key: "Model Number", value: "XLYUK-S-G5885GS-BLV" },
    ],
    date: new Date(),
    detail_name: "1603 Gold Buckley Dial Datejuest 36",
    description:
      "This exquisite luxury watch embodies elegance and precision. Its perfect fit gently contours to the wrist, providing a comfortable yet secure feel. The design allows for ample movement in the sleeves and waist, making it an ideal accessory for any occasion.",
    care_detail: [
      {
        id: 1,
        icon: "Delivery",
        heading: "Free Flat Rate Shipping",
        sub_heading: "Estimated to be delivered on ",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 2,
        icon: "COD",
        sub_heading: "Estimated to be delivered on ",
        heading: "COD Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 3,
        icon: "Return",
        sub_heading: "Estimated to be delivered on ",
        heading: "Return Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
    ],
    seller_information: {
      img: "Seller",
      name: "Seller Plus Name",
      location: "Saudi, Riyadh",
      sold_items: 23,
      active_items: 58,
    },
  },
  {
    id: "1432256",
    name: "Rolex Submariner Date",
    price: "12,500 SA",
    img: require("../theme/assets/images/Deal_3.png"),
    condition: "Used (Very good)",
    production_year: "2015",
    delivery_scope: "original box, No original papers",
    specifications: [
      { key: "Brand", value: "OLEVS" },
      { key: "Model Number", value: "XLYUK-S-G5885GS-BLV" },
    ],
    date: new Date(),
    detail_name: "1603 Gold Buckley Dial Datejuest 36",
    description:
      "This exquisite luxury watch embodies elegance and precision. Its perfect fit gently contours to the wrist, providing a comfortable yet secure feel. The design allows for ample movement in the sleeves and waist, making it an ideal accessory for any occasion.",
    care_detail: [
      {
        id: 1,
        icon: "Delivery",
        heading: "Free Flat Rate Shipping",
        sub_heading: "Estimated to be delivered on ",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 2,
        icon: "COD",
        sub_heading: "Estimated to be delivered on ",
        heading: "COD Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 3,
        icon: "Return",
        sub_heading: "Estimated to be delivered on ",
        heading: "Return Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
    ],
    seller_information: {
      img: "Seller",
      name: "Seller Plus Name",
      location: "Saudi, Riyadh",
      sold_items: 23,
      active_items: 58,
    },
  },
  {
    id: "1432257",
    name: "Rolex Submariner Date",
    price: "12,500 SA",
    img: require("../theme/assets/images/Deal_2.png"),
    condition: "Used (Very good)",
    production_year: "2015",
    delivery_scope: "original box, No original papers",
    specifications: [
      { key: "Brand", value: "OLEVS" },
      { key: "Model Number", value: "XLYUK-S-G5885GS-BLV" },
    ],
    date: new Date(),
    detail_name: "1603 Gold Buckley Dial Datejuest 36",
    description:
      "This exquisite luxury watch embodies elegance and precision. Its perfect fit gently contours to the wrist, providing a comfortable yet secure feel. The design allows for ample movement in the sleeves and waist, making it an ideal accessory for any occasion.",
    care_detail: [
      {
        id: 1,
        icon: "Delivery",
        heading: "Free Flat Rate Shipping",
        sub_heading: "Estimated to be delivered on ",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 2,
        icon: "COD",
        sub_heading: "Estimated to be delivered on ",
        heading: "COD Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 3,
        icon: "Return",
        sub_heading: "Estimated to be delivered on ",
        heading: "Return Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
    ],
    seller_information: {
      img: "Seller",
      name: "Seller Plus Name",
      location: "Saudi, Riyadh",
      sold_items: 23,
      active_items: 58,
    },
  },
  {
    id: "1432258",
    name: "Rolex Submariner Date",
    price: "12,500 SA",
    img: require("../theme/assets/images/Deal_1.png"),
    condition: "Used (Very good)",
    production_year: "2015",
    delivery_scope: "original box, No original papers",
    specifications: [
      { key: "Brand", value: "OLEVS" },
      { key: "Model Number", value: "XLYUK-S-G5885GS-BLV" },
    ],
    date: new Date(),
    detail_name: "1603 Gold Buckley Dial Datejuest 36",
    description:
      "This exquisite luxury watch embodies elegance and precision. Its perfect fit gently contours to the wrist, providing a comfortable yet secure feel. The design allows for ample movement in the sleeves and waist, making it an ideal accessory for any occasion.",
    care_detail: [
      {
        id: 1,
        icon: "Delivery",
        heading: "Free Flat Rate Shipping",
        sub_heading: "Estimated to be delivered on ",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 2,
        icon: "COD",
        sub_heading: "Estimated to be delivered on ",
        heading: "COD Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 3,
        icon: "Return",
        sub_heading: "Estimated to be delivered on ",
        heading: "Return Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
    ],
    seller_information: {
      img: "Seller",
      name: "Seller Plus Name",
      location: "Saudi, Riyadh",
      sold_items: 23,
      active_items: 58,
    },
  },
  {
    id: "1432259",
    name: "Rolex Submariner Date",
    price: "12,500 SA",
    img: require("../theme/assets/images/Deal_2.png"),
    condition: "Used (Very good)",
    production_year: "2015",
    delivery_scope: "original box, No original papers",
    specifications: [
      { key: "Brand", value: "OLEVS" },
      { key: "Model Number", value: "XLYUK-S-G5885GS-BLV" },
    ],
    date: new Date(),
    detail_name: "1603 Gold Buckley Dial Datejuest 36",
    description:
      "This exquisite luxury watch embodies elegance and precision. Its perfect fit gently contours to the wrist, providing a comfortable yet secure feel. The design allows for ample movement in the sleeves and waist, making it an ideal accessory for any occasion.",
    care_detail: [
      {
        id: 1,
        icon: "Delivery",
        heading: "Free Flat Rate Shipping",
        sub_heading: "Estimated to be delivered on ",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 2,
        icon: "COD",
        sub_heading: "Estimated to be delivered on ",
        heading: "COD Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 3,
        icon: "Return",
        sub_heading: "Estimated to be delivered on ",
        heading: "Return Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
    ],
    seller_information: {
      img: "Seller",
      name: "Seller Plus Name",
      location: "Saudi, Riyadh",
      sold_items: 23,
      active_items: 58,
    },
  },
  {
    id: "1432250",
    name: "Rolex Submariner Date",
    price: "12,500 SA",
    img: require("../theme/assets/images/Deal_3.png"),
    condition: "Used (Very good)",
    production_year: "2015",
    delivery_scope: "original box, No original papers",
    specifications: [
      { key: "Brand", value: "OLEVS" },
      { key: "Model Number", value: "XLYUK-S-G5885GS-BLV" },
    ],
    date: new Date(),
    detail_name: "1603 Gold Buckley Dial Datejuest 36",
    description:
      "This exquisite luxury watch embodies elegance and precision. Its perfect fit gently contours to the wrist, providing a comfortable yet secure feel. The design allows for ample movement in the sleeves and waist, making it an ideal accessory for any occasion.",
    care_detail: [
      {
        id: 1,
        icon: "Delivery",
        heading: "Free Flat Rate Shipping",
        sub_heading: "Estimated to be delivered on ",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 2,
        icon: "COD",
        sub_heading: "Estimated to be delivered on ",
        heading: "COD Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 3,
        icon: "Return",
        sub_heading: "Estimated to be delivered on ",
        heading: "Return Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
    ],
    seller_information: {
      img: "Seller",
      name: "Seller Plus Name",
      location: "Saudi, Riyadh",
      sold_items: 23,
      active_items: 58,
    },
  },
  {
    id: "1432251",
    name: "Rolex Submariner Date",
    price: "12,500 SA",
    img: require("../theme/assets/images/Deal_1.png"),
    condition: "Used (Very good)",
    production_year: "2015",
    delivery_scope: "original box, No original papers",
    specifications: [
      { key: "Brand", value: "OLEVS" },
      { key: "Model Number", value: "XLYUK-S-G5885GS-BLV" },
    ],
    date: new Date(),
    detail_name: "1603 Gold Buckley Dial Datejuest 36",
    description:
      "This exquisite luxury watch embodies elegance and precision. Its perfect fit gently contours to the wrist, providing a comfortable yet secure feel. The design allows for ample movement in the sleeves and waist, making it an ideal accessory for any occasion.",
    care_detail: [
      {
        id: 1,
        icon: "Delivery",
        heading: "Free Flat Rate Shipping",
        sub_heading: "Estimated to be delivered on ",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 2,
        icon: "COD",
        sub_heading: "Estimated to be delivered on ",
        heading: "COD Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 3,
        icon: "Return",
        sub_heading: "Estimated to be delivered on ",
        heading: "Return Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
    ],
    seller_information: {
      img: "Seller",
      name: "Seller Plus Name",
      location: "Saudi, Riyadh",
      sold_items: 23,
      active_items: 58,
    },
  },
  {
    id: "1432252",
    name: "Rolex Submariner Date",
    price: "12,500 SA",
    img: require("../theme/assets/images/Deal_2.png"),
    condition: "Used (Very good)",
    production_year: "2015",
    delivery_scope: "original box, No original papers",
    specifications: [
      { key: "Brand", value: "OLEVS" },
      { key: "Model Number", value: "XLYUK-S-G5885GS-BLV" },
    ],
    date: new Date(),
    detail_name: "1603 Gold Buckley Dial Datejuest 36",
    description:
      "This exquisite luxury watch embodies elegance and precision. Its perfect fit gently contours to the wrist, providing a comfortable yet secure feel. The design allows for ample movement in the sleeves and waist, making it an ideal accessory for any occasion.",
    care_detail: [
      {
        id: 1,
        icon: "Delivery",
        heading: "Free Flat Rate Shipping",
        sub_heading: "Estimated to be delivered on ",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 2,
        icon: "COD",
        sub_heading: "Estimated to be delivered on ",
        heading: "COD Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 3,
        icon: "Return",
        sub_heading: "Estimated to be delivered on ",
        heading: "Return Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
    ],
    seller_information: {
      img: "Seller",
      name: "Seller Plus Name",
      location: "Saudi, Riyadh",
      sold_items: 23,
      active_items: 58,
    },
  },
  {
    id: "1432253",
    name: "Rolex Submariner Date",
    price: "12,500 SA",
    img: require("../theme/assets/images/Deal_3.png"),
    condition: "Used (Very good)",
    production_year: "2015",
    delivery_scope: "original box, No original papers",
    specifications: [
      { key: "Brand", value: "OLEVS" },
      { key: "Model Number", value: "XLYUK-S-G5885GS-BLV" },
    ],
    date: new Date(),
    detail_name: "1603 Gold Buckley Dial Datejuest 36",
    description:
      "This exquisite luxury watch embodies elegance and precision. Its perfect fit gently contours to the wrist, providing a comfortable yet secure feel. The design allows for ample movement in the sleeves and waist, making it an ideal accessory for any occasion.",
    care_detail: [
      {
        id: 1,
        icon: "Delivery",
        heading: "Free Flat Rate Shipping",
        sub_heading: "Estimated to be delivered on ",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 2,
        icon: "COD",
        sub_heading: "Estimated to be delivered on ",
        heading: "COD Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
      {
        id: 3,
        icon: "Return",
        sub_heading: "Estimated to be delivered on ",
        heading: "Return Policy",
        delivery_date: "09/11/2021 - 12/11/2021.",
      },
    ],
    seller_information: {
      img: "Seller",
      name: "Seller Plus Name",
      location: "Saudi, Riyadh",
      sold_items: 23,
      active_items: 58,
    },
  },
];

const top_watches_list: Watches_Props[] = [
  {
    name: "Submariner",
    brand: "Omega",
    img: require("../theme/assets/images/Watch_1.jpg"),
  },
  {
    name: "Submariner",
    brand: "Rolex",
    img: require("../theme/assets/images/Watch_2.jpg"),
  },
  {
    name: "Submariner",
    brand: "Omega",
    img: require("../theme/assets/images/Watch_3.png"),
  },
  {
    name: "Submariner",
    brand: "Rolex",
    img: require("../theme/assets/images/Watch_4.png"),
  },
];

const filters_data = [
  { key_name: "Type" },
  { key_name: "Brand" },
  { key_name: "Modal" },
  { key_name: "Gender" },
  { key_name: "Price" },
];

export {
  best_deals,
  best_deals_list,
  brands_list,
  bullet_dots,
  filters_data,
  main_category,
  recent_view,
  top_brands,
  top_models,
  top_watches,
  top_watches_list,
};
