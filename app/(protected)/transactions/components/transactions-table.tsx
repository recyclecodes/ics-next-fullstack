import Image from 'next/image';
import { formatDateToLocal } from '@/lib/utils';
import { fetchFilteredItems } from '@/data/items/fetch-filtered-items';
import { fetchTransfersByAdminId } from '@/data/transactions/fetch-filtered-transactions';
import { Badge } from '@/components/ui/badge';
import { ApproveTransaction, RejectTransaction } from './buttons';

export default async function TransactionsTable({
  query,
  currentPage,
  userId,
}: {
  query: string;
  currentPage: number;
  userId: string;
}) {
  const transactions = await fetchTransfersByAdminId(
    query,
    currentPage,
    userId
  );

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-secondary p-2 md:pt-0">
          <table className="min-w-full text-gray-900 md:table">
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
            <tbody className="bg-secondary">
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
                          ? 'outline'
                          : transaction?.status === 'APPROVED'
                          ? 'success'
                          : 'secondary'
                      }
                    >
                      {transaction?.status === 'APPROVED'
                        ? 'Approved'
                        : transaction?.status === 'DECLINED'
                        ? 'Rejected'
                        : transaction?.status === 'ACCEPTED'
                        ? 'Accepted'
                        : 'Pending'}
                    </Badge>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {transaction.status !== 'DECLINED' && (
                        <RejectTransaction id={transaction.id} />
                      )}
                      {transaction.status !== 'APPROVED' && (
                        <ApproveTransaction id={transaction.id} />
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
  );
}
