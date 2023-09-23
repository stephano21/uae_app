import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { BaseScreen } from '../Template/BaseScreen';
import { colores, iconos } from '../theme/appTheme';
import { StyleSheet, Text,Dimensions } from 'react-native';
import Accordion from '../components/Acordion';
import ImageGallery from '../components/ImageGallery';
import { ScrollView } from 'react-native-gesture-handler';
const images = [
  {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQluEXS2a6mFolcX5tla0_BmBJ4sXYX_7KFgj_69ran0z2JTpSciH3ZsZjrgAw30QdMCQ&usqp=CAU",
  }
];
const imagenes2 = [
  { url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSUP7EVnQOhQB6AYay8wu359FNgSIo8B0ZyslzTYu57KlNUq-vnxR0LFr_biMpTqh0lqhY&usqp=CAU" }
]
const { width } = Dimensions.get('window');
export const InfoScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView>
      <BaseScreen>
        <Accordion title="Estadios del Cacao">
          <>
            <Text style={[styles.text,{fontSize: width*0.05, }]}>Imágen de referencia para los estadios.</Text>
            <ImageGallery images={images} />
          </>
        </Accordion>
        <Accordion title="Grados de la monilla">
          <>
            <Text style={[styles.text,{fontSize: width*0.05, }]} >Imágen de referencia para los grados de la monilla.</Text>
            <ImageGallery images={imagenes2} />
          </>
        </Accordion>
      </BaseScreen>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    fontWeight: 'normal',
    marginVertical:10,
    marginTop:1,
    color: colores.negroClaro,
  }
});