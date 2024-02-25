import React from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {colores} from '../theme/appTheme';
import {StyleSheet, Text, useWindowDimensions} from 'react-native';
import {ImageGallery} from '../components/ImageGallery';
import {Accordion} from '../components/Acordion';

interface InformationStadiums {
  id: number;
  titulo: string;
  textoDescription: string;
  imagenes: imagenes[];
}

interface imagenes {
  url: string;
}

const datosAcordeon: InformationStadiums[] = [
  {
    id: 1,
    titulo: 'Estadios del Cacao',
    imagenes: [
      {
        url: '../../assets/estadios/CACAO1.png',
      },
      {
        url: '../../assets/estadios/CACAO2.png',
      },
      {
        url: '../../assets/estadios/CACAO3.png',
      },
      {
        url: '../../assets/estadios/CACAO4.png',
      },
      {
        url: '../../assets/estadios/CACAO5.png',
      },
    ],
    textoDescription: 'Imágen de referencia para los estadios.',
  },
  {
    id: 2,
    titulo: 'Grados de la monilla',
    imagenes: [
      {
        url: '../../assets/monilla/GRADOSMONILIA.png',
      },
    ],
    textoDescription: 'Imágen de referencia para los estadios.',
  },
];

export const InfoScreen = () => {
  const {width} = useWindowDimensions();

  const RenderAcordion = ({datos}: {datos: InformationStadiums}) => (
    <Accordion key={datos.id} title={datos.titulo}>
      <Text style={{...InfoStyles.text, fontSize: width * 0.05}}>
        {datos.textoDescription}
      </Text>
      <ImageGallery
        widthCarousel={width * 0.8}
        heightCarousel={width * 0.4}
        images={datos.imagenes}
      />
    </Accordion>
  );

  return (
    <BaseScreen isScroll={true}>
      {datosAcordeon.map((datos, index) => (
        <RenderAcordion key={index} datos={datos} />
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
