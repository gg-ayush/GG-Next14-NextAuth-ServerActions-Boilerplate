import { z } from "zod";

const EMAIL_SCHEMA = z
  .string()
  .min(1, "Email Address is required.")
  .email("Invalid Email Address.");

export const loginSchema = z.object({
  email: EMAIL_SCHEMA,
  password: z.string().min(1, "Password is required."),
});

export const registerSchema = z.object({
  email: EMAIL_SCHEMA,
  name: z
    .string()
    .min(1, {
      message: "Name is required.",
    })
    .min(4, "Name must be at least 4 characters.")
    .max(24, "Maximum length of Name is 24 characters."),
  password: z
    .string()
    .min(1, "Password is required.")
    .min(6, "Password must be at least 6 characters."),
});

export const resendSchema = z.object({
  email: EMAIL_SCHEMA,
});

export const resetPasswordSchema = z.object({
  email: EMAIL_SCHEMA,
});

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Password is required.")
      .min(6, "Password must be at least 6 characters."),
    confirmPassword: z.string().min(1, "Confirm Password is required."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match.",
    path: ["confirmPassword"],
  });

export const twoFactorSchema = z.object({
  code: z
    .string()
    .regex(/^[0-9]+$/, "Code must be a number.")
    .length(6, "Code must be 6 digits long."),
});

export const profileSchema = z
  .object({
    name: z.optional(
      z
        .string()
        .min(1, {
          message: "Name is required.",
        })
        .min(4, "Name must be at least 4 characters.")
        .max(24, "Maximum length of Name is 24 characters.")
    ),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6, "Password must be at least 6 characters.")),
    newPassword: z.optional(z.string().min(6, "New Password must be at least 6 characters.")),
    isTwoFactorEnabled: z.optional(z.boolean()),
  })
  .refine(
    (data) => {
      if (!data.password && data.newPassword) return false;
      return true;
    },
    {
      message: "Password is required.",
      path: ["password"],
    }
  )
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    {
      message: "New Password is required.",
      path: ["newPassword"],
    }
  );


  const fileSchema = z.instanceof(File, { message: "Required"})



  const imageSchema = fileSchema.refine(
      file => file.size === 0 || file.type.startsWith("image/")
    )
  
  const ProductStatusSchema = z.enum(['AVAILABLE', 'NOTAVAILABLE']);
  export const productSchema = z.object({
      name: z.string().min(1, 'Name is required'),
      image: imageSchema.refine(file => file.size >0, "Required"),
      description: z.string().optional(),
      costPrice: z.number().min(0, 'Cost Price must be non-negative'), 
      quantityInStock: z.number().int().min(0, 'Quantity in Stock must be a non-negative integer'),
      validity: z.string().optional(),
      discount: z.string().optional(), 
      salePrice: z.number().min(0, 'Sale Price must be non-negative').optional(),
      margin: z.string().optional(), 
  
      status: ProductStatusSchema,
  
      category: z
      .string()
      .refine((val) => val !== 'Choose category', { message: 'Please select a valid city' }),
  
      // suppliers: z
      // .array(z.string().min(1, { message: "Supplier is required" }))
      // .nonempty({ message: "At least one supplier is required" }),
  
  
    })