import React, {useContext, useRef, useState} from 'react';
import {StyleSheet, View, Text, AppState} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {BaseScreen} from '../Template/BaseScreen';
import {Plantas} from '../interfaces/ApiInterface';
import {colores, styles} from '../theme/appTheme';
import {Card, RadioButton} from 'react-native-paper';
import {useWindowDimensions} from 'react-native';
import {TextButton} from '../components/TextButton';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {format} from 'date-fns';
import {moveFile, ExternalStorageDirectoryPath, mkdir} from 'react-native-fs';
import {extname} from 'path';
import Toast from 'react-native-toast-message';
import {AlertContext} from '../context/AlertContext';

export const FotoPlantaScreen = () => {
  const {params} = useRoute();
  const {width} = useWindowDimensions();
  const {ShowAlert} = useContext(AlertContext);
  const {plnt} = params as {
    plnt: Plantas;
  };
  const [lado, setLado] = useState<'A' | 'B'>('A');
  const camDevice = useCameraDevice('back');
  const cameraRef = useRef<Camera>(null);
  const isFocused = useIsFocused();
  const appState = useRef(AppState.currentState);

  console.log(lado);

  return (
    <BaseScreen isScroll={true}>
      <Card
        style={{
          ...fotoScreenStyle.cardContainer,
          width: width * 0.92,
        }}>
        <Card.Title
          style={{
            ...fotoScreenStyle.titulo,
            width: width * 0.8,
            ...styles.centerItems,
          }}
          title={plnt.Nombre}
          titleStyle={{...fotoScreenStyle.title, fontSize: width * 0.055}}
        />
        <Card.Title
          style={{
            width: width * 0.8,
            ...styles.centerItems,
          }}
          title={plnt.Codigo_Planta}
          titleStyle={{...fotoScreenStyle.title, fontSize: width * 0.055}}
        />
        <Card.Content
          style={{
            width: width * 0.85,
            ...styles.centerItems,
            alignSelf: 'center',
            display: 'flex',
            flexDirection: 'column',
            flexGrow: 1,
          }}>
          <RadioButton.Group
            value={lado}
            onValueChange={value => setLado(value as 'A' | 'B')}>
            <View style={{width: '100%', flexDirection: 'row'}}>
              <RadioButton.Item value="A" label="Lado A" />
              <RadioButton.Item value="B" label="Lado B" />
            </View>
          </RadioButton.Group>
          {camDevice ? (
            <>
              <Camera
                ref={cameraRef}
                device={camDevice}
                photo={true}
                isActive={isFocused && appState.current === 'active'}
                // TODO Make this so it'll use only remaining space.
                style={{flexGrow: 1, width: width * 0.9, minHeight: width}}
              />
              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <TextButton
                  title={'Tomar foto'}
                  anyfunction={() => {
                    cameraRef.current
                      ?.takePhoto()
                      .then(photo => {
                        const dateTimeString = format(
                          Date.now(),
                          'yyyyMMdd-HHmmss',
                        );
                        const destFolder = `${ExternalStorageDirectoryPath}/DCIM/PlantTrace`;
                        mkdir(destFolder).catch(err => {
                          throw err;
                        });
                        moveFile(
                          photo.path,
                          `${destFolder}/${dateTimeString}_${
                            plnt.Codigo_Planta
                          }_L${lado}${extname(photo.path)}`,
                        );
                        setLado('B');
                        Toast.show({
                          type: 'success',
                          text1: `Foto Guardada del lado ${lado}`,
                        });
                      })
                      .catch(console.error);
                  }}
                />
              </View>
            </>
          ) : (
            <>
              <Text>Error en el acceso a la cámara.</Text>
            </>
          )}
        </Card.Content>
      </Card>
    </BaseScreen>
  );
};

// TODO Parece repetido, entoces hay que consolidarlo para no repetir código
const fotoScreenStyle = StyleSheet.create({
  cardContainer: {
    backgroundColor: colores.plomoclaro,
    display: 'flex',
    padding: 8,
    flexGrow: 1,
    height: '100%',
    ...styles.centerItems,
  },
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
