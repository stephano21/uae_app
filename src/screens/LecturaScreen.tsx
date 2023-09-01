import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {BaseScreen} from '../Template/BaseScreen';
import {IRegion} from '../interfaces/ApiInterface';
import {colores, styles} from '../theme/appTheme';
import {useForm} from '../hooks/useForm';
import {InputForm} from '../components/InputForm';
import {Card} from 'react-native-paper';
import {useWindowDimensions} from 'react-native';
import {TextButton} from '../components/TextButton';
import {ButtonWithText} from '../components/ButtonWithText';

export const LecturaScreen = () => {
  const route = useRoute();
  const [paginado, setPaginado] = useState<number>(0);
  const [fechaVisita, setFechavisita] = useState(new Date());
  const {a} = route.params as {
    a: IRegion;
  };
  const {
    E1,
    E2,
    E3,
    E4,
    E5,
    GR1,
    GR2,
    GR3,
    GR4,
    GR5,
    Cherelles,
    Observacion,
    onChange,
  } = useForm({
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
  });

  const {width} = useWindowDimensions();
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
                  value={E1}
                  onChange={value => onChange(value, 'E1')}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'E2'}
                  value={E2}
                  onChange={value => onChange(value, 'E2')}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'E3'}
                  value={E3}
                  onChange={value => onChange(value, 'E3')}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'E4'}
                  value={E4}
                  onChange={value => onChange(value, 'E4')}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'E5'}
                  value={E5}
                  onChange={value => onChange(value, 'E5')}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'GR1'}
                  value={GR1}
                  onChange={value => onChange(value, 'GR1')}
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
                  value={GR2}
                  onChange={value => onChange(value, 'GR2')}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'GR3'}
                  value={GR3}
                  onChange={value => onChange(value, 'GR3')}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'GR4'}
                  value={GR4}
                  onChange={value => onChange(value, 'GR4')}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'GR5'}
                  value={GR5}
                  onChange={value => onChange(value, 'GR5')}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="numeric"
                  ancho={0.8}
                  placeholder={'Cherelles'}
                  value={Cherelles}
                  onChange={value => onChange(value, 'Cherelles')}
                />
                <InputForm
                  colorBase={colores.plomoclaro}
                  keyboard="default"
                  ancho={0.8}
                  placeholder={'Observacion'}
                  value={Observacion}
                  onChange={value => onChange(value, 'Observacion')}
                />
              </View>
              <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                <TextButton
                  title={'Volver'}
                  anyfunction={() => setPaginado(0)}
                />
              </View>
              <ButtonWithText anyfunction={() => {}} title="Guardar Lectura" />
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
