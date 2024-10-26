export interface RegistrationState {
  currentStep: number;
  steps: {
    accountSetup: AccountSetupData;
    personalInfo: PersonalInfoData;
    profilePreferences: ProfilePreferencesData;
  };
}

export interface AccountSetupData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface PersonalInfoData {
  fullName: string;
  phoneNumber: string;
  dateOfBirth: string;
}

export interface ProfilePreferencesData {
  avatar: File | null;
  bio: string;
  interests: string[];
}

export interface ValidationError {
  field: string;
  message: string;
}