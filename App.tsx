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
import {DocumentViewProvider} from './src/context/DocumentViewContext';
import {SocketProvider} from './src/context/SocketContext';

//#region AppState

const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <CheckInternetProvider>
      <LoaderProvider>
        <AlertProvider>
          <SocketProvider>
            <PermissionsProvider>
              <MapProvider>
                <DocumentViewProvider>
                  <AuthProvider>{children}</AuthProvider>
                </DocumentViewProvider>
              </MapProvider>
            </PermissionsProvider>
          </SocketProvider>
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
      {/* This is the navigation container, which allows for navigation within the app */}
      <AppState>
        {/* This is the app state, which contains global state that can be accessed from any component */}
        <Navigator></Navigator>
        {/* This is the navigator, which allows for navigation within the app */}
        <Toast />
        {/* This is the toast component, which allows for the display of notifications */}
      </AppState>
    </NavigationContainer>
  );
};

export default App;
