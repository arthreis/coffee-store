import React from 'react';

import { View, Button } from 'react-native';
import { useStorage } from '../../storage';

// import { Container } from './styles';

export default ({ navigation }) => {
  const storage = useStorage();
  return (
    <View>
      <Button
        title="Sair"
        onPress={() => {
          navigation.navigate('Decisor');
          storage.actions.logout().then(() => {});
        }}
      />
    </View>
  );
};
