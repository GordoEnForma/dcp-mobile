import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Diagnosis} from '../types/diagnosis';

interface DiagnosisItemProps {
  diagnosis: Diagnosis;
  onPress: () => void;
}

export const DiagnosisItem: React.FC<DiagnosisItemProps> = ({
  diagnosis,
  onPress,
}) => {
  const {state, created_at, photo_url, severity} = diagnosis;

  const stateColor = state === 'Pendiente' ? '#AB8080' : '#009606';
  const createdAtDate = created_at.toDate();
  const createdAtString = `${createdAtDate.getDate()}/${
    createdAtDate.getMonth() + 1
  }/${createdAtDate.getFullYear()}`;

  return (
    <TouchableOpacity style={[styles.item, styles.shadow]} onPress={onPress}>
      <Image
        source={{uri: photo_url}}
        style={styles.thumbnail}
        resizeMode="stretch"
      />
      <View style={styles.itemText}>
        <View style={styles.stateContainer}>
          <Text style={styles.label}>Estado: </Text>
          <Text style={[styles.title, {color: stateColor}]}>{state}</Text>
        </View>
        <Text style={styles.date}>Fecha: {createdAtString}</Text>
        <View style={styles.stateContainer}>
          <Text style={styles.label}>Severidad: </Text>
          <Text style={styles.severity}>{severity}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 15,
    width: 350,
  },
  shadow: {
    shadowColor: '#171717',
    shadowOffset: {width: -3, height: 4},
    shadowOpacity: 0.7,
    shadowRadius: 4,
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
    alignItems: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
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
