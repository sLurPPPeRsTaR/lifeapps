import { 
  Image, 
  View,
  TouchableWithoutFeedback
} from 'react-native';
import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  CardCustom,
  Divider
} from 'ca-module-lifecover/component';
import Text from 'ca-component-generic/Text';
import Input from 'ca-component-generic/Input';
import Button from 'ca-component-generic/Button';
import { trans } from 'ca-util/trans';
import Color from 'ca-config/Color';
import Base from 'ca-component-container/Base';
import { 
  ArrowDownGray,
  ChevronDownLS
} from 'ca-config/Svg';
import style from './style';
import locale from './locale';

function LifecoverSubscriptionForm(props) {
  const { lang } = props;
  const [penerimaManfaatList, setPenerimaManfaatList] = useState([
    {
      key: "1-penerima-manfaat",
      name: "",
      hubungan: ""
    }
  ]);
  const [isTambahPenerimaView, setIsTambahPenerimaView] = useState(true);
  const [selectedListItem, setSelectedListItem] = useState(null);

  const ListItem = useCallback(
    ({ identifier, index, name, hubungan, lang }) => {
      const showDrawer = selectedListItem === identifier;
      const onSelectedItem = () => {
        setSelectedListItem(showDrawer ? null : identifier);
      };

      return (
        <>
          <TouchableWithoutFeedback onPress={onSelectedItem}>
            <View style={style.tambahPenerimaItem}>
              <View style={style.tambahPenerimaItemContent}>
                <View>
                  <Text textStyle="semi" size={14}> Penerima Manfaat {index + 1} </Text>
                </View>
                <View>
                  <ChevronDownLS
                    width={20}
                    height={20}
                    style={showDrawer ? style.flipTrue : style.flipFalse}
                  />
                </View>
              </View>
              <Divider height={1} />
            </View>
          </TouchableWithoutFeedback>
          {showDrawer && (
            <CardCustom>
              <CardCustom.Body>
                <View style={style.mb12}>
                  <Input
                    label={trans(locale, lang, 'nama_lengkap')}
                    height={56}
                    placeholder={trans(locale, lang, 'isi_nama')}
                    value={name}
                    style={style.mb16}
                  />
                </View>
                <View style={style.mb12}>
                  <Input
                    label={trans(locale, lang, 'hubungan_dengan_tertanggung')}
                    height={56}
                    value={hubungan}
                    placeholder={trans(locale, lang, 'pilih_hubungan')}
                    suffixIcon={<ArrowDownGray />}
                    editable={false}
                    pressable
                    onInputPress={() => { }}
                  />
                </View>
                {index !== 0 && <Button 
                    onPress={() => {
                      setPenerimaManfaatList(penerimaManfaatList.filter((item) => item.key !== identifier));
                    }}>
                    Hapus Data
                  </Button>
                }
              </CardCustom.Body>
            </CardCustom>
          )}
        </>
    );
  }, [selectedListItem]);

  const tambahPenerima = () => {
    if (penerimaManfaatList.length < 5) {
      const penerima = {
        key: (penerimaManfaatList.length + 1) + '-penerima-manfaat',
        name: "",
        hubungan: ""
      };
  
      setPenerimaManfaatList([...penerimaManfaatList, penerima]);
    }
  }

  const renderDetailView = () => {
    return(
      <CardCustom>
        <CardCustom.Body style={style.penerimaManfaatBox}>
          <View style={[style.penerimaManfaatView, style.mb12]}>
            <Text textStyle="semi" color={Color.mediumGray.light.mediumGray} size={12}> Nama Lengkap </Text>
            <Text textStyle="semi" color={Color.neutral.neutral40} size={12}> Gina </Text>
          </View>
          <View style={[style.penerimaManfaatView, style.mb12]}>
            <Text textStyle="semi" color={Color.mediumGray.light.mediumGray} size={12}> Hubungan </Text>
            <Text textStyle="semi" color={Color.neutral.neutral40} size={12}> Istri </Text>
          </View>
          <View style={[style.uangPertanggunganView, style.mb12]}>
            <Input
              label={"Masukan Jumlah Uang Pertanggungan"}
              height={56}
              placeholder={"Contoh : 100.000.000"}
              style={style.mb12}
            />
          </View>
        </CardCustom.Body>
      </CardCustom>
    )
  }

  const renderTambahPenerimaView = () => {
    return(
      <>
        <Text textStyle="semi" line={18} style={style.headerTambahkan}>
          Tambahkan Penerima manfaat
        </Text>
        <Text style={style.detailTambahkan}>
          Lorem ipsum dolor sit amet consectetur. Eros scelerisque mauris velit.
        </Text>
        {penerimaManfaatList.map((item, index) => (
          <ListItem
            key={item.key}
            identifier={item.key}
            index={index}
            name={item.name}
            hubungan={item.hubungan}
            lang={lang}
          />
        ))}
        
        <View>
          <Button outline style={style.buttonTambah} onPress={() => tambahPenerima()}>
            + {trans(locale, lang, 'penerima_manfaat')}
          </Button>
          <Button 
            style={style.buttonLanjut}
            onPress={() => {}}>
            {trans(locale, lang, 'lanjut')}
          </Button>
        </View>
      </>
    )
  }

  return (
    <Base
      bordered
      onBackPress={() => navigation.pop()}
      title={trans(locale, lang, 'penerima_manfaat')}
      backgroundColor={Color.whiteBackground.light.whiteBackground}
      isPaddingBottom={false}>
      <View style={style.root}>
        {isTambahPenerimaView ? renderTambahPenerimaView() : renderDetailView()}
      </View>
    </Base>
  );
}

LifecoverSubscriptionForm.defaultProps = {
  lang: 'id',
};
LifecoverSubscriptionForm.propTypes = {
  lang: PropTypes.string
};

export default LifecoverSubscriptionForm;
