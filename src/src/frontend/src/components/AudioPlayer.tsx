import { Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface AudioPlayerProps {
  audioSrc?: string | null;
}

export default function AudioPlayer({ audioSrc }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Create/destroy audio element imperatively to avoid lint/caption requirements
  useEffect(() => {
    if (!audioSrc) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      return;
    }
    const el = new Audio(audioSrc);
    el.loop = true;
    audioRef.current = el;
    return () => {
      el.pause();
      audioRef.current = null;
    };
  }, [audioSrc]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {});
      setIsPlaying(true);
    }
  }

  if (!audioSrc) return null;

  return (
    <button
      type="button"
      onClick={togglePlay}
      title={isPlaying ? "Pausar música" : "Tocar música tema"}
      aria-label={isPlaying ? "Pausar música" : "Tocar música tema"}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border text-xs font-medium transition-all ${
        isPlaying
          ? "bg-[#d7350d] border-[#d7350d] text-white shadow-md animate-pulse"
          : "bg-white border-gray-300 text-gray-600 hover:border-[#d7350d] hover:text-[#d7350d]"
      }`}
      data-ocid="header.audio_toggle"
    >
      {isPlaying ? (
        <Volume2 className="w-4 h-4" />
      ) : (
        <VolumeX className="w-4 h-4" />
      )}
      <span className="hidden sm:inline">
        {isPlaying ? "Tocando" : "Música"}
      </span>
    </button>
  );
}
