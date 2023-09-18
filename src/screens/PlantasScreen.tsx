import React, {useContext, useEffect, useState} from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IRegion, Plantas} from '../interfaces/ApiInterface';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {ButtonWithText} from '../components/ButtonWithText';
import {LoaderContext} from '../context/LoaderContext';

export const PlantasScreen = () => {
  const {params} = useRoute();
  const {a} = params as {a: IRegion};
  const {setIsLoading} = useContext(LoaderContext);
  const elNavegadorMasChulo = useNavigation();
  const [plantotas, setPlantotas] = useState<Plantas[]>([]);

  useEffect(() => {
    cargarPlantasGuardadas();
  }, []);

  const cargarPlantasGuardadas = async () => {
    try {
      setIsLoading(true);
      const plantasGuardadas = await AsyncStorage.getItem('Plantas');
      console.log(plantasGuardadas);
      if (plantasGuardadas) {
        const lotes: Plantas[] = JSON.parse(plantasGuardadas);
        setPlantotas(lotes);
      } else {
        console.log('No se encontraron platas guardados en AsyncStorage');
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error al cargar las plantas desde AsyncStorage:', error);
    }
  };

  const plantasFilter = () => {
    // Filtra las plantas que tienen el mismo ID de lote que la ubicación actual
    const filterPlantas = plantotas.filter(planta => planta.Id_Lote === a.Id);

    return (
      <View>
        {filterPlantas.map(plnt => (
          <ButtonWithText
            key={plnt.id}
            anyfunction={() =>
              elNavegadorMasChulo.dispatch(
                CommonActions.navigate('LecturaScreen', {plnt}),
              )
            }
            title={plnt.Nombre}
          />
        ))}
      </View>
    );
  };

  return <BaseScreen isScroll={true}>{plantasFilter()}</BaseScreen>;
};
