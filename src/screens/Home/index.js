import React, { useState, useEffect } from 'react';

import { View, Text } from 'react-native';

import { useStorage } from '../../storage';

export default ({}) => {
  const storage = useStorage();
  const [userName, setUserName] = useState('');
  const [coffees, setCoffees] = useState([]);

  useEffect(() => {
    if (storage.data.loggedUser) {
      setUserName(storage.data.loggedUser.name);
    }
  }, [storage.data.loggedUser]);

  useEffect(() => {
    setCoffees(storage.actions.getCoffees);
    console.log('coffees:', coffees);
  }, [storage.actions.getCoffees, coffees]);

  useEffect(() => {
    console.log('PERF', userName);
  }, [userName]);

  return (
    <View>
      <Text>Tela da Home</Text>
    </View>
  );
};
