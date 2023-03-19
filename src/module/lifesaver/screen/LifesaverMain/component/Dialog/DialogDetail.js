import React, { useCallback, useState, useEffect, useMemo } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Close, LPShieldFillIconRed } from 'ca-config/Svg';
import BottomSheet from 'ca-component-container/BottomSheet';
import PropTypes from 'prop-types';
import Size from 'ca-config/Size';
import { trans } from 'ca-util/trans';
import Text from 'ca-component-generic/Text';
import LinearGradient from 'react-native-linear-gradient';
import Color from 'ca-config/Color';
import { PRODUCT } from 'ca-util/constant';
import locale from '../../locale';
import style from '../../style';

function DialogDetail({
  lang,
  isVisible,
  onClosePress,
  selectedPackage,
  onRequestClose,
  isEligiblePos,
}) {
  const {
    LIFESAVER: { LIFESAVER, LIFESAVER_PLUS, LIFESAVER_POS },
  } = PRODUCT;
  const [selectedTab, setSelectedTab] = useState(selectedPackage);

  useEffect(() => {
    setSelectedTab(selectedPackage);
  }, [selectedPackage]);

  const takeLastWord = (words) => {
    const n = words.trim().split(' ');
    return n[n.length - 1];
  };
  const removeLastWord = (words) => {
    let str = words;
    const lastIndex = str.trim().lastIndexOf(' ');

    str = str.substring(0, lastIndex);
    return str;
  };

  const tabBar = useMemo(() => {
    const tab = [
      {
        label: (
          <Text
            textStyle="semi"
            size={Size.text.body1.size}
            color={
              selectedTab === LIFESAVER
                ? Color.red.light.red90
                : Color.neutral.light.neutral40
            }>
            Life
            <Text
              textStyle="semiItalic"
              size={Size.text.body1.size}
              color={
                selectedTab === LIFESAVER
                  ? Color.red.light.red90
                  : Color.neutral.light.neutral40
              }>
              SAVER
            </Text>
          </Text>
        ),
        value: LIFESAVER,
      },
      {
        label: (
          <Text
            textStyle="semi"
            size={Size.text.body1.size}
            color={
              selectedTab === LIFESAVER_PLUS
                ? Color.red.light.red90
                : Color.neutral.light.neutral40
            }>
            Life
            <Text
              textStyle="semiItalic"
              size={Size.text.body1.size}
              color={
                selectedTab === LIFESAVER_PLUS
                  ? Color.red.light.red90
                  : Color.neutral.light.neutral40
              }>
              SAVER+
            </Text>
          </Text>
        ),
        value: LIFESAVER_PLUS,
      },
    ];

    if (isEligiblePos) {
      tab.unshift({
        label: (
          <Text
            textStyle="semi"
            size={Size.text.body1.size}
            color={
              selectedTab === LIFESAVER_POS
                ? Color.red.light.red90
                : Color.neutral.light.neutral40
            }>
            Life
            <Text
              textStyle="semiItalic"
              size={Size.text.body1.size}
              color={
                selectedTab === LIFESAVER_POS
                  ? Color.red.light.red90
                  : Color.neutral.light.neutral40
              }>
              SAVER
            </Text>{' '}
            POS
          </Text>
        ),
        value: LIFESAVER_POS,
      });
    }

    return tab;
  }, [LIFESAVER, LIFESAVER_POS, LIFESAVER_PLUS, isEligiblePos, selectedTab]);

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
              {trans(locale, lang, 'Detail')}
            </Text>
          </View>
          <View style={style.w30} />
        </View>
        <View style={style.divider} />
        <View style={style.modal.dialogDetail.container}>
          {tabBar?.map((element) => (
            <TouchableOpacity
              key={element?.value}
              onPress={() => setSelectedTab(element?.value)}
              style={
                selectedTab === element?.value
                  ? style.modal.dialogDetail.tabContainerOn
                  : style.modal.dialogDetail.tabContainerOff
              }>
              {element?.label}
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  }, [lang, onClosePress, selectedTab, tabBar]);

  // LifeSAVER package datas
  const lifeSaverData = {
    id: [
      {
        id: 1,
        name: 'Total Medical Limit Cashless',
        value: 'Rp200.000.000,-',
        per: '/kejadian',
      },
      {
        id: 2,
        name: 'Total Medical Limit Reimburse',
        value: 'Rp200.000.000,-',
        per: '/kejadian',
        desc: 'Dengan inner limit* sebagai berikut:',
        detail: [
          { id: '2a', name: 'Patah Tulang', value: 'Rp40.000.000,-' },
          { id: '2b', name: 'Rekonstruksi Wajah', value: 'Rp70.000.000,-' },
          { id: '2c', name: 'Cedera Kepala Berat', value: 'Rp50.000.000,-' },
          { id: '2d', name: 'Cedera Mata', value: 'Rp20.000.000,-' },
          {
            id: '2e',
            name: 'Cedera Mulut dan Gigi',
            value: 'Rp20.000.000,-',
          },
          {
            id: '2f',
            name: 'Rawat Inap',
            value: 'Rp15.000.000,-',
            desc: 'Maks: Kamar termurah untuk 1 orang.',
          },
          {
            id: '2g',
            name: 'Rawat Jalan',
            value: 'Rp5.000.000,-',
          },
        ],
      },
      {
        id: 3,
        name: 'Meninggal Dunia/Cacat Tetap',
        value: 'Rp20.000.000,-',
      },
      {
        id: 5,
        addition: {
          name: 'Manfaat Tambahan Selama Masa Promosi:',
          values: [
            {
              id: 1,
              name: 'Fisioterapi (Cashless)',
              value: 'Rp10.000.000,-',
              promo: true,
            },
            {
              id: 2,
              name: 'Perawatan Medis Akibat Cedera Olahraga',
              promo: true,
              value: 'Rp20.000.000,-',
            },
            {
              id: 3,
              name: 'Layanan transportasi medis menggunakan Ambulans',
              promo: true,
            },
          ],
        },
      },
    ],
    en: [
      {
        id: 1,
        name: 'Total Medical Limit Cashless',
        value: 'IDR 200.000.000,-',
        per: '/accident',
      },
      {
        id: 2,
        name: 'Total Medical Limit Reimbursement',
        value: 'IDR 200.000.000,-',
        per: '/accident',
        desc: 'With inner limit* as following:',
        detail: [
          { id: '2a', name: 'Fracture ', value: 'IDR 40.000.000,-' },
          { id: '2b', name: 'Face Construction', value: 'IDR 70.000.000,-' },
          { id: '2c', name: 'Severe Head Injury', value: 'IDR 50.000.000,-' },
          { id: '2d', name: 'Eye Injury', value: 'IDR 20.000.000,-' },
          { id: '2e', name: 'Mouth and Teeth', value: 'IDR 20.000.000,-' },
          {
            id: '2f',
            name: 'Hospitalization ',
            value: 'IDR 15.000.000,-',
            desc: 'Max : Cheapest room for 1 person.',
          },
          {
            id: '2g',
            name: 'Outpatient ',
            value: 'IDR 5.000.000,-',
          },
        ],
      },
      {
        id: 3,
        name: 'Death/Permanent Disability',
        value: 'IDR 20.000.000,-',
      },
      {
        id: 5,
        addition: {
          name: 'Additional Benefits During Promotion Period:',
          values: [
            {
              id: 1,
              name: 'Physiotherapy (Cashless)',
              value: 'IDR 10.000.000,-',
              promo: true,
            },
            {
              id: 2,
              name: 'Medical treatment due to sports injuries',
              promo: true,
              value: 'IDR 20.000.000,-',
            },
            {
              id: 3,
              name: 'Medical transportation service using Ambulance',
              promo: true,
            },
          ],
        },
      },
    ],
  };

  const lifeSaverPlusData = {
    id: [
      {
        id: 1,
        name: 'Total Medical Limit Cashless',
        value: 'Rp400.000.000,-',
        per: '/kejadian',
      },
      {
        id: 2,
        name: 'Total Medical Limit Reimburse',
        value: 'Rp400.000.000,-',
        per: '/kejadian',
        desc: 'Dengan inner limit* sebagai berikut:',
        detail: [
          { id: '2a', name: 'Patah Tulang', value: 'Rp100.000.000,-' },
          { id: '2b', name: 'Rekonstruksi Wajah', value: 'Rp150.000.000,-' },
          { id: '2c', name: 'Cedera Kepala Berat', value: 'Rp100.000.000,-' },
          { id: '2d', name: 'Cedera Mata', value: 'Rp25.000.000,-' },
          {
            id: '2e',
            name: 'Cedera Mulut dan Gigi',
            value: 'Rp25.000.000,-',
          },
          {
            id: '2f',
            name: 'Rawat Inap',
            value: 'Rp30.000.000,-',
            desc: 'Maks: Kamar termurah untuk 1 orang.',
          },
          {
            id: '2g',
            name: 'Rawat Jalan',
            value: 'Rp10.000.000,-',
          },
          {
            id: '2h',
            name: 'Aktivitas Olahraga Air',
            value: 'Rp65.000.000,-',
          },
        ],
      },
      {
        id: 3,
        name: 'Meninggal Dunia/Cacat Tetap',
        value: 'Rp40.000.000,-',
      },
      {
        id: 5,
        addition: {
          name: 'Manfaat Tambahan Selama Masa Promosi:',
          values: [
            {
              id: 1,
              name: 'Fisioterapi (Cashless)',
              value: 'Rp10.000.000,-',
              promo: true,
            },
            {
              id: 2,
              name: 'Perawatan Medis Akibat Cedera Olahraga',
              promo: true,
              value: 'Rp20.000.000,-',
            },
            {
              id: 3,
              name: 'Layanan transportasi medis menggunakan Ambulans',
              promo: true,
            },
          ],
        },
      },
    ],
    en: [
      {
        id: 1,
        name: 'Total Medical Limit Cashless',
        value: 'IDR 400.000.000,-',
        per: '/event',
      },
      {
        id: 2,
        name: 'Total Medical Limit Reimbursement',
        value: 'IDR 400.000.000,-',
        per: '/event',
        desc: 'With inner limit* as follows:',
        detail: [
          { id: '2a', name: 'Fracture ', value: 'IDR 100.000.000,-' },
          { id: '2b', name: 'Face Construction', value: 'IDR 150.000.000,-' },
          {
            id: '2c',
            name: 'Severe Head Injury',
            value: 'IDR 100.000.000,-',
          },
          { id: '2d', name: 'Eye Injury', value: 'IDR 25.000.000,-' },
          {
            id: '2e',
            name: 'Injury to the Mouth and Teeth',
            value: 'IDR 25.000.000,-',
          },
          {
            id: '2f',
            name: 'Hospitalization ',
            value: 'IDR 30.000.000,-',
            desc: 'Max : Cheapest room for 1 person.',
          },
          {
            id: '2g',
            name: 'Outpatient ',
            value: 'IDR 10.000.000,-',
          },
          {
            id: '2h',
            name: 'Water Sports Activities',
            value: 'IDR 65.000.000,-',
          },
        ],
      },
      {
        id: 3,
        name: 'Death/Permanent Disability',
        value: 'IDR 40.000.000,-',
      },
      {
        id: 5,
        addition: {
          name: 'Additional Benefits During Promotion Period:',
          values: [
            {
              id: 1,
              name: 'Physiotherapy (Cashless)',
              value: 'IDR 10.000.000,-',
              promo: true,
            },
            {
              id: 2,
              name: 'Medical treatment due to sports injuries',
              promo: true,
              value: 'IDR 20.000.000,-',
            },
            {
              id: 3,
              name: 'Medical transportation service using Ambulance',
              promo: true,
            },
          ],
        },
      },
    ],
  };

  const lifeSaverPOSData = {
    id: [
      {
        id: 1,
        name: 'Total Medical Limit Cashless',
        value: 'Rp100.000.000,-',
        per: '/kejadian',
      },
      {
        id: 2,
        name: 'Total Medical Limit Reimburse',
        value: 'Rp100.000.000,-',
        per: '/kejadian',
        desc: 'Dengan inner limit* sebagai berikut:',
        detail: [
          { id: '2a', name: 'Patah Tulang', value: 'Rp20.000.000,-' },
          { id: '2b', name: 'Rekonstruksi Wajah', value: 'Rp35.000.000,-' },
          { id: '2c', name: 'Cedera Kepala Berat', value: 'Rp25.000.000,-' },
          { id: '2d', name: 'Cedera Mata', value: 'Rp10.000.000,-' },
          {
            id: '2e',
            name: 'Cedera Mulut dan Gigi',
            value: 'Rp10.000.000,-',
          },
          {
            id: '2f',
            name: 'Rawat Inap',
            value: 'Rp10.000.000,-',
            desc: 'Maks: Kamar termurah untuk 1 orang.',
          },
          {
            id: '2g',
            name: 'Rawat Jalan',
            value: 'Rp5.000.000,-',
          },
        ],
      },
      {
        id: 3,
        name: 'Meninggal Dunia/Cacat Tetap',
        value: 'Rp15.000.000,-',
      },
      {
        id: 5,
        addition: {
          name: 'Manfaat Tambahan Selama Masa Promosi:',
          values: [
            {
              id: 1,
              name: 'Fisioterapi (Cashless)',
              value: 'Rp7.500.000,-',
              promo: true,
            },
            {
              id: 2,
              name: 'Perawatan Medis Akibat Cedera Olahraga',
              promo: true,
              value: 'Rp12.500.000,-',
            },
            {
              id: 3,
              name: 'Layanan transportasi medis menggunakan Ambulans',
              promo: true,
            },
          ],
        },
      },
    ],
    en: [
      {
        id: 1,
        name: 'Total Medical Limit Cashless',
        value: 'IDR 100.000.000,-',
        per: '/accident',
      },
      {
        id: 2,
        name: 'Total Medical Limit Reimbursement',
        value: 'IDR 100.000.000,-',
        per: '/accident',
        desc: 'With inner limit* as following:',
        detail: [
          { id: '2a', name: 'Fracture ', value: 'IDR 20.000.000,-' },
          { id: '2b', name: 'Face Construction', value: 'IDR 35.000.000,-' },
          { id: '2c', name: 'Severe Head Injury', value: 'IDR 25.000.000,-' },
          { id: '2d', name: 'Eye Injury', value: 'IDR 10.000.000,-' },
          { id: '2e', name: 'Mouth and Teeth', value: 'IDR 10.000.000,-' },
          {
            id: '2f',
            name: 'Hospitalization ',
            value: 'IDR 10.000.000,-',
            desc: 'Max : Cheapest room for 1 person.',
          },
          {
            id: '2g',
            name: 'Outpatient ',
            value: 'IDR 5.000.000,-',
          },
        ],
      },
      {
        id: 3,
        name: 'Death/Permanent Disability',
        value: 'IDR 15.000.000,-',
      },
      {
        id: 5,
        addition: {
          name: 'Additional Benefits During Promotion Period:',
          values: [
            {
              id: 1,
              name: 'Physiotherapy (Cashless)',
              value: 'IDR 7.500.000,-',
              promo: true,
            },
            {
              id: 2,
              name: 'Medical treatment due to sports injuries',
              promo: true,
              value: 'IDR 12.500.000,-',
            },
            {
              id: 3,
              name: 'Medical transportation service using Ambulance',
              promo: true,
            },
          ],
        },
      },
    ],
  };

  function renderBenefitsTable(data) {
    return (
      <View>
        {data[lang].map((item) => (
          <View key={item.id}>
            {!item?.addition && (
              <View style={[style.mb10]}>
                <View style={style.flexRow}>
                  <View style={style.shieldIcon}>
                    <LPShieldFillIconRed />
                  </View>
                  <View>
                    <Text
                      line={22}
                      textStyle="medium"
                      size={Size.text.body2.size}
                      color={Color.neutral.light.neutral60}>
                      {item.name}{' '}
                      {item.promo && (
                        <View style={style.modal.dialogDetail.promo}>
                          <Text
                            size={Size.text.caption2.size}
                            color={Color.main.light.white}>
                            Promo
                          </Text>
                        </View>
                      )}
                    </Text>
                    <Text
                      line={22}
                      textStyle="medium"
                      size={Size.text.body2.size}
                      color={Color.neutral.light.neutral60}>
                      <Text
                        textStyle="semi"
                        size={Size.text.body2.size}
                        color={Color.primary.light.primary90}>
                        {item.value}
                      </Text>
                      {item.per}
                    </Text>
                  </View>
                </View>
                <View style={style.ml25}>
                  {item?.desc && (
                    <Text
                      line={30}
                      textStyle="medium"
                      size={Size.text.body2.size}
                      color={Color.neutral.light.neutral60}>
                      {item.desc}
                    </Text>
                  )}
                </View>
                {item?.detail?.map((detail) => (
                  <View key={detail.id} style={[style.ml35, style.mb7]}>
                    <Text
                      line={22}
                      textStyle="medium"
                      size={Size.text.body2.size}
                      color={Color.neutral.light.neutral60}>
                      {detail.name}
                    </Text>
                    <Text
                      line={22}
                      textStyle="semi"
                      size={Size.text.body2.size}
                      color={Color.primary.light.primary90}>
                      {detail.value}
                    </Text>
                    {detail?.desc && (
                      <Text
                        line={22}
                        fontStyle="italic"
                        size={Size.text.caption1.size}
                        color={Color.primary.light.primary90}>
                        {detail.desc}
                      </Text>
                    )}
                  </View>
                ))}
              </View>
            )}
            {item?.addition && (
              <View>
                <Text
                  line={30}
                  textStyle="medium"
                  size={Size.text.body2.size}
                  color={Color.neutral.light.neutral60}>
                  {item.addition.name}
                </Text>
                <View style={style.pr10}>
                  {item.addition.values.map((additionDetail) => (
                    <View style={style.flexRow}>
                      <View style={style.shieldIcon2}>
                        <LPShieldFillIconRed />
                      </View>
                      <View style={style.mx10}>
                        <View style={style.modal.dialogDetail.textLabel}>
                          <Text
                            line={22}
                            textStyle="medium"
                            size={Size.text.body2.size}
                            color={Color.neutral.light.neutral60}>
                            {removeLastWord(additionDetail.name)}{' '}
                          </Text>
                          {additionDetail?.promo && (
                            <View style={style.modal.dialogDetail.textPromo}>
                              <Text
                                textStyle="medium"
                                size={Size.text.body2.size}>
                                {takeLastWord(additionDetail.name)}{' '}
                              </Text>
                              <View style={style.modal.dialogDetail.promo}>
                                <Text
                                  textStyle="medium"
                                  size={Size.text.caption2.size}
                                  color={Color.main.light.white}>
                                  Promo
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>

                        <Text
                          line={22}
                          textStyle="medium"
                          size={Size.text.body2.size}
                          color={Color.neutral.light.neutral60}>
                          <Text
                            textStyle="semi"
                            size={Size.text.body2.size}
                            color={Color.primary.light.primary90}>
                            {additionDetail.value}
                          </Text>
                          {additionDetail.per}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        ))}
      </View>
    );
  }

  function renderActiveTab() {
    if (selectedTab === LIFESAVER_POS) {
      return renderBenefitsTable(lifeSaverPOSData);
    }

    if (selectedTab === LIFESAVER) {
      return renderBenefitsTable(lifeSaverData);
    }

    if (selectedTab === LIFESAVER_PLUS) {
      return renderBenefitsTable(lifeSaverPlusData);
    }

    return null;
  }

  return (
    <BottomSheet
      isPadder={false}
      renderHeader={<Header />}
      isVisible={isVisible}
      swipeable={false}
      onRequestClose={onRequestClose}>
      <ScrollView style={style.modal.height}>
        <LinearGradient colors={['#FFFF', '#E9E9E9']} style={[style.p16]}>
          {renderActiveTab()}
          <View style={[style.mv10, style.center]}>
            <Text line={22} fontStyle="italic" size={Size.text.body2.size}>
              <Text
                line={22}
                fontStyle="italic"
                size={Size.text.body2.size}
                color={Color.primary.light.primary60}>
                {trans(locale, lang, '*Inner limit :  ')}
              </Text>
              {trans(locale, lang, 'batasan2')}
            </Text>
          </View>
        </LinearGradient>
      </ScrollView>
    </BottomSheet>
  );
}

export default DialogDetail;

DialogDetail.defaultProps = {
  isVisible: false,
};

DialogDetail.propTypes = {
  lang: PropTypes.string.isRequired,
  selectedPackage: PropTypes.string.isRequired,
  isVisible: PropTypes.bool,
  onClosePress: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  isEligiblePos: PropTypes.bool.isRequired,
};
