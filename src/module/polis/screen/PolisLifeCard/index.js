import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  getLifetagListOrder,
  getLifetagFlag,
  getLifetagLinkedList,
  getLifetagCurrentSetting,
} from 'ca-module-lifetag/lifetagAction';
import { getSubscriptions } from 'ca-module-subs/subsAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  width: state.bootstrap.dimensions.width,
  height: state.bootstrap.dimensions.height,
  lifetagAction: state.lifetag.action,
  lifesaverAction: state.lifesaver.action,
  getLifetagListOrderFailed: state.lifetag.getLifetagListOrderFailed,
  getLifetagListOrderResponse: state.lifetag.getLifetagListOrderResponse,
  getLifetagFlagResponse: state.lifetag.getLifetagFlagResponse,
  getLifetagLinkedListResponse: state.lifetag.getLifetagLinkedListResponse,
  getLifetagCurrentSettingResponse:
    state.lifetag.getLifetagCurrentSettingResponse,
  getSubscriptionsResponse: state.subs.getSubscriptionsResponse,
});

const mapDispatchToProps = {
  setLoading: (payload) => setLoading(payload),
  getLifetagListOrder: () => getLifetagListOrder(),
  getLifetagFlag: () => getLifetagFlag(),
  getLifetagLinkedList: () => getLifetagLinkedList(),
  getLifetagCurrentSetting: (payload) => getLifetagCurrentSetting(payload),
  getSubscriptions: (payload) => getSubscriptions(payload),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
