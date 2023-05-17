/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
  CameraOptions,
} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialIcons';
import {useAuth} from '../../hooks/useAuth';
import {uploadImageToStorage} from '../../services/storageServices';
import {getDiagnosisFromServer} from '../../services/diagnosisService';
import {useDiagnostics} from '../../hooks';

export const HomeScreen = () => {
  const {data: user} = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);
  const navigation = useNavigation();
  const {mutateDiagnostics} = useDiagnostics();
  const options: CameraOptions = {
    mediaType: 'photo' as MediaType,
    quality: 1,
  };
  const takePhoto = () => {
    launchCamera(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled taking a photo');
      } else if (response.errorMessage) {
        console.log('ImagePicker error: ', response.errorMessage);
      } else {
        console.log('Photo taken successfully');
        console.log(response.assets![0].uri);
        const cachePhoto = response.assets![0].uri!;
        setIsLoading(true);
        try {
          const photoUrl = await uploadImageToStorage(cachePhoto, user!.uid);
          console.log(photoUrl);
          const diagnosis = await getDiagnosisFromServer(photoUrl);
          // await createDiagnosisInFirestore(user?.uid || '', diagnosis);
          console.log(diagnosis);
          mutateDiagnostics.mutateAsync(diagnosis).then(() => {
            setIsLoading(false);
            navigation.navigate('Diagnosticos', {screen: 'DiagnosisList'});
            ToastAndroid.show('Diagnóstico creado', ToastAndroid.SHORT);
          });
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      }
    });
  };

  const choosePhotoFromLibrary = () => {
    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled choosing a photo');
      } else if (response.errorMessage) {
        console.log('ImagePicker error: ', response.errorMessage);
      } else {
        console.log('Photo chosen successfully');
        console.log(response.assets![0].uri);
        const cachePhoto = response.assets![0].uri!;
        setIsLoading(true);
        try {
          const photoUrl = await uploadImageToStorage(cachePhoto, user!.uid);
          console.log(photoUrl);
          const diagnosis = await getDiagnosisFromServer(photoUrl);
          // await createDiagnosisInFirestore(user?.uid || '', diagnosis);
          console.log(diagnosis);
          mutateDiagnostics.mutateAsync(diagnosis).then(() => {
            setIsLoading(false);
            navigation.navigate('Diagnosticos', {screen: 'DiagnosisList'});
            ToastAndroid.show('Diagnóstico creado', ToastAndroid.SHORT);
          });
        } catch (error) {
          setIsLoading(false);
          console.log(error);
        }
      }
    });
  };
  if (isLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Bienvenido</Text>
        <Text style={styles.textName}>
          {user?.email ? `${user.displayName}` : ''}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          <MaterialCommunityIcon
            name="camera-alt"
            color={'white'}
            size={25}
            style={{marginRight: 10}}
          />
          <Text style={styles.buttonText}>Tomar una foto</Text>
        </TouchableOpacity>
        <Text style={styles.separatorText}>o</Text>
        <TouchableOpacity
          onPress={choosePhotoFromLibrary}
          style={styles.button}>
          <MaterialCommunityIcon
            name="drive-folder-upload"
            color={'white'}
            size={25}
            style={{marginRight: 10}}
          />
          <Text style={styles.buttonText}>Subir una foto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: '300',
    textAlign: 'center',
    color: 'black',
  },
  textName: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: 'black',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    // marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  separatorText: {
    // backgroundColor: 'red',
    fontSize: 20,
    color: 'black',
    marginVertical: 10,
  },
});
