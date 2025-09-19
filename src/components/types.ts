import { StyleProp, TextStyle, ViewStyle } from "react-native";

type TextComponentType = "heading" | "auth" | "simple" | "product";

// 👇 define props interface
interface CustomHeaderProps {
  rightIcon?: string; // key from Images.svg
  leftIcon?: string; // key from Images.svg
  centerIcon?: string; // key from Images.svg
  centerText?: string;
  rightInvertedX?: boolean;
  leftInvertedX?: boolean;
  onPressLeft?: () => void;
  onPressRight?: () => void;
  RightIconComponnet?: React.ComponentType<any>; // custom right icon
  customStyles?: StyleProp<ViewStyle>;
  backButton?: boolean;
  leftText?: string;
  onBackPress?: () => void;
}

interface TextViewProps {
  text?: string;
  customStyle?: StyleProp<ViewStyle>;
  customTextStyle?: StyleProp<TextStyle>;
  authHeading?: boolean;
  multipleTextLine?: any;
}

type ObjectProps = {
  text?: string | number;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
  icon?: any;
  iconStyle?: StyleProp<ViewStyle>;
};

interface ListHeaderProp {
  data: { right: ObjectProps[]; left: ObjectProps[] };
}

export type { CustomHeaderProps, ListHeaderProp, TextViewProps };
