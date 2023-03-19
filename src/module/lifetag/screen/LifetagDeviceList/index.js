import { setLoading } from 'ca-bootstrap/bootstrapAction';
import {
  getLifetagFlag,
  getLifetagLinkedList,
} from 'ca-module-lifetag/lifetagAction';
import { connect } from 'react-redux';
import View from './View';

const mapStateToProps = (state) => ({
  lang: state.auth.lang,
  colorScheme: state.auth.colorScheme,
  userId: state.auth.userData.userId,
  width: state.bootstrap.dimensions.width,
  height: state.bootstrap.dimensions.height,
  getLifetagLinkedListResponse: state.lifetag.getLifetagLinkedListResponse,
  getCurrentSubsResponse: state.lifesaver.getCurrentSubsResponse,
  getLifetagFlagResponse: state.lifetag.getLifetagFlagResponse,
});

const mapDispatchToProps = {
  getLifetagLinkedList: () => getLifetagLinkedList(),
  setLoading: (payload) => setLoading(payload),
  getLifetagFlag: () => getLifetagFlag(),
};

export default connect(mapStateToProps, mapDispatchToProps)(View);
