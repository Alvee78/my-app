import { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function CategoryPage() {
  const { category } = useLocalSearchParams();
  const [meals, setMeals] = useState([]);
  const router = useRouter();

  // Get screen width to determine the number of columns
  const screenWidth = Dimensions.get('window').width;
  const numColumns = screenWidth < 600 ? 2 : 4; // 2 columns for small screens, 3 for larger screens

  useEffect(() => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      .then(res => res.json())
      .then(data => setMeals(data.meals));
  }, [category]);

  return (
    <FlatList
      data={meals}
      keyExtractor={(item) => item.idMeal}
      contentContainerStyle={styles.container}
      numColumns={numColumns} // Dynamically set the number of columns
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push(`/meal/${item.idMeal}`)}
        >
          <Image source={{ uri: item.strMealThumb }} style={styles.image} />
          <Text style={styles.text}>{item.strMeal}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    margin: 8,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 150,
  },
  text: {
    padding: 10,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});