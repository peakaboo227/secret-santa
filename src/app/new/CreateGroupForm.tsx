"use client";

import Link from "next/link";
import { useState, useTransition, type FormEvent } from "react";
import { Field, Icon } from "@/components/boo";
import { Screen } from "@/components/Screen";
import { copy, fill } from "@/copy";
import {
  checkDetails,
  checkHost,
  hasErrors,
  localToday,
  MAX_LENGTH,
  type DetailsErrors,
  type HostErrors,
} from "@/lib/create-group";
import { saveGroupAction } from "./actions";

const t = copy.createGroup;

/**
 * The three steps of create group, as in prototype/CreateGroup.dc.html:
 * 1. group name, budget, gift day  2. your name and "i'm playing too"  3. your pin.
 * The group is saved when step 2 continues; going back and continuing again updates it.
 */
export function CreateGroupForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [groupName, setGroupName] = useState("");
  const [budget, setBudget] = useState("");
  const [giftDay, setGiftDay] = useState("");
  const [hostName, setHostName] = useState("");
  const [playing, setPlaying] = useState(true);
  const [errors, setErrors] = useState<DetailsErrors & HostErrors>({});
  const [saved, setSaved] = useState<{ groupId: string; pin: string } | null>(null);
  const [pending, startTransition] = useTransition();
  const today = localToday();

  function next1(event: FormEvent) {
    event.preventDefault();
    const found = checkDetails({ groupName, budget, giftDay }, today);
    setErrors(found);
    if (!hasErrors(found)) setStep(2);
  }

  function next2(event: FormEvent) {
    event.preventDefault();
    if (pending) return;
    const found = checkHost(hostName);
    setErrors(found);
    if (hasErrors(found)) return;
    startTransition(async () => {
      const result = await saveGroupAction({ groupId: saved?.groupId, groupName, budget, giftDay, hostName, playing });
      if (result.ok) {
        setSaved({ groupId: result.groupId, pin: result.pin });
        setStep(3);
      } else {
        setErrors(result.errors);
        if (result.errors.groupName || result.errors.budget || result.errors.giftDay) setStep(1);
      }
    });
  }

  function back(to: 1 | 2) {
    setErrors({});
    setStep(to);
  }

  return (
    <Screen>
      {step === 1 ? (
        <form className="col-form" onSubmit={next1} noValidate>
          <Link href="/" className="label back-link">
            <Icon name="back" />
            <span>{t.cancel}</span>
          </Link>
          <div className="intro">
            <span className="eyebrow">{t.details.eyebrow}</span>
            <h1 className="headline">{t.details.heading}</h1>
            <span className="body-sm">{t.details.intro}</span>
          </div>
          <div className="form-row">
            <label htmlFor="g-name" className="label">
              {t.details.groupName}
            </label>
            <Field
              id="g-name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              invalid={!!errors.groupName}
              placeholder={t.details.groupNamePlaceholder}
              maxLength={MAX_LENGTH.groupName}
            />
            {errors.groupName ? <FieldError text={t.details.groupNameError} /> : null}
          </div>
          <div className="form-row">
            <label htmlFor="g-budget" className="label">
              {t.details.budget}
            </label>
            <Field
              id="g-budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              invalid={!!errors.budget}
              placeholder={t.details.budgetPlaceholder}
              maxLength={MAX_LENGTH.budget}
            />
            {errors.budget ? <FieldError text={t.details.budgetError} /> : null}
          </div>
          <div className="form-row">
            <label htmlFor="g-day" className="label">
              {t.details.giftDay}
            </label>
            <div className="date-field">
              <Field
                id="g-day"
                type="date"
                min={today}
                value={giftDay}
                onChange={(e) => setGiftDay(e.target.value)}
                invalid={!!errors.giftDay}
              />
              <span aria-hidden="true" className="date-field-icon">
                <Icon name="calendar" size={24} />
              </span>
            </div>
            {errors.giftDay === "empty" ? <FieldError text={t.details.giftDayEmpty} /> : null}
            {errors.giftDay === "past" ? <FieldError text={t.details.giftDayPast} /> : null}
          </div>
          <div className="grow" />
          <button type="submit" className="pk-btn pk-btn-primary wide">
            {t.continue}
          </button>
        </form>
      ) : null}

      {step === 2 ? (
        <form className="col-form" onSubmit={next2} noValidate>
          <button type="button" className="label back-link" onClick={() => back(1)}>
            <Icon name="back" />
            <span>{t.back}</span>
          </button>
          <div className="intro">
            <span className="eyebrow">{t.host.eyebrow}</span>
            <h1 className="headline">{t.host.heading}</h1>
            <span className="body-sm">{t.host.intro}</span>
          </div>
          <div className="form-row">
            <label htmlFor="h-name" className="label">
              {t.host.yourName}
            </label>
            <Field
              id="h-name"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              invalid={!!errors.hostName}
              placeholder={t.host.yourNamePlaceholder}
              maxLength={MAX_LENGTH.hostName}
            />
            {errors.hostName ? <FieldError text={t.host.yourNameError} /> : null}
          </div>
          <label className="check-row pk-glass">
            <input type="checkbox" checked={playing} onChange={() => setPlaying(!playing)} />
            <span className="field">{t.host.playing}</span>
          </label>
          <span className="body-sm muted">{playing ? t.host.playingNote : t.host.notPlayingNote}</span>
          <div className="grow" />
          <button type="submit" className="pk-btn pk-btn-primary wide">
            {t.continue}
          </button>
        </form>
      ) : null}

      {step === 3 && saved ? (
        <div className="col-form">
          <button type="button" className="label back-link" onClick={() => back(2)}>
            <Icon name="back" />
            <span>{t.back}</span>
          </button>
          <div className="intro">
            <span className="eyebrow">{t.pin.eyebrow}</span>
            <h1 className="headline">{t.pin.heading}</h1>
            <span className="body-sm">{fill(t.pin.intro, { name: hostName.trim() })}</span>
          </div>
          <div className="pin-box pk-glass">
            <span className="code-lg pin-digits">{saved.pin}</span>
          </div>
          <span className="note-lg muted centred">{t.pin.lostIt}</span>
          <div className="grow" />
          <Link href={`/new/${saved.groupId}/pet`} className="pk-btn pk-btn-primary wide">
            {t.pin.next}
          </Link>
        </div>
      ) : null}
    </Screen>
  );
}

function FieldError({ text }: { text: string }) {
  return (
    <span role="alert" className="label field-error">
      {text}
    </span>
  );
}
