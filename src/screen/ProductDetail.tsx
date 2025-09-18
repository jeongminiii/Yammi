import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
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
    <View style={styles.view}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <Text style={styles.price}>가격 : {product.originalPrice}원</Text>
      <Text style={styles.salePrice}>할인가 : {product.salePrice}원</Text>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>장바구니 담기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductDetail;

const styles = StyleSheet.create({
  view: {
    padding: 20,
  },
  image: {
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  name: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  price: { fontSize: 16, color: 'gray', marginBottom: 10 },
  salePrice: { fontSize: 17, color: 'red', marginBottom: 15 },
  description: { fontSize: 14, marginBottom: 20 },
  button: {
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
