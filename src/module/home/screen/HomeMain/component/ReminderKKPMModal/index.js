import React from 'react';
import PropTypes from 'prop-types';
import BottomSheet from 'ca-component-container/BottomSheet';
import { Image, View } from 'react-native';
import { PengkinianNewNewBanget } from 'ca-config/Image';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import moment from 'moment';
import 'moment/locale/id';
import Button from 'ca-component-generic/Button';
import locale from './locale';
import style from './style';

function TextModalContent(props) {
  const { lang, flag, flag2, policyName, policyName2 } = props;

  moment.locale(lang);
  const defaultTextFormat = {
    textStyle: 'medium',
    size: Size.text.body2.size,
    color: Color.mediumGray.light.mediumGray,
  };

  if (!flag2 && flag?.isIssuedPolicy && flag?.issuedPolicyLastDate === null) {
    return (
      <Text {...defaultTextFormat} line={21} align="center">
        {trans(locale, lang, 'kamuBelumPernahMelakukan')} {policyName}
        {trans(locale, lang, 'agarManfaatKamuTetap')}
      </Text>
    );
  }

  if (!flag2 && flag?.isIssuedPolicy && flag?.issuedPolicyLastDate !== null) {
    return (
      <Text {...defaultTextFormat} line={21} align="center">
        {trans(locale, lang, 'kamuTerakhirMelakukan')}
        {policyName}
        {trans(locale, lang, 'tanggal')}
        <Text textStyle="bold" color={Color.mediumGray.light.mediumGray}>
          {moment(flag?.issuedPolicyLastDate).format('DD MMMM YYYY')}
        </Text>{' '}
        {trans(locale, lang, 'agarManfaatKamu')}
      </Text>
    );
  }

  if (
    flag2 &&
    flag?.issuedPolicyLastDate !== null &&
    flag2?.issuedPolicyLastDate !== null
  ) {
    const tanggal = trans(locale, lang, 'tanggal');
    const list1 = ` - ${policyName}${tanggal}${moment(
      flag?.issuedPolicyLastDate
    ).format('DD MMMM YYYY')}\n`;
    const list2 = ` - ${policyName2}${tanggal}${moment(
      flag2?.issuedPolicyLastDate
    ).format('DD MMMM YYYY')}`;
    return (
      <View>
        <Text {...defaultTextFormat} line={21} style={style.mb6}>
          {trans(locale, lang, 'kamuTerakhirMelakukanKonfirmasi')}
        </Text>
        <Text {...defaultTextFormat} line={21} style={style.mb6}>
          {list1}
          {list2}
        </Text>
        <Text {...defaultTextFormat} line={21}>
          {trans(locale, lang, 'agarManfaatKamu')}
        </Text>
      </View>
    );
  }

  if (
    flag2 &&
    flag?.issuedPolicyLastDate === null &&
    flag2.issuedPolicyLastDate === null
  ) {
    const list1 = ` - ${policyName}\n`;
    const list2 = ` - ${policyName2}`;
    return (
      <View>
        <Text {...defaultTextFormat} line={21} style={style.mb6}>
          {trans(locale, lang, 'kamuBelumPernahMelakukan')}
          {':'}
        </Text>
        <Text {...defaultTextFormat} line={21} style={style.mb6}>
          {list1}
          {list2}
        </Text>
        <Text {...defaultTextFormat} line={21}>
          {trans(locale, lang, 'agarManfaatKamu')}
        </Text>
      </View>
    );
  }

  if (flag2) {
    // Kamu terakhir melakukan Konfirmasi Keabsahan Penerima Manfaat pada polis:
    // - IFG Anuitas Prima tanggal 10 Oktober 2021
    // Agar manfaatmu tetap berlanjut, segera konfirmasi Keabsahan Penerima Manfaat
    // Kamu belum pernah melakukan Konfirmasi Keabsahan Penerima Manfaat pada polis:
    // - IFG Anuitas
    // Agar manfaatmu tetap berlanjut, segera konfirmasi Keabsahan Penerima Manfaat
    const tanggal =
      flag.issuedPolicyLastDate !== null
        ? `${trans(locale, lang, 'tanggal')}${moment(
            flag?.issuedPolicyLastDate
          ).format('DD MMMM YYYY')}`
        : '';
    const tanggal2 =
      flag2.issuedPolicyLastDate !== null
        ? `${trans(locale, lang, 'tanggal')}${moment(
            flag2?.issuedPolicyLastDate
          ).format('DD MMMM YYYY')}`
        : '';
    const title =
      flag?.issuedPolicyLastDate !== null
        ? trans(locale, lang, 'kamuTerakhirMelakukanKonfirmasi')
        : `${trans(locale, lang, 'kamuBelumPernahMelakukan')}:`;
    const title2 =
      flag2?.issuedPolicyLastDate !== null
        ? trans(locale, lang, 'kamuTerakhirMelakukanKonfirmasi')
        : `${trans(locale, lang, 'kamuBelumPernahMelakukan')}:`;
    const list = ` - ${policyName}${tanggal}`;
    const list2 = ` - ${policyName2}${tanggal2}`;

    return (
      <View>
        <Text {...defaultTextFormat} line={21} style={style.mb6}>
          {title}
        </Text>
        <Text {...defaultTextFormat} line={21} style={style.mb12}>
          {list}
        </Text>
        <Text {...defaultTextFormat} line={21} style={style.mb6}>
          {title2}
        </Text>
        <Text {...defaultTextFormat} line={21} style={style.mb12}>
          {list2}
        </Text>
        <Text {...defaultTextFormat} line={21}>
          {trans(locale, lang, 'agarManfaatKamu')}
        </Text>
      </View>
    );
  }

  return null;
}

function ReminderKKPMModal(props) {
  const {
    lang,
    _state,
    isUpdataReminderModal,
    isUpdataModalAlreadyShowed,
    anuitasPrimaFlag,
    anuitasRetailFlag,
    onSkipPress,
    onAnuitasPrimaPress,
    onAnuitasRetailPress,
  } = props;

  return (
    <BottomSheet
      isVisible={isUpdataReminderModal && !isUpdataModalAlreadyShowed}
      onClosePress={onSkipPress}
      onRequestClose={onSkipPress}
      swipeable={false}>
      <View style={style.modal.updataReminder.iconContainer}>
        <Image
          source={PengkinianNewNewBanget}
          style={style.modal.updataReminder.icon}
        />
      </View>
      <View style={style.mt65}>
        <Text
          textStyle="bold"
          size={Size.text.h6.size}
          line={30.6}
          align="center"
          style={style.modal.updataReminder.title}>
          {trans(locale, lang, 'konfirmasiKeabsahanPenerimaManfaat')}
        </Text>

        {anuitasPrimaFlag?.isIssuedPolicy &&
          !anuitasRetailFlag?.isIssuedPolicy && (
            <TextModalContent
              lang={lang}
              flag={anuitasPrimaFlag}
              policyName={_state[anuitasPrimaFlag?.policyType].policyName}
            />
          )}
        {!anuitasPrimaFlag?.isIssuedPolicy &&
          anuitasRetailFlag?.isIssuedPolicy && (
            <TextModalContent
              lang={lang}
              flag={anuitasRetailFlag}
              policyName={_state[anuitasRetailFlag?.policyType].policyName}
            />
          )}
        {anuitasPrimaFlag?.isIssuedPolicy &&
          anuitasRetailFlag?.isIssuedPolicy && (
            <TextModalContent
              lang={lang}
              flag={anuitasPrimaFlag}
              flag2={anuitasRetailFlag}
              policyName={_state[anuitasPrimaFlag?.policyType].policyName}
              policyName2={_state[anuitasRetailFlag?.policyType].policyName}
            />
          )}

        <Button
          outline
          style={[style.modal.updataReminder.button1, style.mt24]}
          onPress={onSkipPress}>
          {trans(locale, lang, 'lewatiPengkinian')}
        </Button>
        {anuitasPrimaFlag?.isIssuedPolicy && (
          <View style={style.modal.updataReminder.button1}>
            <Button type="linear-gradient" onPress={onAnuitasPrimaPress}>
              {trans(locale, lang, 'mulaiKonfirmasiKeabsahan')}{' '}
              {_state[anuitasPrimaFlag?.policyType].policyName}
            </Button>
          </View>
        )}
        {anuitasRetailFlag?.isIssuedPolicy && (
          <View style={style.modal.updataReminder.button1}>
            <Button type="linear-gradient" onPress={onAnuitasRetailPress}>
              {trans(locale, lang, 'mulaiKonfirmasiKeabsahan')}{' '}
              {_state[anuitasRetailFlag?.policyType].policyName}
            </Button>
          </View>
        )}
      </View>
    </BottomSheet>
  );
}

export default ReminderKKPMModal;

ReminderKKPMModal.propTypes = {
  lang: PropTypes.string.isRequired,
  _state: PropTypes.objectOf(Object).isRequired,
  isUpdataReminderModal: PropTypes.bool.isRequired,
  isUpdataModalAlreadyShowed: PropTypes.bool.isRequired,
  anuitasPrimaFlag: PropTypes.objectOf(Object).isRequired,
  anuitasRetailFlag: PropTypes.objectOf(Object).isRequired,
  onSkipPress: PropTypes.func.isRequired,
  onAnuitasPrimaPress: PropTypes.func.isRequired,
  onAnuitasRetailPress: PropTypes.func.isRequired,
};

TextModalContent.defaultProps = {
  flag2: null,
  policyName2: '',
};

TextModalContent.propTypes = {
  lang: PropTypes.string.isRequired,
  flag: PropTypes.objectOf(Object).isRequired,
  policyName: PropTypes.string.isRequired,
  flag2: PropTypes.objectOf(Object),
  policyName2: PropTypes.string,
};
