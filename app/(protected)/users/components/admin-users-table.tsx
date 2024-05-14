import Image from 'next/image';
import { formatDateToLocal } from '@/lib/utils';
import { fetchFilteredAdminUsers } from '@/data/users/fetch-filtered-users';
import { Badge } from '@/components/ui/badge';
import { DeleteUser, UpdateUser } from './buttons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';

export default async function AdminUsersTable({
  query,
  currentPage,
  currentUserId,
  currentUserCompanyId,
}: {
  query: string;
  currentPage: number;
  currentUserId: string;
  currentUserCompanyId: string;
}) {
  const users = await fetchFilteredAdminUsers(
    query,
    currentPage,
    currentUserId,
    currentUserCompanyId
  );

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-secondary p-2 md:pt-0">
        {users && users.length > 0 ? (
                <div className="md:hidden">
                  {users?.map((user) => (
                    <div
                      key={user.id}
                      className="mb-2 w-full rounded-md bg-background p-4"
                    >
                      <div className="flex items-center justify-between border-b pb-4">
                        <div>
                          <div className="mb-2 flex items-center justify-between">
                            <Avatar>
                              <AvatarImage
                                src={user.image ?? '/fallback/fallback.png'}
                                width={28}
                                height={28}
                                alt={`${user.name}`}
                              />
                              <AvatarFallback className="bg-primary">
                                <FaUser className="text-primary-foreground w-4 h-4" />
                              </AvatarFallback>
                            </Avatar>

                            <p className="ml-2 font-normal flex flex-col">
                              {user.name}
                              <span className="text-xs text-muted-foreground">
                                {user.email}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col content-center space-y-2">
                          <Badge
                            className="rounded-lg px-2 py-1 justify-center text-xs"
                            variant={
                              user?.emailVerified ? 'success' : 'destructive'
                            }
                          >
                            {user?.emailVerified ? 'VERIFIED' : 'PENDING'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex w-full items-center justify-between pt-4">
                        <div>
                          <p className="text-base font-semibold">
                            {user?.company?.name}
                          </p>
                        </div>
                        <div className="flex justify-end gap-2">
                          <UpdateUser id={user.id} />
                          <DeleteUser id={user.id} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="md:hidden text-center py-4">No data found</p>
              )}
         <table className="hidden min-w-full md:table">
                {users && users.length > 0 ? (
                  <>
                    <thead className="rounded-lg text-left text-sm font-normal">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-5 font-medium sm:pl-6"
                        >
                          Company
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-5 font-medium sm:pl-6"
                        >
                          User
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-5 font-medium sm:pl-2"
                        >
                          Verified
                        </th>
                        <th scope="col" className="relative py-3 pl-6 pr-3">
                          <span className="sr-only">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-background">
                      {users?.map((user) => (
                        <tr
                          key={user.id}
                          className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                        >
                          <td className="whitespace-nowrap px-3 py-3">
                            {user.company?.name}
                          </td>
                          <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={user.image ?? '/fallback/fallback.png'}
                                  width={28}
                                  height={28}
                                  alt={`${user.name}`}
                                />
                                <AvatarFallback className="bg-primary">
                                  <FaUser className="text-primary-foreground w-4 h-4" />
                                </AvatarFallback>
                              </Avatar>
                              <p className="ml-2">{user.name}</p>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-3">
                            <Badge
                              className="rounded-lg px-2 py-1 justify-center text-xs"
                              variant={
                                user?.emailVerified ? 'success' : 'destructive'
                              }
                            >
                              {user?.emailVerified ? 'VERIFIED' : 'PENDING'}
                            </Badge>
                          </td>

                          {/* <td className="whitespace-nowrap px-3 py-3">
                    {user.}
                  </td>
                  
                  <td className="whitespace-nowrap px-3 py-3">
                    <userstatus status={user.status} />
                  </td> */}
                          <td className="whitespace-nowrap py-3 pl-6 pr-3">
                            <div className="flex justify-end gap-3">
                              <UpdateUser id={user.id} />
                              <DeleteUser id={user.id} />
                              {/* <Viewuser id={user.id} /> */}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </>
                ) : (
                  <p className="text-center text-primary py-4">No data found</p>
                )}
              </table>
        </div>
      </div>
    </div>
  );
}
