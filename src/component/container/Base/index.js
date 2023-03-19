import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Keyboard,
  Platform,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import Header from 'ca-component-card/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color, Size } from 'ca-config/index';
import PropTypes from 'prop-types';
import { store } from 'ca-config/Store';
import Styles from './style';

export default class Base extends Component {
  constructor(props) {
    super(props);

    const { onScrollViewRef } = this.props;
    const { dimensions } = store.getState().bootstrap;
    this.state = {
      isKeyboardUp: false,
      keyboardHeight: 0,
      dimensions,
    };

    this.renderHeader = this.renderHeader.bind(this);
    this.renderBottom = this.renderBottom.bind(this);
    this.renderMain = this.renderMain.bind(this);

    if (Platform.OS === 'ios') {
      this.keyboardWillShow = Keyboard.addListener('keyboardWillShow', (e) => {
        this.setState({
          isKeyboardUp: true,
          keyboardHeight: e?.endCoordinates?.height,
        });
      });

      this.keyboardWillHide = Keyboard.addListener('keyboardWillHide', () => {
        this.setState({ isKeyboardUp: false, keyboardHeight: 0 });
      });
    } else {
      this.keyboardDidShow = Keyboard.addListener('keyboardDidShow', (e) => {
        this.setState({
          isKeyboardUp: true,
          keyboardHeight: e?.endCoordinates?.height,
        });
      });

      this.keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
        this.setState({ isKeyboardUp: false, keyboardHeight: 0 });
      });
    }

    if (onScrollViewRef) {
      onScrollViewRef(this._scrollViewRef);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.state !== nextState) {
      return true;
    }

    if (this.props !== nextProps) {
      return true;
    }

    return false;
  }

  componentWillUnmount() {
    if (Platform.OS === 'ios') {
      this.keyboardWillShow.remove();
      this.keyboardWillHide.remove();
    } else {
      this.keyboardDidShow.remove();
      this.keyboardDidHide.remove();
    }
  }

  renderFloating() {
    const { renderFloating } = this.props;
    if (renderFloating) {
      return renderFloating;
    }
    return null;
  }

  renderHeader() {
    const {
      isLight,
      renderHeader,
      onBackPress,
      title,
      onClosePress,
      rightHeaderContent,
      leftTitle,
      bordered = false,
      headerBgColor,
      headerStyle,
    } = this.props;
    if (renderHeader) {
      return renderHeader;
    }
    if (onBackPress || title || onClosePress) {
      return (
        <Header
          isLight={isLight}
          leftTitle={leftTitle}
          title={title}
          onBackPress={onBackPress}
          onClosePress={onClosePress}
          rightContent={rightHeaderContent}
          bordered={bordered}
          headerBgColor={headerBgColor}
          headerStyle={headerStyle}
        />
      );
    }
    return null;
  }

  renderTopContent() {
    const { renderTopContent } = this.props;
    if (!renderTopContent) {
      return null;
    }

    return <View>{renderTopContent}</View>;
  }

  renderBottom() {
    const { renderBottom } = this.props;
    const { isKeyboardUp, keyboardHeight } = this.state;
    if (!renderBottom) {
      return null;
    }

    return (
      <View
        style={{
          paddingBottom:
            Platform.OS === 'ios' && isKeyboardUp ? keyboardHeight : 0,
        }}>
        {renderBottom}
      </View>
    );
  }

  renderMain() {
    const {
      staticView,
      children,
      bounces,
      onScrollBeginDrag,
      onScrollEndDrag,
      refreshControl,
      showsVerticalScrollIndicator,
      onScrollViewRef,
      onMomentumScrollEnd,
      onScroll,
      onEndReached,
      colorScheme,
      backgroundColor,
      isPaddingBottom,
      isWrapScrollView,
      scrollEnabled,
    } = this.props;
    if (staticView) {
      return (
        <View
          style={[
            Styles.innerContainerStatic,
            {
              backgroundColor: Color.main[colorScheme].white,
            },
          ]}>
          {children}
        </View>
      );
    }

    const tempStyle = [Styles.innerContainer];

    if (backgroundColor) {
      tempStyle.push({ backgroundColor: backgroundColor });
    } else {
      tempStyle.push({ backgroundColor: Color.main[colorScheme].white });
    }

    if (isPaddingBottom) {
      tempStyle.push(Styles.pb120);
    }

    let mainContent;
    if (isWrapScrollView) {
      mainContent = (
        <ScrollView
          ref={(ref) => {
            this._scrollViewRef = ref;
            if (onScrollViewRef) {
              onScrollViewRef(ref);
            }
          }}
          scrollEnabled={scrollEnabled}
          contentContainerStyle={tempStyle}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.2}
          refreshControl={refreshControl}
          onScroll={(event) => (onScroll ? onScroll(event) : {})}
          onScrollBeginDrag={onScrollBeginDrag}
          onScrollEndDrag={onScrollEndDrag}
          onMomentumScrollEnd={(event) => {
            onMomentumScrollEnd ? this.onMomentumScrollEnd(event) : {};
          }}
          scrollEventThrottle={16}
          bounces={bounces}
          style={{
            backgroundColor: backgroundColor || Color.main[colorScheme].white,
          }}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          overScrollMode={bounces ? 'auto' : 'never'}>
          {children}
        </ScrollView>
      );
    } else {
      mainContent = children;
    }

    return mainContent;
  }

  render() {
    const {
      bgImage,
      bgImageStyle,
      statusBarColor,
      statusBarStyle,
      colorScheme,
      topHeaderRadius = false,
      safeAreaViewColor,
    } = this.props;
    const { dimensions } = this.state;
    if (bgImage) {
      return (
        <ImageBackground
          source={bgImage}
          style={[Styles.container, bgImageStyle]}>
          <SafeAreaView
            edges={['top']}
            style={
              bgImage
                ? [Styles.container]
                : [
                    Styles.container,
                    {
                      backgroundColor:
                        safeAreaViewColor || Color.main[colorScheme].white,
                    },
                  ]
            }>
            <StatusBar
              translucent
              barStyle={statusBarStyle || 'dark-content'}
              backgroundColor={statusBarColor || 'transparent'}
            />
            {this.renderHeader()}

            {topHeaderRadius && (
              <View
                style={[
                  Styles.headerBorder,
                  { width: dimensions.width },
                  { backgroundColor: Color.main[colorScheme].white },
                ]}
              />
            )}

            {this.renderTopContent()}

            {Platform.OS === 'ios' ? (
              <View
                style={[
                  Styles.container,
                  {
                    backgroundColor: Color.main[colorScheme].white,
                  },
                ]}>
                {this.renderMain()}
                {this.renderBottom()}
              </View>
            ) : (
              <KeyboardAvoidingView
                style={[
                  Styles.container,
                  {
                    backgroundColor: Color.main[colorScheme].white,
                  },
                ]}>
                {this.renderMain()}
                {this.renderBottom()}
              </KeyboardAvoidingView>
            )}
            {this.renderFloating()}
          </SafeAreaView>
        </ImageBackground>
      );
    }
    return (
      <SafeAreaView
        edges={['top']}
        style={[
          Styles.container,
          {
            backgroundColor: safeAreaViewColor || Color.main[colorScheme].white,
          },
        ]}>
        <StatusBar
          translucent
          barStyle={statusBarStyle || 'dark-content'}
          backgroundColor={statusBarColor || 'transparent'}
        />

        {this.renderHeader()}

        {this.renderTopContent()}

        {Platform.OS === 'ios' ? (
          <View
            style={[
              Styles.container,
              {
                backgroundColor: Color.main[colorScheme].white,
              },
            ]}>
            {this.renderMain()}
            {this.renderBottom()}
          </View>
        ) : (
          <KeyboardAvoidingView
            style={[
              Styles.container,
              {
                backgroundColor: Color.main[colorScheme].white,
              },
            ]}>
            {this.renderMain()}
            {this.renderBottom()}
          </KeyboardAvoidingView>
        )}
        {this.renderFloating()}
      </SafeAreaView>
    );
  }
}

Base.defaultProps = {
  colorScheme: 'light',
  isPaddingBottom: true,
  isWrapScrollView: true,
  topHeaderRadius: false,
  showsVerticalScrollIndicator: false,
};

Base.propTypes = {
  colorScheme: PropTypes.string,
  isPaddingBottom: PropTypes.bool,
  isWrapScrollView: PropTypes.bool,
  topHeaderRadius: PropTypes.bool,
  showsVerticalScrollIndicator: PropTypes.bool,
};
