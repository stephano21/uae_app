import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { BaseScreen } from '../Template/BaseScreen';
import { colores } from '../theme/appTheme';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { ImageGallery } from '../components/ImageGallery';
import { Accordion } from '../components/Acordion';

interface datos {
  id: number;
  titulo: string;
  textoDescription: string;
  imagenes: string[];
}


const datosAcordeon = [
  {
    id: 1,
    titulo: 'Estadios del Cacao',
    imagenes: [
      'https://victoria.up.railway.app/accordion/cacao1.png',
      'https://victoria.up.railway.app/accordion/cacao2.png',
      'https://victoria.up.railway.app/accordion/cacao3.png',
      'https://victoria.up.railway.app/accordion/cacao4.png',
      'https://victoria.up.railway.app/accordion/cacao5.png',
    ],
    textoDescription: 'Imágen de referencia para los estadios.',
  },
  {
    id: 2,
    titulo: 'Grados de la monilla',
    imagenes: [
      'https://victoria.up.railway.app/accordion/gradosmonilla.png',
    ],
    textoDescription: 'Imágen de referencia para los estadios.',
  },
];

export const InfoScreen = () => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  const renderAcordions = (datos: datos) => (
    <Accordion key={datos.id} title={datos.titulo}>
      
      <ImageGallery
        widthCarousel={width * 0.8}
        heightCarousel={width * 0.4}
        images={datos.imagenes}
      />
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
