import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    
    // Test if db is available
    if (!db) {
      throw new Error('Firebase database not initialized');
    }

    // Try to add a test document
    const testData = {
      test: true,
      timestamp: new Date(),
      message: 'Firebase connection test'
    };

    const docRef = await addDoc(collection(db, 'test'), testData);
    console.log('✅ Test document written with ID: ', docRef.id);

    // Try to read from the collection
    const querySnapshot = await getDocs(collection(db, 'test'));
    console.log('✅ Test documents count: ', querySnapshot.size);

    return { success: true, message: 'Firebase connection successful!' };
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
};