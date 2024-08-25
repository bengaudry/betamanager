"use client";
import { PageWrapper } from "@/components/Page";
import { Dispatch, SetStateAction, useState } from "react";

type Tester = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  creationDate: Date;
  lastSignIn: Date;
  phoneNumber?: string;
};

function TesterDetails({ tester }: { tester: Tester }) {
  return (
    <div className="border-b border-neutral-700">
      <div className="grid grid-cols-5 items-center justify-center px-4 py-2 w-full ">
        <h2 className="font-medium text-neutral-100 overflow-x-scroll">
          {tester.firstName} {tester.lastName}
        </h2>
        <p className="text-sm text-neutral-400 overflow-x-scroll">
          {tester.email} <br />
          {tester.phoneNumber}
        </p>
        <p className="text-sm text-neutral-400 overflow-x-scroll">
          {tester.creationDate.toLocaleDateString()}
        </p>
        <p className="text-sm text-neutral-400 overflow-x-scroll">
          {tester.lastSignIn.toLocaleDateString()}
        </p>
        <p className="text-sm text-neutral-400 overflow-x-scroll">
          {tester.id}
        </p>
      </div>
    </div>
  );
}

export default function TestersPage() {
  const [filterQuery, setFilterQuery] = useState("");

  type SortCategory = "name" | "email" | "creation-date" | "last-sign-in";
  const [sortBy, setSortBy] = useState<SortCategory>("name");
  const [sortAsc, setSortAsc] = useState(false);

  const testers: Array<Tester> = [
    {
      id: "dqlhusqufcopopqzdqsdq5d4qzdh",
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      creationDate: new Date("01-02-2023"),
      lastSignIn: new Date("04-08-2024"),
      phoneNumber: "+33 6 78 89 54 65",
    },
    {
      id: "dqlhusqufcopopqzdqsdq5d4q",
      firstName: "Jane",
      lastName: "Doe",
      email: "jane.doe@example.com",
      creationDate: new Date("01-02-2022"),
      lastSignIn: new Date("04-06-2024"),
      phoneNumber: "+33 6 78 89 54 65",
    },
    {
      id: "dqlhusqufcopopqzdqsdq5d4q",
      firstName: "Jack",
      lastName: "Williams",
      email: "jack.williams@example.com",
      creationDate: new Date("01-02-2019"),
      lastSignIn: new Date("04-08-2022"),
      phoneNumber: "+33 6 78 89 54 65",
    },
  ];

  const getSortedTesters = (): Tester[] => {
    const sortedTesters = testers
      .filter((tester) => {
        const testerString = `${tester.firstName} ${tester.lastName} ${tester.email} ${tester.phoneNumber}`;
        return testerString.toLowerCase().includes(filterQuery.toLowerCase());
      })
      .sort((tester1, tester2) => {
        if (sortBy === "email") {
          return tester1.email.localeCompare(tester2.email);
        }
        if (sortBy === "creation-date") {
          return (
            tester1.creationDate.valueOf() - tester2.creationDate.valueOf()
          );
        }
        if (sortBy === "last-sign-in") {
          return tester1.lastSignIn.valueOf() - tester2.lastSignIn.valueOf();
        }
        return tester1.firstName.localeCompare(tester2.firstName);
      });

    return sortAsc ? sortedTesters.toReversed() : sortedTesters;
  };

  function SortByButton({
    category,
    label,
  }: {
    category?: SortCategory;
    label: string;
  }) {
    return (
      <button
        className="text-left"
        onClick={() => {
          if (!category) return;
          if (sortBy === category) return setSortAsc((a) => !a);
          setSortBy(category);
        }}
      >
        {label}
      </button>
    );
  }

  return (
    <PageWrapper title="Testers">
      <div className="rounded-md overflow-hidden bg-neutral-900">
        <div className="px-4 pt-4 pb-1 bg-neutral-800">
          <input
            type="text"
            placeholder="Filter by email, name, phone number"
            className="bg-black mb-4 px-4 py-2 rounded-md w-full"
            value={filterQuery}
            onChange={({ target }) => setFilterQuery(target.value)}
          />
          <div className="grid grid-cols-5 ">
            <SortByButton category="name" label="Name" />
            <SortByButton category="email" label="Informations" />
            <SortByButton category="last-sign-in" label="Last sign in" />
            <SortByButton category="creation-date" label="Creation date" />
            <SortByButton label="UID" />
          </div>
        </div>
        <div className="w-full pb-8">
          {testers && getSortedTesters().length > 0 ? (
            getSortedTesters().map((tester) => (
              <TesterDetails tester={tester} />
            ))
          ) : (
            <p className="text-center text-neutral-400 mt-4">
              No testers found. Try modifying filters
            </p>
          )}
        </div>
      </div>
    </PageWrapper>
  );
}
