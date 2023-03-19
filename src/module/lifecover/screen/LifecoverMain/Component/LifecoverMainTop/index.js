import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import {
  LifecoverDecorationLandingMainTop,
  LifecoverImgLanding1,
  LifecoverImgLanding2,
  LifecoverDecorationBenefit,
  LifecoverDecorationBenefit2,
  CarCrash,
  Hospital,
} from 'ca-config/Image';
import Padder from 'ca-component-container/Padder';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import Size from 'ca-config/Size';
import { ListAccordionCustom } from 'ca-module-lifecover/component';
import { trans } from 'ca-util/trans';
import style from './style';
import locale from '../../locale';

const benefitList = [
  {
    key: 'meninggalBukanKecelakaan',
    title: {
      id: 'Meninggal Dunia bukan akibat kecelakaan',
      en: 'Pass away not in an accident',
    },
    icon: <Image source={Hospital} style={style.benefitList.listItemImage} />,
    values: [
      {
        id: (
          <View style={style.benefitList.listItemTextContainer}>
            <Text textStyle="semi" style={style.benefitList.listItemText}>
              Apabila Tertanggung meninggal dunia bukan akibat kecelakaan dalam
              masa asuransi, maka Penanggung akan membayarkan manfaat asuransi
              dengan ketentuan sebagai berikut :
            </Text>
          </View>
        ),
        en: (
          <View style={style.benefitList.listItemTextContainer}>
            <Text textStyle="semi" style={style.benefitList.listItemText}>
              If the insured dies not as a result of an internal accident period
              of insurance, then the Insurer will pay the insurance benefits
              with the following conditions :
            </Text>
          </View>
        ),
      },
      {
        id: (
          <View style={style.benefitList.listItemTextContainer}>
            <Text textStyle="semi" style={style.benefitList.listItemNumber}>
              1.
            </Text>
            <Text textStyle="medium" style={style.benefitList.listItemText}>
              Jika Tertanggung meninggal dunia bukan akibat kecelakaan di tahun
              pertama polis, maka Penanggung akan membayarkan manfaat asuransi
              sebesar 100% dari premi yang telah dibayarkan pada tahun pertama
              polis dan selanjutnya asuransi berakhir.
            </Text>
          </View>
        ),
        en: (
          <View style={style.benefitList.listItemTextContainer}>
            <Text textStyle="semi" style={style.benefitList.listItemNumber}>
              1.
            </Text>
            <Text textStyle="medium" style={style.benefitList.listItemText}>
              If the insured dies not as a result of an accident in first
              policy, then the Insurer will pay the insurance benefits 100% of
              the premium paid in the first year policy and then the insurance
              ends.
            </Text>
          </View>
        ),
      },
      {
        id: (
          <View style={style.benefitList.listItemTextContainer}>
            <Text textStyle="semi" style={style.benefitList.listItemNumber}>
              2.
            </Text>
            <Text textStyle="medium" style={style.benefitList.listItemText}>
              Jika Tertanggung meninggal dunia bukan akibat kecelakaan di tahun
              kedua dan tahun selanjutnya Polis, maka Penanggung akan
              membayarkan manfaat asuransi sebesar 100% dari Uang Pertanggungan
              dan selanjutnya asuransi berakhir.
            </Text>
          </View>
        ),
        en: (
          <View style={style.benefitList.listItemTextContainer}>
            <Text textStyle="semi" style={style.benefitList.listItemNumber}>
              2.
            </Text>
            <Text textStyle="medium" style={style.benefitList.listItemText}>
              If the insured dies not as a result of an accident in second and
              following year of the Policy, then the Insurer will pay insurance
              benefits of 100% of the Sum Assured and then the insurance ends.
            </Text>
          </View>
        ),
      },
    ],
  },
  {
    key: 'meninggalKecelakaan',
    title: {
      id: 'Meninggal Dunia Akibat Kecelakaan',
      en: 'Pass away in an accident',
    },
    icon: <Image source={CarCrash} style={style.benefitList.listItemImage} />,
    values: [
      {
        id: (
          <View style={style.benefitList.listItemTextContainer}>
            <Text textStyle="semi" style={style.benefitList.listItemText}>
              Apabila Tertanggung meninggal dunia akibat kecelakaan yang terjadi
              seketika atau dalam waktu 90 (sembilan puluh) hari sejak
              terjadinya kecelakaan dalam Masa Asuransi maka Penanggung
              membayarkan manfaat asuransi sebesar 100% Uang Pertanggungan dan
              selanjutnya asuransi berakhir.
            </Text>
          </View>
        ),
        en: (
          <View style={style.benefitList.listItemTextContainer}>
            <Text textStyle="semi" style={style.benefitList.listItemText}>
              If the insured dies as a result of an accident immediately or
              within 90 (ninety) days after the occurrence of an accident during
              the Insurance Period then the Insurer pay insurance benefits of
              100% of the Sum Assured and then the insurance ends.
            </Text>
          </View>
        ),
      },
    ],
  },
];

function LifecoverMainTop({ lang }) {
  // RENDERER
  const renderHeader = () => {
    return (
      <View style={style.header.container}>
        <Image
          source={LifecoverDecorationLandingMainTop}
          style={style.header.decoration}
        />
        <Padder style={style.header.padder}>
          {trans(locale, lang, 'headerTitle')}
          {trans(locale, lang, 'headerSubtitle')}
        </Padder>
      </View>
    );
  };
  const renderBenefit = () => {
    return (
      <View style={style.sectionBenefit.container}>
        <View style={style.sectionBenefit.contentContainer}>
          <View style={style.sectionBenefit.imageLandingContainer1}>
            <Image
              source={LifecoverImgLanding1}
              style={style.sectionBenefit.imageLanding1}
            />
          </View>

          <View style={style.sectionBenefit.textContainer}>
            <Image
              source={LifecoverDecorationBenefit}
              style={style.sectionBenefit.imageDecoration1}
            />
            <Padder>
              {trans(locale, lang, 'benefitTitle')}
              {trans(locale, lang, 'benefitSubtitle')}
            </Padder>
          </View>
        </View>

        <View style={style.sectionBenefit.contentContainer2}>
          <View style={style.sectionBenefit.imageLandingContainer2}>
            <Image
              source={LifecoverImgLanding2}
              style={style.sectionBenefit.imageLanding2}
            />
          </View>

          <View style={style.sectionBenefit.imageDecorationContainer2}>
            <Image
              source={LifecoverDecorationBenefit2}
              style={style.sectionBenefit.imageDecoration2}
            />
          </View>

          <View style={style.sectionBenefit.benefitListContainer}>
            <Text
              textStyle="semi"
              align="center"
              size={Size.text.body1.size}
              color={Color.neutral.dark.neutral80}
              style={style.benefitList.title}>
              {trans(locale, lang, 'manfaat')}
            </Text>
            <Padder style={style.benefitList.padder}>
              {benefitList.map((item) => (
                <ListAccordionCustom
                  key={item.key}
                  identifier={item.key}
                  title={item.title[lang]}
                  icon={item.icon}
                  lang={lang}>
                  {item.values.map((value) => value[lang])}
                </ListAccordionCustom>
              ))}
            </Padder>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={style.root.container}>
      {renderHeader()}
      {renderBenefit()}
    </View>
  );
}

LifecoverMainTop.defaultProps = {
  lang: 'id',
};
LifecoverMainTop.propTypes = {
  lang: PropTypes.string,
};

export default LifecoverMainTop;
