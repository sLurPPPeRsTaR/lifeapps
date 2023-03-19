import * as React from 'react';
import { DdRumReactNavigationTracking } from '@datadog/mobile-react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import analytics from '@react-native-firebase/analytics';
import { navigationRef } from 'ca-bootstrap/bootstrapNavigation';
import { NAVIGATION, TYPE } from 'ca-util/constant';
import { createStackNavigator } from '@react-navigation/stack';
import MainTabStack from 'ca-navigation/MainTabNavigator';
import AuthStack from 'ca-module-auth/authNavigation';
import RegisterStack from 'ca-module-register/registerNavigation';
import LoginStack from 'ca-module-login/loginNavigation';
import ForpassStack from 'ca-module-forpass/forpassNavigation';
import HomeStack from 'ca-module-home/homeNavigation';
import UpdataStack from 'ca-module-updata/updataNavigation';
import {
  HomePengalihanPolis,
  HomePolisJiwasraya,
  HomeSos,
  HomeListRS,
  HomeListProduk,
} from 'ca-module-home/screen';
import { firebase } from '@react-native-firebase/dynamic-links';
import {
  ProfileLanguage,
  ProfileSecurity,
  ProfileHelp,
  ProfileHelpCenter,
  ProfilePayment,
  ProfilePaymentV2,
  ProfilePersonalData,
  ProfileCreatePin,
  ProfileCreateNewPin,
  ProfileDevice,
  ProfileInputPin,
  ProfileChangePassword,
  ProfileMobileNumber,
  ProfileNewMobileNumber,
  ProfileMobileNumberOtp,
  ProfileChangeNewPin,
  ProfilePersonalProvince,
  ProfilePersonalCity,
  ProfilePersonalDistrict,
  ProfileDeleteAccount,
  ProfileOtp,
  ProfileFaqFeedback,
  ProfileEmailEdit,
  ProfileEmailEditOtp,
  ProfilePhoneEdit,
  ProfilePhoneEditOtp,
  ProfileAddress,
  ProfileAddressEdit,
  ProfileUnsubscribe,
  ProfilePayments,
  ProfileAddPayment,
  ProfileTerms,
} from 'ca-module-profile/screen';
import {
  RegisterPolis,
  RegisterSertifikat,
  RegisterPolisOtp,
  RegisterMain,
  RegisterInput,
  RegisterNextStep,
  RegisterTerms,
  RegisterOtp,
} from 'ca-module-register/screen';
import { linking } from 'ca-config/Linking';
import ForpassInput from 'ca-module-forpass/screen/ForpassInput/index';
import { store } from 'ca-config/Store';
import { setActivity } from 'ca-bootstrap/bootstrapAction';
import {
  PolisDanaStatus,
  PolisDetail,
  PolisKlaimProgress,
  PolisLifeCard,
} from 'ca-module-polis/screen';
import {
  KycCreatePin,
  KycForm,
  KycMain,
  KycRetry,
  KycUploadKTPCam,
  KycUploadSelfie,
  KycUploadSelfieCam,
} from 'ca-module-kyc/screen';
import { Linking } from 'react-native';
import { LoginMain } from 'ca-module-login/screen';
import {
  LifecoverMain,
  LifecoverRiplay,
  LifecoverSyaratKetentuan,
  LifecoverStepMedicalStatement,
  LifecoverStepConfirmation,
  LifecoverSubscriptionForm,
} from 'ca-module-lifecover/screen';
import {
  LifesaverMain,
  LifesaverDetailProduct,
  LifesaverRiplay,
  LifesaverSyaratKetentuan,
  LifesaverKebijakanPrivasi,
  LifesaverVoucher,
  LifesaverProtected,
  TransaksiSukses,
  LifesaverFAQ,
  LifesaverDowngrade,
  LifesaverMainV2,
  LifesaverOrderPage,
  LifesaverOrderOther,
  LifesaverUploadKTPCam,
} from 'ca-module-lifesaver/screen';
import { NotificationMain } from 'ca-module-notification/screen';
import {
  InvitationMain,
  InvitationContacts,
} from 'ca-module-invitation/screen';
import {
  SubsDetail,
  SubsListBilling,
  SubsMain,
  SubsUnSubscribe,
  SubsChangePackage,
} from 'ca-module-subs/screen';
import {
  NewCreditCard,
  CreditCardInfo,
  Payments3DS,
  PaymentsCheckTrans,
  PaymentsEventCheckTrans,
  PaymentsLifeTagCheckTrans,
} from 'ca-module-payments/screen';
import {
  EventDetail,
  EventSuccess,
  EventMain,
  EventFavorite,
  EventHistory,
  EventList,
  EventDetailTicket,
  EventConfirmPayment,
} from 'ca-module-event/screen';
import {
  LifetagConfirmation,
  LifetagDetailProduct,
  LifetagDeviceList,
  LifetagForm,
  LifetagLanding,
  LifetagMain,
  LifetagSetting,
  LifetagDetailOrder,
  LifetagStepPairing,
  LifetagQrScanner,
  LifetagPairingResult,
} from 'ca-module-lifetag/screen';
import { ArticleMain, ArticleDetail } from 'ca-module-article/screen';
import PaymentsCheckTransV2 from 'ca-module-payments/screen/PaymentsCheckTransV2';
import { AF_SCREEN_VIEW, AFLogEvent } from 'ca-util/AppsFlyer';
import EventConfirmOrder from 'ca-module-event/screen/EventConfirmOrder';

const Stack = createStackNavigator();

function AppNavigator() {
  const routeNameRef = React.useRef();

  return (
    <NavigationContainer
      linking={linking}
      ref={navigationRef}
      onReady={() => {
        Linking.getInitialURL().then((res) => {
          if (res !== null) {
            Linking.openURL(res);
          } else {
            firebase
              .dynamicLinks()
              .getInitialLink()
              .then(({ url }) => {
                if (url !== null && TYPE === '') {
                  Linking.openURL(
                    url.replace('https://life.id', 'idlifecustomer:')
                  );
                }
                if (url !== null && TYPE === '-uat') {
                  Linking.openURL(
                    url.replace('https://uat.life.id', 'idlifecustomer:')
                  );
                }
                if (url !== null && TYPE === '-dev') {
                  Linking.openURL(
                    url.replace('https://dev.life.id', 'idlifecustomer:')
                  );
                }
              });
          }
        });
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
        DdRumReactNavigationTracking.startTrackingViews(navigationRef.current);
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;
        const currentRouteParam =
          navigationRef.current.getCurrentRoute().params;
        if (previousRouteName !== currentRouteName) {
          store.dispatch(setActivity('CHANGE_SCREEN', currentRouteName));
        }
        let routeTitle = currentRouteName;
        let routeClass = currentRouteName;
        if (
          (previousRouteName !== currentRouteName ||
            currentRouteName === 'PrivacyRequirements') &&
          currentRouteParam?.title !== undefined
        ) {
          if (currentRouteParam.class !== undefined) {
            routeTitle = currentRouteParam.title;
            routeClass = currentRouteParam.class;
          }
        } else {
          switch (currentRouteName) {
            case 'Semua':
              routeClass = 'Log';
              break;
            case 'Notifikasi':
              routeClass = 'Inbox';
              break;
            default:
              routeClass = currentRouteName;
          }
        }

        // eslint-disable-next-line prefer-const
        let screenData = {
          screen_name: routeTitle,
          screen_class: routeClass,
        };

        await analytics().logScreenView(screenData);

        // eslint-disable-next-line no-undef
        AFLogEvent(AF_SCREEN_VIEW, screenData);

        routeNameRef.current = currentRouteName;
      }}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name={NAVIGATION.AUTH.Auth} component={AuthStack} />

        {/* REGISTER */}
        <Stack.Screen
          name={NAVIGATION.REGISTER.Register}
          component={RegisterStack}
        />
        <Stack.Screen
          name={NAVIGATION.REGISTER.RegisterMain}
          component={RegisterMain}
        />
        <Stack.Screen
          name={NAVIGATION.REGISTER.RegisterInput}
          component={RegisterInput}
        />
        <Stack.Screen
          name={NAVIGATION.REGISTER.RegisterNextStep}
          component={RegisterNextStep}
        />
        <Stack.Screen
          name={NAVIGATION.REGISTER.RegisterPolis}
          component={RegisterPolis}
        />
        <Stack.Screen
          name={NAVIGATION.REGISTER.RegisterTerms}
          component={RegisterTerms}
        />
        <Stack.Screen
          name={NAVIGATION.REGISTER.RegisterOtp}
          component={RegisterOtp}
        />
        <Stack.Screen
          name={NAVIGATION.REGISTER.RegisterSertifikat}
          component={RegisterSertifikat}
          initialParams={{ id: '' }}
        />
        <Stack.Screen
          name={NAVIGATION.REGISTER.RegisterPolisOtp}
          component={RegisterPolisOtp}
          initialParams={{ otpSendTo: '', id: '', certificateNo: '' }}
        />

        {/* LOGIN */}
        <Stack.Screen name={NAVIGATION.LOGIN.Login} component={LoginStack} />
        <Stack.Screen
          name={NAVIGATION.LOGIN.LoginMain}
          component={LoginMain}
          initialParams={{ id: '' }}
        />

        {/* FORGOT PASS */}
        <Stack.Screen
          name={NAVIGATION.FORPASS.Forpass}
          component={ForpassStack}
        />
        <Stack.Screen
          name={NAVIGATION.FORPASS.ForpassInput}
          component={ForpassInput}
          initialParams={{ uniqueLink: '' }}
        />

        {/* HOME */}
        <Stack.Screen name={NAVIGATION.HOME.Home} component={HomeStack} />
        <Stack.Screen
          name={NAVIGATION.HOME.HomePolisJiwasraya}
          component={HomePolisJiwasraya}
        />
        <Stack.Screen
          name={NAVIGATION.HOME.HomePengalihanPolis}
          component={HomePengalihanPolis}
        />

        {/* TABMAIN */}
        <Stack.Screen
          name={NAVIGATION.TABMAIN.TabMain}
          component={MainTabStack}
        />

        {/* PROFILE */}
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileLanguage}
          component={ProfileLanguage}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileSecurity}
          component={ProfileSecurity}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileCreatePin}
          component={ProfileCreatePin}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileHelp}
          component={ProfileHelp}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileHelpCenter}
          component={ProfileHelpCenter}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfilePayment}
          component={ProfilePayment}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfilePaymentV2}
          component={ProfilePaymentV2}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfilePersonalData}
          component={ProfilePersonalData}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileDevice}
          component={ProfileDevice}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileInputPin}
          component={ProfileInputPin}
          initialParams={{ nextRoute: '' }}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileChangePassword}
          component={ProfileChangePassword}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileCreateNewPin}
          component={ProfileCreateNewPin}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileMobileNumber}
          component={ProfileMobileNumber}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileNewMobileNumber}
          component={ProfileNewMobileNumber}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileMobileNumberOtp}
          component={ProfileMobileNumberOtp}
          initialParams={{ otpSendTo: '' }}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileChangeNewPin}
          component={ProfileChangeNewPin}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfilePersonalProvince}
          component={ProfilePersonalProvince}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfilePersonalCity}
          component={ProfilePersonalCity}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfilePersonalDistrict}
          component={ProfilePersonalDistrict}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileDeleteAccount}
          component={ProfileDeleteAccount}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileOtp}
          component={ProfileOtp}
          initialParams={{
            nextRoute: '',
            callbackValidOtp: () => {},
          }}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileFaqFeedback}
          component={ProfileFaqFeedback}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileEmailEdit}
          component={ProfileEmailEdit}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileEmailEditOtp}
          component={ProfileEmailEditOtp}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfilePhoneEdit}
          component={ProfilePhoneEdit}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfilePhoneEditOtp}
          component={ProfilePhoneEditOtp}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileAddress}
          component={ProfileAddress}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileAddressEdit}
          component={ProfileAddressEdit}
          initialParams={{ action: '', address: null }}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileUnsubscribe}
          component={ProfileUnsubscribe}
          initialParams={{ action: '', address: null }}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfilePayments}
          component={ProfilePayments}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileAddPayment}
          component={ProfileAddPayment}
        />
        <Stack.Screen
          name={NAVIGATION.PROFILE.ProfileTerms}
          component={ProfileTerms}
        />

        {/* POLICY */}
        <Stack.Screen
          name={NAVIGATION.POLICY.PolisDetail}
          component={PolisDetail}
          initialParams={{ polis: '' }}
        />
        <Stack.Screen
          name={NAVIGATION.POLICY.PolisKlaimProgress}
          component={PolisKlaimProgress}
        />
        <Stack.Screen
          name={NAVIGATION.POLICY.PolisDanaStatus}
          component={PolisDanaStatus}
        />
        <Stack.Screen
          name={NAVIGATION.POLICY.PolisLifeCard}
          component={PolisLifeCard}
          initialParams={{ eCardLink: '', planName: '' }}
        />

        {/* KYC */}
        <Stack.Screen name={NAVIGATION.KYC.KycMain} component={KycMain} />
        <Stack.Screen
          name={NAVIGATION.KYC.KycUploadSelfie}
          component={KycUploadSelfie}
        />
        <Stack.Screen
          name={NAVIGATION.KYC.KycUploadSelfieCam}
          component={KycUploadSelfieCam}
        />
        <Stack.Screen
          name={NAVIGATION.KYC.KycUploadKTPCam}
          component={KycUploadKTPCam}
        />
        <Stack.Screen name={NAVIGATION.KYC.KycForm} component={KycForm} />
        <Stack.Screen
          name={NAVIGATION.KYC.KycCreatePin}
          component={KycCreatePin}
          initialParams={{
            nextRoute: '',
          }}
        />
        <Stack.Screen name={NAVIGATION.KYC.KycRetry} component={KycRetry} />

        {/* Updata */}
        <Stack.Screen name={NAVIGATION.UPDATA.Updata} component={UpdataStack} />

        {/* Life Cover */}
        <Stack.Screen
          name={NAVIGATION.LIFECOVER.LifecoverMain}
          component={LifecoverMain}
        />
        <Stack.Screen
          name={NAVIGATION.LIFECOVER.LifecoverRiplay}
          component={LifecoverRiplay}
        />
        <Stack.Screen
          name={NAVIGATION.LIFECOVER.LifecoverSyaratKetentuan}
          component={LifecoverSyaratKetentuan}
        />
        <Stack.Screen
          name={NAVIGATION.LIFECOVER.LifecoverStepMedicalStatement}
          component={LifecoverStepMedicalStatement}
        />
        <Stack.Screen
          name={NAVIGATION.LIFECOVER.LifecoverStepConfirmation}
          component={LifecoverStepConfirmation}
        />
        <Stack.Screen
          name={NAVIGATION.LIFECOVER.LifecoverSubscriptionForm}
          component={LifecoverSubscriptionForm}
        />

        {/* Life Saver */}
        <Stack.Screen
          name={NAVIGATION.LIFESAVER.LifesaverMain}
          component={LifesaverMain}
        />
        <Stack.Screen
          name={NAVIGATION.LIFESAVER.LifesaverMainV2}
          component={LifesaverMainV2}
        />
        <Stack.Screen
          name={NAVIGATION.LIFESAVER.DetailProduct}
          component={LifesaverDetailProduct}
        />
        <Stack.Screen
          name={NAVIGATION.LIFESAVER.LifesaverVoucher}
          component={LifesaverVoucher}
        />
        <Stack.Screen
          name={NAVIGATION.LIFESAVER.LifesaverOrderPage}
          component={LifesaverOrderPage}
        />
        <Stack.Screen
          name={NAVIGATION.LIFESAVER.LifesaverOrderOther}
          component={LifesaverOrderOther}
        />
        <Stack.Screen
          name={NAVIGATION.LIFESAVER.LifesaverUploadKTPCam}
          component={LifesaverUploadKTPCam}
        />
        <Stack.Screen
          name={NAVIGATION.LIFESAVER.LifesaverSyaratKetentuan}
          component={LifesaverSyaratKetentuan}
        />
        <Stack.Screen
          name={NAVIGATION.LIFESAVER.LifesaverRiplay}
          component={LifesaverRiplay}
        />
        <Stack.Screen
          name={NAVIGATION.LIFESAVER.LifesaverKebijakanPrivasi}
          component={LifesaverKebijakanPrivasi}
        />
        <Stack.Screen
          name={NAVIGATION.LIFESAVER.LifesaverProtected}
          component={LifesaverProtected}
        />
        <Stack.Screen
          name={NAVIGATION.LIFESAVER.LifesaverFAQ}
          component={LifesaverFAQ}
        />
        <Stack.Screen
          name={NAVIGATION.LIFESAVER.LifesaverDowngrade}
          component={LifesaverDowngrade}
        />
        <Stack.Screen name={NAVIGATION.HOME.HomeSos} component={HomeSos} />
        <Stack.Screen
          name={NAVIGATION.HOME.HomeListRS}
          component={HomeListRS}
        />
        <Stack.Screen
          name={NAVIGATION.HOME.HomeListProduk}
          component={HomeListProduk}
        />
        <Stack.Screen
          name={NAVIGATION.NOTIFICATION.NotificationMain}
          component={NotificationMain}
        />
        <Stack.Screen
          name={NAVIGATION.LIFESAVER.TransaksiSukses}
          component={TransaksiSukses}
        />
        <Stack.Screen
          name={NAVIGATION.INVITATION.InvitationMain}
          component={InvitationMain}
        />
        <Stack.Screen
          name={NAVIGATION.INVITATION.InvitationContacts}
          component={InvitationContacts}
        />
        <Stack.Screen name={NAVIGATION.SUBS.SubsMain} component={SubsMain} />
        <Stack.Screen
          name={NAVIGATION.SUBS.SubsDetail}
          component={SubsDetail}
        />
        <Stack.Screen
          name={NAVIGATION.SUBS.SubsUnSubscribe}
          component={SubsUnSubscribe}
        />
        <Stack.Screen
          name={NAVIGATION.SUBS.SubsListBilling}
          component={SubsListBilling}
        />
        <Stack.Screen
          name={NAVIGATION.SUBS.SubsChangePackage}
          component={SubsChangePackage}
        />
        {/* PAYMENTS */}
        <Stack.Screen
          name={NAVIGATION.PAYMENTS.NewCreditCard}
          component={NewCreditCard}
        />
        <Stack.Screen
          name={NAVIGATION.PAYMENTS.CreditCardInfo}
          component={CreditCardInfo}
        />
        <Stack.Screen
          name={NAVIGATION.PAYMENTS.Payments3DS}
          component={Payments3DS}
        />
        <Stack.Screen
          name={NAVIGATION.PAYMENTS.PaymentsCheckTrans}
          component={PaymentsCheckTrans}
        />
        <Stack.Screen
          name={NAVIGATION.PAYMENTS.PaymentsCheckTransV2}
          component={PaymentsCheckTransV2}
        />
        <Stack.Screen
          name={NAVIGATION.PAYMENTS.PaymentsEventCheckTrans}
          component={PaymentsEventCheckTrans}
        />
        <Stack.Screen
          name={NAVIGATION.PAYMENTS.PaymentsLifeTagCheckTrans}
          component={PaymentsLifeTagCheckTrans}
        />

        {/* EVENT */}
        <Stack.Screen
          name={NAVIGATION.EVENT.EventDetail}
          component={EventDetail}
        />
        <Stack.Screen
          name={NAVIGATION.EVENT.EventSuccess}
          component={EventSuccess}
        />
        <Stack.Screen
          name={NAVIGATION.EVENT.EventFavorite}
          component={EventFavorite}
        />
        <Stack.Screen name={NAVIGATION.EVENT.EventMain} component={EventMain} />
        <Stack.Screen
          name={NAVIGATION.EVENT.EventHistory}
          component={EventHistory}
        />
        <Stack.Screen name={NAVIGATION.EVENT.EventList} component={EventList} />
        <Stack.Screen
          name={NAVIGATION.EVENT.EventDetailTicket}
          component={EventDetailTicket}
        />
        <Stack.Screen
          name={NAVIGATION.EVENT.EventConfirmPayment}
          component={EventConfirmPayment}
        />
        <Stack.Screen
          name={NAVIGATION.EVENT.EventConfirmOrder}
          component={EventConfirmOrder}
        />

        {/* LIFETAG */}
        <Stack.Screen
          name={NAVIGATION.LIFETAG.LifetagMain}
          component={LifetagMain}
          initialParams={{ lifetagId: '' }}
        />
        <Stack.Screen
          name={NAVIGATION.LIFETAG.LifetagSetting}
          component={LifetagSetting}
          initialParams={{ lifetagId: '' }}
        />
        <Stack.Screen
          name={NAVIGATION.LIFETAG.LifetagLanding}
          component={LifetagLanding}
        />
        <Stack.Screen
          name={NAVIGATION.LIFETAG.LifetagForm}
          component={LifetagForm}
        />
        <Stack.Screen
          name={NAVIGATION.LIFETAG.LifetagDetailProduct}
          component={LifetagDetailProduct}
        />
        <Stack.Screen
          name={NAVIGATION.LIFETAG.LifetagConfirmation}
          component={LifetagConfirmation}
        />
        <Stack.Screen
          name={NAVIGATION.LIFETAG.LifetagDeviceList}
          component={LifetagDeviceList}
        />
        <Stack.Screen
          name={NAVIGATION.LIFETAG.LifetagDetailOrder}
          component={LifetagDetailOrder}
        />
        <Stack.Screen
          name={NAVIGATION.LIFETAG.LifetagStepPairing}
          component={LifetagStepPairing}
        />
        <Stack.Screen
          name={NAVIGATION.LIFETAG.LifetagQrScanner}
          component={LifetagQrScanner}
        />
        <Stack.Screen
          name={NAVIGATION.LIFETAG.LifetagPairingResult}
          component={LifetagPairingResult}
        />

        {/* ARTICLE */}
        <Stack.Screen
          name={NAVIGATION.ARTICLE.ArticleMain}
          component={ArticleMain}
        />
        <Stack.Screen
          name={NAVIGATION.ARTICLE.ArticleDetail}
          component={ArticleDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
