import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { CSVLink } from "react-csv";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

type TimestampEvent = {
  videoIndex: number;
  timestamp: string;
  event: "started" | "ended";
  clipType: string;
  clipUrl: string;
};

const Home: React.FC = () => {
  const [timestamps, setTimestamps] = useState<TimestampEvent[]>([]);
  const [currentClip, setCurrentClip] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const clips: { url: string; type: string }[] = [
    {
      type: "animatedshorts",
      url: "https://www.youtube.com/watch?v=I5cFBi02O34",
    },
    { type: "jackychan", url: "https://www.youtube.com/watch?v=MYs-FIMxePU" },
    {
      type: "planetearth",
      url: "https://www.youtube.com/watch?v=el4CQj-TCbA",
    },
    {
      type: "animatedshorts",
      url: "https://www.youtube.com/watch?v=e9dZQelULDk",
    },
    {
      type: "mandarinvocab",
      url: "https://www.youtube.com/watch?v=ySPatiyLWAo",
    },
    {
      type: "mandarinvocab",
      url: "https://www.youtube.com/watch?v=lYS-WnFmG54",
    },
    {
      type: "mandarinvocab",
      url: "https://www.youtube.com/watch?v=a68_irrmbkg",
    },
    {
      type: "animatedshorts",
      url: "https://www.youtube.com/watch?v=ofnCdC8P70g",
    },
    {
      type: "animatedshorts",
      url: "https://www.youtube.com/watch?v=uMVtpCPx8ow",
    },
    { type: "3b1b", url: "https://www.youtube.com/watch?v=U_85TaXbeIo" },
    {
      type: "animatedshorts",
      url: "https://www.youtube.com/watch?v=PfyJQEIsMt0",
    },
    { type: "jackychan", url: "https://www.youtube.com/watch?v=yyDFHouhmeY" },
    {
      type: "animatedshorts",
      url: "https://www.youtube.com/watch?v=zfC_GuHiP68",
    },
    {
      type: "mandarinvocab",
      url: "https://www.youtube.com/watch?v=87EKW3C8IHo",
    },
    {
      type: "animatedshorts",
      url: "https://www.youtube.com/watch?v=Bl1FOKpFY2Q",
    },
    { type: "3b1b", url: "https://www.youtube.com/watch?v=v8VSDg_WQlA" },
    {
      type: "planetearth",
      url: "https://www.youtube.com/watch?v=tf1bytsDDho",
    },
    { type: "jackychan", url: "https://www.youtube.com/watch?v=GKCfwcxbUMw" },
    {
      type: "animatedshorts",
      url: "https://www.youtube.com/watch?v=B6uuIHpFkuo",
    },
    {
      type: "mandarinvocab",
      url: "https://www.youtube.com/watch?v=NwrBnIBMS2E",
    },
    { type: "3b1b", url: "https://www.youtube.com/watch?v=S9JGmA5_unY" },
    {
      type: "planetearth",
      url: "https://www.youtube.com/watch?v=bbaX1yeSatQ",
    },
    {
      type: "animatedshorts",
      url: "https://www.youtube.com/watch?v=AZS5cgybKcI",
    },
    { type: "jackychan", url: "https://www.youtube.com/watch?v=8sxwbaKJnZ4" },
    {
      type: "mandarinvocab",
      url: "https://www.youtube.com/watch?v=EZtomXl6p08",
    },
    { type: "jackychan", url: "https://www.youtube.com/watch?v=hPRYwQJvLFM" },
    {
      type: "planetearth",
      url: "https://www.youtube.com/watch?v=EWr8fzUz-Yw",
    },
    { type: "3b1b", url: "https://www.youtube.com/watch?v=rHLEWRxRGiM" },
    {
      type: "planetearth",
      url: "https://www.youtube.com/watch?v=7qQely6VBUs",
    },
    { type: "3b1b", url: "https://www.youtube.com/watch?v=-9OUyo8NFZg" },
    {
      type: "mandarinvocab",
      url: "https://www.youtube.com/watch?v=vPNF35pirEM",
    },
    {
      type: "animatedshorts",
      url: "https://www.youtube.com/watch?v=LVLoc6FrLi0",
    },
    { type: "jackychan", url: "https://www.youtube.com/watch?v=WtfeiAYeuJ0" },
    {
      type: "mandarinvocab",
      url: "https://www.youtube.com/watch?v=0Ta07y15Ces",
    },
    { type: "jackychan", url: "https://www.youtube.com/watch?v=TZfVLePl1Hs" },
    {
      type: "mandarinvocab",
      url: "https://www.youtube.com/watch?v=-CaUn6P8ir4",
    },
    {
      type: "mandarinvocab",
      url: "https://www.youtube.com/watch?v=lyRYhlfaqxs",
    },
    { type: "jackychan", url: "https://www.youtube.com/watch?v=TZfVLePl1Hs" },
    { type: "jackychan", url: "https://www.youtube.com/watch?v=CRK6shZ0Nxo" },
    { type: "jackychan", url: "https://www.youtube.com/watch?v=B215g-Evv0U" },
    {
      type: "planetearth",
      url: "https://www.youtube.com/watch?v=NGtzSd3wFY4",
    },
    {
      type: "planetearth",
      url: "https://www.youtube.com/watch?v=6bx5JUGVahk",
    },
    { type: "3b1b", url: "https://www.youtube.com/watch?v=zjMuIxRvygQ" },
    { type: "3b1b", url: "https://www.youtube.com/watch?v=cy8r7WSuT1I" },
    {
      type: "planetearth",
      url: "https://www.youtube.com/watch?v=PvWLbK_mNw0",
    },
    {
      type: "planetearth",
      url: "https://www.youtube.com/watch?v=jTpg0pODGk8",
    },
    {
      type: "planetearth",
      url: "https://www.youtube.com/watch?v=SiezPjMVjTw",
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const recordTimestamp = (event: "started" | "ended") => {
    const timestampEvent: TimestampEvent = {
      videoIndex: currentClip,
      timestamp: new Date().toLocaleString(),
      event,
      clipType: clips[currentClip].type,
      clipUrl: clips[currentClip].url,
    };
    setTimestamps([...timestamps, timestampEvent]);
  };

  const handleStart = () => {
    if (timestamps[timestamps.length - 1]?.event !== "started") {
      recordTimestamp("started");
    }
  };

  const handleEnd = () => {
    recordTimestamp("ended");
    if (currentClip < clips.length - 1) {
      setCurrentClip(currentClip + 1);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      {isMounted && (
        <ReactPlayer
          url={clips[currentClip].url}
          controls={true}
          onPlay={handleStart}
          onEnded={handleEnd}
        />
      )}

      <div className="mt-4">
        <h2>Timestamps</h2>
        <ul>
          {timestamps.map((timestampEvent, index) => (
            <li key={index}>
              Clip {timestampEvent.videoIndex + 1} {timestampEvent.event}:{" "}
              {timestampEvent.timestamp}
            </li>
          ))}
        </ul>
        <CSVLink data={timestamps} filename={"timestamps.csv"}>
          <div className="flex items-center mt-4">
            <ArrowDownTrayIcon className="h-5 w-5 mr-2" />
            Download timestamps
          </div>
        </CSVLink>
      </div>
    </div>
  );
};

export default Home;
