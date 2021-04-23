import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, View, FlatList, Alert } from 'react-native';
import { formatDistance } from 'date-fns';
import ptBr from 'date-fns/locale/pt-BR';
import { loadPlant, PlantProps, deletePlant } from '../libs/storage';

import { Header } from '../components/Header';

import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Loading } from '../components/Loading';

interface Params {
  plant: PlantProps;
}

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  function handleRemovePlant(plant: PlantProps) {
    Alert.alert('Remover', `Deseja remover a ${plant.name}?`, [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        onPress: async () => {
          try {
            await deletePlant(plant);
            setMyPlants((oldData) =>
              oldData.filter((item) => item.id !== plant.id)
            );
          } catch (error) {
            Alert.alert('Não foi possível remover!');
          }
        },
      },
    ]);
  }

  useEffect(() => {
    async function loadStorageData() {
      const plantSorted = await loadPlant();
      if (plantSorted.length > 0) {
        const nextTime = formatDistance(
          new Date(plantSorted[0].dateTimeNotification).getTime(),
          new Date().getTime(),
          { locale: ptBr }
        );

        setNextWatered(
          `Não esqueça de regar a  ${plantSorted[0].name} à ${nextTime}`
        );
      } else {
        setNextWatered('Não possui plantas agendadas.');
      }

      setMyPlants(plantSorted);
      setLoading(false);
    }

    loadStorageData();
  }, []);

  if (loading) return <Loading />;
  return (
    <View style={styles.container}>
      <Header title="Minha Plantas" />
      <View style={styles.spotlight}>
        <Image source={waterdrop} style={styles.spotlightImage} />
        <Text style={styles.spotlightText}>{nextWatered}</Text>
      </View>
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
        {myPlants.length > 0 && (
          <FlatList
            data={myPlants}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <PlantCardSecondary
                data={item}
                handleRemovePlant={() => handleRemovePlant(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotlight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spotlightImage: {
    width: 60,
    height: 60,
  },
  spotlightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
    textAlign: 'justify',
  },
  plants: {
    flex: 1,
    width: '100%',
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    paddingVertical: 10,
  },
  plantsTitleAgendadas: {
    fontFamily: fonts.text,
    color: colors.blue,
  },
});
