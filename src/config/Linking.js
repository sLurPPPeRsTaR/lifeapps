import { firebase } from '@react-native-firebase/dynamic-links';
import {
  setIsComingFromDeepLink,
  setIsComingFromDeepLinkUrl,
} from 'ca-bootstrap/bootstrapAction';
import { TYPE } from 'ca-util/constant';
import { Linking } from 'react-native';
import { store } from './Store';

export const linking = {
  prefixes: [
    'idlifecustomer://',
    'http://lifecustomer.com',
    'https://lifecustomer.com',
    'https://lifecustomer.page.link',
    'https://life.id/',
    'https://uat.life.id/',
    'https://dev.life.id/',
    'https://qr.life.id/',
  ],

  // Custom function to get the URL which was used to open the app
  async getInitialURL() {
    // First, you would need to get the initial URL from your third-party integration
    // The exact usage depend on the third-party SDK you use
    // For example, to get to get the initial URL for Firebase Dynamic Links:
    const { isAvailable } = firebase.utils().playServicesAvailability;

    if (isAvailable) {
      const initialLink = await Linking.getInitialURL();
      if (initialLink) {
        return initialLink.url;
      }
    }

    // As a fallback, you may want to do the default deep link handling
    const url = await Linking.getInitialURL();

    return url;
  },

  // Custom function to subscribe to incoming links
  subscribe(listener) {
    // Listen to incoming links from Firebase Dynamic Links
    const unsubscribeFirebase = firebase.dynamicLinks().onLink(({ url }) => {
      store.dispatch(setIsComingFromDeepLink(true));
      store.dispatch(setIsComingFromDeepLinkUrl(url));
      listener(url);
    });

    // Listen to incoming links from deep linking
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      store.dispatch(setIsComingFromDeepLink(true));
      store.dispatch(setIsComingFromDeepLinkUrl(url));

      listener(url);
    });

    return () => {
      // Clean up the event listeners
      unsubscribeFirebase();
      linkingSubscription.remove();
    };
  },

  config: {
    screens: {
      ForpassInput: {
        path: `forgotpassword${TYPE}`,
        parse: {
          uniqueLink: (uniqueLink) => uniqueLink,
        },
      },
      LifesaverVoucher: {
        path: 'bajorun',
      },
      LifesaverMain: {
        path: 'lifesaver',
        parse: {
          isComingFromDeepLink: (isComingFromDeepLink) => isComingFromDeepLink,
        },
      },
      TabMain: {
        path: 'main',
        screens: {
          HomeMain: {
            path: `home${TYPE}`,
          },
          ExploreMain: {
            path: `explore${TYPE}`,
          },
          PolisMain: {
            path: `polis${TYPE}`,
          },
          ProfileMain: {
            path: `profile${TYPE}`,
          },
        },
      },
      EventMain: {
        path: 'eventlist',
      },
      EventDetail: {
        path: 'event/detail/:slugId',
        parse: {
          slugId: (id) => id,
          accessCode: (accessCode) => accessCode,
        },
      },
      ArticleDetail: {
        path: 'article/:slugId',
        parse: {
          slugId: (slugId) => slugId,
        },
      },
      EventDetailTicket: {
        path: 'userticket',
        parse: {
          userEventId: (userEventId) => userEventId,
          eventId: (eventId) => eventId,
        },
      },
      NotificationMain: {
        path: 'notification',
      },
      SubsDetail: {
        path: 'subsdetail',
        parse: {
          policyNo: (policyNo) => policyNo,
        },
      },
      Payments3DS: {
        path: 'paymentredirect',
        parse: {
          invoiceMaster: (invoiceMaster) => invoiceMaster,
        },
      },
      SubsMain: {
        path: 'subsmain',
      },
      LifetagMain: {
        path: 'lifetag',
        parse: {
          lifetagId: (lifetagId) => lifetagId,
        },
      },
      LifetagDetailOrder: {
        path: 'lifetagdetailorder',
        parse: {
          orderId: (orderId) => orderId,
        },
      },
      KycRetry: {
        path: 'kycretry',
      },
      LifetagDetailProduct: {
        path: 'lifetagdetailproduct',
      },
      ProfilePayments: {
        path: 'profilepayments',
      },
      Home: {
        path: 'polismain',
      },
    },
  },
};
