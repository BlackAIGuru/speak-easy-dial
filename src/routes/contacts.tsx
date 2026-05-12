import { createFileRoute } from "@tanstack/react-router";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ArrowUp, UploadCloud, Plus } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/contacts")({
  component: Contacts,
  head: () => ({ meta: [{ title: "Contacts · Castwave" }] }),
});

type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  fileNumber: string;
  ssn: string;
};

const seed: Contact[] = [];

function maskSSN(ssn: string) {
  if (!ssn) return "—";
  const last4 = ssn.slice(-4);
  return `XXX-XX-${last4}`;
}

function Contacts() {
  const [q, setQ] = useState("");
  const [contacts] = useState<Contact[]>(seed);

  const filtered = useMemo(
    () =>
      contacts.filter((c) =>
        (c.firstName + c.lastName + c.phone + c.fileNumber + c.ssn)
          .toLowerCase()
          .includes(q.toLowerCase()),
      ),
    [contacts, q],
  );

  return (
    <DashboardLayout title="Contacts">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Contacts</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Upload and manage the contacts targeted by your outbound campaigns.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary">
              <UploadCloud className="h-4 w-4 mr-2" /> Import CSV
            </Button>
            <Button>
              <Plus className="h-4 w-4 mr-2" /> Add Contact
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card shadow-xl shadow-primary/5">
          <div className="flex items-center justify-between gap-3 p-5 border-b border-border">
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Contacts
            </h2>
            <div className="relative max-w-sm w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search contacts..."
                className="pl-9 bg-input/60 border-border rounded-full"
              />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <div className="flex items-center gap-1">ID <ArrowUp className="h-3 w-3" /></div>
                </TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>File Number</TableHead>
                <TableHead>SSN</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-16 text-muted-foreground">
                    No contacts available. Please upload a CSV or Excel file.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono">{c.id}</TableCell>
                    <TableCell>{c.firstName}</TableCell>
                    <TableCell>{c.lastName}</TableCell>
                    <TableCell className="font-mono text-sm">{c.phone}</TableCell>
                    <TableCell>{c.fileNumber}</TableCell>
                    <TableCell className="font-mono text-sm">{maskSSN(c.ssn)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
}
