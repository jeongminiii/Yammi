import React from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../action/redux';
import { updateQuantity, removeFromCart, clearCart } from '../action/action';

const CartScreen = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cart}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text>{item.price}원</Text>
              <Text>수량: {item.quantity}</Text>
              <View style={styles.row}>
                <Button
                  title="+"
                  onPress={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      }),
                    )
                  }
                />
                <Button
                  title="-"
                  onPress={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1,
                      }),
                    )
                  }
                />
                <Button
                  title="삭제"
                  color="red"
                  onPress={() => dispatch(removeFromCart(item.id))}
                />
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>장바구니가 비어있습니다.</Text>}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>총합: {total}원</Text>
        <Button title="전체 비우기" onPress={() => dispatch(clearCart())} />
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  image: { width: 60, height: 60, borderRadius: 5 },
  name: { fontSize: 16, fontWeight: 'bold' },
  row: { flexDirection: 'row', marginTop: 5, gap: 5 },
  footer: { marginTop: 20, alignItems: 'center' },
  total: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
});
