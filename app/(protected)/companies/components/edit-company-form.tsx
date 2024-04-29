'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { useToast } from '@/components/ui/use-toast';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { updateCompany } from '@/actions/companies/update-company';
import { Input } from '@/components/ui/input';
import { CompanyForm, CompanySchema } from '@/schemas';
import ImageUpload from '@/components/ui/image-upload';
import LoadingButton from '@/app/(protected)/_components/loading-button';

export default function EditCompanyForm({
  company,
}: {
  company: CompanyForm;
}) {
  const form = useForm<CompanyForm>({
    resolver: zodResolver(CompanySchema),
    defaultValues: company,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  const { toast } = useToast();

  async function onSubmit(values: CompanyForm) {
    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    try {
      await updateCompany(company.id, formData);
      toast({
        variant: 'default',
        description: `Successfully updated ${company.name}`,
      });
    } catch (error) {
      console.error('An error occurred:', error);
      toast({
        variant: 'destructive',
        description: 'Error creating the company',
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company logo</FormLabel>
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
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Company name"
                      value={field.value || ''}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/companies"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <LoadingButton type="submit" loading={isSubmitting}>
              Submit
            </LoadingButton>
          </div>
        </form>
      </Form>
    </>
  );
}
