import { ThemeNavigationColors } from '../../../../@types/theme';

export const Colors = {
  transparent: 'rgba(0,0,0,0)',
  primary: '#1A99BD',
  secondary: '#4F8794',
  secondary_4D8C99: '#4D8C99',
  secondary_background: '#E8F2F2',
  textinput_background: '#E8F0F2',
  tertiary: '#0D171C',
  text: '#0D171C',
  white: '#ffffff',
  white_text: '#F7FAFA',
  background: '#F7FAFC',
  black: '#000000',
  blur: '#00000090',
  accent: '#EF4444',
  error: '#dc3545',
  red: '#EE1111',
  yellow: 'yellow',
};

export const NavigationColors: Partial<ThemeNavigationColors> = {
  primary: Colors.primary,
  background: '#1B1A23',
  card: '#1B1A23',
};

export default {
  Colors,
  NavigationColors,
};
