"use client";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@components/ui/drawer";
import { ScrollArea } from "@components/ui/scroll-area";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import {
  getNotifications,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/lib/actions";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export function NotificationDrawer() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const response = await getNotifications();
      return response;
    },
    staleTime: 1000 * 60, // Consider data fresh for 1 minute
    refetchOnWindowFocus: true,
  });

  const notifications = data?.notifications || [];
  const unreadCount = notifications.filter(
    (n: Notification) => !n.isRead
  ).length;

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: markAllNotificationsAsRead,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const handleMarkAsRead = async (id: string) => {
    await markAsReadMutation.mutateAsync(id);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsReadMutation.mutateAsync();
  };

  useEffect(() => {
    if (open) {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    }
  }, [open, queryClient]);

  console.log("Notifications:", notifications);

  return (
    <>
      <Button
        variant="default"
        size="icon"
        className="relative p-4 rounded-md"
        onClick={() => setOpen(true)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <div className="mx-auto w-full max-w-7xl h-[75vh] !text-primary_color">
            <DrawerHeader>
              <DrawerTitle>Notifications</DrawerTitle>
              <DrawerDescription className="text-primary_color">
                Stay updated with your latest notifications
              </DrawerDescription>
            </DrawerHeader>

            <div className="p-4">
              <ScrollArea className="h-[40vh]">
                {isLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                  </div>
                ) : notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center p-4 text-center">
                    <Bell className="h-8 w-8" />
                    <p className="mt-2 text-sm ">No notifications yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notifications.map((notification: Notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "rounded-lg border border-primary_color p-4  transition-colors hover:bg-primary_color/20",
                          !notification.isRead && "bg-red/50"
                        )}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-medium">
                              {notification.title}
                            </h4>
                            <p className="mt-1 text-sm ">
                              {notification.message}
                            </p>
                          </div>
                          <span className="text-xs ">
                            {formatDistanceToNow(
                              new Date(notification.createdAt),
                              {
                                addSuffix: true,
                              }
                            )}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </div>

            <DrawerFooter>
              {unreadCount > 0 && (
                <Button
                  variant="default"
                  onClick={handleMarkAllAsRead}
                  className="w-full"
                >
                  Mark all as read
                </Button>
              )}
              <DrawerClose asChild>
                <Button className=" mx-auto" variant="default">
                  Close
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
}
