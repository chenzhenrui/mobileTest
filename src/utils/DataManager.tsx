import AsyncStorage from '@react-native-async-storage/async-storage';
import BookingService from '../services/BookingService';

const CACHE_KEY = 'bookingCache';
const EXPIRY_TIME = 60000; // 60 seconds

const DataManager = {
  async fetchData() {
    try {
      const cachedData = await AsyncStorage.getItem(CACHE_KEY);
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData);
        const now = new Date().getTime();
        if (now - timestamp < EXPIRY_TIME) {
          console.log('Returning cached data');
          return data;
        }
      }

      console.log('Fetching new data');
      const newData = await BookingService.getData();
      const newTimestamp = new Date().getTime();
      await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({ data: newData, timestamp: newTimestamp }));
      return newData;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  },
};

export default DataManager;