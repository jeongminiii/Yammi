import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { products } from '../data/data';

const { width, height } = Dimensions.get('window');
const ITEM_WIDTH = (width - 70) / 2;
const ITEM_HEIGHT = (height - 200) / 5;

const ProductList = ({ navigation }: any) => {
  const pageSize = 10; // 10개씩 보여야함
  const [page, setPage] = useState(1);

  const displayedProducts = products.slice(0, page * pageSize);

  const onEndReached = () => {
    if (displayedProducts.length < products.length) {
      setPage(prev => prev + 1);
    }
  };

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ProductDetail', { id: item.id })}
      //상품 상세 보기 - 목록 클릭시 id로 상세 조회
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>{item.originalPrice}원</Text>
      <Text style={styles.disprice}>{item.salePrice}원</Text>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={displayedProducts}
      keyExtractor={item => item.id.toString()}
      renderItem={renderItem}
      numColumns={2} // 열
      columnWrapperStyle={styles.row} // 행
      contentContainerStyle={styles.listContainer}
      onEndReached={onEndReached} // 무한 스크롤
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemContainer: {
    //width: ITEM_WIDTH,
    //height: ITEM_HEIGHT,
    //backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
    //paddingBottom: 5,
    // elevation: 2,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.2,
    // shadowRadius: 1,
  },
  image: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT * 0.8,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  price: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    textDecorationLine: 'line-through',
  },
  disprice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#e60012',
    marginTop: 2,
  },
});
