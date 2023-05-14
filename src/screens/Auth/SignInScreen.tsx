import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useAuth} from '../../hooks/useAuth';

export const SignInScreen = () => {
  const {signInWithGoogle} = useAuth();

  const onGoogleButtonPress = async () => {
    try {
      signInWithGoogle();
      console.log('Signed in with Google!');
    } catch (error) {
      console.error('Failed to sign in with Google: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenido a la App</Text>
      <View style={styles.button}>
        <Button
          title="Iniciar sesión con Google"
          onPress={onGoogleButtonPress}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: {fontSize: 20, fontWeight: 'bold', textAlign: 'center'},
  button: {width: 200, marginHorizontal: 20, marginVertical: 10},
});
