'use client';

import * as React from 'react';

import { AnimatorTitlePreloader as AnimatorTitlePreloaderImpl } from './animator-title-preloader.impl';

/**
 * "Animation Portfolio Preloader" by Kedhareswer Naidu (MIT).
 * https://21st.dev/@kedhareswer/components/animator-title-preloader
 *
 * The preloader stages itself as the title card of a short film: the load bar is
 * the production pipeline (rough, ink, paint and final) and the title is drawn,
 * inked, painted and finally held up by cartoon hands.
 *
 * The implementation lives in `./animator-title-preloader.impl.ts`; this module
 * is the typed public surface.
 */

export type AnimatorPreset = 'ember' | 'dusk' | 'paper';

/** Every colour the component can paint with. */
export type AnimatorPalette = {
  /** Stage / backdrop colour. */
  stage: string;
  /** Primary ink colour. */
  ink: string;
  /** Secondary (muted) text colour. */
  muted: string;
  /** Rough / blue-pencil pass colour. */
  rough: string;
  /** Ghost trail colour. */
  ghost: string;
  /** Title word colour, first stop of the gradient. */
  word0: string;
  /** Title word colour, second stop of the gradient. */
  word1: string;
  /** Title word colour, third stop of the gradient. */
  word2: string;
  /** Mascot sleeve colour, first stop of the gradient. */
  sleeve0: string;
  /** Mascot sleeve colour, second stop of the gradient. */
  sleeve1: string;
  /** Mascot sleeve colour, third stop of the gradient. */
  sleeve2: string;
  /** Painted pattern colour. */
  pattern: string;
  /** Speckle / grain colour. */
  speck: string;
  /** Mascot skin colour, first stop of the gradient. */
  skin0: string;
  /** Mascot skin colour, second stop of the gradient. */
  skin1: string;
  /** Mascot skin colour, third stop of the gradient. */
  skin2: string;
  /** Mascot nail colour. */
  nail: string;
  /** Mascot cuff colour. */
  cuff: string;
};

/** Palette overrides — any subset of {@link AnimatorPalette}. */
export type AnimatorPaletteInput = Partial<AnimatorPalette>;

/** The three built-in palettes. */
export type AnimatorPresetMap = Record<AnimatorPreset, AnimatorPalette>;

export interface AnimatorTitlePreloaderProps {
  /** Optional content rendered inside the final title card. */
  children?: React.ReactNode;
  /** Restart the sequence instead of completing. */
  loop?: boolean;
  /** Drive the sequence manually (0 → 1). */
  progress?: number;
  /** Length of one full pass, in milliseconds. */
  durationMs?: number;
  /** Small line above the title. */
  kicker?: string;
  /** The big title. */
  title?: string;
  /** Word placed between the title and the name. */
  connector?: string;
  /** The name held on the final card. */
  name?: string;
  /** Small line under the name. */
  meta?: string;
  /** Scene label shown in the HUD. */
  scene?: string;
  /** Number of frames the production pipeline is divided into. */
  frames?: number;
  /** Built-in palette to start from. */
  preset?: AnimatorPreset;
  /** Colour overrides applied on top of the preset. */
  palette?: AnimatorPaletteInput;
  /** Show the cartoon hands holding the card. */
  hands?: boolean;
  /** Show the rough / blue-pencil pass. */
  rough?: boolean;
  /** Show the mascot. */
  mascot?: boolean;
  /** Show the production HUD. */
  hud?: boolean;
  /** Seed for the hand-drawn jitter — the same seed always draws the same card. */
  seed?: number;
  /** Accessible label for the loading region. */
  label?: string;
  /** Font stack used for the display type. */
  displayFamily?: string;
  /** Font stack used for the mono type. */
  monoFamily?: string;
  /** Height of the stage. */
  height?: string;
  /** Fired once the sequence finishes. */
  onComplete?: () => void;
  /** Extra class names for the stage element. */
  className?: string;
}

const AnimatorTitlePreloader = AnimatorTitlePreloaderImpl as unknown as React.FC<AnimatorTitlePreloaderProps>;

export {
  ATP_SANS,
  ATP_SCRIPT,
  atpBeats,
  atpDecode,
  atpFrame,
  atpHex,
  atpLayout,
  atpNib,
  atpPath,
  atpRandom,
  atpSimulated,
  atpStage,
  atpSupported,
  ATPPresets,
} from './animator-title-preloader.impl';

export { AnimatorTitlePreloader };
export default AnimatorTitlePreloader;
