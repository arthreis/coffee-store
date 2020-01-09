import React, { useEffect } from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { Login, Home, Settings } from './screens';
import { useStorage } from './storage';

/**
 * Neste arquivo teremos apenas lógicas de roteamento
 * por exemplo:
 *  - decidir tela inicial
 *  - começar o app em determinada tela
 *
 */

const PreAuthStack = createStackNavigator({
  Login,
});

const PostAuthTab = createBottomTabNavigator({
  Home,
  Settings,
});

const Decisor = ({ navigation }) => {
  /**
   * Verifica se usuário está logado na aplicação
   * caso postiivo, redireciona para a tela de home,
   * caso contrário direciona para tela de login
   */

  const storage = useStorage();

  useEffect(() => {
    storage.actions.getCacheLoggedUser().then(loggedUser => {
      if (loggedUser) {
        navigation.navigate('PostAuthTab');
      } else {
        navigation.navigate('PreAuthStack');
      }
    });
  });

  return null;
};

const AppSwitch = createSwitchNavigator({
  //Decisor,
  //PreAuthStack,
  PostAuthTab,
});

export default createAppContainer(AppSwitch);
