"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/ui/icons";
import { fetchNotifications } from "@/data/notifications/fetch-notification-by-user";
import { useSession } from "next-auth/react";
import { Notification } from "@prisma/client";

export default function Notifications() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadNotifications() {
      const userId = session?.user?.id;
      const userRole = session?.user?.role;

      if (userId && userRole) {
        try {
          const fetchedNotifications: Notification[] = await fetchNotifications(
            userId,
            userRole,
          );
          setNotifications(fetchedNotifications);
        } catch (error) {
          console.error("Failed to fetch notifications:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    loadNotifications();
  }, [session]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full border-0">
          <Icons.bell className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-xs">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {loading ? (
          <DropdownMenuItem>Loading...</DropdownMenuItem>
        ) : notifications.length > 0 ? (
          notifications.map((notification) => (
            <DropdownMenuItem className="text-xs" key={notification.id}>
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