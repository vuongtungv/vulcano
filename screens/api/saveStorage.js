import { AsyncStorage } from 'react-native';

const saveStorage = async (key, value) => {
    try {
        await AsyncStorage.setItem('@'+key, value);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

export default saveStorage;