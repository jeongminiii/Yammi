import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../action/redux';
import { updateQuantity, removeFromCart, clearCart } from '../action/action';
import Icon from 'react-native-vector-icons/Ionicons';

const CartScreen = () => {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch<AppDispatch>();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

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

              <View style={styles.quantityRow}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity - 1,
                      }),
                    )
                  }
                >
                  <Text style={styles.qtyButtonText}>-</Text>
                </TouchableOpacity>

                <Text style={styles.quantityText}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() =>
                    dispatch(
                      updateQuantity({
                        id: item.id,
                        quantity: item.quantity + 1,
                      }),
                    )
                  }
                >
                  <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.qtyButton, { backgroundColor: '#333' }]}
                  onPress={() => dispatch(removeFromCart(item.id))}
                >
                  <Icon name="trash" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>장바구니가 비어있습니다.</Text>
        }
      />

      {/* 하단 총합 */}
      <View style={styles.footer}>
        <View style={styles.Row}>
          <Text style={styles.total}>총 메뉴 수</Text>
          <Text style={styles.total}>{totalQuantity}개</Text>
        </View>

        <View style={styles.Row}>
          <Text style={styles.total}>결제예정금액</Text>
          <Text style={styles.total}> {total}원</Text>
        </View>
        <View style={styles.Row}>
          <TouchableOpacity
            style={[
              styles.qtyButton,
              { backgroundColor: '#333', marginTop: 10 },
            ]}
            onPress={() => dispatch(clearCart())}
          >
            <Text style={[styles.qtyButtonText, { color: 'white' }]}>
              전체 삭제
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.qtyButton,
              { backgroundColor: '#333', marginTop: 10 },
            ]}
          >
            <Text style={[styles.qtyButtonText, { color: 'white' }]}>
              주문하기{' '}
            </Text>
          </TouchableOpacity>
        </View>
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
  image: { width: 70, height: 70, borderRadius: 5, marginRight: 5 },
  name: { fontSize: 16, fontWeight: 'bold', marginBottom: 5 },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 20,
  },
  qtyButton: {
    backgroundColor: '#eee',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 5,
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20, // 내부 여백
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },

  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  Row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  empty: { fontSize: 18, textAlign: 'center' },
});
