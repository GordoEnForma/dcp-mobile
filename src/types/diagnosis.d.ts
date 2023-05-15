import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
export interface Diagnosis {
  id?: string;
  state: string;
  result: string;
  probability: number;
  severity: string;
  photo_url: string;
  created_at: FirebaseFirestoreTypes.Timestamp;
}
