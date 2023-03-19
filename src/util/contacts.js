// eslint-disable-next-line react-native/split-platform-components
import { Platform, PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';
import { setPhoneFormat } from './format';

const getContacts = async (title, message) => {
  if (Platform.OS === 'android') {
    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS
    );
    if (status === 'denied' || status === 'never_ask_again') {
      return [];
    }
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title,
      message,
    }).then(() => {
      return setContacts();
    });
  }
  return setContacts();
};

const setContacts = async () => {
  if (Platform.OS === 'android') {
    const con = await Contacts.getAll()
      .then((contacts) => {
        return contacts
          .map((c) => {
            return c.phoneNumbers.map((p) => {
              return {
                name: `${c?.displayName}`.trimEnd(),
                number: setPhoneFormat(String(p.number)),
              };
            });
          })
          .reduce((a, b) => a.concat(b), []);
      })
      .catch(() => []);
    return con;
  }
  const con = await Contacts.getAll()
    .then((contacts) => {
      return contacts
        .map((c) => {
          return c.phoneNumbers.map((p) => {
            return {
              name: `${c?.givenName} ${c?.familyName}`.trimEnd(),
              number: setPhoneFormat(String(p.number)),
            };
          });
        })
        .reduce((a, b) => a.concat(b), []);
    })
    .catch(() => []);
  return con;
};

export default getContacts;
