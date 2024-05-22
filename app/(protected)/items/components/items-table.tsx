import { FaUser } from 'react-icons/fa';
import { fetchFilteredItems } from '@/data/items/fetch-filtered-items';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DeleteItem } from './buttons';
import { formatDateToLocal } from '@/lib/utils';
import { supabase } from '@/lib/supabase';


export default async function ItemsTable({
  query,
  currentPage,
  userId,
}: {
  query: string;
  currentPage: number;
  userId: string;
}) {
  const items = await fetchFilteredItems(query, currentPage, userId);


  // supabase
  // .channel("realtime items")
  // .on(
  //   "postgres_changes",
  //   {
  //     event: "*",
  //     schema: "public",
  //     table: "Item",
  //   },
  //   (payload: any) => {
  //     console.log(payload)
  //   }
  // )
  // .subscribe();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-secondary p-2 md:pt-0">
          {items && items.length > 0 ? (
            <div className="md:hidden">
              {items?.map((item) => (
                <div
                  key={item.id}
                  className="mb-2 w-full rounded-md bg-background p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <Avatar>
                          <AvatarImage
                            src={item.image ?? '/fallback/fallback.png'}
                            width={28}
                            height={28}
                            alt={`${item.name}`}
                          />
                            <AvatarFallback className="bg-primary">
                              <FaUser className="text-primary-foreground w-4 h-4" />
                            </AvatarFallback>
                        </Avatar>
                        <p className="ml-2 flex flex-col">{item.name}
                        <span className="text-xs text-muted-foreground">{item.brand}</span>
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.brand}</p>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-sm font-medium">Date added:</p>
                      <p className="text-base font-medium">
                        {formatDateToLocal(item.createdAt.toISOString())}
                        {}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      {/* <UpdateCompany id={company.id} /> */}
                      <DeleteItem id={item.id} />
                      {/* <ViewCompany id={company.id} /> */}
                    </div>
                  </div>
                    
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="md:hidden text-primary text-center py-4">
              No data found
            </p>
          )}
          <table className=" hidden min-w-full md:table">
            {items && items.length > 0 ? (
              <>
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      ID
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Item
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-background">
                  {items?.map((item) => (
                    <tr
                      key={item.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap px-3 py-3">{item.id}</td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={item.image ?? '/fallback/fallback.png'}
                            width={28}
                            height={28}
                            alt={`${item.name}`}
                          />
                            <AvatarFallback className="bg-primary">
                              <FaUser className="text-primary-foreground w-4 h-4" />
                            </AvatarFallback>
      
                        </Avatar>
                          <div className='ml-2'>{item.name}</div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          {/* <UpdateItem id={item.id} /> */}
                          {/* Add other action buttons here */}
                        </div>
                      </td>
                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          {/* <UpdateUser id={user.id} /> */}
                          <DeleteItem id={item.id} />
                          {/* <Viewuser id={user.id} /> */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </>
            ) : (
              <div className="text-center text-primary py-4">No data found</div>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
