import z from 'zod';

export const updateProfileSchema = z.object({
  email: z.string().nonempty('Bắt buộc').email('Email không đúng định dạng'),
  fullName: z.string().nonempty('Bắt buộc'),
  avatarPath: z.string().optional(),
  phone: z
    .string()
    .regex(/^0\d{9}$/, 'Số điện thoại không hợp lệ')
    .optional()
});

export const accountSearchSchema = z.object({
  email: z.string().optional().nullable(),
  fullName: z.string().optional().nullable(),
  kind: z.number().optional().nullable(),
  phone: z.string().optional().nullable(),
  isSuperAdmin: z.boolean().optional().nullable(),
  status: z.number().optional().nullable(),
  username: z.string().optional().nullable()
});

export const accountSchema = z
  .object({
    email: z.string().nonempty('Bắt buộc'),
    password: z
      .string()
      .nonempty('Bắt buộc')
      .min(8, 'Mật khẩu tối thiểu 8 ký tự')
      .regex(/[A-Z]/, 'Phải có ít nhất 1 chữ hoa')
      .regex(/[a-z]/, 'Phải có ít nhất 1 chữ thường')
      .regex(/[0-9]/, 'Phải có ít nhất 1 chữ số')
      .regex(/[^A-Za-z0-9]/, 'Phải có ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string().nonempty('Bắt buộc'),
    fullName: z.string().nonempty('Bắt buộc'),
    avatarPath: z.string().optional(),
    groupId: z.string().nonempty('Bắt buộc'),
    status: z.number({ error: 'Bắt buộc' }),
    username: z.string().nonempty('Bắt buộc')
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Mật khẩu xác nhận không khớp'
  });
