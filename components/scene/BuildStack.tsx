"use client";

import {
  type CSSProperties,
  type RefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import { SCENE_LAYERS, type LayerId } from "@/data/scene";
import type { PreviewBlock } from "@/data/capabilities";
import {
  useReducedMotion,
  useScrollProgress,
  usePointerTilt,
} from "./useSceneMotion";
import styles from "./BuildStack.module.css";

/**
 * Where each plane sits while the project is still just a demand: scattered in
 * depth, tilted, unaligned. Values are px/deg and are scaled by --scene-depth
 * so phones get a flatter, cheaper version of the same composition.
 */
const SCATTER: Record<LayerId, { x: number; y: number; z: number; rx: number; ry: number }> = {
  estrutura: { x: -320, y: -186, z: -520, rx: 18, ry: 26 },
  interface: { x: 384, y: -122, z: 178, rx: -14, ry: -30 },
  codigo: { x: -422, y: 142, z: 262, rx: 10, ry: 34 },
  conteudo: { x: 302, y: 205, z: -338, rx: -20, ry: -18 },
  integracao: { x: -258, y: -262, z: 120, rx: 22, ry: 16 },
  performance: { x: 424, y: 62, z: -604, rx: -12, ry: -26 },
  publicacao: { x: -84, y: 300, z: 420, rx: 16, ry: 8 },
};

const STAGES = [
  { at: 0, label: "aguardando" },
  { at: 0.38, label: "montando" },
  { at: 0.64, label: "revisando" },
  { at: 0.88, label: "no ar" },
] as const;

function stageFor(progress: number): number {
  let index = 0;
  for (let i = 0; i < STAGES.length; i += 1) {
    const stage = STAGES[i];
    if (stage && progress >= stage.at) index = i;
  }
  return index;
}

type BuildStackProps = {
  /** The tall section whose scroll drives assembly. */
  arcRef: RefObject<HTMLDivElement | null>;
  /** Layers lit up by the currently selected capability. */
  emphasis: readonly LayerId[];
  /** Schematic drawn inside the frame; falls back to a neutral page. */
  preview: readonly PreviewBlock[] | null;
};

/** The neutral page shown before any capability is chosen. */
const DEFAULT_PREVIEW: PreviewBlock[] = [
  { x: 6, y: 6, w: 88, h: 9, tone: "line", label: "Menu" },
  { x: 6, y: 22, w: 52, h: 12, tone: "solid", label: "Título" },
  { x: 6, y: 39, w: 66, h: 5, tone: "fill" },
  { x: 6, y: 47, w: 52, h: 5, tone: "fill" },
  { x: 6, y: 60, w: 42, h: 33, tone: "line", label: "Conteúdo" },
  { x: 52, y: 60, w: 42, h: 33, tone: "line", label: "Imagem" },
];

export function BuildStack({ arcRef, emphasis, preview }: BuildStackProps) {
  const fieldRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(reduced ? STAGES.length - 1 : 0);

  const handleProgress = useCallback((progress: number) => {
    const field = fieldRef.current;
    if (!field) return;
    field.style.setProperty("--p", progress.toFixed(4));
    // The build slides aside as the capability list takes the left column.
    field.style.setProperty("--shift", (progress * 16).toFixed(2));
    setStage((current) => {
      const next = stageFor(progress);
      return next === current ? current : next;
    });
  }, []);

  const handleTilt = useCallback((x: number, y: number) => {
    const field = fieldRef.current;
    if (!field) return;
    field.style.setProperty("--mx", x.toFixed(3));
    field.style.setProperty("--my", y.toFixed(3));
  }, []);

  useScrollProgress(arcRef, handleProgress, { disabled: reduced });
  usePointerTilt(handleTilt, reduced);

  const live = stage === STAGES.length - 1;
  const statusLabel = STAGES[stage]?.label ?? "aguardando";
  const emphasised = new Set(emphasis);

  const blocks = preview ?? DEFAULT_PREVIEW;

  return (
    <div
      className={styles.stage}
      role="img"
      aria-label="Camadas de um projeto web — estrutura, interface, código, conteúdo, integração, performance e publicação — se organizando dentro de um navegador até o projeto entrar no ar."
    >
      <div
        ref={fieldRef}
        className={styles.field}
        style={reduced ? ({ "--p": 1 } as CSSProperties) : undefined}
      >
        <ul className={styles.planes}>
          {SCENE_LAYERS.map((layer, i) => {
            const scatter = SCATTER[layer.id];
            const offset = i - (SCENE_LAYERS.length - 1) / 2;
            return (
              <li
                key={layer.id}
                className={styles.plane}
                style={
                  {
                    "--sx": scatter.x,
                    "--sy": scatter.y,
                    "--sz": scatter.z,
                    "--srx": scatter.rx,
                    "--sry": scatter.ry,
                    "--slot-y": (offset * 5).toFixed(1),
                    "--slot-z": (offset * 13).toFixed(1),
                    "--emph": emphasised.has(layer.id) ? 1 : 0,
                  } as CSSProperties
                }
              >
                <span className={styles.planeEdge} />
                <span className={styles.planeLabel}>
                  {layer.label}
                  <span className={styles.planeNote}>{layer.note}</span>
                </span>
              </li>
            );
          })}
        </ul>

        <div className={styles.frame}>
          <div className={styles.frameBar}>
            <span className={styles.frameDots}>
              <span />
              <span />
              <span />
            </span>
            <span className={styles.frameUrl}>https://seu-projeto</span>
            <span
              className={`${styles.status} ${live ? styles.statusLive : ""}`}
            >
              <span className={styles.statusDot} />
              {statusLabel}
            </span>
          </div>

          {/* Named elements rather than a screenshot: the frame shows what a
              page of this kind is made of, in words a visitor recognises. */}
          <div className={styles.page}>
            {blocks.map((block, i) => (
              <span
                // Index is the identity here: blocks are an ordered schematic
                // and morph position-for-position between capabilities.
                key={i}
                className={`${styles.block} ${
                  styles[block.tone ?? "line"] ?? ""
                }`}
                style={{
                  left: `${block.x}%`,
                  top: `${block.y}%`,
                  width: `${block.w}%`,
                  height: `${block.h}%`,
                }}
              >
                {block.label ? (
                  <span className={styles.blockLabel}>{block.label}</span>
                ) : null}
              </span>
            ))}
          </div>
        </div>

        <ul className={styles.legend} aria-hidden="true">
          {SCENE_LAYERS.map((layer) => (
            <li
              key={layer.id}
              className={`${styles.chip} ${
                emphasised.has(layer.id) ? styles.chipOn : ""
              }`}
            >
              {layer.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
