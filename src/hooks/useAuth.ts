import {useQuery, useMutation} from '@tanstack/react-query';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export const useAuth = () => {
  const authQuery = useQuery(
    ['auth'],
    async () => {
      const user = auth().currentUser;
      return user;
    },
    {
      staleTime: Infinity, // The user won't change often, so we can say the data is never stale
    },
  );

  const signInWithGoogleMutation = useMutation({
    mutationKey: ['auth'],
    mutationFn: async () => {
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    },
    onSuccess: () => {
      console.log('Signed Successfully');
      authQuery.refetch();
    },
  });

  const signOutMutation = useMutation(async () => {
    await auth().signOut();
  });

  return {
    ...authQuery,
    signInWithGoogle: signInWithGoogleMutation.mutate,
    signOut: signOutMutation.mutate,
  };
};
