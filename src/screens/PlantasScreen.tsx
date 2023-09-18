import React, {useEffect, useState} from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Geolotes,
  ILocation,
  IRegion,
  Plantas,
} from '../interfaces/ApiInterface';
import {useRoute} from '@react-navigation/native';

export const PlantasScreen = () => {
  const [plantotas, setPlantotas] = useState<Plantas[]>([]);
  const {params} = useRoute();
  const {a} = params as {a: IRegion};

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

  const getLocation2 = async () => {
    // Filtra las plantas que tienen el mismo ID de lote que la ubicación actual
    const filterPlantas = plantotas.filter(planta => planta.Id_Lote === a.Id);

    // filterPlantas ahora contiene las plantas correspondientes al mismo ID de lote
    console.log('Plantas filtradas por ID de lote:', filterPlantas);
  };

  return (
    <BaseScreen>
      <Text>Hola</Text>
    </BaseScreen>
  );
};
