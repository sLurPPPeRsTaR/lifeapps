import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Attention, Attention3, CloseLine, SuccessIcon } from 'ca-config/Svg';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export const toastConfig = {
  error: (props) => (
    <View style={Style.container}>
      <View style={Style.innerContainer}>
        <View style={Style.flex1}>
          <Text
            multiline
            size={Size.text.body2.size}
            color={Color.main.light.white}
            textStyle="medium">
            {props?.text1}
          </Text>
        </View>
        <Pressable onPress={() => Toast.hide()}>
          <CloseLine width={24} height={24} fill={Color.main.light.white} />
        </Pressable>
      </View>
    </View>
  ),
  warning: (props) => (
    <View style={StyleWarning.container}>
      <Attention3 />
      <View style={StyleWarning.innerContainer}>
        <Text style={StyleWarning.text}>
          {props?.text1?.map((element) => (
            <Text
              multiline
              size={Size.text.body2.size}
              color={Color.primary.light.primary90}
              textStyle={element?.textStyle}>
              {element?.label}
            </Text>
          ))}
        </Text>
        <Pressable onPress={() => Toast.hide()}>
          <CloseLine
            width={24}
            height={24}
            fill={Color.primary.light.primary90}
          />
        </Pressable>
      </View>
    </View>
  ),
  success: (props) => (
    <View style={StyleSuccess.container}>
      <SuccessIcon />
      <View style={StyleSuccess.innerContainer}>
        <Text style={StyleSuccess.text}>
          {props?.text1?.map((element) => (
            <Text
              multiline
              size={Size.text.body2.size}
              textStyle={element?.textStyle}>
              {element?.label}
            </Text>
          ))}
        </Text>
      </View>
    </View>
  ),
  info: (props) => (
    <View style={StyleInfo.container}>
      <Attention />
      <View style={StyleInfo.innerContainer}>
        <Text style={StyleInfo.text}>
          {props?.text1?.map((element) => (
            <Text
              multiline
              size={Size.text.body2.size}
              textStyle={element?.textStyle}>
              {element?.label}
            </Text>
          ))}
        </Text>
      </View>
    </View>
  ),
};

const Style = StyleSheet.create({
  container: {
    minHeight: 56,
    width: Size.screen.width - 32,
    backgroundColor: Color.primary.light.primary90,
    borderRadius: 9,
    padding: 16,
    paddingRight: 8,
  },
  innerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  flex1: {
    flex: 1,
  },
});

const StyleWarning = StyleSheet.create({
  container: {
    minHeight: 56,
    width: Size.screen.width - 32,
    backgroundColor: Color.redNotif.light.color,
    borderRadius: 16,
    padding: 16,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    flex: 1,
    maxWidth: Size.screen.width - 120,
  },
});

const StyleSuccess = StyleSheet.create({
  container: {
    minHeight: 56,
    width: Size.screen.width - 32,
    backgroundColor: Color.bgEventPrice.light.color,
    borderRadius: 16,
    padding: 16,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    flex: 1,
    maxWidth: Size.screen.width - 120,
  },
});

const StyleInfo = StyleSheet.create({
  container: {
    minHeight: 56,
    width: Size.screen.width - 32,
    backgroundColor: Color.ticketContainerBg.light.color,
    borderRadius: 16,
    padding: 16,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  innerContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  text: {
    flex: 1,
    maxWidth: Size.screen.width - 120,
  },
});
