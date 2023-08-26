import React, {useContext} from 'react';
import {Text, Button} from 'react-native';
import {AlertContext} from '../context/AlertContext';
import {BaseScreen} from '../Template/BaseScreen';
import {MapContext} from '../context/MapContext';
import {Selector} from '../components/Selector';
import {SearchInput} from '../components/SearchInput';

const AvisoSelector = [
  {
    id: 1,
    nombre: 'Aviso 1',
    codigo: '0123456',
    descripcion: 'Aviso primero',
  },
  {
    id: 2,
    nombre: 'Aviso 2',
    codigo: '05468974',
    descripcion: 'Aviso segundo',
  },
  {
    id: 3,
    nombre: 'Aviso 3',
    codigo: '0123456',
    descripcion: 'Aviso tercero',
  },

  {
    id: 4,
    nombre: 'Aviso 4',
    codigo: '05468974',
    descripcion: 'Aviso cuarto',
  },
  {
    id: 5,
    nombre: 'Aviso 5',
    codigo: '05468592',
    descripcion: 'Aviso quinto',
  },
];

export const HomeScreen = () => {
  const {ShowAlert} = useContext(AlertContext);
  const {showMap} = useContext(MapContext);

  const pruebafuncion = () => {
    console.log('prueba de OkFunction sin parametro');
  };
  const pruebafuncionconvalue = (text: string) => {
    console.log('prueba de OkFunction con parametro: ', text);
  };

  return (
    <BaseScreen>
      <Text>HomeScreen</Text>
      <Button
        title="Alerta"
        onPress={() =>
          ShowAlert('default', {
            title: 'Aviso',
            message: 'Alerta normal',
          })
        }></Button>
      <Text>HomeScreen</Text>
      <Button
        title="Alerta con opciones"
        onPress={() =>
          ShowAlert('yesno', {
            title: 'Aviso',
            message: 'Alerta normal',
            OkFunction: pruebafuncion,
          })
        }></Button>
      <Text>HomeScreen</Text>
      <Button
        title="Alerta para llenar"
        onPress={() =>
          ShowAlert('promt', {
            title: 'Aviso',
            message: 'Alerta normal',
            placeholder: 'Aviso de placeholder',
            OkFunction: pruebafuncionconvalue,
          })
        }></Button>
      <Text>HomeScreen</Text>
      <Button
        title="Alerta Con imagen"
        onPress={() =>
          ShowAlert('image', {
            title: 'Aviso',
            message: 'Alerta normal',
            imagePath:
              'https://mooncargo.com.ec/wp-content/uploads/2020/11/transporte-de-carga-pesada.jpg',
          })
        }></Button>
      <Text>HomeScreen</Text>
      <Button
        title="Mostrar Mapa"
        onPress={() => showMap(undefined, true)}></Button>
      <Text>HomeScreen</Text>
      
      <Text>HomeScreen</Text>
      <Selector
        catalog={AvisoSelector}
        selectedItem={item => {}}
        placeholder={'Selecciona un Item'}
        textItem={({nombre}) => nombre}></Selector>

      <SearchInput
        placeholder={'Buscador de prueba'}
        catalog={AvisoSelector}
        textCompare={item => [item.nombre, item.codigo, item.descripcion]}
        result={items => console.log(items)}></SearchInput>
    </BaseScreen>
  );
};
