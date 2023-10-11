import React from 'react';
import {colores} from './src/theme/appTheme';
import {PermissionsProvider} from './src/context/PermissionsContext';
import {AuthProvider} from './src/context/AuthContext';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/navigator/Navigator';
import {LoaderProvider} from './src/context/LoaderContext';
import {AlertProvider} from './src/context/AlertContext';
import {MapProvider} from './src/context/MapContext';
import Toast from 'react-native-toast-message';
import {CheckInternetProvider} from './src/context/CheckInternetContext';
import {ThemeProvider} from './src/context/ThemeContext';

//#region AppState

const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <CheckInternetProvider>
      <LoaderProvider>
        <AlertProvider>
          <PermissionsProvider>
            <MapProvider>
              <AuthProvider>{children}</AuthProvider>
            </MapProvider>
          </PermissionsProvider>
        </AlertProvider>
      </LoaderProvider>
    </CheckInternetProvider>
  );
};

//#endregion

const App = () => {
  /*  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []); */

  const MyTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
      ...DefaultTheme.colors,
      background: colores.plomoclaro,
    },
  };

  return (
    <ThemeProvider>
      <NavigationContainer theme={MyTheme}>
        <AppState>
          <Navigator></Navigator>
          <Toast />
        </AppState>
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
