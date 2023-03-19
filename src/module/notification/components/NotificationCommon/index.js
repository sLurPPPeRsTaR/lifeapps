import React from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View } from 'react-native';
import { notifPaper } from 'ca-config/Image';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import Color from 'ca-config/Color';
import moment from 'moment';
import 'moment/locale/id';
import style from './style';

function NotificationCommon(props) {
  const { item, onPress } = props;
  return (
    <TouchableOpacity key={item?.id} onPress={onPress} disabled={!onPress}>
      <View
        key={item?.id}
        style={item?.read ? style.body.contentRead : style.body.content}>
        <Padder>
          <View style={style.body.topContent}>
            <View style={[style.flexDirectionRow, style.alignItemsCenter]}>
              <Image
                source={notifPaper}
                style={style.body.imageNotif}
                resizeMode="contain"
              />
              <Text
                textStyle="semi"
                size={Size.text.body2.size}
                color={Color.textNotif.light.color}
                style={style.body.title}>
                {item?.title}
              </Text>
            </View>
            <View style={[style.flexDirectionRow, style.alignItemsCenter]}>
              <Text
                textStyle="regular"
                size={Size.text.caption2.size}
                color={Color.textNotif.light.color}>
                {moment(item?.date).format('HH:mm - DD MMM YYYY')}
              </Text>
              <View
                style={[
                  style.body.indicator,
                  {
                    backgroundColor: item?.read
                      ? Color.transparentColor.light.transparentColor
                      : Color.primary.light.primary90,
                  },
                ]}
              />
            </View>
          </View>
          <View style={style.body.bottomContent}>
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              color={Color.blackHome.light.blackHome}>
              {item?.heading}
            </Text>
            <Text
              textStyle="medium"
              size={Size.text.body2.size}
              color={Color.textNotif.light.color}
              style={style.body.caption2}>
              {item?.content}
            </Text>
          </View>
        </Padder>
      </View>
    </TouchableOpacity>
  );
}

export default NotificationCommon;

NotificationCommon.propTypes = {
  item: PropTypes.objectOf(Object).isRequired,
  onPress: PropTypes.func.isRequired,
};
