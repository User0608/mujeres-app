import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    SignUp: undefined;
    SignIn: undefined;
};

export type AppParamList = {
    Home: undefined
    Camera: undefined
    Alerta: undefined
    Perfil: undefined
};
export type AlertaParamList = {
    AlertaScreen: undefined
    DetalleAlerta: { alertaId: number }
};

