import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  ListRenderItem,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {DiagnosisItem} from '../../components/DiagnosisItem';
import {useDiagnostics} from '../../hooks';
import {Diagnosis} from '../../types/diagnosis';
import Timestamp from '@react-native-firebase/firestore';

export const DiagnosisScreen: React.FC = () => {
  const [filter, setFilter] = useState('Todos');
  const [sortKey, setSortKey] = useState<keyof Diagnosis>('created_at');
  const navigation = useNavigation();
  const {diagnosticsQuery} = useDiagnostics();

  const compareDiagnosisData = useCallback(
    (a: Diagnosis, b: Diagnosis) => {
      let aValue = a[sortKey as keyof Diagnosis];
      let bValue = b[sortKey as keyof Diagnosis];

      // console.log(typeof aValue, typeof bValue);
      if (typeof aValue === 'string') {
        aValue = aValue.length;
      } else if (aValue && aValue instanceof Timestamp) {
        console.log('Soy un timestamp');
        aValue = aValue.toMillis();
      }

      if (typeof bValue === 'string') {
        bValue = bValue.length;
      } else if (bValue && bValue instanceof Timestamp) {
        bValue = bValue.toMillis();
      }

      if ((aValue as number) < (bValue as number)) {
        return 1;
      } else if ((aValue as number) > (bValue as number)) {
        return -1;
      } else {
        return 0;
      }
    },
    [sortKey],
  );

  const filteredDiagnosisData = useMemo(() => {
    const filteredData =
      filter === 'Todos'
        ? diagnosticsQuery.data
        : diagnosticsQuery.data?.filter(data => data.state === filter);

    return filteredData?.sort(compareDiagnosisData);
  }, [filter, compareDiagnosisData, diagnosticsQuery.data]);

  const onFilterChange = useCallback((itemValue: string) => {
    setFilter(itemValue);
  }, []);

  const renderItem: ListRenderItem<Diagnosis> = useCallback(
    ({item}) => (
      <DiagnosisItem
        diagnosis={item}
        onPress={() =>
          navigation.navigate('DiagnosisDetailPage', {diagnosisId: item.id})
        }
      />
    ),
    [navigation],
  );

  if (diagnosticsQuery.isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Filtrar por:</Text>
      <Picker
        selectedValue={filter}
        style={styles.picker}
        onValueChange={onFilterChange}>
        <Picker.Item label="Todos" value="Todos" />
        <Picker.Item label="Pendientes" value="Pendiente" />
        <Picker.Item label="Completados" value="Completado" />
      </Picker>
      {filter === 'Completado' && (
        <>
          <Text style={styles.label}>Ordenar por:</Text>
          <Picker
            selectedValue={sortKey}
            style={styles.picker}
            onValueChange={itemValue => setSortKey(itemValue)}>
            <Picker.Item label="Fecha" value="created_at" />
            <Picker.Item label="Severidad" value="severity" />
            {/* <Picker.Item label="Probabilidad" value="probability" /> */}
          </Picker>
        </>
      )}

      <FlatList
        // data={filteredDiagnosisData}
        // data={filteredDiagnosisData}
        style={styles.list}
        data={filteredDiagnosisData as Diagnosis[]}
        renderItem={renderItem}
        keyExtractor={item => item.id || ''}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: 10,
  },
  label: {
    marginLeft: 20,
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  picker: {
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    color: 'black',
    paddingHorizontal: 10,
    marginHorizontal: 20,

    width: 200,
  },
  list: {
    marginLeft: 20,
  },
});
