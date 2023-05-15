import React from 'react';
import {View, Text, Image, StyleSheet, ActivityIndicator} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {useDiagnosticDetail} from '../../../hooks';

export const DiagnosisDetailScreen: React.FC = () => {
  const route = useRoute();
  const {diagnosisId} = route.params;
  const {diagnosticDetailQuery} = useDiagnosticDetail(diagnosisId);

  if (diagnosticDetailQuery.isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: diagnosticDetailQuery.data?.photo_url}}
      />
      <Text style={styles.label}>Fecha de Diagnostico:</Text>
      <Text style={styles.data}>
        {diagnosticDetailQuery.data?.created_at.toDate().toLocaleDateString()}
      </Text>
      <Text style={styles.label}>Usted Presenta:</Text>
      <Text style={styles.data}>{diagnosticDetailQuery.data?.result}</Text>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.label}>Probabilidad:</Text>
          <Text style={styles.data}>
            %{diagnosticDetailQuery.data?.probability.toFixed(2)}
          </Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.label}>Severidad:</Text>
          <Text style={styles.data}>
            {diagnosticDetailQuery.data?.severity}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 350,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  data: {
    color: 'black',
    textTransform: 'capitalize',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  loading: {
    flex: 1,
  },
});
