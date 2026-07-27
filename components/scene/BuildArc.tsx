"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { Capability } from "@/data/capabilities";
import { BuildStack } from "./BuildStack";
import styles from "./BuildArc.module.css";

type SceneApi = {
  /** Point the scene at a capability, or pass null to clear. */
  focus: (capability: Capability | null) => void;
};

const SceneContext = createContext<SceneApi>({ focus: () => {} });

/** Lets a section drive the shared Signature Scene. */
export function useScene(): SceneApi {
  return useContext(SceneContext);
}

/**
 * The stretch of page the build happens over. The scene sticks for the whole
 * arc while the hero and the capability list scroll across it, so there is one
 * continuous scene rather than a per-section effect.
 */
export function BuildArc({ children }: { children: ReactNode }) {
  const arcRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Capability | null>(null);

  const api = useMemo<SceneApi>(() => ({ focus: setActive }), []);

  return (
    <SceneContext.Provider value={api}>
      <div ref={arcRef} className={styles.arc}>
        <BuildStack
          arcRef={arcRef}
          activeId={active?.id ?? null}
          emphasis={active?.emphasis ?? []}
          preview={active?.preview ?? null}
        />
        <div className={styles.content}>{children}</div>
      </div>
    </SceneContext.Provider>
  );
}
