"use client";
import { ReactNode, useContext, createContext, useState } from "react";
import { CTA } from "./CTA";

type Period = "monthly" | "yearly";

const PricingContext = createContext<{ period: Period }>({
  period: "yearly",
});

const PricingFeature = ({
  unavailable,
  label,
}: {
  unavailable?: boolean;
  label: string;
}) => (
  <p className="text-sm text-zinc-500 dark:text-zinc-400">
    <i className={`fi fi-rr-${unavailable ? "cross" : "check"}`} />
    <span className="text-inherit inline-block ml-2">{label}</span>
  </p>
);

const PricingCard = ({
  children,
  name,
  pricing,
  suggested,
}: {
  children: ReactNode;
  name: string;
  suggested?: boolean;
  pricing: { monthly: number; yearly: number };
}) => {
  const { period } = useContext(PricingContext);

  return (
    <div
      className={`relative w-full rounded-lg border ${
        suggested &&
        "border-indigo-400 bg-indigo-400/5 scale-105 shadow-xl shadow-indigo-800/40"
      }`}
    >
      {suggested && (
        <div className="absolute rounded-full bg-indigo-400 top-0 -translate-y-1/2 text-sm font-semibold px-3 py-1 left-1/2 -translate-x-1/2">
          Suggested
        </div>
      )}
      <div className="px-9 border-b pt-12 pb-6">
        <h3 className="text-2xl font-bold mb-2 capitalize">{name}</h3>
        <div>
          <span className="text-3xl font-semibold">{pricing[period]}€</span>{" "}
          {period === "yearly" && pricing.monthly !== 0 && (
            <div className="relative mr-1 inline-block">
              <span className="text-base text-neutral-500">{pricing.monthly * 12}€</span>
              <span className="absolute top-1/2 -translate-y-1/2 block h-0.5 w-full bg-zinc-500/70" />
            </div>
          )}
        </div>
      </div>

      <div className="px-9 py-8 flex flex-col gap-1">{children}</div>

      <div className="px-9 mb-6">
        <CTA label={`Choose ${name} plan`} secondary={!suggested} color={suggested ? "colored" : "neutral"} className="w-full" />
      </div>
    </div>
  );
};

const PricingSelector = ({
  onChangePeriod,
}: {
  onChangePeriod: (newPeriod: Period) => void;
}) => {
  const { period } = useContext(PricingContext);

  return (
    <div className="mx-auto w-fit mb-16">
      <div className="flex p-1 rounded-full bg-zinc-800 gap-1">
        {["monthly", "yearly"].map((value, idx) => (
          <button
            key={idx}
            className={`capitalize rounded-full px-4 py-1 font-semibold ${
              period === value ? "bg-zinc-900" : "bg-transparent"
            }`}
            onClick={() => onChangePeriod(value as Period)}
          >
            {value}
          </button>
        ))}
      </div>
    </div>
  );
};

export const PricingSection = () => {
  const [period, setPeriod] = useState<Period>("yearly");

  return (
    <section className="py-36">
      <h2 className="text-3xl font-bold text-center mb-4">Pricing</h2>

      <PricingContext.Provider value={{ period: period }}>
        <PricingSelector onChangePeriod={setPeriod} />

        <div className="grid grid-cols-3 items-center gap-12 mx-auto max-w-screen-lg">
          <PricingCard name="free" pricing={{ monthly: 0, yearly: 0 }}>
            <PricingFeature label="One app" />
            <PricingFeature label="No customization" unavailable />
            <PricingFeature label="No access to api" unavailable />
          </PricingCard>

          <PricingCard
            name="pro"
            pricing={{ monthly: 4.99, yearly: 49.99 }}
            suggested
          >
            <PricingFeature label="Five app" />
            <PricingFeature label="Customization" />
            <PricingFeature label="No access to api" unavailable />
          </PricingCard>

          <PricingCard name="business" pricing={{ monthly: 14.99, yearly: 149.99 }}>
            <PricingFeature label="Multiple apps" />
            <PricingFeature label="Customization" />
            <PricingFeature label="Access to api" />
          </PricingCard>
        </div>
      </PricingContext.Provider>
    </section>
  );
};
