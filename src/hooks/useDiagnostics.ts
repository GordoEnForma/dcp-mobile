import {useQuery} from '@tanstack/react-query';
import firestore from '@react-native-firebase/firestore';
export const useDiagnostics = () => {
  const diagnosticsQuery = useQuery(['diagnostics'], async () => {
    const diagnosticos = await firestore().collection('users').get();
    // .doc('d9lDEsXB66anCAoT8xgu')
    // .collection('diagnostics')
    // return diagnosticos.docs.map(doc => doc.data());
    return diagnosticos.docs.map(doc => doc.data());
  });

  return {
    diagnosticsQuery,
  };
};
