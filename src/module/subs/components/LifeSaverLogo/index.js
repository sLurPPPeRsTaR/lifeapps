import {
  LifeSAVERActive,
  LifeSAVERLapse,
  LifeSAVERplusActive,
  LifeSAVERplusLapse,
  LifeSaverPOS,
  LifeSAVERPOSlapse,
  LogoLifesaverPos,
} from 'ca-config/Image';
import React from 'react';
import { codeLifesaver, POLICY_STATUS } from 'ca-util/constant';
import { Image } from 'react-native';
import style from './style';

export const lifesaverLogo = {
  [POLICY_STATUS.active]: {
    [codeLifesaver.lifesaver.planName]: (
      <Image style={style.logoSize.LS02} source={LifeSAVERActive} />
    ),
    [codeLifesaver.lifesaverplus.planName]: (
      <Image style={style.logoSize.LS03} source={LifeSAVERplusActive} />
    ),
    [codeLifesaver.lifesaverpos.planName]: (
      <Image style={style.logoSize.LS01} source={LifeSaverPOS} />
    ),
    [codeLifesaver.lifesaverpos.planName2]: (
      <Image style={style.logoSize.LS01} source={LifeSaverPOS} />
    ),
  },
  [POLICY_STATUS.lapse]: {
    [codeLifesaver.lifesaver.planName]: (
      <Image style={style.logoSize.LS02} source={LifeSAVERLapse} />
    ),
    [codeLifesaver.lifesaverplus.planName]: (
      <Image style={style.logoSize.LS03} source={LifeSAVERplusLapse} />
    ),
    [codeLifesaver.lifesaverpos.planName]: (
      <Image style={style.logoSize.LS01} source={LifeSAVERPOSlapse} />
    ),
    [codeLifesaver.lifesaverpos.planName2]: (
      <Image style={style.logoSize.LS01} source={LifeSAVERPOSlapse} />
    ),
  },
  [POLICY_STATUS.terminate]: {
    [codeLifesaver.lifesaver.planName]: (
      <Image style={style.logoSize.LS02} source={LifeSAVERActive} />
    ),
    [codeLifesaver.lifesaverplus.planName]: (
      <Image style={style.logoSize.LS03} source={LifeSAVERplusActive} />
    ),
    [codeLifesaver.lifesaverpos.planName]: (
      <Image style={style.logoSize.LS01} source={LifeSaverPOS} />
    ),
    [codeLifesaver.lifesaverpos.planName2]: (
      <Image style={style.logoSize.LS01} source={LifeSaverPOS} />
    ),
  },
  [POLICY_STATUS.gracePeriod]: {
    [codeLifesaver.lifesaver.planName]: (
      <Image style={style.logoSize.LS02} source={LifeSAVERActive} />
    ),
    [codeLifesaver.lifesaverplus.planName]: (
      <Image style={style.logoSize.LS03} source={LifeSAVERplusActive} />
    ),
    [codeLifesaver.lifesaverpos.planName]: (
      <Image style={style.logoSize.LS01} source={LifeSaverPOS} />
    ),
    [codeLifesaver.lifesaverpos.planName2]: (
      <Image style={style.logoSize.LS01} source={LifeSaverPOS} />
    ),
  },
};