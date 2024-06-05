import { FaUser, FaUsers } from "react-icons/fa";
import { adminFetchFilteredItems } from "@/data/items/fetch-filtered-items";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DeleteItem } from "./buttons";
import { formatDateToLocal } from "@/lib/utils";

export default async function AdminItemsTable({
  query,
  currentPage,
  currentUserCompanyId,
}: {
  query: string;
  currentPage: number;
  currentUserCompanyId: string;
}) {
  const items = await adminFetchFilteredItems(
    query,
    currentPage,
    currentUserCompanyId,
  );

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
                            src={item.image ?? "/fallback/fallback.png"}
                            width={28}
                            height={28}
                            alt={`${item.name}`}
                          />
                          <AvatarFallback className="bg-primary">
                            <FaUser className="h-4 w-4 text-primary-foreground" />
                          </AvatarFallback>
                        </Avatar>
                        <p className="ml-2 flex flex-col">
                          {item.name}
                          <span className="text-xs text-muted-foreground">
                            {item.brand}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <div className="flex">
                        <FaUser className="h-4 w-4" />
                        <p className="ml-3 text-sm font-medium">
                          {item.user?.name}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      {/* <UpdateCompany id={company.id} /> */}
                      <DeleteItem id={item.id} />
                      {/* <ViewCompany id={company.id} /> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="py-4 text-center text-primary md:hidden">
              No data found
            </p>
          )}

          <table className="hidden min-w-full md:table">
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
                              src={item.image ?? "/fallback/fallback.png"}
                              width={28}
                              height={28}
                              alt={`${item.name}`}
                            />
                            <AvatarFallback className="bg-primary">
                              <FaUser className="h-4 w-4 text-primary-foreground" />
                            </AvatarFallback>
                          </Avatar>
                          <p className="ml-2">{item.name}</p>
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
              <p className="py-4 text-center text-primary">No data found</p>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
