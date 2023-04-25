import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {
  launchCamera,
  launchImageLibrary,
  MediaType,
  CameraOptions,
} from 'react-native-image-picker';

export const HomeScreen = () => {
  const options: CameraOptions = {
    mediaType: 'photo' as MediaType,
    quality: 1,
  };
  const takePhoto = () => {
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled taking a photo');
      } else if (response.errorMessage) {
        console.log('ImagePicker error: ', response.errorMessage);
      } else {
        console.log('Photo taken successfully');
      }
    });
  };

  const choosePhotoFromLibrary = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled choosing a photo');
      } else if (response.errorMessage) {
        console.log('ImagePicker error: ', response.errorMessage);
      } else {
        console.log('Photo selected from library successfully');
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={takePhoto} style={styles.button}>
          <Text style={styles.buttonText}>Tomar una foto</Text>
        </TouchableOpacity>
        <Text style={styles.separatorText}>o</Text>
        <TouchableOpacity
          onPress={choosePhotoFromLibrary}
          style={styles.button}>
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
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
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
    marginVertical: 10,
  },
});
