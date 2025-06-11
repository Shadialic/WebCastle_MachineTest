"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import LoadingSpinner from "../common/LoadingSpinner";
import Header from "../layout/Header";
import PhoneSetup from "./PhoneSetup";
import CalendarEvents from "./CalenderEvents";
import useApi from "@/hooks/useApi";
import { signOut, useSession } from "next-auth/react";

const Index = () => {
  const { data: session } = useSession();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneSet, setIsPhoneSet] = useState(false);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [fetchingEvents, setFetchingEvents] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated || !session) return;

    const api = useApi(session);

    const fetchUserData = async () => {
      setIsInitialLoading(true);
      try {
        const { data } = await api.get("/user/profile");
        if (data.user?.phone) {
          setPhoneNumber(data.user.phone);
          setIsPhoneSet(true);
        }

        await fetchUpcomingEvents(api);
      } catch (error) {
        toast.error("Failed to load user data");
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchUserData();
  }, [isHydrated, session]);

  const fetchUpcomingEvents = async (apiInstance) => {
    setFetchingEvents(true);
    try {
      const { data } = await apiInstance.get("event/calendar");
      
      setUpcomingEvents(data.events || []);
    } catch (error) {
    } finally {
      setFetchingEvents(false);
    }
  };

 const handleLogout = async () => {
  try {
    await signOut({ callbackUrl: "/" }); 
  } catch (error) {
    console.error("Error logging out:", error);
    if (typeof window !== "undefined") {
      window.location.href = "/";
    }
  }
};

  if (!isHydrated || !session||isInitialLoading) {
    return (
      <LoadingSpinner
        message="Loading Dashboard..."
        subtitle="Please wait while we fetch your data"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={session} onLogout={handleLogout} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <PhoneSetup
              phoneNumber={phoneNumber}
              isPhoneSet={isPhoneSet}
              session={session}
              setIsPhoneSet={setIsPhoneSet}
            />
          </div>

          <div className="lg:col-span-2">
            <CalendarEvents
              events={upcomingEvents}
              loading={fetchingEvents}
              onRefresh={fetchUpcomingEvents}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
