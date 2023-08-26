import React, {useState} from 'react';
import {BaseScreen} from '../Template/BaseScreen';
import {Text} from 'react-native';
import {useQuotes} from '../hooks/useQuotes';
import {Quote} from '../interfaces/ApiInterface';
import {SearchInput} from '../components/SearchInput';
import {List} from '../components/List';

export const NextScreen = () => {
  const {quotes} = useQuotes();
  //create a function that return a jsx element that render quotes, author must be in a bold text and black color, the quotes must render in a gray color
  const [filteredQuotesAuthor, setfilteredQuotesAuthor] = useState<Quote[]>([]);

  return (
    <BaseScreen>
      <>
        <SearchInput
          placeholder={'Buscar'}
          catalog={quotes}
          textCompare={item => [item.author, item.quote]}
          result={setfilteredQuotesAuthor}></SearchInput>
        <Text style={{color: 'black'}}>Prueba</Text>
        <List
          data={filteredQuotesAuthor}
          renderItem={item => (
            <>
              <Text style={{color: 'gray'}}>{item.quote}</Text>
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                {' '}
                - {item.author}
              </Text>
            </>
          )}
          ListEmptyText={'No existen elementos para mostrar'}
          refreshFunction={() => {}}></List>
      </>
    </BaseScreen>
  );
};
