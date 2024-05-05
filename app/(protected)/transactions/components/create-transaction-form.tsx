'use client';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState, useTransition } from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { TransferSchema } from '@/schemas';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import ImageUpload from '@/components/ui/image-upload';
import { useCurrentUser } from '@/hooks/use-current-user';
import { initiateTransfer } from '@/actions/transfers/create-transfer';
// import { User } from '@/lib/definitions';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { getCompanyWithUsersById } from '@/data/company';
import { Company, User, Item } from '@prisma/client';
import {
  getAdminUserByCompanyId,
  getCurrentUserCompany,
  getUserItems,
} from '@/data/user';
import { Input } from '@/components/ui/input';

export const CreateTransferForm = ({ companies }: { companies: Company[] }) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('');
  const [senderCompanyId, setSenderCompanyId] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<string>('');
  const [adminUser, setAdminUser] = useState<User | null>(null);
  const [companyUsers, setCompanyUsers] = useState<User[]>([]);
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();
  const senderId = user?.id ?? '';
  const adminId = adminUser?.id ?? '';

  useEffect(() => {
    if (senderId) {
      fetchCurrentUserCompany(senderId);
    }
  }, [senderId]);

  useEffect(() => {
    if (selectedCompany) {
      fetchCompanyUsers(selectedCompany);
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (selectedCompany) {
      fetchAdminUser(selectedCompany);
    }
  }, [selectedCompany]);

  useEffect(() => {
    if (selectedUser) {
      fetchUserItems(selectedUser);
    }
  }, [selectedUser]);

  const fetchCurrentUserCompany = async (userId: string) => {
    try {
      const company = await getCurrentUserCompany(userId);
      if (company) {
        setSelectedCompany(company.id);
        setSenderCompanyId(company.id);
        console.log(company);
      }
    } catch (error) {
      console.error('Error fetching current user company:', error);
    }
  };

  const fetchAdminUser = async (companyId: string) => {
    try {
      const adminUser = await getAdminUserByCompanyId(companyId);
      setAdminUser(adminUser);
    } catch (error) {
      console.error('Error fetching admin user:', error);
      setAdminUser(null);
    }
  };

  const fetchCompanyUsers = async (companyId: string) => {
    try {
      const companyWithUsers = await getCompanyWithUsersById(companyId);
      if (companyWithUsers) {
        const users = companyWithUsers.users.map((user) => ({
          ...user,
          companyId: user.companyId || '',
        }));
        setCompanyUsers(users);
      } else {
        setCompanyUsers([]);
      }
    } catch (error) {
      console.error('Error fetching company users:', error);
      setCompanyUsers([]);
    }
  };

  const fetchUserItems = async (userId: string) => {
    try {
      const companyWithUsers = await getUserItems(userId);
      if (companyWithUsers) {
        const items = companyWithUsers.items.map((item) => ({
          ...item,
          userId: item.userId || '',
        }));
        setUserItems(items);
      } else {
        setUserItems([]);
      }
    } catch (error) {
      console.error('Error fetching company users:', error);
      setUserItems([]);
    }
  };

  const form = useForm<z.infer<typeof TransferSchema>>({
    resolver: zodResolver(TransferSchema),
    defaultValues: {
      senderCompanyId: senderCompanyId,
      senderId: senderId,
      adminId: adminId,
      image: '',
      recipientId: '',
      recipientCompanyId: '',
      status: 'PENDING',
      items: '',
    },
  });

  const onSubmit = (values: z.infer<typeof TransferSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      initiateTransfer({ ...values }).then((data) => {
        setError(data?.errors);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <>
      <Heading
        title="Initiate Transfer"
        description="Create a new transfer between users or companies."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="recipientCompanyId"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Choose Company</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedCompany(value);
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a company"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Company</SelectLabel>
                          {companies.map((company) => (
                            <SelectItem key={company.id} value={company.id}>
                              {company.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="recipientId"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Choose User</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedUser(value);
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a user"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>User</SelectLabel>
                          {companyUsers.map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
              <FormField
              control={form.control}
              name="items"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Choose Item</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        setSelectedUser(value);
                      }}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a user"
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Item</SelectLabel>
                          {userItems.map((item) => (
                            <SelectItem key={item.id} value={item.id}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />


            <FormField
              control={form.control}
              name="adminId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Admin Id</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Admin Id"
                      type="text"
                      value={adminId}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <div className="mt-6 flex justify-end gap-4">
            <Button disabled={isPending} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
