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


//#region AppState

const AppState = ({children}: {children: JSX.Element | JSX.Element[]}) => {
  return (
    <CheckInternetProvider>
      {/* This is a provider that checks if the internet is available. */}
      <LoaderProvider>
        {/* This is a provider that displays a animated loading. */}
        <AlertProvider>
          {/* This is a provider that displays a modal popup alert with message, promt or image. */}
          <PermissionsProvider>
            {/* This is a provider that checks if the user has the required permissions. */}
            <MapProvider>
                {/* This is a provider that show a popup with documents as pdf or images. */}
                <AuthProvider>{children}</AuthProvider>
                {/* This is a provider that checks if the user is logged in. */}
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
