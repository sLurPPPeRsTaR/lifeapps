import React, { memo } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Text from 'ca-component-generic/Text';
import PropTypes from 'prop-types';
import Button from 'ca-component-generic/Button';
import { Wave } from 'ca-config/Svg';
import Color from 'ca-config/Color';
import Shadow from 'ca-component-container/Shadow';
import Size from 'ca-config/Size';
import style from './style';

function CardWidget(props) {
  const {
    img,
    topRightImg,
    content1,
    content2,
    content3,
    onPress,
    onPressTopRightImg,
    btnTitle,
    benefitDate,
    secondBtnTitle,
    secondBtnOnPress,
    styleImg,
    width,
    onCardPress,
  } = props;

  const card = (
    <View style={[style.CardWidget.widgetContainer, { width }]}>
      <View style={style.flex}>
        <View style={style.CardWidget.content}>
          <Image source={img} style={styleImg} resizeMode="contain" />
          <View style={style.flex}>
            <Text textStyle="medium" size={Size.text.caption1.size} line={18}>
              {content1} {content2} {content3}
            </Text>
          </View>
          {topRightImg ? (
            <TouchableOpacity
              onPress={onPressTopRightImg}
              style={style.CardWidget.topRightImage}>
              <Image source={topRightImg} />
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
      {btnTitle ? (
        <View style={style.CardWidget.btnContainer}>
          <Button height={24} style={style.bR6} onPress={onPress}>
            <Text
              color={Color.main.light.white}
              size={Size.text.caption1.size}
              line={21}>
              {btnTitle}
            </Text>
          </Button>
          {secondBtnTitle ? (
            <Button
              height={24}
              style={style.CardWidget.secondBtnContainer}
              onPress={secondBtnOnPress}>
              <Text
                align="center"
                color={Color.primary.light.primary90}
                size={Size.text.caption1.size}
                line={21}>
                {secondBtnTitle}
              </Text>
            </Button>
          ) : null}
        </View>
      ) : null}

      {benefitDate ? (
        <View style={style.CardWidget.benefitDate}>
          <Text
            textStyle="regular"
            size={Size.text.caption1.size}
            line={18}
            letterSpacing={0.5}>
            {benefitDate}
          </Text>
        </View>
      ) : null}
      <Wave
        width={width}
        height={250}
        style={style.CardWidget.wave}
        fill={Color.wave.dark.color}
      />
    </View>
  );

  return (
    <Shadow borderRadius={16} style={[style.mR14, { width }]}>
      <TouchableOpacity onPress={onCardPress} disabled={!onCardPress}>
        {card}
      </TouchableOpacity>
    </Shadow>
  );
}

export default memo(CardWidget);

CardWidget.defaultProps = {
  img: null,
  topRightImg: null,
  content1: null,
  content2: null,
  content3: null,
  onPress: null,
  onPressTopRightImg: null,
  btnTitle: null,
  benefitDate: null,
  styleImg: { marginRight: 11, width: 52, height: 52, top: -7 },
  width: 311,
  onCardPress: null,
  secondBtnTitle: null,
  secondBtnOnPress: () => {},
};

CardWidget.propTypes = {
  img: PropTypes.node,
  topRightImg: PropTypes.node,
  content1: PropTypes.node,
  content2: PropTypes.node,
  content3: PropTypes.node,
  onPress: PropTypes.func,
  onPressTopRightImg: PropTypes.func,
  btnTitle: PropTypes.string,
  benefitDate: PropTypes.string,
  styleImg: PropTypes.objectOf(Object),
  width: PropTypes.number,
  onCardPress: PropTypes.func,
  secondBtnTitle: PropTypes.string,
  secondBtnOnPress: PropTypes.func,
};
