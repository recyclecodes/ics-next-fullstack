"use server";

import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";
import { Notification } from "@prisma/client";

export async function fetchNotifications(
  userId: string,
  userRole: string,
): Promise<Notification[]> {
  noStore();

  try {
    let notifications: Notification[] = [];

    if (userRole === "SUPERADMIN") {
      notifications = await prisma.notification.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });
    } else if (userRole === "ADMIN") {
      notifications = await prisma.notification.findMany({
        where: {
          OR: [
            { userId: userId },
            {
              user: {
                company: {
                  users: {
                    some: {
                      id: userId,
                      role: "ADMIN",
                    },
                  },
                },
              },
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return notifications;
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return [];
  }
}
