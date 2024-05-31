import { useEffect, useState } from "react";
import { MessagePayload, onMessage } from "firebase/messaging";
import useFCMToken from "./use-fcm-token";
import { messaging } from "@/utils/firebase";
import { useToast } from "@/components/ui/use-toast";

const useFCM = () => {
    const { toast } = useToast();
  const fcmToken = useFCMToken();
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      const fcmmessaging = messaging();
      const unsubscribe = onMessage(fcmmessaging, (payload) => {
        toast({
            variant: 'default',
            title: `${payload.notification?.title}`,
            description: `${payload.notification?.body}`,
          });
        setMessages((messages) => [...messages, payload]);
      });
      return () => unsubscribe();
    }
  }, [fcmToken, toast]);
  return { fcmToken, messages };
};

export default useFCM;
