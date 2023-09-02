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
import {LocalStorageHelper} from '../hooks/useLocalStorage';

export const LecturaScreen = () => {
  const route = useRoute();
  const [paginado, setPaginado] = useState<number>(0);
  const navigation = useNavigation();
  const {ShowAlert} = useContext(AlertContext);
  const {a} = route.params as {
    a: IRegion;
  };
  const {width} = useWindowDimensions();

  const [allLecturas, setAllLecturas] = useState<lecturasTotales[]>([]);

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
    Fecha: '',
  });

  useEffect(() => {
    const a = new Date().toISOString();
    setLectura({...lectura, ['Fecha']: a});
  }, []);

  const no = () => {
    navigation.dispatch(CommonActions.goBack);
  };

  const guardarLecturasEnLocal = async (
    lecturas: lecturasTotales[],
  ): Promise<boolean> => {
    try {
      const lecturasJSON = JSON.stringify(lecturas);
      await LocalStorageHelper.setItem('LecturasLocales', lecturasJSON);
      console.log('Lecturas: ', {lecturasJSON});
      return true; // Devuelve true si el guardado fue exitoso
    } catch (error) {
      console.error(
        'Error al guardar las lecturas en el almacenamiento local:',
        error,
      );
      return false; // Devuelve false si ocurrió un error
    }
  };

  const si = async () => {
    const nuevaLectura = {
      id: allLecturas.length + 1, // Genera un nuevo ID único
      codLectura: a.Cod,
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
      Fecha: lectura['Fecha'],
    };

    const nuevasLecturas = [...allLecturas, nuevaLectura];
    setAllLecturas(nuevasLecturas);

    const guardadoExitoso = await guardarLecturasEnLocal(nuevasLecturas);

    if (guardadoExitoso) {
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
        Fecha: '',
      });
      setAllLecturas([]);
    } else {
      ShowAlert('default', {
        title: 'Error',
        message: 'Ocurrió un error al intentar guardar los datos localmente.',
      });
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
          title={a.Cod}
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
                  value={lectura['E1']}
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
                  keyboard="default"
                  ancho={0.8}
                  placeholder={'Observacion'}
                  value={lectura['Observacion']}
                  onChange={value =>
                    setLectura({...lectura, ['Observacion']: value})
                  }
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
                    CancelFunction: no,
                  });
                }}
                title="Guardar Lectura"
              />
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
