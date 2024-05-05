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
import { ItemSchema } from '@/schemas';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import ImageUpload from '@/components/ui/image-upload';
import { useCurrentUser } from '@/hooks/use-current-user';
import { createItem } from '@/actions/items/create-item';
import Link from 'next/link';

export const CreateItemForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');

  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();
  const userId = user?.id ?? '';

  const form = useForm<z.infer<typeof ItemSchema>>({
    resolver: zodResolver(ItemSchema),
    defaultValues: {
      name: '',
      description: '',
      brand: '',
      price: 0,
      quantity: 0,
      image: '',
      userId: userId,
    },
  });

  const onSubmit = (values: z.infer<typeof ItemSchema>) => {
    setError('');
    setSuccess('');

    // const convertedValues = {
    //   ...values,
    //   price:
    //     typeof values.price === 'string'
    //       ? parseFloat(values.price)
    //       : values.price,
    //   quantity:
    //     typeof values.quantity === 'string'
    //       ? parseFloat(values.quantity)
    //       : values.quantity,
    // };

    console.log(user);
    // console.log(convertedValues);

    startTransition(() => {
      createItem({ ...values }).then((data) => {
        console.log(userId);
        setError(data?.error);
        setSuccess(data?.success);

        if (!data?.error) {
          form.reset(); 
        }
      });
    });
  };

  return (
    <>
      <Heading
        title="Create Item"
        description="Add a new item to the platform."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Item Name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Item Description"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Item Brand"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Item Price"
                      type="number"
                      inputMode="numeric"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Item Quantity"
                      type="number"
                      inputMode="numeric"
                      onChange={(e) =>
                        field.onChange(parseFloat(e.target.value))
                      }
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
                  <FormLabel>Image</FormLabel>
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
          <div className="mt-6 md:flex block justify-center items-center gap-4 space-y-4 md:space-y-0">
            <div className="w-full">
              <Button disabled={isPending} type="submit" className='w-full'>
                Submit
              </Button>
            </div>

            <div className="w-full">
              <Button variant="secondary" className='w-full'>
                <Link href="/items">Cancel</Link>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
