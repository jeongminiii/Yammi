import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Button,
  Alert,
} from 'react-native';
import { products } from '../data/data';
import { useDispatch } from 'react-redux';
import { addToCart } from '../action/action';
import { AppDispatch } from '../action/redux';

const ProductDetail = ({ route, navigation }: any) => {
  const { id } = route.params;
  const product = products.find(p => p.id === id);
  const dispatch = useDispatch<AppDispatch>();

  if (!product) return <Text>상품을 찾을 수 없습니다.</Text>;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: product.id,
        name: product.name,
        price: product.salePrice,
        image: product.image,
        quantity: 1, //수량
      }),
    );

    Alert.alert('장바구니에 담았습니다', '장바구니로 이동할까요?', [
      { text: '취소', style: 'cancel' },
      { text: '이동', onPress: () => navigation.navigate('Cart') },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>원가: {product.originalPrice}원</Text>
      <Text style={styles.salePrice}>할인가: {product.salePrice}원</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Button title="장바구니 담기" onPress={handleAddToCart} />
    </ScrollView>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  image: { width: 250, height: 250, borderRadius: 10, marginBottom: 20 },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 16, color: 'gray', marginBottom: 5 },
  salePrice: { fontSize: 18, color: 'red', marginBottom: 15 },
  description: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
});
