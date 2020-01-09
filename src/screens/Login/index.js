import React, { useState } from 'react';

import { View, Button, TextInput } from 'react-native';

import { useStorage } from '../../storage';

export default ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const storage = useStorage();

  return (
    <View>
      <TextInput
        placeholder="Insira seu email..."
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Insira sua senha..."
        secureTextEntry={true}
        onChangeText={setPassword}
      />
      <Button
        title="Logar"
        onPress={() => {
          storage.actions
            .login(email, password)
            .then(() => {
              navigation.navigate('Decisor');
            })
            .catch(error => {
              alert(error.message);
            });
        }}
      />
    </View>
  );
};
