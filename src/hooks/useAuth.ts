import {useQuery, useMutation} from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {
  createUserInFirestore,
  // downloadProfilePicture,
  // updateProfilePictureURLInFirestore,
  // uploadProfilePictureToFirebase,
} from '../services/userService';

export const useAuth = () => {
  const authQuery = useQuery(['auth'], async () => {
    const user = auth().currentUser;
    if (user) {
      try {
        await user.getIdToken(true);
      } catch (error) {
        await auth().signOut();
        return null;
      }
    }
    return user;
  });

  const signInWithGoogleMutation = useMutation({
    mutationKey: ['auth'],
    mutationFn: async () => {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      if (userCredential.user) {
        await createUserInFirestore(userCredential.user);
      }
      return userCredential.user;
    },
    onSuccess: () => {
      console.log('Signed Successfully');
      authQuery.refetch();
    },
  });

  const signOutMutation = useMutation(async () => {
    await auth().signOut();
    authQuery.refetch();
  });

  return {
    ...authQuery,
    signInWithGoogle: signInWithGoogleMutation.mutate,
    signOut: signOutMutation.mutate,
  };
};
