import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Image, TouchableOpacity, View } from 'react-native';
import Color from 'ca-config/Color';
import { notifPaper, NotificationEmpty } from 'ca-config/Image';
import Padder from 'ca-component-container/Padder';
import Size from 'ca-config/Size';
import Text from 'ca-component-generic/Text';
import moment from 'moment';
import { trans } from 'ca-util/trans';
import locale from '../../screen/NotificationMain/locale';
import LifetagTransactionCard from '../LifetagTransactionCard';
import style from './style';
import {
  NOTIFICATION_TEMPLATE,
  STATUS_ALL,
  STATUS_UNPAID,
  STATUS_ON_DELIVERY,
  STATUS_ON_PROCESS,
} from '../../notificationConstant';
import NotificationCommon from '../NotificationCommon';

function NotificationTransaction(props) {
  const { data, isActiveGrouping, lang, navigate, colorScheme } = props;

  const filteringByStatus = useMemo(() => {
    if (isActiveGrouping.status !== STATUS_ALL) {
      return data?.filter((item) => item.status === isActiveGrouping.status);
    }
    return data;
  }, [data, isActiveGrouping.status]);

  function renderEmptyNotif() {
    return (
      <View>
        <Image
          source={NotificationEmpty}
          style={style.rusakIcon}
          resizeMode="contain"
        />
        <Text
          color={Color.mediumGray[colorScheme].mediumGray}
          textStyle="medium"
          size={Size.text.body2.size}
          line={21}
          letterSpacing={0.5}
          align="center"
          style={style.body.textRusak}>
          {trans(locale, lang, 'belumAdaNotifikasi')}
        </Text>
      </View>
    );
  }

  const renderStatusAll = (item) => {
    if (item.type === NOTIFICATION_TEMPLATE.LIFETAG) {
      return (
        <View>
          <LifetagTransactionCard
            {...item}
            key={item.orderId}
            lang={lang}
            onPress={() => navigate(item)}
          />
        </View>
      );
    }
    return (
      <NotificationCommon
        item={item}
        onPress={() => {
          navigate(item);
        }}
      />
    );
  };

  if (data.length === 0 || filteringByStatus?.length === 0) {
    return renderEmptyNotif();
  }

  if (isActiveGrouping.status === STATUS_ALL) {
    return data?.map((item) => {
      return renderStatusAll(item);
    });
  }

  return (
    <View>
      {filteringByStatus?.map((item) => {
        if (
          item.status === STATUS_ON_DELIVERY ||
          item.status === STATUS_ON_PROCESS
        ) {
          return (
            <View>
              <LifetagTransactionCard
                {...item}
                key={item.orderId}
                lang={lang}
                onPress={() => navigate(item)}
              />
            </View>
          );
        }
        if (isActiveGrouping.status === STATUS_UNPAID) {
          return (
            <NotificationCommon
              item={item}
              onPress={() => {
                navigate(item);
              }}
            />
          );
        }

        return <View />;
      })}
    </View>
  );
}

export default NotificationTransaction;

NotificationTransaction.propTypes = {
  data: PropTypes.objectOf(Array).isRequired,
  isActiveGrouping: PropTypes.objectOf(Object).isRequired,
  lang: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  colorScheme: PropTypes.string.isRequired,
};
