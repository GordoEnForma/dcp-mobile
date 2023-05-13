import {useQuery} from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
export const useDiagnostics = () => {
  const diagnosticsQuery = useQuery(['diagnostics'], async () => {
    const diagnosticos = await firestore().collection('diagnosis').get();
    return diagnosticos.docs.map(doc => doc.data());
  });

  return {
    diagnosticsQuery,
  };
};
