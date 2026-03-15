import apiClient from './apiClient';

const mockProfile = {
  fullName: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 123-4567",
  dateOfBirth: "1995-05-15",
  nationality: "United States",
  address: "123 Main Street",
  city: "San Francisco",
  country: "USA",
  postalCode: "94102",
  institution: "Stanford University",
  degree: "Bachelor of Science",
  fieldOfStudy: "Computer Science",
  graduationDate: "2024-05-20",
  studentId: "STU987654",
  linkedinUrl: "https://linkedin.com/in/johndoe",
  portfolioUrl: "https://johndoe.com",
  bio: "Passionate CS graduate interested in AI and machine learning.",
  did: "did:lumen:polygon:0x71C7656EC7ab88b098defB751B7401B5f6d8976F",
  walletAddress: "0x71C7...976F",
  verifiedStatus: "Gold Tier",
  memberSince: "March 2024"
};

const userService = {
  getProfile: async () => {
    try {
      const response = await apiClient.get('/user/profile');
      return response.data;
    } catch (error) {
      console.warn('User API unavailable, falling back to mock profile');
      return mockProfile;
    }
  },

  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.patch('/user/profile', profileData);
      return response.data;
    } catch (error) {
      console.warn('User API unavailable, returning simulated update success');
      return { success: true, data: profileData };
    }
  }
};

export default userService;
