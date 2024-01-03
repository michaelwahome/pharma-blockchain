"use server"

import {z} from "zod";
import User from "@/models/user";
import connectDB from "@/lib/mongodb";
import bcrypt from 'bcrypt';
import Company from "@/models/company";


export const validatePasswords = (password: string, confPassword: string): boolean => {
    return password.trim() === confPassword.trim();
  };

export const isUsernameUnique = async (username: String) => {
    try {
        const existingUser = await User.findOne({ username: username });
        return !existingUser;
    } catch (error) {
        console.error('Error checking username uniqueness:', error);
        return false;
    }
};

export type SignUpState = {
    errors?: {
        firstName?: string[];
        lastName?: string[];
        dob?: string[];
        email?: string[];
        phone?: string[];
        address?: string[];
        username?: string[];
        password?: string[];
        confPassword?: string[];
        general?: string[];
    };
    message?: string | null;
  };

const SignUpSchema = z.object({
    firstName : z.string().refine((data) => data.trim() !== "", {message: "This field is required"}),
    lastName : z.string().refine((data) => data.trim() !== "", {message: "This field is required"}),
    dob : z.coerce.date().refine((data) => !!data, {message: "This field is required"}),
    email : z.string().email().refine((data) => data.trim() !== "", {message: "This field is required"}),
    phone : z.string()
    .refine((data) => /^(\+\d{1,})?\d+$/.test(data), { message: "Invalid phone number format" })
    .refine((data) => data.length >= 5, {
        message: "Phone number should have at least 5 digits",
    }),
    address : z.string(),
    username : z.string().refine((data) => data.trim() !== "", {message: "This field is required"}),
    password: z
    .string()
    .refine((data) => data.trim() !== "", { message: "This field is required" })
    .refine((data) => data.length >= 8, {
      message: "Password should be at least 8 characters long",
    }),
    confPassword: z.string()
  })
  .required()
  .partial({
    phone: true,
    address: true,
  });

export const processSignup = async (prevState: SignUpState, formData: FormData ): Promise<SignUpState> => {
    const validatedSignUpFields = SignUpSchema.safeParse({
        firstName : formData.get("firstName"),
        lastName : formData.get("lastName"),
        dob : formData.get("dob"),
        email : formData.get("email"),
        phone : formData.get("phone"),
        address : formData.get("address"),
        username : formData.get("username"),
        password : formData.get("password"),
        confPassword : formData.get("confPassword")
    });
    
    if (!validatedSignUpFields.success) {
        console.log(validatedSignUpFields.error.flatten().fieldErrors)
        return {
            errors: validatedSignUpFields.error.flatten().fieldErrors,
            message: 'Validation failed.',
        };
    }  
      
    const  { firstName, lastName, dob, email, phone, address, username, password, confPassword } = validatedSignUpFields.data;

    if (!validatePasswords(password, confPassword)) {
        return {
            errors: { confPassword: ["Passwords do not match"] },
            message: "Validation failed",
        };
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        connectDB();
    
        if (!(await isUsernameUnique(username))) {
          return {
            errors: { username: ["This username is already taken"] },
            message: "Validation failed",
          };
        }
    
        const newUser = new User({
          firstName,
          lastName,
          dob,
          email,
          phone,
          address,
          username,
          password: hashedPassword,
        });
    
        const savedUser = await newUser.save();
    
        return {
          errors: {},
          message: 'User created successfully.',
        };
    } catch (error) {
        console.error('Error creating user:', error);
        return {
          errors: { general: ['Failed to create user'] },
          message: 'User creation failed.',
        };
    }
}

export const isCompanyUsernameUnique = async (username: String) => {
    try {
        const existingCompany = await Company.findOne({ username: username });
        return !existingCompany; 
    } catch (error) {
        console.error('Error checking username uniqueness:', error);
        return false; 
    }
};

export type CompanyRegisterState = {
    errors?: {
        companyName?: string[];
        email?: string[];
        phone?: string[];
        address?: string[];
        role?: string[];
        username?: string[];
        password?: string[];
        confPassword?: string[];
        general?: string[];
    };
    message?: string | null;
  };

const CompanyRegisterSchema = z.object({
    companyName : z.string().refine((data) => data.trim() !== "", {message: "This field is required"}),
    email : z.string().email().refine((data) => data.trim() !== "", {message: "This field is required"}),
    phone : z.string()
    .refine((data) => /^(\+\d{1,})?\d+$/.test(data), { message: "Invalid phone number format"})
    .refine((data) => data.length >= 5, {
        message: "Phone number should have at least 5 digits",
    }),
    address : z.string().refine((data) => data.trim() !== "", { message: "This field is required" }),
    role: z.string().min(1, {message: "Please select a role"}),
    username : z.string().refine((data) => data.trim() !== "", {message: "This field is required"}),
    password: z
    .string()
    .refine((data) => data.trim() !== "", { message: "This field is required" })
    .refine((data) => data.length >= 8, {
      message: "Password should be at least 8 characters long",
    }),
    confPassword: z.string()
  })
  .required()
  .partial({
    phone: true,
    address: true,
  });

export const processRegisterCompany = async (prevState: CompanyRegisterState, formData: FormData ): Promise<CompanyRegisterState> => {
    const validatedCompanyRegisterFields = CompanyRegisterSchema.safeParse({
        companyName : formData.get("companyName"),
        email : formData.get("email"),
        phone : formData.get("phone"),
        address : formData.get("address"),
        role : formData.get("role") || "",
        username : formData.get("username"),
        password : formData.get("password"),
        confPassword : formData.get("confPassword")
    });
    
    if (!validatedCompanyRegisterFields.success) {
        console.log(validatedCompanyRegisterFields.error.flatten().fieldErrors)
        return {
            errors: validatedCompanyRegisterFields.error.flatten().fieldErrors,
            message: 'Validation failed.',
        };
    }  
      
    const  { companyName, email, phone, address, role, username, password, confPassword } = validatedCompanyRegisterFields.data;

    if (!validatePasswords(password, confPassword)) {
        return {
            errors: { confPassword: ["Passwords do not match"] },
            message: "Validation failed",
        };
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        connectDB();
    
        if (!(await isCompanyUsernameUnique(username))) {
          return {
            errors: { username: ["This username is already taken"] },
            message: "Validation failed",
          };
        }
    
        const newCompany = new Company({
          companyName,
          email,
          phone,
          address,
          role,
          username,
          password: hashedPassword,
        });
    
        const savedCompany = await newCompany.save();
    
        return {
          errors: {},
          message: 'Company created successfully.',
        };
    } catch (error) {
        console.error('Error creating company:', error);
        return {
          errors: { general: ['Failed to create company'] },
          message: 'Company creation failed.',
        };
    }
}