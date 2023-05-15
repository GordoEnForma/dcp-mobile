import React, {useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Platform,
  UIManager,
  ScrollView,
} from 'react-native';
import {AccordionList} from 'react-native-accordion-list-view';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialIcons';
const recomendaciones = [
  {
    id: 10,
    title: 'Protege tu piel del sol',
    body: 'La exposición al sol es uno de los principales factores de riesgo para las enfermedades de la piel, como las queratosis actínicas, el carcinoma de células basales y el melanoma. Para proteger tu piel, usa protector solar con un FPS de al menos 30 y evita la exposición al sol entre las 10 a.m. y las 4 p.m., cuando los rayos solares son más intensos.',
  },
  {
    id: 12,
    title: 'Observa tu piel',
    body: 'Es importante examinar regularmente tu piel en busca de cambios como manchas nuevas, lesiones, marcas o cambios en la forma, tamaño o color de las manchas existentes. Si notas algo sospechoso, haz una cita con un dermatólogo.',
  },
  {
    id: 13,
    title: 'Usa ropa protectora',
    body: 'Usar ropa de protección, como sombreros de ala ancha, camisas de manga larga y pantalones, puede ayudar a proteger la piel del sol.',
  },
  {
    id: 14,
    title: 'Mantén una buena higiene de la piel',
    body: 'Lavarse la piel regularmente con agua tibia y un jabón suave puede ayudar a prevenir infecciones y otros problemas de la piel.',
  },
];
const lesiones = [
  {
    id: 2,
    title: 'Nevo melanocítico (Lunar)',
    body: 'Es una lesión pigmentada en la piel, también conocida como lunar. La mayoría de los nevos son inofensivos, pero algunos pueden convertirse en melanoma.',
  },
  {
    id: 0,
    title: 'Lesiones benignas similares a queratosis',
    body: 'Son manchas planas, ásperas y escamosas que aparecen en la piel debido a la exposición al sol. A menudo son inofensivas, pero pueden ser una señal de que la piel ha sufrido daño',
  },
  {
    id: 1,
    title: 'Dermatofibroma',
    body: 'Es una lesión pequeña y dura en la piel que generalmente es benigna. Por lo general, no requiere tratamiento a menos que cause irritación o incomodidad.',
  },
  {
    id: 3,
    title: 'Lesiones vasculares',
    body: 'Son lesiones en la piel causadas por un agrandamiento de los vasos sanguíneos. Incluyen manchas de vino de Oporto, hemangiomas y malformaciones vasculares.',
  },
  {
    id: 4,
    title: 'Queratosis actínicas',
    body: 'Son manchas escamosas y ásperas en la piel que se desarrollan como resultado de la exposición crónica al sol. Si se dejan sin tratar, pueden convertirse en un cáncer de piel más agresivo.',
  },
  {
    id: 5,
    title: 'Carcinoma de células basales',
    body: 'Es un tipo de cáncer de piel que se desarrolla en las células basales de la piel. Es el tipo de cáncer de piel más común y por lo general se puede tratar con éxito si se detecta temprano.',
  },
  {
    id: 6,
    title: 'Melanoma',
    body: 'es un tipo de cáncer de piel que se desarrolla en los melanocitos, las células que producen pigmento en la piel. Es el tipo de cáncer de piel más peligroso y puede propagarse a otras partes del cuerpo si no se trata a tiempo.',
  },
];

export const InformationScreen = () => {
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Lesiones de la piel</Text>
          </View>
          <AccordionList
            data={lesiones}
            customTitle={item => (
              <Text style={styles.subTitle}>{item.title}</Text>
            )}
            customBody={item => <Text style={styles.text}>{item.body}</Text>}
            animationDuration={400}
            customIcon={() => (
              <MaterialCommunityIcon
                name="keyboard-arrow-right"
                size={30}
                color={'black'}
              />
            )}
          />
        </View>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Recomendaciones</Text>
          </View>
          <AccordionList
            data={recomendaciones}
            customTitle={item => (
              <Text style={styles.subTitle}>{item.title}</Text>
            )}
            customBody={item => <Text style={styles.text}>{item.body}</Text>}
            animationDuration={400}
            customIcon={() => (
              <MaterialCommunityIcon
                name="keyboard-arrow-right"
                size={30}
                color={'black'}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: '2%',
    paddingHorizontal: '3%',
    height: 480,
    backgroundColor: '#e7e7e7',
  },
  title: {
    fontSize: 25,
    color: 'black',
    fontWeight: 'bold',
    marginVertical: '5%',
    marginHorizontal: '1%',
  },
  subTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },

  text: {
    fontSize: 15,
    textAlign: 'justify',
    color: 'black',
  },
});
