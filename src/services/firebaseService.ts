import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  deleteDoc, 
  updateDoc, 
  query, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
import { db } from '../firebase';

// Check if Firebase is properly initialized
const isFirebaseAvailable = () => {
  try {
    return db !== undefined && db !== null;
  } catch (error) {
    console.error('Firebase not available:', error);
    return false;
  }
};

// Types for form data
export interface JobApplicationData {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experience: string;
  qualification: string;
  age: string;
  message: string;
  submittedAt: Timestamp;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
}

export interface GuardRequestData {
  id?: string;
  companyName: string;
  contactPerson: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  numberOfGuards: string;
  guardDesignation: string;
  district: string;
  location: string;
  message: string;
  submittedAt: Timestamp;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
}

// Job Applications Service
export const jobApplicationsService = {
  // Add new job application
  async create(data: Omit<JobApplicationData, 'id' | 'submittedAt' | 'status'>) {
    if (!isFirebaseAvailable()) {
      throw new Error('Firebase is not available. Please check your configuration.');
    }
    
    try {
      const docRef = await addDoc(collection(db, 'jobApplications'), {
        ...data,
        submittedAt: Timestamp.now(),
        status: 'pending'
      });
      console.log('Job application created successfully:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding job application:', error);
      // Provide more specific error messages
      if (error instanceof Error) {
        throw new Error(`Failed to submit application: ${error.message}`);
      }
      throw new Error('Failed to submit application. Please try again.');
    }
  },

  // Get all job applications
  async getAll(): Promise<JobApplicationData[]> {
    if (!isFirebaseAvailable()) {
      console.warn('Firebase not available, returning empty array');
      return [];
    }
    
    try {
      const q = query(collection(db, 'jobApplications'), orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as JobApplicationData));
    } catch (error) {
      console.error('Error fetching job applications:', error);
      return []; // Return empty array instead of throwing
    }
  },

  // Delete job application
  async delete(id: string) {
    try {
      await deleteDoc(doc(db, 'jobApplications', id));
    } catch (error) {
      console.error('Error deleting job application:', error);
      throw error;
    }
  },

  // Update job application status
  async updateStatus(id: string, status: JobApplicationData['status']) {
    try {
      await updateDoc(doc(db, 'jobApplications', id), { status });
    } catch (error) {
      console.error('Error updating job application status:', error);
      throw error;
    }
  }
};

// Client Data Type
export interface ClientData {
  id?: string;
  name: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Rate Data Type
export interface RateData {
  id?: string;
  district: string;
  guardDesignation: string;
  monthlyRate: number;
  dailyRate: number;
  hourlyRate: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// Clients Service
export const clientsService = {
  // Add new client
  async create(data: Omit<ClientData, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!isFirebaseAvailable()) {
      throw new Error('Firebase is not available. Please check your configuration.');
    }
    
    try {
      const docRef = await addDoc(collection(db, 'clients'), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      console.log('Client created successfully:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding client:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to add client: ${error.message}`);
      }
      throw new Error('Failed to add client. Please try again.');
    }
  },

  // Get all clients
  async getAll(): Promise<ClientData[]> {
    if (!isFirebaseAvailable()) {
      console.warn('Firebase not available, returning empty array');
      return [];
    }
    
    try {
      const q = query(collection(db, 'clients'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ClientData));
    } catch (error) {
      console.error('Error fetching clients:', error);
      return [];
    }
  },

  // Update client
  async update(id: string, data: Omit<ClientData, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      await updateDoc(doc(db, 'clients', id), {
        ...data,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating client:', error);
      throw error;
    }
  },

  // Delete client
  async delete(id: string) {
    try {
      await deleteDoc(doc(db, 'clients', id));
    } catch (error) {
      console.error('Error deleting client:', error);
      throw error;
    }
  }
};

// Rates Service
export const ratesService = {
  // Add new rate
  async create(data: Omit<RateData, 'id' | 'createdAt' | 'updatedAt'>) {
    if (!isFirebaseAvailable()) {
      throw new Error('Firebase is not available. Please check your configuration.');
    }
    
    try {
      const docRef = await addDoc(collection(db, 'rates'), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      console.log('Rate created successfully:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding rate:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to add rate: ${error.message}`);
      }
      throw new Error('Failed to add rate. Please try again.');
    }
  },

  // Get all rates
  async getAll(): Promise<RateData[]> {
    if (!isFirebaseAvailable()) {
      console.warn('Firebase not available, returning empty array');
      return [];
    }
    
    try {
      const q = query(collection(db, 'rates'), orderBy('district', 'asc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as RateData));
    } catch (error) {
      console.error('Error fetching rates:', error);
      return [];
    }
  },

  // Get rate by district and guard designation
  async getByDistrictAndDesignation(district: string, guardDesignation: string): Promise<RateData | null> {
    if (!isFirebaseAvailable()) {
      return null;
    }
    
    try {
      const rates = await this.getAll();
      return rates.find(rate => 
        rate.district.toLowerCase() === district.toLowerCase() && 
        rate.guardDesignation.toLowerCase() === guardDesignation.toLowerCase()
      ) || null;
    } catch (error) {
      console.error('Error fetching rate by district and designation:', error);
      return null;
    }
  },

  // Update rate
  async update(id: string, data: Omit<RateData, 'id' | 'createdAt' | 'updatedAt'>) {
    try {
      await updateDoc(doc(db, 'rates', id), {
        ...data,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating rate:', error);
      throw error;
    }
  },

  // Delete rate
  async delete(id: string) {
    try {
      await deleteDoc(doc(db, 'rates', id));
    } catch (error) {
      console.error('Error deleting rate:', error);
      throw error;
    }
  }
};

// Guard Requests Service
export const guardRequestsService = {
  // Add new guard request
  async create(data: Omit<GuardRequestData, 'id' | 'submittedAt' | 'status'>) {
    if (!isFirebaseAvailable()) {
      throw new Error('Firebase is not available. Please check your configuration.');
    }
    
    try {
      const docRef = await addDoc(collection(db, 'guardRequests'), {
        ...data,
        submittedAt: Timestamp.now(),
        status: 'pending'
      });
      console.log('Guard request created successfully:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding guard request:', error);
      // Provide more specific error messages
      if (error instanceof Error) {
        throw new Error(`Failed to submit request: ${error.message}`);
      }
      throw new Error('Failed to submit request. Please try again.');
    }
  },

  // Get all guard requests
  async getAll(): Promise<GuardRequestData[]> {
    if (!isFirebaseAvailable()) {
      console.warn('Firebase not available, returning empty array');
      return [];
    }
    
    try {
      const q = query(collection(db, 'guardRequests'), orderBy('submittedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as GuardRequestData));
    } catch (error) {
      console.error('Error fetching guard requests:', error);
      return []; // Return empty array instead of throwing
    }
  },

  // Delete guard request
  async delete(id: string) {
    try {
      await deleteDoc(doc(db, 'guardRequests', id));
    } catch (error) {
      console.error('Error deleting guard request:', error);
      throw error;
    }
  },

  // Update guard request status
  async updateStatus(id: string, status: GuardRequestData['status']) {
    try {
      await updateDoc(doc(db, 'guardRequests', id), { status });
    } catch (error) {
      console.error('Error updating guard request status:', error);
      throw error;
    }
  }
};