import React, { createContext, useState, useContext } from 'react';
import { login, coffeeList } from '../services';
import AsyncStorage from '@react-native-community/async-storage';

export const Context = createContext({});

const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(`@cache_${key}`, value);
    return value;
  } catch (e) {
    // saving error
  }
};

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(`@cache_${key}`);
    return value;
  } catch (e) {
    // error reading value
  }
};

const removeData = async key => {
  try {
    await AsyncStorage.removeItem(`@cache_${key}`);
  } catch (e) {
    // error reading value
  }
};

export const useStorage = () => {
  const storage = useContext(Context);

  return storage;
};

export default ({ children }) => {
  const [loggedUser, setLoggedUser] = useState(null);
  const [coffees, setCoffees] = useState([]);

  const getCacheLoggedUserFn = () => {
    return getData('loggedUser')
      .then(cacheLoggedUserString => JSON.parse(cacheLoggedUserString))
      .then(cacheLoggedUser => {
        setLoggedUser(cacheLoggedUser);
        return cacheLoggedUser;
      });
  };

  const loginFn = (email, password) => {
    return login(email, password)
      .then(response => response.data)
      .then(data => {
        console.log(data);
        return storeData('loggedUser', JSON.stringify(data));
      })
      .then(serviceLoggedUser => {
        setLoggedUser(serviceLoggedUser);
      });
  };

  const logoutFn = () => {
    return removeData('loggedUser').then(() => {
      setLoggedUser(null);
    });
  };

  const getCoffeesFn = async () => {
    console.log('teste');
    const list = await coffeeList;
    console.log('listing...', list);
    storeData('coffees', JSON.parse(list));
    setCoffees(list);
    return coffees;
  };

  const getCachedCoffeesFn = async () => {
    const list = await getData('coffees');
    const newlist = JSON.parse(list);
    setCoffees(newlist);
    return coffees;
  };

  return (
    <Context.Provider
      value={{
        actions: {
          login: loginFn,
          getCacheLoggedUser: getCacheLoggedUserFn,
          logout: logoutFn,
          getCoffees: getCoffeesFn,
          getCachedCoffees: getCachedCoffeesFn,
        },
        data: {
          loggedUser,
          coffees,
        },
      }}>
      {children}
    </Context.Provider>
  );
};
