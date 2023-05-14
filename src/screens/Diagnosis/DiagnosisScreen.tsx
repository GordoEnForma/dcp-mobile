import React, {useCallback, useMemo, useState} from 'react';
import {View, FlatList, StyleSheet, ListRenderItem, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {DiagnosisData} from '../../types/diagnosis';
import {DiagnosisItem} from '../../components/DiagnosisItem';
import {useDiagnostics} from '../../hooks/useDiagnostics';

const diagnosisData: DiagnosisData[] = [
  // Create 10 diagnosis data with state 'Pendiente' and 'Completado' without using ...Array.from()
  {
    id: '1',
    state: 'Pendiente',
    created_at: new Date(2021, 1, 1),
    photo_url:
      'https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg',
  },
  {
    id: '2',
    state: 'Pendiente',
    created_at: new Date(2021, 1, 2),
    photo_url:
      'https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg',
  },
  {
    id: '3',
    state: 'Completado',
    created_at: new Date(2021, 1, 3),
    photo_url:
      'https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg',
    diagnosis: {
      result: 'Result 3',
      probability: 0.3,
      severity: 'Severity 3',
    },
  },
  {
    id: '4',
    state: 'Completado',
    created_at: new Date(2021, 1, 4),
    photo_url:
      'https://www.cdc.gov/healthypets/images/pets/cute-dog-headshot.jpg',
    diagnosis: {
      result: 'Result 2',
      probability: 0.56,
      severity: 'Severity 1',
    },
  },
];

export const DiagnosisScreen: React.FC = () => {
  const [filter, setFilter] = useState('Todos');
  const [sortKey, setSortKey] = useState<keyof DiagnosisData>('created_at');
  const navigation = useNavigation();
  const {diagnosticsQuery} = useDiagnostics();

  const compareDiagnosisData = useCallback(
    (a: DiagnosisData, b: DiagnosisData) => {
      const aValue = a[sortKey as keyof DiagnosisData] ?? 0;
      const bValue = b[sortKey as keyof DiagnosisData] ?? 0;

      if (aValue < bValue) {
        return 1;
      } else if (aValue > bValue) {
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
        ? diagnosisData
        : diagnosisData.filter(data => data.state === filter);

    return filteredData.sort(compareDiagnosisData);
  }, [filter, compareDiagnosisData]);

  const onFilterChange = useCallback((itemValue: string) => {
    setFilter(itemValue);
  }, []);

  const renderItem: ListRenderItem<DiagnosisData> = useCallback(
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
    return <Text>Loading...</Text>;
  }
  console.log(diagnosticsQuery.data);
  return (
    <View style={styles.container}>
      {diagnosticsQuery.isLoading ? <Text>Loading...</Text> : <Text>Aea</Text>}
      <Picker
        selectedValue={filter}
        style={styles.picker}
        onValueChange={onFilterChange}>
        <Picker.Item label="Todos" value="Todos" />
        <Picker.Item label="Pendientes" value="Pendiente" />
        <Picker.Item label="Completados" value="Completado" />
      </Picker>
      {filter === 'Completado' && (
        <Picker
          selectedValue={sortKey}
          style={styles.picker}
          onValueChange={itemValue => setSortKey(itemValue)}>
          <Picker.Item label="Ordenar por fecha" value="created_at" />
          <Picker.Item label="Ordenar por severidad" value="severity" />
          <Picker.Item label="Ordenar por probabilidad" value="probability" />
          <Picker.Item label="Ordenar por resultado" value="result" />
        </Picker>
      )}
      <FlatList
        data={filteredDiagnosisData}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  picker: {
    alignSelf: 'flex-end',
    backgroundColor: 'white',
    margin: 10,
    color: 'black',
    paddingHorizontal: 10,
    marginHorizontal: 20,
    width: 200,
  },
});
