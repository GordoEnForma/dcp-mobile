import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';
import {useAuth} from '../../hooks/useAuth';
export const UserScreen = () => {
  const {data: userData, signOut} = useAuth();

  const onPress = () => {
    console.log('pressed');
    signOut();
  };
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image source={{uri: userData?.photoURL!}} style={styles.image} />
        <Text style={styles.label}>{userData?.displayName}</Text>
      </View>
      <TouchableOpacity style={styles.logout} onPress={onPress}>
        <Text style={styles.label}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'lightblue',
  },
  profile: {
    width: '100%',
    backgroundColor: '#F6F1F1',
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  image: {
    width: '50%',
    height: 200,
    borderRadius: 50,
    marginTop: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  label: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    // marginTop: 10,
  },
  logout: {
    width: '50%',
    color: 'black',
    backgroundColor: '#19A7CE',
    borderRadius: 10,
    padding: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
});
