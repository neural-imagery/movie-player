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
    { type: "wheelchair", url: "https://www.youtube.com/watch?v=_46AoSnHCRo" },
    { type: "old-neuro", url: "https://www.youtube.com/watch?v=Ytnn0dv_0To" },
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
