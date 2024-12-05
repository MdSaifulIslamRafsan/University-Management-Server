import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string(),
  lastName: z.string(),
});

const guardianSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

const localGuardianSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

 const createStudentValidationSchema = z.object({
  body : z.object({
    password: z.string().max(20),
    student : z.object({
    name: userNameSchema,
    AdmissonSemester : z.string(),
    gender: z.enum(['male', 'female', 'other']),
    dateOfBirth: z.date().optional(),
    email: z.string().email(),
    contactNo: z.string(),
    emergencyContactNo: z.string(),
    bloodGroups: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
    presentAddress: z.string(),
    permanentAddress: z.string(),
    guardian: guardianSchema,
    localGuardian: localGuardianSchema,
    profileImgUrl: z.string(),
    })
  })
 });

export const studentValidations = {
  createStudentValidationSchema
}

