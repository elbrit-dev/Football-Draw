"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Scene3D from "./Scene3D";
import PredictionPicker from "./PredictionPicker";
import WizardForm from "./WizardForm";
import ThankYou from "./ThankYou";
import { Predictions, WorldCupEntry } from "@/lib/types";

export default function LuckyDraw() {
  const [screen, setScreen] = useState(0);
  const [picks, setPicks] = useState<Predictions | null>(null);
  const [entry, setEntry] = useState<WorldCupEntry | null>(null);

  const screens = useRef<(HTMLElement | null)[]>([]);
  const mounted = useRef(false);

  useLayoutEffect(() => {
    screens.current.forEach((el, i) => {
      if (el) gsap.set(el, { xPercent: (i - screen) * 100 });
    });
    mounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (!mounted.current) return;
    screens.current.forEach((el, i) => {
      if (el) gsap.to(el, { xPercent: (i - screen) * 100, duration: 0.55, ease: "power3.inOut" });
    });
  }, [screen]);

  function handleLock(p: Predictions) {
    setPicks(p);
    setScreen(1);
  }

  function handleSuccess(data: WorldCupEntry) {
    setEntry(data);
    setScreen(2);
  }

  return (
    <main className="stage">
      <Scene3D />

      <section className="scr" ref={(el) => { screens.current[0] = el; }}>
        <PredictionPicker onLock={handleLock} />
      </section>

      <section className="scr" ref={(el) => { screens.current[1] = el; }}>
        {screen >= 1 && picks && (
          <WizardForm
            picks={picks}
            onSuccess={handleSuccess}
            onBack={() => setScreen(0)}
          />
        )}
      </section>

      <section className="scr" ref={(el) => { screens.current[2] = el; }}>
        {screen === 2 && entry && <ThankYou data={entry} />}
      </section>
    </main>
  );
}
