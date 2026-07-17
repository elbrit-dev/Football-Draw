"use client";

import { useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ElbritLogo from "./ElbritLogo";
import Flag from "./Flag";
import TeamFlag from "./TeamFlag";
import AwardIcon from "./AwardIcon";
import Avatar from "./Avatar";
import { fireConfetti } from "@/lib/confetti";
import {
  Team,
  TEAMS,
  PlayerOption,
  GOLDEN_BOOT,
  GOLDEN_BALL,
  GOLDEN_GLOVE,
  Predictions,
} from "@/lib/types";

interface PredictionPickerProps {
  onLock: (p: Predictions) => void;
}

export default function PredictionPicker({ onLock }: PredictionPickerProps) {
  const [team, setTeam] = useState<Team | null>(null);
  const [boot, setBoot] = useState<PlayerOption | null>(null);
  const [ball, setBall] = useState<PlayerOption | null>(null);
  const [glove, setGlove] = useState<PlayerOption | null>(null);
  const [locked, setLocked] = useState(false);
  const root = useRef<HTMLDivElement>(null);

  const done = [team, boot, ball, glove].filter(Boolean).length;
  const all = done === 4;

  useGSAP(
    () => {
      gsap.from(".pick-anim", {
        y: 18,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
        clearProps: "all",
      });
    },
    { scope: root }
  );

  function lock() {
    if (!all || locked || !team || !boot || !ball || !glove) return;
    setLocked(true);
    fireConfetti();
    setTimeout(() => onLock({ team, boot, ball, glove }), 1600);
  }

  return (
    <div className="pick wide" ref={root}>
      <div className="logo-row pick-anim">
        <ElbritLogo height={38} />
      </div>

      <p className="eyebrow pick-anim">The Champion&rsquo;s Call · 2026</p>
      <h1 className="pick-anim">
        Predict the <span>FIFA World Cup Winners</span>
      </h1>
      <p className="sub pick-anim">
        Get <b>all 4 Winners right</b> and win amazing prizes — winners announced after the World Cup Final 🏆
      </p>

      <div className="ball-hero pick-anim">
        <Image src="/elbrit-ball.png" alt="Elbrit football" width={112} height={112} priority className="ball-img" />
      </div>

      {/* Q1 — Champion */}
      <section className="qblock pick-anim">
        <div className="qhead">
          <span className="qicon">🏆</span>
          <div className="qmeta">
            <h2 className="qtitle">Champion</h2>
            <p className="qsub">Who lifts the trophy?</p>
          </div>
          {team && <span className="qtick">✓</span>}
        </div>
        <div className="team-grid">
          {TEAMS.map((t) => (
            <button
              key={t.code}
              type="button"
              className="team-card"
              aria-pressed={team?.code === t.code}
              onClick={() => !locked && setTeam(t)}
            >
              <span className="team-flag">
                <TeamFlag code={t.code} />
              </span>
              <span className="team-name">{t.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Q2 — Golden Boot */}
      <PlayerQuestion
        icon={<AwardIcon kind="boot" />}
        title="Golden Boot"
        sub="Top scorer of the tournament"
        options={GOLDEN_BOOT}
        selected={boot}
        onSelect={(o) => !locked && setBoot(o)}
      />

      {/* Q3 — Golden Ball */}
      <PlayerQuestion
        icon={<AwardIcon kind="ball" />}
        title="Golden Ball"
        sub="Best player of the tournament"
        options={GOLDEN_BALL}
        selected={ball}
        onSelect={(o) => !locked && setBall(o)}
      />

      {/* Q4 — Golden Glove */}
      <PlayerQuestion
        icon={<AwardIcon kind="glove" />}
        title="Golden Glove"
        sub="Best goalkeeper of the tournament"
        options={GOLDEN_GLOVE}
        selected={glove}
        onSelect={(o) => !locked && setGlove(o)}
      />

      <p className={`pick-progress pick-anim ${all ? "ready" : ""}`}>
        {all ? "All 4 picks ready — lock them in!" : `${done} of 4 predictions chosen`}
      </p>

      <button
        className={`btn-primary pick-anim ${all && !locked ? "on" : "off"}`}
        onClick={lock}
        type="button"
      >
        Lock in my predictions &rarr;
      </button>

      {locked && team && boot && ball && glove && (
        <div className="lock-pop">
          <div className="lock-pop-card">
            <span className="lock-pop-badge">Predictions locked 🎉</span>
            <ul className="lock-pop-list">
              <li><span>🏆 Champion</span><b>{team.name}</b></li>
              <li><span>👟 Golden Boot</span><b>{boot.name}</b></li>
              <li><span>⚽ Golden Ball</span><b>{ball.name}</b></li>
              <li><span>🧤 Golden Glove</span><b>{glove.name}</b></li>
            </ul>
            <div className="lock-pop-sub">Now just a few quick details…</div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── One player-award question: a single-select list of players ── */
function PlayerQuestion({
  icon,
  title,
  sub,
  options,
  selected,
  onSelect,
}: {
  icon: ReactNode;
  title: string;
  sub: string;
  options: PlayerOption[];
  selected: PlayerOption | null;
  onSelect: (o: PlayerOption) => void;
}) {
  return (
    <section className="qblock pick-anim">
      <div className="qhead">
        <span className="qicon">{icon}</span>
        <div className="qmeta">
          <h2 className="qtitle">{title}</h2>
          <p className="qsub">{sub}</p>
        </div>
        {selected && <span className="qtick">✓</span>}
      </div>
      <div className="pl-list">
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            className="pl-row"
            aria-pressed={selected?.id === o.id}
            onClick={() => onSelect(o)}
          >
            <Avatar name={o.name} />
            <span className="pl-info">
              <span className="pl-name">{o.name}</span>
              <span className="pl-country">
                <span className="pl-flag">
                  <Flag code={o.countryCode} />
                </span>
                {o.country}
              </span>
            </span>
            <span className="pl-radio" aria-hidden="true" />
          </button>
        ))}
      </div>
    </section>
  );
}
