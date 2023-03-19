import React, { useEffect, useState, useCallback, memo, useMemo } from 'react';
import PropTypes from 'prop-types';
import { SvgXml, SvgUri as SvgUrl } from 'react-native-svg';
import SVGCacheService from 'ca-util/SvgCacheService';

export async function fetchCached(uri) {
  const cached = await SVGCacheService.getSvg(uri);
  if (cached) {
    return cached;
  }
  const response = await fetch(uri);
  const svg = await response.text();
  SVGCacheService.setSvg(uri, svg);
  return svg;
}

function SvgUri(props) {
  const { uri, fill, stroke, style, width, height } = props;
  const [imgXml, setImgXml] = useState('<svg></svg>');

  const svgProps = useMemo(() => {
    let _props = {};
    if (width) {
      _props = { ..._props, width };
    }
    if (height) {
      _props = { ..._props, height };
    }
    if (style) {
      _props = { ..._props, style };
    }
    return _props;
  }, [height, style, width]);

  useEffect(() => {
    if (fill || stroke) {
      getImgXml(fill, stroke);
    }
  }, [fill, stroke, getImgXml]);

  const getImgXml = useCallback(
    async (newFill, newStroke) => {
      let xml = await fetchCached(uri);

      const fillRegex = /fill=(?:'|").*(?:'|")/g;
      const strokeRegex = /stroke=(?:'|").*(?:'|")/g;
      xml = newFill ? xml.replace(fillRegex, `fill="${newFill}"`) : xml;
      xml = newStroke ? xml.replace(strokeRegex, `stroke="${newStroke}"`) : xml;

      setImgXml(xml);
    },
    [uri]
  );

  if (fill || stroke) {
    return <SvgXml xml={imgXml} {...svgProps} />;
  }
  return <SvgUrl uri={uri} {...svgProps} />;
}

export default memo(SvgUri);

SvgUri.defaultProps = {
  fill: undefined,
  stroke: undefined,
  style: undefined,
  width: undefined,
  height: undefined,
};

SvgUri.propTypes = {
  uri: PropTypes.string.isRequired,
  fill: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  width: PropTypes.number,
  height: PropTypes.number,
};
