function trans(meta, lang, constant) {
  if (!meta || !lang) {
    return constant;
  }
  return meta[lang][constant] ? meta[lang][constant] : constant;
}

export { trans };
