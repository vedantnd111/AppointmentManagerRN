export type RootStackParamList = {
    Home: undefined;
    ProfileEdit: undefined;
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
