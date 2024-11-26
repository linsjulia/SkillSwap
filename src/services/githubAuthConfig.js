// authConfig.js
import { Platform } from 'react-native';

export const githubAuthConfig = {
  clientId: 'Ov23ctIhG1633Ta1Yx78',
  clientSecret: '7d4c44e9b56853760d576be436a26ad4a9b51ea8',
  redirectUrl: 'com.skillswap://auth/callback', // A URL de redirecionamento configurada no GitHub
  scopes: ['user', 'repo'], // Defina os escopos que você precisa
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/tokens',
  },
  additionalParameters: {
    // Adicione parâmetros extras, se necessário
  },
};
