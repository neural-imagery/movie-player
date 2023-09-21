import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player/youtube';

type TimestampEvent = {
  videoIndex: number;
  timestamp: string;
  event: 'started' | 'ended' ;
};

const Home: React.FC = () => {
  const [timestamps, setTimestamps] = useState<TimestampEvent[]>([]);
  const [currentClip, setCurrentClip] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const clips: string[] = [
    'https://www.youtube.com/watch?v=_46AoSnHCRo',
    'https://www.youtube.com/watch?v=uoP3r22Ox_4',
  ];
  

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const recordTimestamp = (event: 'started' | 'ended' ) => {
    const timestampEvent: TimestampEvent = {
      videoIndex: currentClip,
      timestamp: new Date().toLocaleString(),
      event,
    };
    setTimestamps([...timestamps, timestampEvent]);
  };

  const handleStart = () => {
    if (timestamps[timestamps.length - 1]?.event !== 'started') {
      recordTimestamp('started');
    }
  };

  const handleEnd = () => {
    recordTimestamp('ended');
    if (currentClip < clips.length - 1) {
      setCurrentClip(currentClip + 1);
    }
  };

  return (
    <div>
      <h1>YouTube Clip Sequence</h1>

      {isMounted && (
        <ReactPlayer
          url={clips[currentClip]}
          controls={true}
          onPlay={handleStart}
          onEnded={handleEnd}
        />
      )}

      <h2>Timestamps</h2>
      <ul>
        {timestamps.map((timestampEvent, index) => (
          <li key={index}>
            Clip {timestampEvent.videoIndex + 1} {timestampEvent.event}: {timestampEvent.timestamp}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;




// 'https://www.youtube.com/watch?v=_46AoSnHCRo',
//     'https://www.youtube.com/watch?v=uoP3r22Ox_4',