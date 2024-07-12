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
import Link from "next/link";

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

  const notificationCount = notifications.length;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative rounded-full border-0"
        >
          <Icons.bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <span className="absolute right-0 top-0 rounded-full bg-red-500 px-1 text-xs text-white">
              {notificationCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel className="text-xs">Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {loading ? (
          <DropdownMenuItem>Loading...</DropdownMenuItem>
        ) : notificationCount > 0 ? (
          notifications.map((notification) => (
            <Link
              key={notification.id}
              href={
                notification.notificationType === "item"
                  ? "/items"
                  : "/transactions"
              }
            >
              <DropdownMenuItem className="ml-1 px-1 text-sm">
                {notification.body}
              </DropdownMenuItem>
            </Link>
          ))
        ) : (
          <DropdownMenuItem>No notifications</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
