export interface Program {
  id: number;
  university: string;
  country: string;
  flag: string;
  description: string;
  fullDescription: string;
  duration: string;
  tuitionRange: string;
  language: string;
  deadline: string;
  tags: string[];
  rating: number;
  studentsEnrolled: number;
  established: number;
  website: string;
}

export type RootStackParamList = {
  Home: undefined;
  Details: { program: Program };
};