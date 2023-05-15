import {useMutation, useQuery} from '@tanstack/react-query';
import {useAuth} from '../hooks/useAuth';
import firestore from '@react-native-firebase/firestore';
import {createDiagnosisInFirestore} from '../services';
import {Diagnosis} from '../types/diagnosis';

export const useDiagnostics = () => {
  const {data: userData} = useAuth();
  const diagnosticsQuery = useQuery(['diagnostics'], async () => {
    const userRef = firestore().collection('users').doc(`${userData?.uid}`);
    const diagnosticos = await userRef.collection('diagnostics').get();
    return diagnosticos.docs.map(doc => {
      const data = doc.data() as Diagnosis;
      data.id = doc.id;
      return data;
    });
  });
  const mutateDiagnostics = useMutation({
    mutationKey: ['diagnostics'],
    mutationFn: async (diagnosis: Diagnosis) =>
      createDiagnosisInFirestore(userData?.uid || '', diagnosis),
    onSuccess: () => {
      console.log('Diagnosis created');
      diagnosticsQuery.refetch();
    },
  });
  return {
    diagnosticsQuery,
    mutateDiagnostics,
  };
};
