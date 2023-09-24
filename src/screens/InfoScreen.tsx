import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {colores, iconos} from '../theme/appTheme';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {ImageGallery} from '../components/ImageGallery';
import {Accordion} from '../components/Acordion';

interface datos {
  id: number;
  titulo: string;
  textoDescription: string;
  imagenes: imagenes[];
}

interface imagenes {
  url: string;
}

const datosAcordeon = [
  {
    id: 1,
    titulo: 'Estadios del Cacao',
    imagenes: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQluEXS2a6mFolcX5tla0_BmBJ4sXYX_7KFgj_69ran0z2JTpSciH3ZsZjrgAw30QdMCQ&usqp=CAU',
      },
    ],
    textoDescription: 'Imágen de referencia para los estadios.',
  },
  {
    id: 2,
    titulo: 'Grados de la monilla',
    imagenes: [
      {
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUP7EVnQOhQB6AYay8wu359FNgSIo8B0ZyslzTYu57KlNUq-vnxR0LFr_biMpTqh0lqhY&usqp=CAU',
      },
    ],
    textoDescription: 'Imágen de referencia para los estadios.',
  }
];

export const InfoScreen = () => {
  const {width} = useWindowDimensions();
  const navigation = useNavigation();

  const renderAcordions = (datos: datos) => (
    <Accordion key={datos.id} title={datos.titulo}>
      <Text style={{...InfoStyles.text, fontSize: width * 0.05}}>
        {datos.textoDescription}
      </Text>
      <ImageGallery images={datos.imagenes} />
    </Accordion>
  );

  return (
    <BaseScreen isScroll={true}>
      {datosAcordeon.map(a => (
        <View key={a.id}>{renderAcordions(a)}</View>
      ))}
    </BaseScreen>
  );
};
const InfoStyles = StyleSheet.create({
  text: {
    textAlign: 'center',
    marginVertical: 10,
    marginTop: 1,
    color: colores.negroClaro,
  },
});
