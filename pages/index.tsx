import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import { CSVLink } from "react-csv";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

type Event = "started" | "ended" | "rest";

type TimestampEvent = {
  videoIndex: number;
  timestamp: string;
  event: Event;
  clipType: string;
  clipUrl: string;
};

// watched
//    {
//      type: "mandarinvocab",
//      url: "https://www.youtube.com/watch?v=NwrBnIBMS2E",
//    },
//    { type: "jackychan", url: "https://www.youtube.com/watch?v=yyDFHouhmeY" },
//    { type: "3b1b", url: "https://www.youtube.com/watch?v=rHLEWRxRGiM" },
//  {
//      type: "planetearth",
//      url: "https://www.youtube.com/watch?v=bbaX1yeSatQ",
//    },
//    {
//      type: "animatedshorts",
//      url: "https://www.youtube.com/watch?v=ofnCdC8P70g",
//    },
//    { type: "3b1b", url: "https://www.youtube.com/watch?v=v8VSDg_WQlA" },
//    {
//      type: "mandarinvocab",
//      url: "https://www.youtube.com/watch?v=ySPatiyLWAo",
//    },

const Home: React.FC = () => {
  const [timestamps, setTimestamps] = useState<TimestampEvent[]>([]);
  const [currentClip, setCurrentClip] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isRestPeriod, setIsRestPeriod] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [clips, setClips] = useState<{ url: string; type: string }[]>([]); // New state variable

  const restTime = 20; // seconds
  useEffect(() => {
    fetch("dataset_randomized.json")
      .then((response) => response.json())
      .then((data) => {
        setClips(data);
      });
  }, []);

  useEffect(() => {
    setIsMounted(true);
    handleRestPeriod();
  }, []);

  const handleRestPeriod = () => {
    recordTimestamp("rest");
    setIsRestPeriod(true);
    let counter = 0;
    const interval = setInterval(() => {
      counter += 1;
      setProgress((counter / restTime) * 100);
      if (counter >= restTime) {
        clearInterval(interval);
        setIsRestPeriod(false);
      }
    }, 1000);
  };

  const recordTimestamp = (event: Event) => {
    const timestampEvent: TimestampEvent = {
      videoIndex: currentClip,
      timestamp: new Date().toLocaleString(),
      event,
      clipType: clips[currentClip]?.type,
      clipUrl: clips[currentClip]?.url,
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
      handleRestPeriod();
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      {isRestPeriod ? (
        <div>
          <h2>Rest for {restTime} seconds</h2>
          {/* <progress value={progress} max="100"></progress> */}
        </div>
      ) : (
        isMounted && (
          <ReactPlayer
            url={clips[currentClip]?.url}
            controls={true}
            onPlay={handleStart}
            onEnded={handleEnd}
          />
        )
      )}

      <div className="mt-4 text-gray-900">
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
