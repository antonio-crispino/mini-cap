/* eslint-disable no-restricted-syntax */
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function useSetupMessages(chats) {
  const { supabase, setError, user } = useAppContext();

  const [messages, setMessages] = useState({});

  const handleAddMessages = useCallback(
    (newMsg) => {
      setMessages((prevMsgs) => {
        const newMessages = JSON.parse(JSON.stringify(prevMsgs));
        if (newMessages[newMsg.conversationId]) {
          newMessages[newMsg.conversationId].push(newMsg);
        } else {
          newMessages[newMsg.conversationId] = [newMsg];
        }
        return newMessages;
      });
    },
    [messages]
  );

  useEffect(() => {
    const fetchMessages = async () => {
      if (!user || !chats.length) return;
      const { data, error } = await supabase.client
        .from("messages")
        .select("*")
        .in("conversationId", chats);
      if (error) {
        setError(error);
        return;
      }
      const newMessages = {};
      for (const msg of data) {
        if (newMessages[msg.conversationId]) {
          newMessages[msg.conversationId].push(msg);
        } else {
          newMessages[msg.conversationId] = [msg];
        }
      }
      setMessages(newMessages);
    };
    fetchMessages();
  }, [user?.id, chats.length]);

  useEffect(() => {
    if (!chats.length || !user) return;
    const subscription = supabase.client
      .from("messages")
      .on("INSERT", (payload) => {
        if (chats.indexOf(payload.new.conversationId) !== -1)
          handleAddMessages(payload.new);
      })
      .subscribe();

    return () => {
      supabase.client.removeSubscription(subscription);
    };
  }, [user?.id, chats?.length]);

  return messages;
}
