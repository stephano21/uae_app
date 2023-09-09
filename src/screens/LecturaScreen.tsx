import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {BaseScreen} from '../Template/BaseScreen';
import {IRegion, lecturasTotales} from '../interfaces/ApiInterface';
import {colores, styles} from '../theme/appTheme';
import {InputForm} from '../components/InputForm';
import {Card} from 'react-native-paper';
import {useWindowDimensions} from 'react-native';
import {TextButton} from '../components/TextButton';
import {ButtonWithText} from '../components/ButtonWithText';
import {AlertContext} from '../context/AlertContext';
import {CheckInternetContext} from '../context/CheckInternetContext';
import {useRequest} from '../api/useRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApiEndpoints} from '../api/routes';

export const LecturaScreen = () => {
  const route = useRoute();
  const {postRequest} = useRequest();
  const navigation = useNavigation();
  const {width} = useWindowDimensions();
  const {ShowAlert} = useContext(AlertContext);
  const [paginado, setPaginado] = useState<number>(0);
  const {hasConection} = useContext(CheckInternetContext);
  const {a} = route.params as {
    a: IRegion;
  };
  const [lectura, setLectura] = useState({
    E1: '',
    E2: '',
    E3: '',
    E4: '',
    E5: '',
    GR1: '',
    GR2: '',
    GR3: '',
    GR4: '',
    GR5: '',
    Cherelles: '',
    Observacion: '',
    FechaVisita: '',
  });

  const [allLecturas, setAllLecturas] = useState<{
    [key: string]: {
      codLectura: string;
      E1: string;
      E2: string;
      E3: string;
      E4: string;
      E5: string;
      GR1: string;
      GR2: string;
      GR3: string;
      GR4: string;
      GR5: string;
      Cherelles: string;
      Observacion: string;
      Fecha: string;
    };
  }>({});

  const generateFecha = () => {
    const dates = new Date().toISOString();
    setLectura({...lectura, ['FechaVisita']: dates});
  };

  useEffect(() => {
    generateFecha();
  }, []);

  const guardarLecturasEnLocal = async (lecturas: any): Promise<boolean> => {
    try {
      // Obtén las lecturas existentes en "LecturasLocal" (si las hay)
      const lecturasExistentes = await AsyncStorage.getItem('LecturasLocal');
      const lecturasExistentesArray: lecturasTotales[] = lecturasExistentes
        ? JSON.parse(lecturasExistentes)
        : [];

      // Combina las lecturas existentes con las nuevas
      const lecturasCombinadas = [...lecturasExistentesArray, ...lecturas];
      // Guarda las lecturas combinadas en "LecturasLocal"
      await AsyncStorage.setItem(
        'LecturasLocal',
        JSON.stringify(lecturasCombinadas),
      );
      setLectura({
        E1: '',
        E2: '',
        E3: '',
        E4: '',
        E5: '',
        GR1: '',
        GR2: '',
        GR3: '',
        GR4: '',
        GR5: '',
        Cherelles: '',
        Observacion: '',
        FechaVisita: '',
      });

      // useEffect(() => {
      //   console.log('Lectura se ha actualizado:', lectura);
      // }, [lectura]);
      setPaginado(0);
      setAllLecturas({}); // Limpia también el estado allLecturas

      return true; // Devuelve true si el guardado fue exitoso
    } catch (error) {
      console.error(error);
      return false; // Devuelve false si hubo un error al guardar
    }
  };

  const eliminarCatalogosDeMemoria = async () => {
    try {
      await AsyncStorage.removeItem('LecturasLocal');
    } catch (error) {
      console.error(error);
      ShowAlert('default', {
        title: 'Error',
        message:
          'Ocurrió un error al intentar eliminar los datos del grupo "catalogos".',
      });
    }
  };

  const si = async () => {
    const xyz =
      Date.now().toString(36) + Math.random().toString(36).substring(2);

    const nuevaLectura = {
      [xyz]: {
        codLectura: a.CodigoLote,
        E1: lectura['E1'],
        E2: lectura['E2'],
        E3: lectura['E3'],
        E4: lectura['E4'],
        E5: lectura['E5'],
        GR1: lectura['GR1'],
        GR2: lectura['GR2'],
        GR3: lectura['GR3'],
        GR4: lectura['GR4'],
        GR5: lectura['GR5'],
        Cherelles: lectura['Cherelles'],
        Observacion: lectura['Observacion'],
        Fecha: lectura['FechaVisita'],
      },
    };

    setAllLecturas(nuevaLectura);

    if (hasConection) {
      await postRequest(ApiEndpoints.Lectura, {
        E1: lectura['E1'] ? parseInt(lectura['E1'], 10) : 0,
        E2: lectura['E2'] ? parseInt(lectura['E2'], 10) : 0,
        E3: lectura['E3'] ? parseInt(lectura['E3'], 10) : 0,
        E4: lectura['E4'] ? parseInt(lectura['E4'], 10) : 0,
        E5: lectura['E5'] ? parseInt(lectura['E5'], 10) : 0,
        GR1: lectura['GR1'] ? parseInt(lectura['GR1'], 10) : 0,
        GR2: lectura['GR2'] ? parseInt(lectura['GR2'], 10) : 0,
        GR3: lectura['GR3'] ? parseInt(lectura['GR3'], 10) : 0,
        GR4: lectura['GR4'] ? parseInt(lectura['GR4'], 10) : 0,
        GR5: lectura['GR5'] ? parseInt(lectura['GR5'], 10) : 0,
        Cherelles: lectura['Cherelles']
          ? parseInt(lectura['Cherelles'], 10)
          : 0,
        Observacion: lectura['Observacion'],
        FechaVisita: new Date(),
        Id_Lote: a.Id,
      })
        .then(a => console.log(a))
        .catch(error => console.log(JSON.stringify(error, null, 3)));
    } else {
      const lecturasTotales = [allLecturas, nuevaLectura];
      const guardadoExitoso = await guardarLecturasEnLocal(lecturasTotales);
      if (guardadoExitoso) {
        generateFecha();
      } else {
        ShowAlert('default', {
          title: 'Error',
          message: 'Ocurrió un error al intentar guardar los datos localmente.',
        });
      }
    }
  };

  return (
    <BaseScreen>
      <Card
        style={{
          backgroundColor: colores.plomoclaro,
          width: width * 0.9,
          ...styles.centerItems,
        }}>
        <Card.Title
          style={{
            ...stylesComprasGastos.titulo,
            width: width * 0.8,
            ...styles.centerItems,
          }}
          title={a.CodigoLote}
          titleStyle={{...stylesComprasGastos.title, fontSize: width * 0.055}}
        />
        <Card.Content
          style={{
            width: width * 0.85,
            ...styles.centerItems,
            alignSelf: 'center',
          }}>
          {paginado === 0 ? (
            <>
              <View style={{backgroundColor: colores.plomoclaro}}>
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'E1'}
                  value={lectura['E1'].toString()}
                  onChange={value => setLectura({...lectura, ['E1']: value})}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'E2'}
                  value={lectura['E2']}
                  onChange={value => setLectura({...lectura, ['E2']: value})}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'E3'}
                  value={lectura['E3']}
                  onChange={value => setLectura({...lectura, ['E3']: value})}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'E4'}
                  value={lectura['E4']}
                  onChange={value => setLectura({...lectura, ['E4']: value})}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'E5'}
                  value={lectura['E5']}
                  onChange={value => setLectura({...lectura, ['E5']: value})}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'GR1'}
                  value={lectura['GR1']}
                  onChange={value => setLectura({...lectura, ['GR1']: value})}
                />
              </View>
              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <TextButton
                  title={'Siguiente'}
                  anyfunction={() => setPaginado(1)}
                />
              </View>
            </>
          ) : (
            <>
              <View style={{backgroundColor: colores.plomoclaro}}>
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'GR2'}
                  value={lectura['GR2']}
                  onChange={value => setLectura({...lectura, ['GR2']: value})}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'GR3'}
                  value={lectura['GR3']}
                  onChange={value => setLectura({...lectura, ['GR3']: value})}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'GR4'}
                  value={lectura['GR4']}
                  onChange={value => setLectura({...lectura, ['GR4']: value})}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'GR5'}
                  value={lectura['GR5']}
                  onChange={value => setLectura({...lectura, ['GR5']: value})}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'Cherelles'}
                  value={lectura['Cherelles']}
                  onChange={value =>
                    setLectura({...lectura, ['Cherelles']: value})
                  }
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  ancho={0.8}
                  placeholder={'Observacion'}
                  value={lectura.Observacion.toUpperCase()}
                  onChange={value => {
                    setLectura({...lectura, ['Observacion']: value});
                  }}
                />
              </View>
              <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                <TextButton
                  title={'Volver'}
                  anyfunction={() => setPaginado(0)}
                />
              </View>
              <ButtonWithText
                anyfunction={() => {
                  ShowAlert('yesno', {
                    title: 'Aviso',
                    message: '¿Deseas hacer otra lectura?',
                    OkFunction: si,
                    CancelFunction: () => {
                      si(), navigation.goBack();
                    },
                  });
                }}
                title="Guardar Lectura"
              />
              {__DEV__ && (
                <ButtonWithText
                  anyfunction={eliminarCatalogosDeMemoria}
                  title="Eliminar Local"
                />
              )}
            </>
          )}
        </Card.Content>
      </Card>
    </BaseScreen>
  );
};

const stylesComprasGastos = StyleSheet.create({
  titulo: {
    borderBottomWidth: 2,
    borderBottomColor: colores.primario,
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  txtTitle: {
    color: 'white',
    fontWeight: 'bold',
  },
  containerButon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
