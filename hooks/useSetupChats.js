import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";

export default function useSetupChats() {
  const { supabase, setError, user } = useAppContext();
  const [chats, setChats] = useState([]);
  const typeId = user?.userType === "doctor" ? "doctorId" : "patientId";

  const fetchChats = useCallback(async () => {
    if (!user) return;
    const otherId = typeId === "doctorId" ? "patientId" : "doctorId";
    const { data, error } = await supabase.client
      .from("conversations")
      .select(`*, info: users!conversations_${otherId}_fkey (*)`)
      .eq(typeId, user.id);
    if (error) {
      setError(error);
      return;
    }
    setChats(data);
  }, [user]);

  useEffect(() => {
    fetchChats();
  }, [user]);

  useEffect(() => {
    if (chats.length > 0) {
      const subscription = supabase.client
        .from(`conversations:${typeId}=eq.${user.id}`)
        .on("*", async () => {
          await fetchChats();
        })
        .subscribe();
      return () => {
        supabase.client.removeSubscription(subscription);
      };
    }
  }, [chats.length, supabase.client, typeId]);

  return chats;
}
