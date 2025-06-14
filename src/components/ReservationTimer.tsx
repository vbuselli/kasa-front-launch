"use client";
import { useEffect, useState } from "react";

function getTimeLeft(endDate: Date | string) {
  const now = new Date();
  const end = new Date(endDate);
  const diff = Math.max(0, Math.floor((end.getTime() - now.getTime()) / 1000));
  const minutes = Math.floor(diff / 60);
  const seconds = diff % 60;
  return {
    minutes,
    seconds,
    isExpired: diff <= 0,
  };
}

export default function ReservationTimer({
  endDate,
  onExpired,
}: {
  endDate: Date | string;
  onExpired?: () => void;
}) {
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(endDate));
  const [hasExpired, setHasExpired] = useState(false);

  useEffect(() => {
    if (timeLeft.isExpired && !hasExpired) {
      setHasExpired(true);
      if (onExpired) {
        onExpired();
      }
      return;
    }

    if (!timeLeft.isExpired) {
      const interval = setInterval(() => {
        setTimeLeft(getTimeLeft(endDate));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [endDate, timeLeft.isExpired, hasExpired, onExpired]);

  return (
    <div className="border border-yellow-400 bg-transparent rounded-md px-4 py-2 mb-3 flex items-center w-full">
      <span className="text-white text-sm">
        {timeLeft.isExpired ? (
          <span className="text-red-400 font-semibold">
            ⚠️ Tu reserva ha expirado
          </span>
        ) : (
          <>
            Reservamos tus cm² por:{" "}
            <span className="inline-flex items-baseline font-bold text-white mx-1">
              <svg
                className="w-4 h-4 mr-1 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <circle cx="10" cy="10" r="10" />
                <rect x="9" y="5" width="2" height="6" rx="1" fill="#000" />
                <rect x="9" y="12" width="2" height="2" rx="1" fill="#000" />
              </svg>
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>{" "}
            minutos
          </>
        )}
      </span>
    </div>
  );
}