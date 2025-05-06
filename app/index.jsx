import { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function Home() {
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
      .then(res => res.json())
      .then(data => setCategories(data.categories));
  }, []);

  return (
    <View style={{flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#f8f9fa'}}>
        <FlatList
          data={categories}
          keyExtractor={(item) => item.idCategory}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/category/${item.strCategory}`)}
            >
              <Image source={{ uri: item.strCategoryThumb }} style={styles.image} />
              <Text style={styles.text}>{item.strCategory}</Text>
            </TouchableOpacity>
          )}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
    borderRadius: 12,
    width: 300,
    overflow: 'hidden',
    backgroundColor: '#eee',
    alignItems: 'center',
  },
  image: {
    center: 'center',
    width: 250,
    height: 150,
    marginTop: 10,
  },
  text: {
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
