import React, {useEffect, useState} from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Plantas} from '../interfaces/ApiInterface';

export const PlantasScreen = () => {
  const [plantotas, setPlantotas] = useState<Plantas[]>([]);

  useEffect(() => {
    cargarPlantasGuardadas();
  }, []);

  const cargarPlantasGuardadas = async () => {
    try {
      const plantasGuardadas = await AsyncStorage.getItem('Plantas');

      if (plantasGuardadas) {
        const lotes: Plantas[] = JSON.parse(plantasGuardadas);
        setPlantotas(lotes);
      } else {
        console.log('No se encontraron platas guardados en AsyncStorage');
      }
    } catch (error) {
      console.error('Error al cargar las plantas desde AsyncStorage:', error);
    }
  };

  return (
    <BaseScreen>
      <Text>Hola</Text>
    </BaseScreen>
  );
};
