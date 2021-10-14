import * as React from 'react';
import { FlatList, FlatListProps } from 'react-native';
import useThemeColors from '~/hooks/useThemeColors';
import Divider from '../Divider';
import styles from './styles';

interface OwnProps {
  data: any[];
}

type ListProps = OwnProps & Partial<FlatListProps<any>>;

const List: React.FC<ListProps> = ({ data, renderItem, ...rest }) => {
  const { card } = useThemeColors();



  return (
    <FlatList
      {...rest}
      keyExtractor={(item, index) => `${item.id} - ${index}`}
      data={data}
      contentContainerStyle={[
        {
          backgroundColor: card,
        },
        styles.contentContainer,
      ]}
      ItemSeparatorComponent={Divider}
      renderItem={renderItem}
    />
  );
};

export default List;
