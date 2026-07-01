import { clientsService } from "@/services/firebaseService";

const defaultClients = [
  "BreatheWell Multispeciality Hospital Sangli-Miraj Highway Sangli",
  "Ashirwad Hospitals",
  "Civil Hospital, Sangli",
  "Reliant Buildup, Miraj",
  "Camson Agro Industry, Kadegaon",
  "United Partical Board Industry, Kadegaon",
  "S. T. Stand, Miraj",
  "Manan Group of Constructions",
  "Ex. Labour Minister Suresh Khade Bunglow",
  "Mr. Suresh Khade Sir",
  "Deccan Infra Pvt. Ltd.",
  "Rajput School & College",
];

export const seedDefaultClients = async () => {
  try {
    // Check if clients already exist
    const existingClients = await clientsService.getAll();
    
    if (existingClients.length === 0) {
      console.log('Seeding default clients...');
      
      // Add all default clients
      for (const clientName of defaultClients) {
        await clientsService.create({ name: clientName });
      }
      
      console.log('Default clients seeded successfully');
      return true;
    } else {
      console.log('Clients already exist, skipping seed');
      return false;
    }
  } catch (error) {
    console.error('Error seeding clients:', error);
    return false;
  }
};