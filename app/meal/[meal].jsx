import { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MealPage() {
  const { meal } = useLocalSearchParams(); // Correct parameter name
  const [mealData, setMealData] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`);
        const data = await response.json();
        if (data.meals && data.meals.length > 0) {
          setMealData(data.meals[0]);
        } else {
          setMealData(null); // No meal found
        }
      } catch (error) {
        console.error(error);
        setMealData(null); // Handle error
      }
    };

    fetchMeal();
  }, [meal]);

  if (!mealData) return <Text style={styles.error}>Meal not found or loading failed.</Text>;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: mealData.strMealThumb }} style={styles.image} />
      <Text style={styles.title}>{mealData.strMeal}</Text>
      <Text style={styles.subtitle}>Category: {mealData.strCategory}</Text>
      <Text style={styles.subtitle}>Area: {mealData.strArea}</Text>
      <Text style={styles.sectionTitle}>Instructions:</Text>
      <Text style={styles.instructions}>{mealData.strInstructions}</Text>
      <Text style={styles.sectionTitle}>Ingredients:</Text>
      {Object.keys(mealData).map((key) => {
        if (key.startsWith('strIngredient') && mealData[key]) {
          return (
            <Text key={key} style={styles.ingredient}>
              {mealData[key]} - {mealData[`strMeasure${key.slice(13)}`]}
            </Text>
          );
        }
        return null;
      })}
      {mealData.strSource && (
        <Text style={styles.source}>
          Source: <Text style={styles.link}>{mealData.strSource}</Text>
        </Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginTop: 16,
    marginBottom: 8,
  },
  instructions: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',
    marginBottom: 12,
  },
  ingredient: {
    fontSize: 16,
    color: '#444',
    marginBottom: 4,
  },
  source: {
    fontSize: 16,
    color: '#444',
    marginTop: 16,
  },
  link: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});