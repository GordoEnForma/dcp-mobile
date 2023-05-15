import storage from '@react-native-firebase/storage';

export const uploadImageToStorage = async (photo: string, userId: string) => {
  const path = `${userId}/${Date.now()}`;
  const reference = storage().ref(path);

  await reference.putFile(photo);

  const url = await reference.getDownloadURL();
  return url;
};
