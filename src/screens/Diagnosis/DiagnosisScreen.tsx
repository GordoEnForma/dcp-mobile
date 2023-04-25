import React, {useCallback, useMemo, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ListRenderItem,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

interface DiagnosisData {
  id: string;
  state: 'Pendiente' | 'Completado';
  created_at: Date;
  photo_url: string;
  diagnosis?: {
    result: string;
    probability: number;
    severity: string;
  };
}

interface DiagnosisItemProps {
  diagnosis: DiagnosisData;
  onPress: () => void;
}

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
];

const DiagnosisItem: React.FC<DiagnosisItemProps> = ({diagnosis, onPress}) => {
  const {
    state,
    created_at,
    photo_url,
    diagnosis: {result, probability, severity} = {},
  } = diagnosis;

  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Image source={{uri: photo_url}} style={styles.thumbnail} />
      <View style={styles.itemText}>
        <Text style={styles.title}>{state}</Text>
        <Text style={styles.date}>{created_at.toLocaleDateString()}</Text>
        {result && <Text style={styles.result}>Resultado: {result}</Text>}
        {probability && (
          <Text style={styles.probability}>Probabilidad: {probability}</Text>
        )}
        {severity && <Text style={styles.severity}>Severidad: {severity}</Text>}
      </View>
    </TouchableOpacity>
  );
};

export const DiagnosisScreen: React.FC = () => {
  const [filter, setFilter] = useState('Todos');
  const [sortKey, setSortKey] = useState<keyof DiagnosisData>('created_at');
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
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
  },
  picker: {
    width: '50%',
    backgroundColor: 'white',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  thumbnail: {
    width: 150,
    height: 100,
  },
  itemText: {
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    color: '#999',
  },
  result: {
    color: '#333',
  },
  probability: {
    color: '#555',
  },
  severity: {
    color: '#777',
  },
});
