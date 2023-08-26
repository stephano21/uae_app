import React, {useContext} from 'react';
import {Text} from 'react-native';
import {FlatList, RefreshControl} from 'react-native-gesture-handler';
import {colores, styles} from '../theme/appTheme';
import {LoaderContext} from '../context/LoaderContext';
import {ListRenderItemInfo} from 'react-native';

interface FlatListProps<T extends unknown> {
  data: T[];
  renderItem: (item: T) => JSX.Element;
  ListEmptyText: string;
  refreshFunction: () => void;
  numColumns?: number;
  isHorizontal?: boolean;
  loadMore?: () => void;
}

export const List = <T extends unknown>({
  data,
  renderItem,
  ListEmptyText,
  refreshFunction,
  numColumns = 1,
  isHorizontal = false,
  loadMore,
}: FlatListProps<T>) => {
  const {isFetching} = useContext(LoaderContext);
  return (
    <FlatList
      data={data}
      renderItem={({item}: ListRenderItemInfo<T>) => renderItem(item)}
      numColumns={numColumns}
      horizontal={isHorizontal}
      refreshControl={
        <RefreshControl
          refreshing={isFetching}
          onRefresh={refreshFunction}></RefreshControl>
      }
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      ListEmptyComponent={
        <Text style={{...styles.textData, color: colores.plomo, fontSize: 20}}>
          {ListEmptyText}
        </Text>
      }></FlatList>
  );
};
