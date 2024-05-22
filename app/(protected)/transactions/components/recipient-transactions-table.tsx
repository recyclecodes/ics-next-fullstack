import Image from 'next/image';
import { fetchTransfersByRecipientId } from '@/data/transactions/fetch-filtered-transactions';
import { Badge } from '@/components/ui/badge';
import { AcceptTransaction } from './buttons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { FaUser } from 'react-icons/fa';

export default async function RecipientTransactionsTable({
  query,
  currentPage,
  userId,
}: {
  query: string;
  currentPage: number;
  userId: string;
}) {
  const transactions = await fetchTransfersByRecipientId(
    query,
    currentPage,
    userId
  );

  return (
    <>
      <div className="-mt-2 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-secondary p-2 md:pt-0">
            {transactions && transactions.length > 0 ? (
              <div className="md:hidden">
                {transactions?.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="mb-2 w-full rounded-md bg-background p-4"
                  >
                    <div className="flex items-center justify-between border-b pb-4">
                      {transaction.items.map((item) => (
                        <div
                          key={item.id}
                          className="mb-2 flex items-center justify-between"
                        >
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

                          <p className="ml-2 flex flex-col">
                            {item.name}
                            <span className="text-xs text-muted-foreground">
                              {item.brand}
                            </span>
                          </p>
                        </div>
                      ))}
                      <div>
                        <Badge
                          className="rounded-lg px-2 py-1 justify-center text-xs"
                          variant={
                            transaction?.status === 'DECLINED'
                              ? 'destructive'
                              : transaction?.status === 'ACCEPTED'
                              ? 'success'
                              : transaction?.status === 'APPROVED'
                              ? 'progress'
                              : 'pending'
                          }
                        >
                          {transaction?.status === 'APPROVED'
                            ? 'IN PROGRESS'
                            : transaction?.status === 'DECLINED'
                            ? 'DECLINED'
                            : transaction?.status === 'ACCEPTED'
                            ? 'DELIVERED'
                            : 'PENDING'}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between pt-4">
                      <div className="mb-2 flex items-center">
                        <Avatar>
                          <AvatarImage
                            src={
                              transaction.sender.image ??
                              '/fallback/fallback.png'
                            }
                            width={28}
                            height={28}
                            alt={`${transaction.sender.name}`}
                          />
                          <AvatarFallback className="bg-primary">
                            <FaUser className="text-primary-foreground w-4 h-4" />
                          </AvatarFallback>
                        </Avatar>

                        <p className="ml-2 flex flex-col">
                          {transaction.sender.name}

                          <span className="text-xs text-muted-foreground">
                            {transaction.senderCompany.name}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-end gap-2">
                        {transaction.status !== 'ACCEPTED' && (
                          <AcceptTransaction id={transaction.id} />
                        )}
                        {/* <UpdateCompany id={company.id} /> */}
                        {/* <DeleteItem id={item.id} /> */}
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
              <thead className="rounded-lg text-left text-sm font-normal">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                    Sender
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Item
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Recipient
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Status
                  </th>
                  <th scope="col" className="relative py-3 pl-6 pr-3">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {transactions?.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            transaction.sender.image ?? '/fallback/fallback.png'
                          }
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${transaction.sender}'s image`}
                        />
                        <p>{transaction.sender.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {transaction.items.map((item) => (
                        <div key={item.id}>
                          <div className="flex items-center gap-3">
                            <Image
                              src={item.image ?? '/fallback/fallback.png'}
                              className="rounded-full"
                              width={28}
                              height={28}
                              alt={`${item.name}'s image`}
                            />
                            <p>{item.name}</p>
                          </div>
                        </div>
                      ))}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex items-center gap-3">
                        <Image
                          src={
                            transaction.recipient.image ??
                            '/fallback/fallback.png'
                          }
                          className="rounded-full"
                          width={28}
                          height={28}
                          alt={`${transaction.recipient}'s image`}
                        />
                        <p>{transaction.recipient.name}</p>
                      </div>
                    </td>
                    <td className="whitespace-nowrap py-3 pr-3">
                      <Badge
                        className="inline-flex items-center text-xs"
                        variant={
                          transaction?.status === 'DECLINED'
                            ? 'destructive'
                            : transaction?.status === 'ACCEPTED'
                            ? 'success'
                            : transaction?.status === 'APPROVED'
                            ? 'progress'
                            : 'pending'
                        }
                      >
                        {transaction?.status === 'APPROVED'
                          ? 'IN PROGRESS'
                          : transaction?.status === 'DECLINED'
                          ? 'DECLINED'
                          : transaction?.status === 'ACCEPTED'
                          ? 'DELIVERED'
                          : 'PENDING'}
                      </Badge>
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end gap-3">
                        {transaction.status !== 'ACCEPTED' && (
                          <AcceptTransaction id={transaction.id} />
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
