import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  profile: StudentProfile | FacultyProfile | AdminProfile;
}

export interface StudentProfile {
  admissionNo: string;
  rollNo: string;
  name: string;
  course: string;
  branch: string;
  semester: number;
  year: number;
  gender: string;
  nationality: string;
  dob: string;
  religion: string;
  interMarks: number;
  tenthMarks: number;
  entranceType: string;
  eamcetRank?: number;
  lastStudied: string;
  joiningDate: string;
  email: string;
  phoneNumber: string;
  bankAccount: string;
  rationCard: string;
  aadhaarCard: string;
  bloodGroup: string;
  fatherName: string;
  motherName: string;
  parentContact: string;
  parentOccupation: string;
  annualIncome: number;
  presentAddress: string;
  permanentAddress: string;
  profileImage?: string;
}

export interface FacultyProfile {
  employeeId: string;
  name: string;
  department: string;
  designation: string;
  qualification: string;
  experience: number;
  email: string;
  phoneNumber: string;
  subjects: string[];
}

export interface AdminProfile {
  employeeId: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (userData: any) => Promise<boolean>;
  updateProfile: (profileData: any) => Promise<boolean>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@svit.edu',
    role: 'student',
    profile: {
      admissionNo: 'SVIT2024001',
      rollNo: '21B91A0501',
      name: 'Rahul Sharma',
      course: 'B.Tech',
      branch: 'Computer Science Engineering',
      semester: 6,
      year: 3,
      gender: 'Male',
      nationality: 'Indian',
      dob: '2003-05-15',
      religion: 'Hindu',
      interMarks: 892,
      tenthMarks: 9.2,
      entranceType: 'EAMCET',
      eamcetRank: 2500,
      lastStudied: 'Sri Chaitanya Junior College',
      joiningDate: '2021-08-15',
      email: 'student@svit.edu',
      phoneNumber: '+91 9876543210',
      bankAccount: '1234567890',
      rationCard: 'AP1234567890',
      aadhaarCard: '1234 5678 9012',
      bloodGroup: 'O+',
      fatherName: 'Suresh Sharma',
      motherName: 'Lakshmi Sharma',
      parentContact: '+91 9876543211',
      parentOccupation: 'Business',
      annualIncome: 500000,
      presentAddress: '123 Main Street, Tirupati, AP 517501',
      permanentAddress: '123 Main Street, Tirupati, AP 517501'
    } as StudentProfile
  },
  {
    id: '2',
    email: 'faculty@svit.edu',
    role: 'faculty',
    profile: {
      employeeId: 'SVIT-FAC-001',
      name: 'Dr. Priya Kumar',
      department: 'Computer Science Engineering',
      designation: 'Associate Professor',
      qualification: 'Ph.D in Computer Science',
      experience: 8,
      email: 'faculty@svit.edu',
      phoneNumber: '+91 9876543212',
      subjects: ['Data Structures', 'Algorithms', 'Web Technologies']
    } as FacultyProfile
  },
  {
    id: '3',
    email: 'admin@svit.edu',
    role: 'admin',
    profile: {
      employeeId: 'SVIT-ADM-001',
      name: 'Mr. Venkatesh Reddy',
      role: 'Academic Administrator',
      email: 'admin@svit.edu',
      phoneNumber: '+91 9876543213'
    } as AdminProfile
  }
];

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('svit_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock authentication - in real app, this would call an API
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (foundUser && password === 'password123') {
      setUser(foundUser);
      localStorage.setItem('svit_user', JSON.stringify(foundUser));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('svit_user');
  };

  const signup = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    
    // Mock signup - in real app, this would call an API
    const newUser: User = {
      id: Date.now().toString(),
      email: userData.email,
      role: userData.role || 'student',
      profile: userData.profile
    };
    
    setUser(newUser);
    localStorage.setItem('svit_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const updateProfile = async (profileData: any): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    const updatedUser = {
      ...user,
      profile: { ...user.profile, ...profileData }
    };
    
    setUser(updatedUser);
    localStorage.setItem('svit_user', JSON.stringify(updatedUser));
    setIsLoading(false);
    return true;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      signup,
      updateProfile,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};