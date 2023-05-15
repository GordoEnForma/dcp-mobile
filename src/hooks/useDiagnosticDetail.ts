import firestore from '@react-native-firebase/firestore';
import {useQuery} from '@tanstack/react-query';
import {useAuth} from './useAuth';
import {Diagnosis} from '../types/diagnosis';

export const useDiagnosticDetail = (diagnosticId: string) => {
  const {data: userData} = useAuth();
  const diagnosticDetailQuery = useQuery(
    ['diagnosticDetail', diagnosticId],
    async () => {
      const userRef = firestore().collection('users').doc(`${userData?.uid}`);
      const diagnostic = await userRef
        .collection('diagnostics')
        .doc(diagnosticId)
        .get();
      const data = diagnostic.data() as Diagnosis;
      data.id = diagnostic.id;
      return data;
    },
  );
  return {
    diagnosticDetailQuery,
  };
};
