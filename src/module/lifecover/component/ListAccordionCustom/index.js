import React from 'react';
import { View } from 'react-native';
import Text from 'ca-component-generic/Text';
import Size from 'ca-config/Size';
import PropTypes from 'prop-types';
import ListAccordion from 'ca-component-card/ListAccordion';
import style from './style';

function Header({ icon, title }) {
  return (
    <View style={style.headerContentContainer}>
      <View style={style.headerIconContainer}>{icon}</View>
      <Text
        textStyle="semi"
        size={Size.text.body2.size}
        style={style.headerTextStyle}>
        {title}
      </Text>
    </View>
  );
}
Header.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};

function ListAccordionCustom(props) {
  const { lang, icon, title, children, ...rest } = props;

  return (
    <ListAccordion
      touchableType="native"
      headerContainerStyle={style.headerContainerStyle}
      headerContainerStyleActive={style.headerContainerStyle}
      header={<Header icon={icon} title={title} />}
      style={style.root}
      {...rest}>
      <View style={style.valuesContainer}>{children}</View>
    </ListAccordion>
  );
}
ListAccordionCustom.defaultProps = {
  lang: '',
};
ListAccordionCustom.propTypes = {
  lang: PropTypes.string,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ListAccordionCustom;
