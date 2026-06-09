"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Music } from "lucide-react";

function createAmbient(ctx: AudioContext, type: "birds" | "wind" | "fire") {
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.06, ctx.currentTime);
  gain.connect(ctx.destination);

  if (type === "birds") {
    [880, 1100, 1320].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(freq * 1.4, ctx.currentTime + 0.2);
      osc.connect(gain);
      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + 0.4 + i * 0.1);
    });
  } else {
    const buf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < data.length; i++) {
      data[i] = (Math.random() * 2 - 1) * (type === "fire" && Math.random() > 0.97 ? 0.9 : 0.15);
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = type === "wind" ? "bandpass" : "lowpass";
    filter.frequency.value = type === "wind" ? 350 : 700;
    src.connect(filter);
    filter.connect(gain);
    src.start();
  }
  return { stop: () => { try { gain.disconnect(); } catch {} } };
}

const TRACKS = [
  { label: "Morning Birds", emoji: "🐦" },
  { label: "African Wind", emoji: "🌬️" },
  { label: "Evening Fire", emoji: "🔥" },
] as const;

export function Soundscape() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState<number | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodeRef = useRef<{ stop: () => void } | null>(null);
  const loopRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function stopAll() {
    nodeRef.current?.stop();
    nodeRef.current = null;
    if (loopRef.current) clearInterval(loopRef.current);
    setPlaying(null);
  }

  function play(i: number) {
    stopAll();
    if (!ctxRef.current) ctxRef.current = new AudioContext();
    const ctx = ctxRef.current;
    const types: ("birds" | "wind" | "fire")[] = ["birds", "wind", "fire"];
    const run = () => { nodeRef.current = createAmbient(ctx, types[i]); };
    run();
    if (i === 0) loopRef.current = setInterval(run, 800);
    setPlaying(i);
  }

  useEffect(() => () => stopAll(), []);

  return (
    <div className="fixed bottom-24 left-6 z-50">
      {open && (
        <div className="mb-3 bg-charcoal/95 backdrop-blur-md border border-earth-700 rounded-xl p-4 shadow-2xl w-52">
          <p className="font-body text-xs text-earth-400 mb-3 tracking-wide uppercase">Experience the atmosphere</p>
          <div className="space-y-2">
            {TRACKS.map((t, i) => (
              <button key={t.label} onClick={() => playing === i ? stopAll() : play(i)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-body transition-all ${playing === i ? "bg-brand-600 text-white" : "text-earth-200 hover:bg-earth-800"}`}>
                <span className="text-base">{t.emoji}</span>
                <span className="flex-1 text-left">{t.label}</span>
                {playing === i ? <VolumeX className="w-3.5 h-3.5 opacity-70" /> : <Volume2 className="w-3.5 h-3.5 opacity-40" />}
              </button>
            ))}
          </div>
          {playing !== null && (
            <button onClick={stopAll} className="w-full mt-3 text-xs text-earth-500 hover:text-earth-300 transition-colors font-body">
              Stop all sounds
            </button>
          )}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center shadow-xl transition-all duration-200 ${open || playing !== null ? "bg-brand-600 text-white scale-110" : "bg-charcoal/80 backdrop-blur-sm border border-earth-700 text-earth-300 hover:scale-105"}`}
        aria-label="Soundscape" title="Experience the atmosphere">
        <Music className="w-5 h-5" />
        {playing !== null && <span className="absolute -top-1 -right-1 w-3 h-3 bg-brand-500 rounded-full animate-pulse" />}
      </button>
    </div>
  );
}
