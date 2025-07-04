import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const getHeightByPercentage = (heightPercentage: number): number => {
  return (height * heightPercentage) / 100;
};
export const getWidthByPercentage = (widthPercentage: number): number => {
  return (width * widthPercentage) / 100;
};
