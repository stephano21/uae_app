import React from 'react'
import {colores} from './src/theme/appTheme'
import {PermissionsProvider} from './src/context/PermissionsContext';
import {AuthProvider} from './src/context/AuthContext';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {Navigator} from './src/navigator/Navigator';
import {LoaderProvider} from './src/context/LoaderContext';
import {AlertProvider} from './src/context/AlertContext';
import Toast from 'react-native-toast-message';
import {CheckInternetProvider} from './src/context/CheckInternetContext';

//#region AppState

const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <CheckInternetProvider>
      <LoaderProvider>
        <AlertProvider>
          <PermissionsProvider>
              <AuthProvider>{children}</AuthProvider>
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
    <NavigationContainer theme={MyTheme}>
      <AppState>
        <Navigator></Navigator>
        <Toast />
      </AppState>
    </NavigationContainer>
  );
};

export default App;
