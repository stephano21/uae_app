import React, {useContext, useEffect, useState} from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {Text, View, StyleSheet, useWindowDimensions} from 'react-native';
import {GlobalLecturas} from '../interfaces/ApiInterface';
import {List} from '../components/List';
import {colores, styles} from '../theme/appTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoaderContext} from '../context/LoaderContext';
import {sleep} from '../helpers/sleep';
import {useRequest} from '../api/useRequest';
import {ApiEndpoints} from '../api/routes';
import {ButtonWithText} from '../components/ButtonWithText';
import {CheckInternetContext} from '../context/CheckInternetContext';
import {AlertContext} from '../context/AlertContext';
import {useNavigation} from '@react-navigation/native';

export const ReadingScreen = () => {
  const {postRequest} = useRequest();
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const {ShowAlert} = useContext(AlertContext);
  const {setIsLoading} = useContext(LoaderContext);
  const {hasConection} = useContext(CheckInternetContext);
  const [lecturasGuardadas, setLecturasGuardadas] = useState<GlobalLecturas[]>(
    [],
  );

  useEffect(() => {
    // Cargar las lecturas guardadas en "LecturasLocal" al inicio del componente
    cargarLecturasGuardadas();
  }, []);

  useEffect(() => {
    // Verificar si tienes Id_Planta en cada lectura guardada
    const hasMissingIdPlanta = lecturasGuardadas.some(
      lectura => !lectura.Id_Planta,
    );

    if (hasMissingIdPlanta) {
      // Mostrar alerta de error
      ShowAlert('default', {
        title: 'Error',
        message: 'No se proporcionaron los datos necesarios.',
      });

      // Hacer un goBack
      navigation.goBack();
    }
  }, [lecturasGuardadas]);

  const cargarLecturasGuardadas = async () => {
    try {
      const lecturasExistentes = await AsyncStorage.getItem('LecturasLocal');
      if (lecturasExistentes) {
        const lecturasExistentesArray: GlobalLecturas[] =
          JSON.parse(lecturasExistentes);

        setLecturasGuardadas(lecturasExistentesArray);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const Catalogos = async () => {
    setIsLoading(true);
    cargarLecturasGuardadas();
    await sleep(2);
    setIsLoading(false);
  };

  const renderLecturas = (lectura: GlobalLecturas) => {
    // Itera a través de las propiedades del objeto GlobalLecturas y muestra sus valores
    return (
      <View style={{...lecturasStyles.rutaContainer, width: width * 0.8}}>
        <View key={lectura.Id_Planta} style={{flexDirection: 'column'}}>
          <View
            style={{
              alignItems: 'flex-end',
              width: width * 0.65,
            }}>
            <Text style={lecturasStyles.routeCod}>{lectura.planta}</Text>
          </View>
          <Text style={lecturasStyles.route}>{lectura.Observacion}</Text>
        </View>
      </View>
    );
  };
  const enviarLecturasAlServidor = async (lecturas: GlobalLecturas[]) => {
    try {
      for (const lectura of lecturas) {
        // Mapea las propiedades de lectura correctamente
        console.log('lECTURA', JSON.stringify(lectura, null, 3));
        const lecturaParaEnviar = {
          Id_Planta: lectura.Id_Planta,
          E1: lectura.E1 || 0,
          E2: lectura.E2 || 0,
          E3: lectura.E3 || 0,
          E4: lectura.E4 || 0,
          E5: lectura.E5 || 0,
          GR1: lectura.GR1 || 0,
          GR2: lectura.GR2 || 0,
          GR3: lectura.GR3 || 0,
          GR4: lectura.GR4 || 0,
          GR5: lectura.GR5 || 0,
          Cherelles: lectura.Cherelles || 0,
          Observacion: lectura.Observacion,
          SyncId: lectura.SyncId,
          FechaVisita: lectura.Fecha_Visita,
        };
        // Hacer la solicitud al servidor para guardar la lectura
        await postRequest(ApiEndpoints.Lectura, lecturaParaEnviar)
          .then(async () => {
            const lecturasExistentes =
              await AsyncStorage.getItem('LecturasLocal');
            if (lecturasExistentes) {
              const lecturasExistentesArray: GlobalLecturas[] =
                JSON.parse(lecturasExistentes);
              // Encuentra y elimina la lectura que coincida con la lectura enviada
              const lecturasActualizadas = lecturasExistentesArray.filter(
                lect => lect.SyncId !== lectura.SyncId,
              );
              await AsyncStorage.setItem(
                'LecturasLocal',
                JSON.stringify(lecturasActualizadas),
              );
              setLecturasGuardadas(lecturasActualizadas);
            }
          })
          .catch(e => {
            console.log('error', JSON.stringify(e));
          });
      }
    } catch (error) {
      console.error('Error al enviar las lecturas al servidor:', error);
    }
  };

  return (
    <BaseScreen>
      <List
        data={lecturasGuardadas}
        refreshFunction={() => Catalogos()}
        renderItem={renderLecturas}
        ListEmptyText="No hay lecturas por visualizar"
      />

      <View>
        {lecturasGuardadas.length > 0 && hasConection && (
          <ButtonWithText
            anyfunction={() =>
              // ShowAlert('default', {
              //   message: 'Estamos trabajando en ello',
              //   title: 'Informacion',
              // })
              enviarLecturasAlServidor(lecturasGuardadas)
            }
            title={`Guardar Lecturas en el servidor.`}
          />
        )}
        {/* {lecturasGuardadas.length < 0 && (
          <ButtonWithText
            anyfunction={() => cargarLecturasGuardadas()}
            title={`Refrescar Pantalla.`}
          />
        )} */}
      </View>
    </BaseScreen>
  );
};

const lecturasStyles = StyleSheet.create({
  rutaContainer: {
    height: '90%',
    flex: 1,
    ...styles.sombra,
    marginBottom: 10,
    backgroundColor: '#ececec',
  },
  route: {
    fontSize: 16,
    marginBottom: 4,
    marginHorizontal: 5,
    color: colores.negro,
  },
  routeCod: {
    fontSize: 16,
    marginBottom: 4,
    color: colores.primario,
  },
});
