import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const DEFAULT_AUDIO = "/assets/audio/tema-bomdiasegunda.mp3";

interface AudioPlayerProps {
  audioSrc?: string;
}

export default function AudioPlayer({ audioSrc }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Determine effective src: prop > localStorage > default
  const storedSrc =
    typeof window !== "undefined"
      ? localStorage.getItem("bds_audio_src")
      : null;
  const effectiveSrc = audioSrc || storedSrc || DEFAULT_AUDIO;

  useEffect(() => {
    const audio = new Audio(effectiveSrc);
    audio.loop = true;
    audioRef.current = audio;

    audio.addEventListener("ended", () => setIsPlaying(false));

    return () => {
      audio.pause();
      audio.src = "";
      audioRef.current = null;
    };
  }, [effectiveSrc]);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => {
        // Autoplay blocked by browser — user interaction required
      });
      setIsPlaying(true);
    }
  }

  function toggleMute() {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = !isMuted;
    setIsMuted(!isMuted);
  }

  return (
    <div
      className="flex items-center gap-1"
      title={isPlaying ? "Pausar música" : "Tocar música tema"}
      data-ocid="header.audio.toggle"
    >
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? "Pausar música tema" : "Tocar música tema"}
        className="relative flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 hover:border-[#d7350d] hover:text-[#d7350d] text-gray-600 transition-colors bg-white"
      >
        {isPlaying ? (
          <Pause className="w-3.5 h-3.5" />
        ) : (
          <Play className="w-3.5 h-3.5" />
        )}
        {isPlaying && (
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#d7350d] animate-pulse" />
        )}
      </button>

      {isPlaying && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? "Ativar som" : "Silenciar"}
          className="flex items-center justify-center w-7 h-7 rounded-full text-gray-500 hover:text-[#d7350d] transition-colors"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5" />
          ) : (
            <Volume2 className="w-3.5 h-3.5" />
          )}
        </button>
      )}
    </div>
  );
}
