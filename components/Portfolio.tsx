"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useReducer, useState } from "react";
import { ArrowDownRight, ArrowLeft, ArrowUpRight, Compass, Map, Maximize, Moon, Mouse, Move, RotateCcw } from "lucide-react";
import { initialNavigation, navigationReducer } from "@/lib/navigation";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { profile, storeById, stores } from "@/data/stores";
import type { StoreId } from "@/data/types";
import Navigation from "./ui/Navigation";
import PortfolioPanel from "./ui/PortfolioPanel";
import InformationPanel from "./ui/InformationPanel";
import SceneBoundary from "./scene/SceneBoundary";
import { storeIcons } from "./ui/icons";
import StoreLabel from "./ui/StoreLabel";

const PortfolioScene = dynamic(() => import("./scene/PortfolioScene"), { ssr: false });

export default function Portfolio() {
  const [state, dispatch] = useReducer(navigationReducer, initialNavigation);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  const [listMode, setListMode] = useState(false);
  const [hovered, setHovered] = useState<StoreId | null>(null);
  const reducedMotion = useReducedMotion();
  const visit = useCallback((storeId: StoreId) => dispatch({ type: "visit", storeId }), []);
  const openItem = useCallback((storeId: StoreId, itemId: string) => dispatch({ type: "item", storeId, itemId }), []);
  const onReady = useCallback(() => setReady(true), []);
  const onUnavailable = useCallback(() => { setUnavailable(true); setReady(true); }, []);
  const overview = useCallback(() => dispatch({ type: "overview" }), []);
  const store = state.storeId ? storeById[state.storeId] : null;
  const item = store?.items.find((entry) => entry.id === state.itemId);
  const hasPanel = !!store || !!state.information;
  const simplified = unavailable || listMode;

  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (state.directoryOpen) {
        dispatch({ type: "directory", open: false });
        document.querySelector<HTMLButtonElement>("[data-directory-toggle]")?.focus();
      } else if (state.itemId) dispatch({ type: "close-item" });
      else overview();
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [state.directoryOpen, state.itemId, overview]);

  return <main className={`portfolio ${hasPanel ? "has-panel" : ""} ${simplified ? "is-simplified" : ""}`}>
    <a className="skip-link" href="#explore-button">Skip to portfolio navigation</a>
    <div className="world-backdrop" aria-hidden="true" /><div className="grain" aria-hidden="true" />
    <header className="identity"><button className="identity-mark" onClick={overview} aria-label="Shanit Paul — building overview">sp<span>.</span></button><div><span className="identity-name">{profile.name}</span><span className="identity-caption">A LITTLE WORLD OF MY OWN</span></div></header>
    <div className="night-status"><Moon size={13} /><span>AFTER HOURS</span><span className="night-divider" /><span className="open-indicator" /><span>ALWAYS EXPLORING</span></div>

    {!simplified && <div className="scene" aria-label="Interactive miniature neighborhood. Use the directory for keyboard navigation." data-testid="scene" data-ready={ready}>
      <SceneBoundary onUnavailable={onUnavailable}><PortfolioScene selected={state.storeId} revision={state.overviewRevision} reducedMotion={reducedMotion} onVisit={visit} onItem={openItem} onHover={setHovered} onReady={onReady} onUnavailable={onUnavailable} /></SceneBoundary>
      {ready && !hasPanel && <div className="scene-labels">{stores.map((entry) => <div key={entry.id} id={`store-marker-${entry.id}`} className="projected-label"><StoreLabel store={entry} hovered={hovered === entry.id} selected={false} onVisit={() => visit(entry.id)} /></div>)}</div>}
    </div>}

    {!hasPanel && !simplified && <section className="intro" aria-label="Welcome to After Hours">
      <span className="eyebrow"><span className="tiny-rule" /> WELCOME TO MY CORNER</span>
      <h1>One building.<br />Many <em>worlds.</em></h1>
      <p>A few things I build.<br />A few things I love.<br />All under one roof.</p>
      <button className="explore-hint" onClick={() => visit("ramen")}><span>Find a shop. Follow your curiosity.</span><ArrowDownRight size={18} /></button>
      <span className="intro-coordinate">BLOCK 01 &nbsp; / &nbsp; OPEN ALL NIGHT <span>IMAGINATION DISTRICT</span></span>
    </section>}

    {!ready && !simplified && <div className="scene-loading" role="status"><span className="loading-orbit" /><span>Turning on the lights…</span><button onClick={() => setListMode(true)}>Explore without 3D <ArrowUpRight size={13} /></button></div>}

    {simplified && <section className="simplified-neighborhood" aria-label="Portfolio directory view">
      <span className="eyebrow">THE NEIGHBORHOOD, AT A GLANCE</span><h1>Five doors.<br /><em>Plenty to discover.</em></h1>
      <p>{unavailable ? "The 3D scene isn’t available on this device. Every story is still right here." : "Same little world. A lighter way to explore."}</p>
      <div className="simplified-grid">{stores.map((entry) => { const Icon = storeIcons[entry.id]; return <button key={entry.id} onClick={() => visit(entry.id)} style={{ "--store-color": entry.color } as React.CSSProperties}><span>{entry.number} / {entry.floor}</span><Icon size={30} strokeWidth={1.2} /><strong>{entry.name}</strong><span>{entry.category} <ArrowUpRight size={15} /></span></button>; })}</div>
    </section>}

    {hasPanel && <button className="overview-button" onClick={overview}><ArrowLeft size={15} /><span>Back to building</span></button>}
    {store && <PortfolioPanel key={store.id} store={store} item={item} onItem={(itemId) => openItem(store.id, itemId)} onCloseItem={() => dispatch({ type: "close-item" })} onOverview={overview} />}
    {state.information && <InformationPanel page={state.information} onClose={overview} />}
    <Navigation open={state.directoryOpen} selected={state.storeId} onVisit={visit} onInformation={(page) => dispatch({ type: "information", page })} onClose={() => { dispatch({ type: "directory", open: false }); document.querySelector<HTMLButtonElement>("[data-directory-toggle]")?.focus(); }} />

    <footer className="world-footer">
      <div className="district-caption"><Compass size={27} strokeWidth={1} /><div><span>THE CURIOSITY BLOCK</span><small>FIVE SHOPS. ONE STORY.</small></div></div>
      <div className="scene-controls" aria-label="Scene controls">
        <span className="gesture-hint"><Move size={13} /> Drag to rotate</span><span className="gesture-hint"><Mouse size={13} /> Scroll to zoom</span>
        <button onClick={overview} aria-label="Reset camera to overview" title="Reset view"><RotateCcw size={15} /></button>
        <span className="control-separator" />
        <button className="view-mode" onClick={() => setListMode((value) => !value)} aria-label={simplified ? "Switch to 3D view" : "Switch to simplified view"} disabled={unavailable} title={unavailable ? "3D is unavailable on this device" : "Toggle simplified view"}><Maximize size={15} /></button>
      </div>
      <button className={`directory-toggle ${state.directoryOpen ? "is-open" : ""}`} id="explore-button" data-directory-toggle aria-expanded={state.directoryOpen} aria-controls="neighborhood-directory" onClick={() => dispatch({ type: "directory", open: !state.directoryOpen })}><Map size={17} strokeWidth={1.5} /><span>Explore the block</span><span className="directory-key">05</span></button>
    </footer>
    <div className="sr-only" aria-live="polite">{store ? `${store.name}. ${item ? item.title : store.category + " menu"}.` : state.information ? `${state.information} information` : "Building overview. Five shops to explore."}</div>
  </main>;
}