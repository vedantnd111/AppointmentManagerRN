export type RootStackParamList = {
    Home: undefined;
    ProfileEdit: undefined;
    VendorDetails: { vendorId: string };
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
