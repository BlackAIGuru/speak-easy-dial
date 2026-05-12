import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, Search, Star, Plus, Mic2 } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/voice-library")({
  component: VoiceLibrary,
  head: () => ({ meta: [{ title: "Voice Library · Castwave" }] }),
});

type Voice = {
  id: string;
  name: string;
  gender: "Male" | "Female";
  accent: string;
  language: string;
  provider: "ElevenLabs" | "PlayHT" | "Azure";
  tags: string[];
  featured?: boolean;
};

const voices: Voice[] = [
  { id: "v1", name: "Aria", gender: "Female", accent: "American", language: "English (US)", provider: "ElevenLabs", tags: ["Conversational", "Warm"], featured: true },
  { id: "v2", name: "Liam", gender: "Male", accent: "British", language: "English (UK)", provider: "ElevenLabs", tags: ["Professional", "Calm"] },
  { id: "v3", name: "Sofia", gender: "Female", accent: "Latin", language: "Spanish (MX)", provider: "PlayHT", tags: ["Friendly"] },
  { id: "v4", name: "Marcus", gender: "Male", accent: "American", language: "English (US)", provider: "Azure", tags: ["Authoritative"], featured: true },
  { id: "v5", name: "Noor", gender: "Female", accent: "Neutral", language: "English (US)", provider: "ElevenLabs", tags: ["Energetic", "Sales"] },
  { id: "v6", name: "Ethan", gender: "Male", accent: "Australian", language: "English (AU)", provider: "PlayHT", tags: ["Casual"] },
];

function VoiceLibrary() {
  const [playing, setPlaying] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const filtered = voices.filter((v) =>
    (v.name + v.language + v.accent + v.provider).toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <DashboardLayout title="Voice Library">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Voice Library</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Browse and preview AI voices for your outbound calling agents.
            </p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Clone Voice
          </Button>
        </div>

        <div className="mt-6 flex gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search voices, languages, providers..."
              className="pl-9 bg-input/60 border-border"
            />
          </div>
          <select className="rounded-md border border-border bg-input/60 px-3 py-2 text-sm">
            <option>All Providers</option>
            <option>ElevenLabs</option>
            <option>PlayHT</option>
            <option>Azure</option>
          </select>
          <select className="rounded-md border border-border bg-input/60 px-3 py-2 text-sm">
            <option>All Languages</option>
            <option>English</option>
            <option>Spanish</option>
          </select>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((v) => {
            const isPlaying = playing === v.id;
            return (
              <div
                key={v.id}
                className="group relative rounded-2xl border border-border bg-card p-5 hover:border-primary/40 transition"
              >
                {v.featured && (
                  <Star className="absolute top-4 right-4 h-4 w-4 fill-warning text-warning" />
                )}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPlaying(isPlaying ? null : v.id)}
                    className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-primary-glow grid place-items-center text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 transition"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
                  </button>
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{v.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {v.gender} · {v.accent}
                    </p>
                  </div>
                </div>

                <div className="mt-4 h-10 flex items-end gap-0.5">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <span
                      key={i}
                      className={`flex-1 rounded-sm ${isPlaying ? "bg-primary" : "bg-muted"}`}
                      style={{
                        height: `${20 + Math.abs(Math.sin(i * 0.5 + v.id.length)) * 80}%`,
                        opacity: isPlaying ? 0.4 + Math.random() * 0.6 : 0.5,
                      }}
                    />
                  ))}
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {v.tags.map((t) => (
                      <Badge key={t} variant="secondary" className="text-[10px]">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {v.provider}
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button variant="secondary" size="sm" className="flex-1">
                    <Mic2 className="h-3.5 w-3.5 mr-1.5" /> {v.language}
                  </Button>
                  <Button size="sm" className="flex-1">Use Voice</Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
