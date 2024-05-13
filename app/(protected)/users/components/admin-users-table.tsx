import Image from 'next/image';
// import { Deleteuser, Updateuser, Viewuser } from './buttons';
import { formatDateToLocal } from '@/lib/utils';
import { fetchFilteredUsers } from '@/data/users/fetch-filtered-users';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { UpdateUser } from './buttons';

export default async function UsersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const users = await fetchFilteredUsers(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-secondary p-2 md:pt-0">
          <div className="md:hidden">
            {users?.map((user) => (
              <div
                key={user.id}
                className="mb-2 w-full rounded-md bg-primary-foreground p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <Image
                        src={user.image ?? '/fallback/fallback.png'}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${user.name}'s profile picture`}
                      />
                      <p>{user.name}</p>
                    </div>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Badge className='inline-flex items-center text-xs'
                    variant={user?.emailVerified ? 'success' : 'destructive'}
                  >
                    {user?.emailVerified ? 'Verified' : 'Pending'}
                  </Badge>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-sm font-medium">Date added:</p>
                    <p className="text-base font-medium">
                      {formatDateToLocal(user.createdAt.toISOString())}
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateUser id={user.id} />
                    {/* <Deleteuser id={user.id} /> */}
                    {/* <Viewuser id={user.id} /> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Id
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  User
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Role
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Verified
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users?.map((user) => (
                <tr
                  key={user.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">{user.id}</td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={user.image ?? '/fallback/fallback.png'}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${user.name}'s profile picture`}
                      />
                      <p>{user.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">{user.role}</td>
                  <td className="whitespace-nowrap px-3 py-3">
                  <Badge className='inline-flex items-center text-xs'
                    variant={user?.emailVerified ? 'success' : 'destructive'}
                  >
                    {user?.emailVerified ? 'Verified' : 'Pending'}
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
                      {/* <Deleteuser id={user.id} /> */}
                      {/* <Viewuser id={user.id} /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}