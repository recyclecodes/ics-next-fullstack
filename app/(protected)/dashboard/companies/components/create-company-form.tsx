'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useTransition } from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { createCompany } from '@/actions/companies/create-company';
import { CompanySchema } from '@/schemas';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import ImageUpload from '@/components/ui/image-upload';

export const CreateCompanyForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CompanySchema>>({
    resolver: zodResolver(CompanySchema),
    defaultValues: {
      name: '',
      image: '',
    },
  });

  const onSubmit = (values: z.infer<typeof CompanySchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      createCompany(values).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <>
      <Heading
        title="Create Company"
        description="Add a new company to the platform."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="John Doe"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company Logo</FormLabel>
                  <FormControl>
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

// export default function CreateCompanyForm() {
//   const form = useForm<CompanyForms>({ resolver: zodResolver(companySchema) });

//   const {
//     handleSubmit,
//     control,
//     formState: { isSubmitting },
//   } = form;

//   const { toast } = useToast();

//   async function onSubmit(values: CompanyForms) {
//     const formData = new FormData();

//     Object.entries(values).forEach(([key, value]) => {
//       if (value) {
//         formData.append(key, value);
//       }
//     });

//     try {
//       await createCompany(formData);
//       toast({
//         variant: 'default',
//         description: 'Successfully added new company',
//       });
//     } catch (error) {
//       console.error('An error occurred:', error);
//       toast({
//         variant: 'destructive',
//         description: 'Error creating the company',
//       });
//     }
//   }

//   return (
//     <>
//       <Form {...form}>
//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
//           <FormField
//             control={control}
//             name="imageUrl"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Company logo</FormLabel>
//                 <FormControl>
//                   <ImageUpload
//                     value={field.value ? [field.value] : []}
//                     onChange={(url) => field.onChange(url)}
//                     onRemove={() => field.onChange('')}
//                   />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//             <FormField
//               control={control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Company name</FormLabel>
//                   <FormControl>
//                     <Input
//                       placeholder="Company name"
//                       value={field.value || ''}
//                       onChange={field.onChange}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />

//           <div className="mt-6 flex justify-end gap-4">
//             <Link
//               href="/companies"
//               className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
//             >
//               Cancel
//             </Link>
//             <LoadingButton type="submit" loading={isSubmitting}>
//               Submit
//             </LoadingButton>
//           </div>
//         </form>
//       </Form>
//     </>
//   );
// }
