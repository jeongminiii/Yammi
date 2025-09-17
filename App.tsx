import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import redux, { AppDispatch } from './src/action/redux';
import { setCart } from './src/action/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import ProductList from './src/screen/ProductList';
import ProductDetail from './src/screen/ProductDetail';
import CartScreen from './src/screen/Cart';

const Stack = createStackNavigator();

const InitCart = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadCart = async () => {
      try {
        const saved = await AsyncStorage.getItem('cart');
        const parsed = saved ? JSON.parse(saved) : [];
        dispatch(setCart(parsed));
      } catch (e) {
        console.error('AsyncStorage loadCart error:', e);
        dispatch(setCart([]));
      }
    };
    loadCart();
  }, [dispatch]);

  return <>{children}</>;
};

// 배지 없이 단순 아이콘
const CartIcon = () => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity
      style={{ marginRight: 15 }}
      onPress={() => navigation.navigate('Cart')}
    >
      <Icon name="heart" size={24} color="black" />
    </TouchableOpacity>
  );
};

export default function App() {
  return (
    <Provider store={redux}>
      <InitCart>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="ProductList">
            <Stack.Screen
              name="ProductList"
              component={ProductList}
              options={{
                title: '상품 목록',
                headerRight: () => <CartIcon />,
              }}
            />
            <Stack.Screen
              name="ProductDetail"
              component={ProductDetail}
              options={{
                title: '상품 상세',
                headerRight: () => <CartIcon />,
              }}
            />
            <Stack.Screen
              name="Cart"
              component={CartScreen}
              options={{ title: '장바구니' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </InitCart>
    </Provider>
  );
}
