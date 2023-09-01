import React from 'react';
import {Text} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {BaseScreen} from '../Template/BaseScreen';
import {IRegion} from '../interfaces/ApiInterface';
import {colores} from '../theme/appTheme';
import {useForm} from '../hooks/useForm';
import {InputForm} from '../components/InputForm';

export const LecturaScreen = () => {
  const route = useRoute();
  const {a} = route.params as {
    a: IRegion;
  };

  const {
    E1,
    E2,
    E3,
    E4,
    E5,
    Phythptora,
    Monilla,
    Animales,
    Cherelles,
    Colletotrichum,
    Corynespora,
    FechaVisita,
    Insectos,
    Lasodiplodia,
    Observacion,
    onChange,
  } = useForm({
    E1: '',
    E2: '',
    E3: '',
    E4: '',
    E5: '',
    Monilla: '',
    Phythptora: '',
    Colletotrichum: '',
    Corynespora: '',
    Lasodiplodia: '',
    Cherelles: '',
    Insectos: '',
    Animales: '',
    Observacion: '',
    FechaVisita: '',
  });
  return (
    <BaseScreen>
      <Text style={{color: colores.negro}}>{a.Lote}</Text>
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'E1'}
        value={E1}
        onChange={value => onChange(value, 'E1')}
      />
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'E2'}
        value={E2}
        onChange={value => onChange(value, 'E2')}
      />
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'E3'}
        value={E3}
        onChange={value => onChange(value, 'E3')}
      />
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'E4'}
        value={E4}
        onChange={value => onChange(value, 'E4')}
      />
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'E5'}
        value={E5}
        onChange={value => onChange(value, 'E5')}
      />
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'Phythptora'}
        value={Phythptora}
        onChange={value => onChange(value, 'Phythptora')}
      />
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'Número de documento'}
        value={Monilla}
        onChange={value => onChange(value, 'Monilla')}
      />
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'Animales'}
        value={Animales}
        onChange={value => onChange(value, 'Animales')}
      />
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'Cherelles'}
        value={Cherelles}
        onChange={value => onChange(value, 'Cherelles')}
      />
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'Colletotrichum'}
        value={Colletotrichum}
        onChange={value => onChange(value, 'Colletotrichum')}
      />
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'Corynespora'}
        value={Corynespora}
        onChange={value => onChange(value, 'Corynespora')}
      />
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'FechaVisita'}
        value={FechaVisita}
        onChange={value => onChange(value, 'FechaVisita')}
      />
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'Insectos'}
        value={Insectos}
        onChange={value => onChange(value, 'Insectos')}
      />
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'Lasodiplodia'}
        value={Lasodiplodia}
        onChange={value => onChange(value, 'Lasodiplodia')}
      />
      <InputForm
        colorBase="#f1f1f1"
        keyboard="numeric"
        ancho={0.8}
        placeholder={'Observacion'}
        value={Observacion}
        onChange={value => onChange(value, 'Observacion')}
      />
    </BaseScreen>
  );
};
