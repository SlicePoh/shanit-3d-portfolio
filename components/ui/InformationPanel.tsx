import { useEffect, useRef } from "react";
import { ArrowLeft, GraduationCap, UserRound, X } from "lucide-react";
import { profile } from "@/data/stores";
import type { InformationPage } from "@/lib/navigation";

export default function InformationPanel({ page, onClose }: { page: InformationPage; onClose: () => void }) {
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    close.current?.focus();
    return () => document.querySelector<HTMLButtonElement>("[data-directory-toggle]")?.focus();
  }, [page]);
  return <section className="portfolio-panel information-panel" role="dialog" aria-labelledby="information-title">
    <div className="panel-topline"><span className="eyebrow">A NOTE FROM THE NEIGHBORHOOD</span><button className="icon-button" ref={close} onClick={onClose} aria-label="Close information"><X size={18} /></button></div>
    <div className="panel-scroll"><button className="text-back" onClick={onClose}><ArrowLeft size={14} /> Back to building</button>
      <div className="panel-symbol">{page === "about" ? <UserRound size={30} strokeWidth={1.2} /> : <GraduationCap size={30} strokeWidth={1.2} />}</div>
      <h2 id="information-title">{page === "about" ? "Hi, I’m Shanit." : "Still learning."}</h2>
      <p className="panel-description">{page === "about" ? profile.title : "Education & foundations"}</p>
      <p className="item-description">{page === "about" ? profile.about : profile.education}</p>
      {page === "about" ? <div className="about-card"><span>THE IDEA BEHIND THIS PLACE</span><p>Not just a list of things I do.<br />A little world of things I love.</p><small>Built from scratch. Best explored slowly.</small></div> : <p className="prototype-note"><span /> Résumé details to be added.</p>}
    </div>
    <div className="panel-footer"><span>THANKS FOR STOPPING BY.</span><span>SP.</span></div>
  </section>;
}