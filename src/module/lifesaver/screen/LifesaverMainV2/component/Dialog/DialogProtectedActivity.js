import React, { useCallback, useState } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import {
  LifeSaverPlusLogoWhite,
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
              {trans(locale, lang, 'infoAktivitasTerproteksi')}
            </Text>
          </View>
          <View style={style.w30} />
        </View>
        <View style={style.divider} />
      </>
    );
  }, [lang, onClosePress]);

  const Specials = useCallback(() => {
    return (
      <View style={style.specials.container}>
        <Text
          size={Size.text.caption2.size}
          color={Color.main.light.white}
          align="center">
          {trans(locale, lang, 'Khusus')}
        </Text>
        <Image source={LifeSaverPlusLogoWhite} style={style.specials.image} />
      </View>
    );
  }, [lang]);

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
        { id: 'Atletik', en: 'Athletics' },
        { id: 'Badminton', en: 'Badminton' },
        { id: 'Basketball', en: 'Basketball' },
        { id: 'Berkuda', en: 'Horse Riding' },
        { id: 'Bisbol', en: 'Baseball' },
        { id: 'BMX', en: 'BMX Sport' },
        { id: 'Bowling', en: 'Bowling Sport' },
        { id: 'Bungee Jumping', en: 'Bungee Jumping' },
        { id: 'Cheerleading', en: 'Cheerleading' },
        { id: 'Golf', en: 'Golf' },
        { id: 'Hiking', en: 'Hiking' },
        { id: 'Lompat Tinggi', en: 'High Jump' },
        { id: 'Marathon', en: 'Marathon' },
        { id: 'Mendaki Gunung', en: 'Mountain Climbing' },
        { id: 'Olahraga Bermotor', en: 'Motor Sports' },
        { id: 'Panjat Tebing', en: 'Rock Climbing' },
        { id: 'Running', en: 'Running' },
        { id: 'Sepakbola', en: 'Football' },
        { id: 'Sepatu Roda', en: 'Skates' },
        { id: 'Sepeda', en: 'Bicycle Sport' },
        { id: 'Skateboarding', en: 'Skateboarding' },
        { id: 'Softball', en: 'Softball' },
        { id: 'Squash', en: 'Squash' },
        { id: 'Tenis Lapangan', en: 'Tennis Court Sport' },
        { id: 'Tenis Meja', en: 'Table Tennis Sport' },
        { id: 'Trampolining', en: 'Trampoline' },
        { id: 'Triathlon', en: 'Triathlon' },
        { id: 'Voli', en: 'Volleyball' },
        { id: 'Quad Bike Riding', en: 'Quad Bike Riding' },
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
        { id: 'Base Jumping', en: 'Base Jumping Sport' },
        { id: 'Hang Gliding atau Gantola', en: 'Hangling Sport' },
        { id: 'Paragliding', en: 'Paragliding Sport' },
        { id: 'Paramotor', en: 'Paramotor Sport' },
        { id: 'Sky Diving', en: 'Sky Diving Sport' },
        { id: 'Wingsuit Flying', en: 'Flying Wingsuit Sport' },
      ],
    },
    {
      key: 'perjalanan',
      title: trans(locale, lang, 'Perjalanan'),
      icon: (
        <Image
          source={LPFlagIcon}
          style={style.modal.protectedActivity.listItemImage3}
        />
      ),
      example: [
        { id: 'Berkendara', en: 'Driving' },
        { id: 'Naik Kendaraan Umum', en: 'Commuting' },
      ],
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
        { id: 'Arung Jeram', en: 'Rafting' },
        { id: 'Berenang', en: 'Swimming' },
        { id: 'Cliff Diving', en: 'Cliff Diving' },
        { id: 'Flyboarding', en: 'Flyboarding' },
        { id: 'Free Diving', en: 'Free Diving' },
        { id: 'Jetski', en: 'Jetski Sport' },
        { id: 'Kano', en: 'Canoe Sport' },
        { id: 'Kayak', en: 'Kayak Sport' },
        { id: 'Memancing', en: 'Fishing Sport' },
        { id: 'Parasailing', en: 'Parasailing Sport' },
        { id: 'Polo Air', en: 'Water Polo Sport' },
        { id: 'Scuba Diving', en: 'Scuba Diving Sport' },
        { id: 'Ski Air', en: 'Water Ski Sport' },
        { id: 'Snorkeling', en: 'Snorkeling' },
        { id: 'Speed Boat', en: 'Speed ​​boat' },
        { id: 'Surfing', en: 'Surf' },
        { id: 'Wind Surfing', en: 'Wind Surfing' },
      ],
      specials: <Specials />,
    },
  ];

  const [selectedListItem, setSelectedListItem] = useState(null);
  const ListItem = useCallback(
    ({ title, icon, example, identifier, specials, lang }) => {
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
                  {specials}
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
                  {item[lang]}
                </Text>
              ))}
            </View>
          )}
        </>
      );
    },
    [selectedListItem]
  );

  const LifeSaverText = useCallback(() => {
    return (
      <Text textStyle="semi" size={Size.text.body2.size}>
        Life
        <Text style={style.textBoldItalic} size={Size.text.body2.size}>
          SAVER
        </Text>
      </Text>
    );
  }, []);

  return (
    <BottomSheet
      onRequestClose={onRequestClose}
      isPadder={false}
      renderHeader={<Header />}
      isVisible={isVisible}
      swipeable={false}>
      <ScrollView style={style.modal.height}>
        <LinearGradient colors={['#FFFF', '#E9E9E9']} style={[style.p16]}>
          <Text textStyle="semi" size={Size.text.body2.size}>
            {<LifeSaverText />}
            {trans(locale, lang, 'melindungi')}
          </Text>
          <View style={style.mb16} />
          {activityList.map((item) => (
            <ListItem
              key={item.key}
              identifier={item.key}
              title={item.title}
              icon={item.icon}
              example={item.example}
              specials={item?.specials}
              lang={lang}
            />
          ))}
          <View style={style.mb60} />
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
