import React, {useContext, useRef, useState} from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {
  GestureResponderEvent,
  Image,
  LayoutChangeEvent,
  Modal,
  ToastAndroid,
  View,
  useWindowDimensions,
} from 'react-native';
import {ButtonWithText} from '../components/ButtonWithText';
import {colores, styles} from '../theme/appTheme';
import {
  Canvas,
  Image as SkiaImage,
  Path,
  SkiaView,
  useCanvasRef,
  useImage,
} from '@shopify/react-native-skia';
import {DocumentViewContext} from '../context/DocumentViewContext';
import {BaseModal} from '../Template/BaseModal';
import {Base64Img} from '../assets/ImagesBase64';

export const RayadosScreen = () => {
  const {height, width} = useWindowDimensions();
  const {showDocument} = useContext(DocumentViewContext);
  const [dimensions, setDimensions] = useState({width: 0, height: 0});
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [paths, setPaths] = useState<string[][]>([]);
  const [imagepath, setimagepath] = useState(Base64Img.izquierda);
  const [draw, setdraw] = useState(false);
  const CanvasRef = useCanvasRef();
  const image = useImage(require('../assets/izq.jpg'));

  const onOpen = (): void => {
    showDocument(`rayado`, imagepath);
  };

  const onSave = () => {
    setimagepath(
      `data:image/png;base64,${CanvasRef.current
        ?.makeImageSnapshot()
        .encodeToBase64()!}`,
    );
  };

  // Function to handle undo action
  const onUndo = () => {
    // Check if paths array is empty
    if (paths.length > 0) {
      // Filter out the last item of the paths array
      setPaths([
        ...paths.filter(
          item => item !== paths[paths.indexOf(paths[paths.length - 1])],
        ),
      ]);
    }
  };

  //create a function that clear paths
  const onClear = () => {
    setPaths([]);
  };

  const onTouchMove = ({
    nativeEvent: {locationX, locationY},
  }: GestureResponderEvent) => {
    //when the user touches outside the canvas, onTouchMove event must stop inmmidiately
    // We use toFixed to remove decimal places. This makes the path more efficient.
    const newPoint = `${
      currentPath.length === 0 ? 'M' : 'L'
    }${locationX.toFixed(0)},${locationY.toFixed(0)} `;
    let newPath = [...currentPath, newPoint];
    setCurrentPath(newPath);
  };

  const onTouchEnd = () => {
    // when the user releases the mouse button, add the current path to the paths list
    setPaths([...paths, [...currentPath]]);
    setCurrentPath([]);
  };

  return (
    <BaseScreen>
      <Image
        source={{uri: imagepath}}
        style={{width: width * 0.6, height: width / 4}}></Image>
      <ButtonWithText
        anyfunction={() => setdraw(true)}
        title={'Dibujar'}></ButtonWithText>

      <BaseModal CloseFunction={() => setdraw(false)} isVisible={draw}>
        <View
          style={{flex: 1, backgroundColor: 'white', ...styles.centerItems}}>
          <Canvas
            ref={CanvasRef}
            style={{
              ...styles.sombra,
              //backgroundColor: colores.azul,
              width: width * 0.8,
              height: width / 2.95,
              overflow: 'hidden',
            }}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onLayout={({
              nativeEvent: {
                layout: {width, height},
              },
            }: LayoutChangeEvent) =>
              setDimensions({
                width,
                height,
              })
            }>
            {image && (
              <SkiaImage
                image={image}
                fit="contain"
                x={0}
                y={0}
                width={dimensions.width}
                height={dimensions.height}
              />
            )}
            <Path
              color={'red'}
              strokeWidth={2}
              path={currentPath.join('')}
              style="stroke"
              strokeJoin="round"
            />
            {paths.length > 0 &&
              paths.map((item, index) => (
                <Path
                  key={index}
                  color={'red'}
                  strokeWidth={2}
                  path={item.join('')}
                  style="stroke"
                  strokeJoin="round"
                />
              ))}
          </Canvas>
          <ButtonWithText anyfunction={onUndo} title={'Undo'}></ButtonWithText>
          <ButtonWithText
            anyfunction={onClear}
            title={'Clear'}></ButtonWithText>
          <ButtonWithText anyfunction={onSave} title={'Save'}></ButtonWithText>
          <ButtonWithText
            anyfunction={() => setdraw(false)}
            title={'Cerrar'}
            color="red"></ButtonWithText>
        </View>
      </BaseModal>
    </BaseScreen>
  );
};
