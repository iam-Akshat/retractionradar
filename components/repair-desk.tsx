'use client';

import { ChevronRight, LoaderCircle, Search, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import type { ReplacementCandidate, ScholarlyReference, StagedRepair } from '@/lib/references';

type RepairDeskProps = {
  reference: ScholarlyReference;
  candidates: ReplacementCandidate[];
  repair?: StagedRepair;
  searching: boolean;
  hasSearched: boolean;
  onSearch: () => void;
  onStage: (candidate: ReplacementCandidate) => void;
  onDecision: (decision: 'approved' | 'rejected') => void;
};

export function RepairDesk({ reference, candidates, repair, searching, hasSearched, onSearch, onStage, onDecision }: RepairDeskProps) {
  // Browsing alternatives must not erase a pending, approved, or rejected proposal.
  // A newly staged proposal closes the list so its fresh review controls are visible.
  const [reviewingRepair, setReviewingRepair] = useState<StagedRepair | null>(null);
  const showCandidates = !repair || reviewingRepair === repair;
  const actionable = ['retracted', 'corrected', 'concern'].includes(reference.status);
  if (!actionable) return <div className="mt-6 rounded-xl border border-dashed border-[var(--line)] p-6 text-center"><ShieldCheck className="mx-auto text-[var(--moss)]" /><p className="mt-3 font-semibold">No repair suggested</p><p className="mt-1 text-sm leading-5 text-[var(--muted-ink)]">No registry update relation was returned. This is not a guarantee of scientific validity.</p></div>;

  return <div className="mt-6">
    {repair ? <>
      <div className={`rounded-xl border p-4 ${repair.status === 'approved' ? 'border-[var(--moss)]/30 bg-[var(--moss-soft)]' : repair.status === 'rejected' ? 'border-[var(--signal)]/25 bg-[var(--signal-soft)]' : 'border-[var(--amber)]/30 bg-[var(--amber-soft)]'}`}>
        <p className="text-[10px] font-bold uppercase tracking-[0.12em]">{repair.status === 'pending' ? 'Pending human approval' : `Human ${repair.status}`}</p>
        <p className="mt-2 text-sm font-semibold leading-5">{repair.candidate.title}</p>
        <p className="mt-2 font-mono text-[10px]">{repair.candidate.doi}</p>
        <p className="mt-3 text-xs leading-5 text-[var(--muted-ink)]">{repair.rationale}</p>
      </div>
      {repair.status === 'pending' && <div className="mt-3 grid grid-cols-2 gap-2">
        <button onClick={() => onDecision('rejected')} className="rounded-lg border border-[var(--line)] px-3 py-2.5 text-sm font-bold">Reject</button>
        <button onClick={() => onDecision('approved')} className="rounded-lg bg-[var(--moss)] px-3 py-2.5 text-sm font-bold text-white">Approve repair</button>
      </div>}
      <button
        onClick={() => { setReviewingRepair(repair); onSearch(); }}
        disabled={searching}
        aria-expanded={showCandidates}
        className="mt-3 inline-flex w-full items-center justify-center gap-2 text-xs font-bold underline underline-offset-4 disabled:opacity-50"
      >
        {searching && <LoaderCircle size={15} className="animate-spin" />}
        {searching ? 'Searching OpenAlex…' : showCandidates ? 'Refresh candidates' : 'Review other candidates'}
      </button>
    </> : <div className="rounded-xl border border-[var(--line)] bg-[var(--cream)] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-[var(--moss)]">Agent can assist</p>
      <p className="mt-2 text-sm leading-6 text-[var(--muted-ink)]">Search later work on related topics and stage a candidate. The agent cannot approve or silently rewrite your bibliography.</p>
    </div>}

    {showCandidates && <div className="mt-4 space-y-3" aria-busy={searching}>
      {searching ? <output className="block text-sm text-[var(--muted-ink)]">Searching OpenAlex for candidate leads…</output> : <>
        {repair && <p className="text-xs leading-5 text-[var(--muted-ink)]">Your current decision is unchanged. Staging another candidate replaces this proposal and requires a new approval.</p>}
        {candidates.length ? <>
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--muted-ink)]">OpenAlex candidates · inspect before staging</p>
          {candidates.map((candidate) => <div key={candidate.doi} className="rounded-xl border border-[var(--line)] p-3">
            <p className="text-sm font-semibold leading-5">{candidate.title}</p>
            <p className="mt-1 text-[10px] text-[var(--muted-ink)]">{candidate.year || 'Year unavailable'} · {candidate.citedByCount.toLocaleString()} citations{candidate.openAccess ? ' · Open access' : ''}</p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <a href={`https://doi.org/${candidate.doi}`} target="_blank" rel="noreferrer" className="break-all font-mono text-[9px] underline underline-offset-2">{candidate.doi}</a>
              <button disabled={candidate.doi === repair?.candidate.doi} onClick={() => onStage(candidate)} className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-[var(--moss)] disabled:text-[var(--muted-ink)]">{candidate.doi === repair?.candidate.doi ? 'Current proposal' : <>Stage <ChevronRight size={13} /></>}</button>
            </div>
          </div>)}
        </> : <>
          {hasSearched && <output className="block text-sm text-[var(--muted-ink)]">No candidate leads returned. You can try the search again.</output>}
          {!repair && <button onClick={onSearch} className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--ink)] px-4 py-3 text-sm font-bold text-white"><Search size={15} />{hasSearched ? 'Try search again' : 'Find candidate leads'}</button>}
        </>}
        <p className="text-xs leading-5 text-[var(--muted-ink)]">Candidates are leads, not claims of scientific equivalence.</p>
      </>}
    </div>}
  </div>;
}
