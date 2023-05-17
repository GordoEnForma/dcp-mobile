// diagnosisService.js
import axios from 'axios';
import firestore from '@react-native-firebase/firestore';
import {Diagnosis} from '../types/diagnosis';

const SEVERITY: {[key: string]: number} = {
  'lesiones benignas similares a queratosis': 1,
  dermatofibroma: 1,
  'nevo melanocitico': 2,
  'vascular lesions': 2,
  'queratosis actinicas': 3,
  'carcinoma de celulas basales': 4,
  melanoma: 5,
};

export const getDiagnosisFromServer = async (photoURL: string) => {
  // Reemplace esta URL con la URL de su servidor
  const serverUrl = 'https://dcp-api-docker.azurewebsites.net/predict';
  // Enviar la URL de la foto al servidor y obtener la respuesta
  const response = await axios.post<{
    prediction: string;
    probability: number;
    filename: string;
  }>(
    serverUrl,
    {},
    {
      params: {
        url: photoURL,
      },
    },
  );
  // Puede que necesites ajustar esta línea dependiendo de cómo tu servidor devuelva la respuesta
  const responseData = response.data;
  // console.log(responseData.prediction);
  const diagnosis = {
    state: 'Completado',
    result: responseData.prediction,
    probability: responseData.probability,
    severity: SEVERITY[responseData.prediction.toLowerCase()],
    photo_url: photoURL,
    created_at: new Date(),
  };
  console.log(diagnosis);
  return diagnosis;
};

export const createDiagnosisInFirestore = async (
  userId: string,
  diagnosis: Diagnosis,
) => {
  try {
    const userRef = firestore().collection('users').doc(userId);
    console.log('Creanding el diagnostico en firestore');
    await userRef.collection('diagnostics').add(diagnosis);
  } catch (e) {
    console.log(e);
  }
};
