
import { formatDateToLocal } from '@/lib/utils';
import { fetchFilteredCompanies } from '@/data/companies/fetch-filtered-companies';
import { DeleteCompany, UpdateCompany } from './buttons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaUser, FaUsers } from 'react-icons/fa';
import { BsBoxFill } from 'react-icons/bs';

export default async function CompaniesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const companies = await fetchFilteredCompanies(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-secondary p-2 md:pt-0">
          {companies && companies.length > 0 ? (
            <div className="md:hidden">
              {companies?.map((company) => (
                <div
                  key={company.id}
                  className="mb-2 w-full rounded-md bg-background p-4"
                >
                  <div className="flex items-center justify-between border-b pb-4">
                    <div>
                      <div className="mb-2 flex items-center">
                        <Avatar>
                          <AvatarImage
                            src={company.image ?? '/fallback/fallback.png'}
                            width={28}
                            height={28}
                            alt={`${company.name}`}
                          />
                          <AvatarFallback className="bg-primary">
                            <FaUser className="text-primary-foreground w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>

                        <p className="ml-2 flex flex-col">
                          {company.name}
                          <span className="text-xs text-muted-foreground">
                            {company.id}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <p className="text-lg items-baseline font-medium text-center">
                        <FaUsers className="w-5 h-5" />
                        {company.users.length}{' '}
                      </p>
                      <p className="text-lg items-baseline font-medium text-center">
                        <BsBoxFill className="w-5 h-5" />
                        {company.users.reduce(
                          (total, user) => total + user.items.length,
                          0
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full items-center justify-between pt-4">
                    <div>
                      <p className="text-sm font-medium">Date added:</p>
                      <p className="text-base font-medium">
                        {formatDateToLocal(company.createdAt.toISOString())}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <UpdateCompany id={company.id} />
                      <DeleteCompany id={company.id} />
                      {/* <ViewCompany id={company.id} /> */}
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

          <table className="hidden min-w-full md:table">
            {companies && companies.length > 0 ? (
              <>
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                      ID
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      Company
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      No. of Users
                    </th>
                    <th scope="col" className="px-3 py-5 font-medium">
                      No. of Items
                    </th>
                    <th scope="col" className="relative py-3 pl-6 pr-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-background">
                  {companies?.map((company) => (
                    <tr
                      key={company.id}
                      className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                    >
                      <td className="whitespace-nowrap px-3 py-3">
                        {company.id}
                      </td>

                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={company.image ?? '/fallback/fallback.png'}
                              width={28}
                              height={28}
                              alt={`${company.name}`}
                            />
                            <AvatarFallback className="bg-primary">
                              <FaUser className="text-primary-foreground w-4 h-4" />
                            </AvatarFallback>
                          </Avatar>
                          <div>{company.name}</div>
                        </div>
                      </td>

                      <td className="whitespace-nowrap text-lg px-3 py-3">
                        <div className="flex items-center gap-3">
                          {company.users.length}
                          <FaUsers className="w-5 h-5" />
                        </div>
                      </td>

                      <td className="whitespace-nowrap text-lg px-3 py-3">
                        <div className="flex items-center gap-3">
                          {company.users.reduce(
                            (total, user) => total + user.items.length,
                            0
                          )}

                          <BsBoxFill className="w-5 h-5" />
                        </div>
                      </td>

                      <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        <div className="flex justify-end gap-3">
                          <UpdateCompany id={company.id} />
                          <DeleteCompany id={company.id} />
                          {/* <ViewCompany id={company.id} /> */}
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
