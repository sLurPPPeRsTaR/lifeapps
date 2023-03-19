import 'react-native';
import React from 'react';
import { describe, expect, test, jest } from '@jest/globals';
import { fireEvent, render } from '@testing-library/react-native';

import { EventFilter } from 'ca-module-event/screen/EventList';

const makeSut = (props) => {
  return render(
    <EventFilter
      categories={props.categories}
      setCategories={props.setCategories}
    />
  );
};

describe('<EventFilter />', () => {
  test('should render all labels in uppercase', () => {
    const screen = makeSut({
      categories: [
        { type: 'musik', selected: false },
        { type: 'olahraga', selected: false },
        { type: 'edukasi', selected: false },
        { type: 'kuliner', selected: false },
      ],
      setCategories: () => {},
    });
    expect(screen.getByText('MUSIK')).toBeDefined();
    expect(screen.getByText('OLAHRAGA')).toBeDefined();
    expect(screen.getByText('EDUKASI')).toBeDefined();
    expect(screen.getByText('KULINER')).toBeDefined();
    expect(() => screen.getByText('Musik')).toThrowError();
    expect(() => screen.getByText(/Random string/)).toThrowError();
  });

  test('should call setCategories onClick with correct selected value', () => {
    const setCategoriesMock = jest.fn();
    const screen = makeSut({
      categories: [
        { type: 'musik', selected: false },
        { type: 'olahraga', selected: false },
        { type: 'edukasi', selected: false },
        { type: 'kuliner', selected: false },
      ],
      setCategories: setCategoriesMock,
    });
    const touchableOpacityOlahraga = screen.getByText('OLAHRAGA').parent;
    fireEvent(touchableOpacityOlahraga, 'onPress', 'olahraga');
    expect(setCategoriesMock).toHaveBeenCalledWith([
      { type: 'musik', selected: false },
      { type: 'olahraga', selected: true },
      { type: 'edukasi', selected: false },
      { type: 'kuliner', selected: false },
    ]);
  });
});
