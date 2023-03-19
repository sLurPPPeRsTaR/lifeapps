import React, { memo, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, View, FlatList, Platform } from 'react-native';
import Text from 'ca-component-generic/Text';
import Color from 'ca-config/Color';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import codePush from 'react-native-code-push';
import Button from 'ca-component-generic/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// import { setCurrentCodePush } from 'ca-module-auth/authAction';
// import { store } from 'ca-config/Store';
import Size from 'ca-config/Size';
import style from './style';

function SwitchProjects(props) {
  const { isShow, onClosePress } = props;

  // const { currentCodePush } = store.getState().auth;
  const currentCodePush = '';

  const [statusCodepush, setStatusCodepush] = useState('-');
  const [receivedSize, setReceivedSize] = useState(0);
  const [totalSize, setTotalSize] = useState(0);
  const [data, setData] = useState(undefined);

  const insets = useSafeAreaInsets();

  const onModalClosePress = () => {
    setStatusCodepush('-');
    onClosePress();
  };

  const onResult = useCallback(
    (result) => {
      try {
        const parseData = result.data();
        const projectData = Object.entries(parseData).map(
          ([key, value], index) => ({
            id: index,
            name: key,
            codepush: value[Platform.OS],
            isActive: value[Platform.OS] === currentCodePush,
          })
        );
        setData(projectData);
      } catch (error) {
        setData(undefined);
      }
    },
    [currentCodePush]
  );

  const onError = (error) => {
    setStatusCodepush(error);
  };

  useEffect(() => {
    firestore()
      .collection('switch-project')
      .doc('aYV5M11VMPLMaD1AM0WG')
      .onSnapshot(onResult, onError);
  }, [onResult]);

  const syncCodepush = (key) => {
    codePush.sync(
      {
        deploymentKey: key,
        updateDialog: true,
        installMode: codePush.InstallMode.IMMEDIATE,
      },
      (syncStatus) => {
        switch (syncStatus) {
          case codePush.SyncStatus.CHECKING_FOR_UPDATE:
            setStatusCodepush('Checking for update.');
            break;
          case codePush.SyncStatus.DOWNLOADING_PACKAGE:
            // store.dispatch(setCurrentCodePush(key));
            setStatusCodepush('Downloading package.');
            break;
          case codePush.SyncStatus.AWAITING_USER_ACTION:
            setStatusCodepush('Awaiting user action.');
            break;
          case codePush.SyncStatus.INSTALLING_UPDATE:
            setStatusCodepush('Installing update.');
            break;
          case codePush.SyncStatus.UP_TO_DATE:
            setStatusCodepush('App up to date.');
            break;
          case codePush.SyncStatus.UPDATE_IGNORED:
            setStatusCodepush('Update cancelled by user.');
            break;
          case codePush.SyncStatus.UPDATE_INSTALLED:
            setStatusCodepush(
              'Update installed and will be applied on restart.'
            );
            break;
          case codePush.SyncStatus.UNKNOWN_ERROR:
            setStatusCodepush('An unknown error occurred.');
            break;
          default:
            break;
        }
      },
      (progress) => {
        setReceivedSize(
          Math.round(Number(progress.receivedBytes / 1000000) * 100) / 100
        );
        setTotalSize(
          Math.round(Number(progress.totalBytes / 1000000) * 100) / 100
        );
      }
    );
  };

  const renderListItem = ({ item }) => {
    const onPress = () => {
      syncCodepush(item.codepush);
    };

    const textStyle = item.isActive ? 'bold' : 'regular';
    const textColor = item.isActive
      ? Color.primary.light.primary90
      : Color.neutral.light.neutral90;

    return (
      <TouchableOpacity onPress={onPress} style={style.centerItems}>
        <Text textStyle={textStyle} color={textColor}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderHeader = () => {
    return (
      <View>
        <Text
          textStyle="bold"
          size={Size.text.body1.size}
          align="center"
          color={Color.primary.light.primary90}
          style={style.mb10}>
          Switch Project
        </Text>
        <View style={style.headerStyle}>
          <Text textStyle="regular">Status: </Text>
          <Text textStyle="regular">{statusCodepush}</Text>
        </View>
        <View style={style.headerStyle}>
          <Text textStyle="regular">Progress: </Text>
          <Text textStyle="regular">
            {receivedSize} / {totalSize}
          </Text>
        </View>
      </View>
    );
  };

  const renderFooter = () => {
    // const onClearProjectPress = () => {
    //   // store.dispatch(setCurrentCodePush(''));
    //   setStatusCodepush('Project Cleared, Restart App Manually');
    // };

    return (
      <>
        {/* <Button outline onPress={onClearProjectPress} style={style.mt20}>
          Clear Projects
        </Button> */}
        <Button onPress={onModalClosePress} style={style.mt10}>
          Back
        </Button>
      </>
    );
  };

  const renderDivider = () => {
    return <View style={style.mt10} />;
  };

  return (
    <View style={style.container}>
      <Modal
        isVisible={isShow}
        backdropOpacity={0.8}
        animationIn="slideInDown"
        animationOut="slideOutUp"
        animationInTiming={800}
        animationOutTiming={800}
        backdropTransitionInTiming={800}
        backdropTransitionOutTiming={800}
        onRequestClose={onModalClosePress}
        onBackdropPress={onModalClosePress}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={renderListItem}
          ListHeaderComponent={renderHeader}
          ListHeaderComponentStyle={style.mb20}
          ItemSeparatorComponent={renderDivider}
          contentContainerStyle={[
            style.containerModal,
            { marginTop: insets.top },
          ]}
          ListFooterComponent={renderFooter}
        />
      </Modal>
    </View>
  );
}

export default memo(SwitchProjects);

SwitchProjects.defaultProps = {};

SwitchProjects.propTypes = {
  isShow: PropTypes.bool.isRequired,
  onClosePress: PropTypes.func.isRequired,
};
