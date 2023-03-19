import { all } from 'redux-saga/effects';
import login from 'ca-module-login/loginSaga';
import auth from 'ca-module-auth/authSaga';
import register from 'ca-module-register/registerSaga';
import forpass from 'ca-module-forpass/forpassSaga';
import home from 'ca-module-home/homeSaga';
import profile from 'ca-module-profile/profileSaga';
import polis from 'ca-module-polis/polisSaga';
import kyc from 'ca-module-kyc/kycSaga';
import updata from 'ca-module-updata/updataSaga';
import lifesaver from 'ca-module-lifesaver/lifesaverSaga';
import notification from 'ca-module-notification/notificationSaga';
import subs from 'ca-module-subs/subsSaga';
import invitation from 'ca-module-invitation/invitationSaga';
import payment from 'ca-module-payments/paymentsSaga';
import event from 'ca-module-event/eventSaga';
import lifetag from 'ca-module-lifetag/lifetagSaga';
import article from 'ca-module-article/articleSaga';

function* bootstrapSaga() {
  yield all([
    ...login,
    ...auth,
    ...register,
    ...forpass,
    ...home,
    ...profile,
    ...polis,
    ...kyc,
    ...updata,
    ...lifesaver,
    ...notification,
    ...subs,
    ...invitation,
    ...payment,
    ...event,
    ...lifetag,
    ...article,
  ]);
}

export default bootstrapSaga;
