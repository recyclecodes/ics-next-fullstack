"use server";

import { prisma } from "@/lib/prisma";
import { unstable_noStore as noStore } from "next/cache";

const ITEMS_PER_PAGE = 5;

export async function fetchNotifications(userId: string, userRole: string) {
  noStore();

  try {
    let notifications;

    if (userRole === "SUPERADMIN") {
      notifications = await prisma.notification.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: ITEMS_PER_PAGE,
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
        take: ITEMS_PER_PAGE,
      });
    } else {
      notifications = await prisma.notification.findMany({
        where: {
          userId: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: ITEMS_PER_PAGE,
      });
    }

    return notifications;
  } catch (error) {
    console.error("Failed to fetch notifications:", error);
    return [];
  }
}
