import React, {useEffect, useState} from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {
  Text,
  FlatList,
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {lecturasTotales} from '../interfaces/ApiInterface';
import {LocalStorageHelper} from '../hooks/useLocalStorage';
import {List} from '../components/List';
import {colores, styles} from '../theme/appTheme';
import {formatoDeFecha} from '../helpers/formatoDeFecha';

export const ReadingScreen = () => {
  const {FormatoFechaAgenda} = formatoDeFecha();
  const {width} = useWindowDimensions();
  const [lecturasGuardadas, setLecturasGuardadas] = useState<lecturasTotales[]>(
    [],
  );

  useEffect(() => {
    // Función para cargar las lecturas guardadas desde el almacenamiento local
    const cargarLecturasGuardadas = async () => {
      try {
        const lecturasJSON = await LocalStorageHelper.getItem(
          'LecturasLocales',
        );
        if (lecturasJSON) {
          const lecturas = JSON.parse(lecturasJSON);
          setLecturasGuardadas(lecturas);
        }
      } catch (error) {
        console.error('Error al cargar las lecturas guardadas:', error);
      }
    };

    // Llama a la función para cargar las lecturas guardadas al cargar la pantalla
    cargarLecturasGuardadas();
  }, []);

  const renderLecturas = (a: lecturasTotales) => {
    const fechaActual = FormatoFechaAgenda(new Date().toISOString());
    const fechaLectura = FormatoFechaAgenda(a.Fecha.toString());
    const esFechaActual = fechaLectura === fechaActual;
    return (
      <View key={a.id} style={lecturasStyless.itemContainer}>
        <View style={{...lecturasStyless.dateContainer, width: width * 0.2}}>
          <Text style={{fontSize: width * 0.045, ...lecturasStyless.date}}>
            {FormatoFechaAgenda(a.Fecha.toString())}
          </Text>
        </View>

        {/* <TouchableOpacity></TouchableOpacity> */}
        <View style={{...lecturasStyless.routeContainer, width: width * 0.7}}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              //   navigation.dispatch(
              //     CommonActions.navigate('ActividadesOTScreen', {
              //       datos: a,
              //     }),
              //   );
            }}
            key={a.id}
            style={lecturasStyless.rutaContainer}>
            <View
              style={{
                width: width * 0.012,
                backgroundColor: esFechaActual ? colores.verdePasto : '#ff6961',
                ...lecturasStyless.bar,
              }}></View>
            <View style={{flexDirection: 'column'}}>
              <View
                style={{
                  alignItems: 'flex-end',
                  width: width * 0.65,
                }}>
                <Text style={lecturasStyless.routeCod}>{a.codLectura}</Text>
              </View>
              <Text style={lecturasStyless.route}>{a.Observacion}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <BaseScreen>
      <Text style={lecturasStyless.routeCod}>
        {' '}
        Lecturas guardadas localmente
      </Text>
      <List
        data={lecturasGuardadas}
        refreshFunction={() => {}}
        renderItem={renderLecturas}
        ListEmptyText="No hay lecturas por visualizar"
      />
    </BaseScreen>
  );
};

const lecturasStyless = StyleSheet.create({
  container: {
    padding: 16,
  },
  itemContainer: {
    marginVertical: 20,
    marginBottom: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    borderBottomColor: colores.plomoclaro,
  },
  dateContainer: {
    paddingRight: 16,
    alignSelf: 'center',
    alignItems: 'center',
  },
  date: {
    color: '#424242',
    fontWeight: '500',
    textAlign: 'center',
  },
  routeContainer: {
    flexDirection: 'column',
  },
  bar: {
    height: '100%',
    marginRight: 5,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  rutaContainer: {
    height: '90%',
    padding: 1,
    ...styles.sombra,
    marginBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#ececec',
  },
  route: {
    fontSize: 16,
    marginBottom: 4,
    color: colores.negro,
  },
  routeCod: {
    fontSize: 16,
    marginBottom: 4,
    color: colores.primario,
  },
});
