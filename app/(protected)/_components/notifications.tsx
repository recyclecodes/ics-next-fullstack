
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';
import { fetchNotifications } from '@/data/notifications/fetch-notification-by-user';


export default async function Notifications() {
//   const [notifications, setNotifications] = useState<Notification[]>([]);
//   const user = useCurrentUser();
//   const userId = user?.id ?? '';

  const notifications = await fetchNotifications();

//   useEffect(() => {
//     if (!userId) return; 

//     const fetchUserNotifications = async () => {
//       try {
//         const data = await fetchUserNotifications();
//         setNotifications(data);
//       } catch (error) {
//         console.error('Error fetching notifications:', error);
//       }
//     };

//     fetchUserNotifications();
//   }, [userId]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{notifications?.length}</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className='text-xs'>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications && notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem className='text-xs' key={notification.id}>
              {notification.body}
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem>No notifications</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
