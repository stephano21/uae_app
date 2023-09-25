import React, {useContext, useEffect, useState} from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {IRegion, Plantas} from '../interfaces/ApiInterface';
import {
  CommonActions,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {ButtonWithText} from '../components/ButtonWithText';
import {LoaderContext} from '../context/LoaderContext';
import {useBaseStorage} from '../data/useBaseStorage';
import {colores} from '../theme/appTheme';
import Svg, { Path } from 'react-native-svg';
import TreeFill from './../assets/tree-fill'; // Importa tu archivo SVG personalizado

export const PlantasScreen = () => {
  const {params} = useRoute();
  const {a} = params as {a: IRegion};
  const isFocused = useIsFocused();
  const {setIsLoading} = useContext(LoaderContext);
  const {GetData} = useBaseStorage();
  const [lecturaRealizada, setLecturaRealizada] = useState<number[]>([]);
  const elNavegadorMasChulo = useNavigation();
  const [plantotas, setPlantotas] = useState<Plantas[]>([]);
  console.log(a)
  useEffect(() => {
    if (isFocused) {
      GetData<number[]>('OTRealizado')
        .then(a => setLecturaRealizada(a))
        .catch(error =>
          console.log('Ocurrió un error al obtener localmente', error),
        );
      cargarPlantasGuardadas();
    }
  }, [isFocused]);

  const cargarPlantasGuardadas = async () => {
    try {
      setIsLoading(true);
      const plantasGuardadas = await AsyncStorage.getItem('Plantas');
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
      <BaseScreen>
       <Text style={{
                  color: colores.primario,
                  fontWeight:'bold',
                  marginTop:20,
                }}>{a.Cod}</Text>
        {filterPlantas.length > 0 ? (
          <View>
            {filterPlantas.map(plnt => {
              const valueOT = lecturaRealizada
                ? lecturaRealizada.includes(plnt.id)
                : false;
              return (
                <ButtonWithText
                  disabled={valueOT ? true : false}
                  key={plnt.id}
                  anyfunction={() =>
                    elNavegadorMasChulo.dispatch(
                      CommonActions.navigate('LecturaScreen', {plnt}),
                    )
                  }
                  title={plnt.Nombre}
                  color={valueOT ? colores.plomo : colores.LocationBg}
                  icon='flower'
                />
              );
            })}
          </View>
        ) : (
          <>
            <Text style={{textAlign: 'center', color: 'black'}}>
              No hay plantas disponibles en tu lote.
            </Text>
          </>
        )}
      </BaseScreen>
    );
  };

  return <BaseScreen isScroll={true}>{plantasFilter()}</BaseScreen>;
};
