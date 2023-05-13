import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, StyleSheet, Text, View} from 'react-native';
import {DiagnosisData} from '../types/diagnosis';

interface DiagnosisItemProps {
  diagnosis: DiagnosisData;
  onPress: () => void;
}

export const DiagnosisItem: React.FC<DiagnosisItemProps> = ({
  diagnosis,
  onPress,
}) => {
  const {
    state,
    created_at,
    photo_url,
    diagnosis: {result, probability, severity} = {},
  } = diagnosis;

  const stateColor = state === 'Pendiente' ? '#AB8080' : '#009606';
  return (
    <TouchableOpacity style={styles.item} onPress={onPress}>
      <Image source={{uri: photo_url}} style={styles.thumbnail} />
      <View style={styles.itemText}>
        <View style={styles.stateContainer}>
          <Text style={styles.label}>Estado: </Text>
          <Text style={[styles.title, {color: stateColor}]}>{state}</Text>
        </View>
        <Text style={styles.date}>
          Fecha: {created_at.toLocaleDateString()}
        </Text>
        {result && <Text style={styles.result}>Resultado: {result}</Text>}
        {probability && (
          <Text style={styles.probability}>Probabilidad: {probability}</Text>
        )}
        {severity && <Text style={styles.severity}>Severidad: {severity}</Text>}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 15,
    width: 350,
  },
  thumbnail: {
    width: 150,
    height: 100,
  },
  itemText: {
    marginLeft: 10,
  },
  stateContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
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
