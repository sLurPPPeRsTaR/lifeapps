import React, { useCallback, useState } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {
  LPBicycleIcon,
  LPCloudIcon,
  LPFlagIcon,
  LPSnorkelingIcon,
} from 'ca-config/Image';
import { Close, ChevronDownLS } from 'ca-config/Svg';
import BottomSheet from 'ca-component-container/BottomSheet';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import LinearGradient from 'react-native-linear-gradient';
import Shadow from 'ca-component-container/Shadow';
import locale from '../../locale';
import style from '../../style';

function DialogProtectedActivity({
  lang,
  isVisible,
  onClosePress,
  onRequestClose,
}) {
  const Header = useCallback(() => {
    return (
      <>
        <View style={style.modal.dialogHeader.container}>
          <TouchableWithoutFeedback onPress={onClosePress}>
            <View style={style.modal.dialogHeader.closeBtnContainer}>
              <Close width={30} height={30} />
            </View>
          </TouchableWithoutFeedback>
          <View style={style.fx1}>
            <Text
              textStyle="bold"
              line={33}
              size={Size.text.body2.size}
              align="center">
              {trans(locale, lang, 'Info Aktivitas yang Terproteksi')}
            </Text>
          </View>
          <View style={style.w30} />
        </View>
        <View style={style.divider} />
      </>
    );
  }, [lang, onClosePress]);

  const activityList = [
    {
      key: 'darat',
      title: trans(locale, lang, 'Darat'),
      icon: (
        <Image
          source={LPBicycleIcon}
          style={style.modal.protectedActivity.listItemImage1}
        />
      ),
      example: [
        { id: 'Atletik' },
        { id: 'Badminton' },
        { id: 'Basketball' },
        { id: 'Berkuda' },
        { id: 'BMX' },
        { id: 'Bowling' },
        { id: 'Bungee Jumping' },
        { id: 'Cheerleading' },
        { id: 'Golf' },
        { id: 'Hiking' },
        { id: 'Lompat Tinggi' },
        { id: 'Marathon' },
        { id: 'Mendaki Gunung' },
        { id: 'Olahraga Bermotor' },
        { id: 'Panjat Tebing' },
        { id: 'Running' },
        { id: 'Sepakbola' },
        { id: 'Sepatu Roda' },
        { id: 'Sepeda' },
        { id: 'Skateboarding' },
        { id: 'Softball' },
        { id: 'Squash' },
        { id: 'Tenis Lapangan' },
        { id: 'Tenis Meja' },
        { id: 'Trampolining' },
        { id: 'Triathlon' },
        { id: 'Voli' },
        { id: 'Quad Bike Riding' },
      ],
    },
    {
      key: 'udara',
      title: trans(locale, lang, 'Udara'),
      icon: (
        <Image
          source={LPCloudIcon}
          style={style.modal.protectedActivity.listItemImage2}
        />
      ),
      example: [
        { id: 'Base Jumping' },
        { id: 'Hang Gliding atau Gantola' },
        { id: 'Paragliding' },
      ],
    },
    {
      key: 'aktivitaslainnya',
      title: trans(locale, lang, 'Aktivitas Lainnya'),
      icon: (
        <Image
          source={LPFlagIcon}
          style={style.modal.protectedActivity.listItemImage3}
        />
      ),
      example: [{ id: 'Berkendara' }, { id: 'Naik Kendaraan Umum' }],
    },
    {
      key: 'air',
      title: trans(locale, lang, 'Air'),
      icon: (
        <Image
          source={LPSnorkelingIcon}
          style={style.modal.protectedActivity.listItemImage4}
        />
      ),
      example: [
        { id: 'Arung Jeram' },
        { id: 'Berenang' },
        { id: 'Cliff Diving' },
      ],
    },
  ];

  const [selectedListItem, setSelectedListItem] = useState(null);
  const ListItem = useCallback(
    ({ title, icon, example, identifier }) => {
      const showDrawer = selectedListItem === identifier;
      const onSelectedItem = () => {
        if (showDrawer) {
          setSelectedListItem(null);
        } else {
          setSelectedListItem(identifier);
        }
      };
      return (
        <>
          <Shadow
            borderRadius={16}
            style={style.modal.protectedActivity.shadow}>
            <TouchableWithoutFeedback onPress={onSelectedItem}>
              <View style={style.modal.protectedActivity.listItemContainer}>
                <View
                  style={style.modal.protectedActivity.listItemTextContainer}>
                  <View style={style.w60}>{icon}</View>
                  <Text textStyle="semi" size={Size.text.body2.size}>
                    {title}
                  </Text>
                </View>
                <View
                  style={
                    style.modal.protectedActivity.listItemChevronContainer
                  }>
                  <ChevronDownLS
                    width={20}
                    height={20}
                    style={showDrawer ? style.flipTrue : style.flipFalse}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </Shadow>
          {showDrawer && (
            <View style={style.modal.protectedActivity.exampleContainer}>
              {example?.map((item) => (
                <Text
                  key={item.id}
                  textStyle="semi"
                  line={30}
                  size={Size.text.caption1.size}
                  color={Color.neutral.light.neutral40}>
                  {item.id}
                </Text>
              ))}
            </View>
          )}
        </>
      );
    },
    [selectedListItem]
  );

  return (
    <BottomSheet
      onRequestClose={onRequestClose}
      isPadder={false}
      renderHeader={<Header />}
      isVisible={isVisible}
      swipeable={false}>
      <ScrollView style={style.modal.height}>
        <LinearGradient colors={['#FFFF', '#E9E9E9']} style={style.p16}>
          <Text textStyle="semi" size={Size.text.body2.size}>
            {trans(
              locale,
              lang,
              'LifeSAVER melindungi kamu di aktivitas, berikut:'
            )}
          </Text>
          <View style={style.mb16} />
          {activityList.map((item) => (
            <ListItem
              key={item.key}
              identifier={item.key}
              title={item.title}
              icon={item.icon}
              example={item.example}
            />
          ))}
        </LinearGradient>
      </ScrollView>
    </BottomSheet>
  );
}

export default DialogProtectedActivity;

DialogProtectedActivity.defaultProps = {
  isVisible: false,
};

DialogProtectedActivity.propTypes = {
  lang: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  onRequestClose: PropTypes.func.isRequired,
  onClosePress: PropTypes.func.isRequired,
};
