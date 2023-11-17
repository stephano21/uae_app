import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { BaseScreen } from '../Template/BaseScreen';
import { GlobalLecturas, Plantas } from '../interfaces/ApiInterface';
import { colores, iconos, styles } from '../theme/appTheme';
import { InputForm } from '../components/InputForm';
import { Card } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import { TextButton } from '../components/TextButton';
import { ButtonWithText } from '../components/ButtonWithText';
import { AlertContext } from '../context/AlertContext';
import { CheckInternetContext } from '../context/CheckInternetContext';
import { useRequest } from '../api/useRequest';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiEndpoints } from '../api/routes';
import { useBaseStorage } from '../data/useBaseStorage';
import { StackHeader } from '../navigator/StackHeader';
import Icon from 'react-native-vector-icons/Ionicons';

export const LecturaScreen = () => {
  const route = useRoute();
  const { postRequest } = useRequest();
  const { SaveData, GetData } = useBaseStorage();
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const { ShowAlert } = useContext(AlertContext);
  const [paginado, setPaginado] = useState<number>(0);
  const { hasConection } = useContext(CheckInternetContext);
  const { plnt } = route.params as {
    plnt: Plantas;
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
    Total: '',
    Cherelles: '',
    Observacion: '',
    FechaVisita: '',
  });

  const [allLecturas, setAllLecturas] = useState<GlobalLecturas[]>([]);

  const generateFecha = () => {
    const dates = new Date().toISOString();
    setLectura({ ...lectura, ['FechaVisita']: dates });
  };

  useEffect(() => {
    generateFecha();
  }, []);

  const guardarLecturasEnLocal = async (
    lecturas: GlobalLecturas[],
  ): Promise<boolean> => {
    try {
      // Obtén las lecturas existentes en "LecturasLocal" (si las hay)
      const lecturasExistentes = await AsyncStorage.getItem('LecturasLocal');
      let lecturasExistentesArray: GlobalLecturas[] = lecturasExistentes
        ? JSON.parse(lecturasExistentes)
        : [];

      // Agrega las lecturas nuevas al arreglo existente
      lecturasExistentesArray = [...lecturasExistentesArray, ...lecturas];

      // Guarda el arreglo actualizado en "LecturasLocal"
      await AsyncStorage.setItem(
        'LecturasLocal',
        JSON.stringify(lecturasExistentesArray),
      );

      ShowAlert('default', {
        title: 'Exito',
        message: 'Los datos se han guardado localmente.',
      });
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

  const plantaRegisterValue = (idPlanta: number) => {
    console.log(idPlanta);
    GetData<number[]>('OTRealizado')
      .then(a => {
        const newData = a || []; // Si a es undefined, asigna un arreglo vacío
        return SaveData([...newData, idPlanta], 'OTRealizado');
      })
      .catch(error =>
        console.log('Ocurrió un error al guardar localmente', error),
      );
  };

  const si = async () => {
    try {
      const xyz =
        Date.now().toString(36) + Math.random().toString(36).substring(2);

      const nuevaLectura = {
        Id_Planta: plnt.id,
        planta: plnt.Nombre,
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
        Total: lectura['Total'],
        Cherelles: lectura['Cherelles'],
        SyncId: xyz,
        Observacion: lectura['Observacion'],
        Fecha_Visita: lectura['FechaVisita'],
      };

      // Agregar la nueva lectura a allLecturas
      setAllLecturas(prevLecturas => ({
        ...prevLecturas,
        ...nuevaLectura,
      }));

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
          Total: lectura['Total'] ? parseInt(lectura['Total'], 10) : 0,
          Cherelles: lectura['Cherelles']
            ? parseInt(lectura['Cherelles'], 10)
            : 0,
          SyncId: xyz,
          Observacion: lectura['Observacion'],
          FechaVisita: new Date(),
          Id_Planta: plnt.id,
        })
          .then(async () => {
            await plantaRegisterValue(plnt.id),
              ShowAlert('default', {
                title: 'Exito',
                message: 'Se guardó en el servidor correctamente.',
              });
            navigation.goBack();
            return true;
          })
          .catch(() => {
            return false;
          });
      } else {
        const lecturasTotales =
          Object.keys(allLecturas).length === 0
            ? [...allLecturas, nuevaLectura]
            : [nuevaLectura];
        const guardadoExitoso = await guardarLecturasEnLocal(lecturasTotales);
        if (guardadoExitoso) {
          generateFecha();
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
            Total: '',
            Observacion: '',
            FechaVisita: '',
          });
          setPaginado(0);
          setAllLecturas([]);
          await plantaRegisterValue(plnt.id);
          navigation.goBack();
          return true;
        } else {
          ShowAlert('default', {
            title: 'Error',
            message:
              'Ocurrió un error al intentar guardar los datos localmente.',
          });
          return false;
        }
      }
    } catch (error) {
      console.error('Error en guardarLectura:', error);
      return false;
    }
  };

  // Inicialmente lo estaba haciendo Navigator, pero mejor aquí ya que allá no hay contexto de la 
  //  planta actual.
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <StackHeader title={'Ingresar Lectura'}
          actions={[
            <TouchableOpacity
              activeOpacity={0.6}
              // Passing plnt from here, as it's it this screen's context.
              //@ts-ignore as mavigate doesn't expect any args, yet it works.
              onPress={() => navigation.navigate('FotoPlantaScreen', { plnt })}
              style={{ height: 50, width: 50, ...styles.centerItems }}
            >
              <Icon name="camera" size={30} color={colores.blanco} />
            </TouchableOpacity>
          ]}
        />
      ),
    })
  }, [navigation])

  return (
    <BaseScreen isScroll={true}>
      <Card
        style={{
          backgroundColor: colores.plomoclaro,
          width: width * 0.9,
          ...styles.centerItems,
        }}>
        {/* <Card.Title
          style={{
            ...stylesComprasGastos.titulo,
            width: width * 0.8,
            ...styles.centerItems,
          }}
          title={plnt.Nombre}
          titleStyle={{...stylesComprasGastos.title, fontSize: width * 0.055}}
        /> */}
        <Card.Title
          style={{
            ...stylesComprasGastos.titulo,
            width: width * 0.8,
            ...styles.centerItems,
          }}
          title={plnt.Codigo_Planta}
          titleStyle={{ ...stylesComprasGastos.title, fontSize: width * 0.055 }}
        />
        <Card.Content
          style={{
            width: width * 0.85,
            ...styles.centerItems,
            alignSelf: 'center',
          }}>
          {paginado === 0 ? (
            <>
              <View style={{ backgroundColor: colores.plomoclaro }}>
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'Estadio 1'}
                  value={lectura['E1'].toString()}
                  onChange={value => setLectura({ ...lectura, ['E1']: value })}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'Estadio 2'}
                  value={lectura['E2']}
                  onChange={value => setLectura({ ...lectura, ['E2']: value })}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'Estadio 3'}
                  value={lectura['E3']}
                  onChange={value => setLectura({ ...lectura, ['E3']: value })}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'Estadio 4'}
                  value={lectura['E4']}
                  onChange={value => setLectura({ ...lectura, ['E4']: value })}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'Estadio 5'}
                  value={lectura['E5']}
                  onChange={value => setLectura({ ...lectura, ['E5']: value })}
                />
                
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'Cherelles'}
                  value={lectura['Cherelles']}
                  onChange={value =>
                    setLectura({ ...lectura, ['Cherelles']: value })
                  }
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'Total'}
                  value={lectura['Total']}
                  onChange={value => setLectura({ ...lectura, ['Total']: value })}
                />
              </View>
              <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                <TextButton
                  title={'Siguiente'}
                  anyfunction={() => setPaginado(1)}
                />
              </View>
            </>
          ) : (
            <>
              <View style={{ backgroundColor: colores.plomoclaro }}>
                <Text style={{
                  color: colores.primario,
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>Monilla</Text>
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'Grado 1'}
                  value={lectura['GR1']}
                  onChange={value => setLectura({ ...lectura, ['GR1']: value })}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'Grado 2'}
                  value={lectura['GR2']}
                  onChange={value => setLectura({ ...lectura, ['GR2']: value })}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'Grado 3'}
                  value={lectura['GR3']}
                  onChange={value => setLectura({ ...lectura, ['GR3']: value })}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'Grado 4'}
                  value={lectura['GR4']}
                  onChange={value => setLectura({ ...lectura, ['GR4']: value })}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'Grado 5'}
                  value={lectura['GR5']}
                  onChange={value => setLectura({ ...lectura, ['GR5']: value })}
                />
                
                <InputForm
                  colorBase={colores.plomoclaro}
                  ancho={0.8}
                  placeholder={'Observacion'}
                  value={lectura.Observacion.toUpperCase()}
                  onChange={value => {
                    setLectura({ ...lectura, ['Observacion']: value });
                  }}
                />
              </View>
              <View style={{ flexDirection: 'row', alignSelf: 'flex-start' }}>
                <TextButton
                  title={'Volver'}
                  anyfunction={() => setPaginado(0)}
                />
              </View>
              <ButtonWithText
                icon={iconos.guardar}
                anyfunction={async () => {
                  await si();
                }}
                title="Guardar"
              />
              {/* {__DEV__ && (
                <ButtonWithText
                  anyfunction={eliminarCatalogosDeMemoria}
                  title="Eliminar Local"
                  icon='trash'
                />
              )} */}
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
