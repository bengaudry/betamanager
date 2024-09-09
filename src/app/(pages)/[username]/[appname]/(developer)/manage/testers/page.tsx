"use client";
import { CopyBtn } from "@/components/CopyBtn";
import { CTA } from "@/components/CTA";
import { PageWrapper } from "@/components/PageWrapper";
import { useState } from "react";

type Tester = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  creationDate: Date;
  lastSignIn: Date;
  phoneNumber?: string;
};

function TesterDetails({
  tester,
  onDeleteUser,
}: {
  tester: Tester;
  onDeleteUser: (uid: string) => void;
}) {
  const ActionButton = ({
    icon,
    ...props
  }: {
    icon: string;
    title: string;
    onClick: () => void;
  }) => (
    <button {...props}>
      <i className={`fi fi-rr-${icon} hover:text-white`} />
    </button>
  );

  return (
    <div className="border-b text-neutral-500">
      <div className="grid grid-cols-12 items-center justify-center px-4 py-2 w-full">
        <h2 className="font-medium col-span-3 overflow-clip">
          {tester.firstName} {tester.lastName}
        </h2>
        <p className="text-sm overflow-clip  col-span-4">
          <span>
            {tester.email}
            <CopyBtn text={tester.email} />
          </span>
          <br />
          {tester.phoneNumber && (
            <span>
              {tester.phoneNumber}
              <CopyBtn text={tester.phoneNumber} />
            </span>
          )}
        </p>
        <p className="text-sm overflow-clip  col-span-2">
          {tester.creationDate.toLocaleDateString()}
        </p>
        <p className="text-sm overflow-clip  col-span-2">
          {tester.lastSignIn.toLocaleDateString()}
        </p>
        <div className="flex flex-row items-center gap-2  col-span-1">
          <ActionButton
            icon="copy"
            title="Copy tester id"
            onClick={() => {
              navigator.clipboard.writeText(tester.id);
            }}
          />
          <ActionButton
            icon="trash"
            title="Remove this tester"
            onClick={() => onDeleteUser(tester.id)}
          />
        </div>
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
    span,
  }: {
    category?: SortCategory;
    label: string;
    span: number;
  }) {
    return (
      <button
        className={`text-left col-span-${span}`}
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

  const handleDeleteUser = (uid: string) => {
    return;
  };

  return (
    <PageWrapper title="Testers">
      <div className="rounded-md overflow-hidden bg-neutral-100">
        <div className="px-4 pt-4 pb-1 bg-neutral-200 border-b border-neutral-300">
          <div className="mb-4 flex items-center gap-3">
            <input
              type="text"
              placeholder="Filter by email, name, phone number"
              className="bg-white px-4 py-2 rounded-md w-full"
              value={filterQuery}
              onChange={({ target }) => setFilterQuery(target.value)}
            />
            <CTA label="Add tester" icon="user-add" />
          </div>
          <div className="grid grid-cols-12 ">
            <SortByButton span={3} category="name" label="Name" />
            <SortByButton span={4} category="email" label="Informations" />
            <SortByButton
              span={2}
              category="last-sign-in"
              label="Last sign in"
            />
            <SortByButton
              span={2}
              category="creation-date"
              label="Creation date"
            />
            <SortByButton span={1} label="Actions" />
          </div>
        </div>
        <div className="w-full pb-8">
          {testers && getSortedTesters().length > 0 ? (
            getSortedTesters().map((tester, idx) => (
              <TesterDetails key={idx} tester={tester} onDeleteUser={handleDeleteUser} />
            ))
          ) : (
            <p className="text-center text-neutral-400 mt-4">
              No testers found. Try modifying filters
            </p>
          )}
        </div>

        <div className="flex items-center float-right">
          <button>
            <i className="fi fi-rr-angle-left" />
          </button>
          <button>
            <i className="fi fi-rr-angle-right" />
          </button>
        </div>
      </div>
    </PageWrapper>
  );
}
