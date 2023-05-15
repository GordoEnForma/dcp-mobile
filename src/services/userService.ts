import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import RNFetchBlob from 'rn-fetch-blob';

// Crear un usuario en Firestore
export const createUserInFirestore = async (user: FirebaseAuthTypes.User) => {
  const userRef = firestore().collection('users').doc(user.uid);
  const userDoc = await userRef.get();
  if (!userDoc.exists) {
    await userRef.set({
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      photoURL: user.photoURL,
    });
  }
};

// Descargar la foto de perfil a un archivo temporal
export const downloadProfilePicture = async (photoURL: string) => {
  const {fs} = RNFetchBlob;
  const tmpDir = fs.dirs.CacheDir;
  const filePath = `${tmpDir}/${Date.now()}.jpg`;
  await RNFetchBlob.config({fileCache: true, appendExt: 'jpg'}).fetch(
    'GET',
    photoURL,
  );
  return filePath;
};

// Subir la foto de perfil a Firebase Storage
export const uploadProfilePictureToFirebase = async (
  filePath: string,
  uid: FirebaseAuthTypes.User['uid'],
) => {
  const storageRef = storage().ref(`users/${uid}/profilePicture.jpg`);
  await storageRef.putFile(filePath);
  return storageRef.getDownloadURL();
};

// Actualizar el URL de la foto de perfil en Firestore
export const updateProfilePictureURLInFirestore = async (
  uid: FirebaseAuthTypes.User['uid'],
  photoURL: string,
) => {
  const userRef = firestore().collection('users').doc(uid);
  await userRef.update({photoURL});
};

// Función principal
export const createUserInFirestoreAndStorage = async (
  user: FirebaseAuthTypes.User,
) => {
  await createUserInFirestore(user);

  const filePath = await downloadProfilePicture(user.photoURL || '');

  const newPhotoURL = await uploadProfilePictureToFirebase(filePath, user.uid);

  await updateProfilePictureURLInFirestore(user.uid, newPhotoURL);

  // Eliminar el archivo temporal
  await RNFetchBlob.fs.unlink(filePath);

  return newPhotoURL;
};
