import React, { useRef, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

const useVideoVisibility = () => {
  const { ref, inView } = useInView({ threshold: 0.5 });
  return { ref, inView };
};

const Video: React.FC<{ src: string }> = ({ src }) => {
  const { ref, inView } = useVideoVisibility();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView]);

  return (
    <div ref={ref} className="w-full h-full">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        className="w-full h-full rounded-lg shadow-lg object-cover"
        playsInline
        controls
      />
    </div>
  );
};

export default Video;
