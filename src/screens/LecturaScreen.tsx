import React from 'react';
import {Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {BaseScreen} from '../Template/BaseScreen';
import {IRegion} from '../interfaces/ApiInterface';

export const LecturaScreen = () => {
  const route = useRoute();
  const {a} = route.params as {
    a: IRegion;
  };
  return (
    <BaseScreen>
      <Text>hola</Text>
    </BaseScreen>
  );
};
