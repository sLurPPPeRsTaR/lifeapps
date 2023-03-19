import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Color from 'ca-config/Color';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import LinearGradient from 'react-native-linear-gradient';
import { ArrowLeft, ArrowRight } from 'ca-config/Svg';

export default function PolicyDetailTab(props) {
  const {
    state: { routes, index: currentTabIndex },
    navigation,
  } = props;

  const flatListRef = useRef(null);
  const [isHideLeftIndicator, setIsHideLeftIndicator] = useState(true);
  const [isHideRightIndicator, setIsHideRightIndicator] = useState(true);
  const [tempViewableItems, setTempViewableItems] = useState([]);

  const viewabilityConfig = {
    waitForInteraction: true,
    itemVisiblePercentThreshold: 90,
  };
  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig, onViewableItemsChanged },
  ]);

  function onViewableItemsChanged({ viewableItems }) {
    setTempViewableItems(viewableItems);
  }

  useEffect(() => {
    if (tempViewableItems.length > 0) {
      if (tempViewableItems.some((item) => item.index === 0)) {
        setIsHideLeftIndicator(true);
      } else {
        setIsHideLeftIndicator(false);
      }
      if (tempViewableItems.some((item) => item.index === routes.length - 1)) {
        setIsHideRightIndicator(true);
      } else {
        setIsHideRightIndicator(false);
      }
    }
  }, [routes.length, tempViewableItems]);

  useEffect(() => {
    flatListRef.current?.scrollToIndex({
      index: currentTabIndex,
      animated: true,
      viewPosition: 0.5,
    });
  }, [currentTabIndex]);

  const renderItem = ({ item, index }) => {
    let itemStyle = Styles.itemContainer;
    if (index === 0) {
      itemStyle = Styles.firstItemContainer;
    }
    if (index === routes.length - 1) {
      itemStyle = Styles.lastItemContainer;
    }
    return (
      <View style={itemStyle}>
        <TouchableOpacity onPress={() => navigation.navigate(item.name)}>
          <View
            style={
              currentTabIndex === index
                ? Styles.itemBadgeActive
                : Styles.itemBadgeInactive
            }>
            <Text
              textStyle="semi"
              size={Size.text.body2.size}
              line={21}
              letterSpacing={0.5}
              color={Color.badgeMagenta.light.badgeMagenta}>
              {item.params.label}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  function renderLeftIndicator() {
    if (isHideLeftIndicator) {
      return null;
    }
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate(routes[0].name);
          flatListRef.current.scrollToIndex({
            animated: true,
            index: 0,
          });
        }}
        style={Styles.leftIndicatorContainer}>
        <LinearGradient
          colors={[
            Color.main.light.white,
            Color.transparentColor.light.transparentColor,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <View style={Styles.leftIndicatorContent}>
            <ArrowLeft
              fill={Color.mediumGray.light.mediumGray}
              width={10}
              height={10}
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  function renderRightIndicator() {
    if (isHideRightIndicator) {
      return null;
    }
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => {
          navigation.navigate(routes[routes.length - 1].name);
          flatListRef.current.scrollToIndex({
            animated: true,
            index: routes.length - 1,
          });
        }}
        style={Styles.rightIndicatorContainer}>
        <LinearGradient
          colors={[
            Color.transparentColor.light.transparentColor,
            Color.main.light.white,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}>
          <View style={Styles.rightIndicatorContent}>
            <ArrowRight
              fill={Color.mediumGray.light.mediumGray}
              width={10}
              height={10}
            />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  }

  return (
    <>
      {renderLeftIndicator()}
      <View style={Styles.flexShrink1}>
        <FlatList
          horizontal
          ref={flatListRef}
          data={routes}
          renderItem={renderItem}
          keyExtractor={(route) => route.key}
          initialScrollIndex={currentTabIndex}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={Styles.flatListContent}
        />
      </View>
      {renderRightIndicator()}
    </>
  );
}

PolicyDetailTab.propTypes = {
  state: PropTypes.objectOf(Object).isRequired,
  navigation: PropTypes.objectOf(Object).isRequired,
};

const Styles = StyleSheet.create({
  flatListContent: {
    flexGrow: 1,
    height: 58,
    zIndex: -1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstItemContainer: {
    backgroundColor: Color.main.light.white,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    marginLeft: 16,
    paddingLeft: 16,
    paddingRight: 6,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  lastItemContainer: {
    backgroundColor: Color.main.light.white,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    marginRight: 16,
    paddingRight: 16,
    paddingLeft: 6,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  itemContainer: {
    backgroundColor: Color.main.light.white,
    paddingHorizontal: 6,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
  },
  itemBadgeActive: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: Color.badgePink.light.badgePink,
    borderRadius: 16,
  },
  itemBadgeInactive: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    backgroundColor: Color.main.light.white,
    borderRadius: 16,
  },
  leftIndicatorContainer: {
    position: 'absolute',
    left: 0,
    top: 8,
    zIndex: 1,
  },
  leftIndicatorContent: {
    width: 30,
    height: 56,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 6,
  },
  rightIndicatorContainer: {
    position: 'absolute',
    right: 0,
    top: 8,
    zIndex: 1,
  },
  rightIndicatorContent: {
    width: 30,
    height: 56,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 6,
  },
  flexShrink1: { flexShrink: 1 },
});
