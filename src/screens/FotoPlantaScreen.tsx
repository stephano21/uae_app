import React, {useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {BaseScreen} from '../Template/BaseScreen';
import {Plantas} from '../interfaces/ApiInterface';
import {colores, styles} from '../theme/appTheme';
import {Card, RadioButton} from 'react-native-paper';
import {useWindowDimensions} from 'react-native';
import {TextButton} from '../components/TextButton';
import {Camera, useCameraDevice} from "react-native-vision-camera"
import {format} from "date-fns"
import { moveFile, ExternalStorageDirectoryPath, mkdir } from "react-native-fs"
import { extname } from "path"
import Toast from 'react-native-toast-message';
import AppMetadata from "../../app.json"
import {useAppState} from '@react-native-community/hooks/src/useAppState'


export const FotoPlantaScreen = () => {
  const route = useRoute();
  const {width} = useWindowDimensions();
  const {plnt} = route.params as {
    plnt: Plantas;
  };
  
  const [lado, setLado] = React.useState("A");
  const camDevice = useCameraDevice('back')
  const cameraRef = useRef<Camera>(null)
  const isFocused = useIsFocused()
  const appState = useAppState()

  return (
    <BaseScreen isScroll={true}>
      <Card
        style={{
          backgroundColor: colores.plomoclaro,
          width: width * 0.9,
          display: "flex",
          flexGrow: 1,
          height: "100%",
          ...styles.centerItems,
        }}>
        <Card.Title
          style={{
            ...stylesComprasGastos.titulo,
            width: width * 0.8,
            ...styles.centerItems,
          }}
          title={plnt.Nombre}
          titleStyle={{...stylesComprasGastos.title, fontSize: width * 0.055}}
        />
        <Card.Title
          style={{
            //...stylesComprasGastos.titulo,
            width: width * 0.8,
            ...styles.centerItems,
          }}
          title={plnt.Codigo_Planta}
          titleStyle={{...stylesComprasGastos.title, fontSize: width * 0.055}}
        />
        <Card.Content
          style={{
            width: width * 0.85,
            ...styles.centerItems,
            alignSelf: 'center',
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <RadioButton.Group
            value={lado}
            onValueChange={(value: string) => setLado(value)}
          >
            <View style={{ width: "100%",  flexDirection: "row" }}>
              <RadioButton.Item value="A" label="Lado A" />
              <RadioButton.Item value="B" label="Lado B" />
            </View>
          </RadioButton.Group>
          {camDevice 
            ?<>
              <Camera ref={cameraRef} device={camDevice} photo={true} 
                isActive={isFocused && appState === "active"}
                // TODO Make this so it'll use only remaining space.
                style={{ flexGrow: 1, width: width*0.9, minHeight: width }}
              />
              <View style={{flexDirection: 'row', alignSelf: 'flex-end'}}>
                <TextButton
                  title={'Tomar foto'}
                  anyfunction={() => cameraRef.current?.takePhoto()
                    .then((photo) => {
                      const dateTimeString = format(Date.now(), "yyyyMMdd-HHmmss")
                      const destFolder = `${ExternalStorageDirectoryPath}/DCIM/PlantTrace`
                      mkdir(destFolder).catch(err => { throw err })
                      moveFile(photo.path, 
                        `${destFolder}/${dateTimeString}_${plnt.Codigo_Planta}_L${lado}${extname(photo.path)}`
                      )
                      Toast.show({
                        type: "success",
                        text1: "Foto Guardada",
                      })
                    })
                    .catch(console.error)
                  }
                />
              </View>
            </>
            : <><Text>Error en el acceso a la cámara.</Text></>
          }
        </Card.Content>
      </Card>
    </BaseScreen>
  );
};

// TODO Parece repetido, entoces hay que consolidarlo para no repetir código
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
