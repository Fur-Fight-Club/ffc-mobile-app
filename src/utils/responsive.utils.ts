import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";
import { isIphoneX as isIphoneXLib, getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper'


export const hp = heightPercentageToDP;

export const wp = widthPercentageToDP;

export const iphoneX = {
  check: isIphoneXLib,
  topHeight: getStatusBarHeight,
  bottomHeight: getBottomSpace,
};