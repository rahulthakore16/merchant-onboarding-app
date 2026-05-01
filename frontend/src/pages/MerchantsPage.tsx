import { Link } from "react-router";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";
import { MeshGradient } from "@paper-design/shaders-react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useMerchants } from "@/hooks/useMerchants";
import type { Merchant } from "@/types/merchant";

const col = createColumnHelper<Merchant>();

const columns = [
  col.accessor("business_name", {
    header: "Business",
    cell: (info) => (
      <span className="font-heading font-light text-dark">{info.getValue()}</span>
    ),
  }),
  col.accessor("business_type", { header: "Type" }),
  col.accessor("mcc_code", { header: "MCC" }),
  col.accessor("full_name", { header: "Contact" }),
  col.accessor("email", {
    header: "Email",
    cell: (info) => (
      <span className="truncate max-w-[180px] inline-block">{info.getValue()}</span>
    ),
  }),
  col.accessor("status", {
    header: "Status",
    cell: (info) => {
      const val = info.getValue() as "pending" | "active" | "rejected";
      return <Badge variant={val}>{val}</Badge>;
    },
  }),
  col.accessor("created_at", {
    header: "Created",
    cell: (info) =>
      new Date(info.getValue()).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
  }),
];

export default function MerchantsPage() {
  const { items, total, offset, hasMore, isLoading, error, nextPage, prevPage, retry, pageSize } =
    useMerchants();

  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="relative min-h-screen w-full bg-page selection:bg-dark selection:text-page">
      {/* Full-screen animated background */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed inset-0 z-0 pointer-events-none mix-blend-multiply opacity-80"
      >
        <MeshGradient
          speed={0.8}
          colors={["#f472b6", "#fdba74", "#fef08a", "#f9a8d4"]}
          distortion={0.5}
          swirl={0.3}
          grainMixer={0}
          grainOverlay={0}
          className="h-full w-full sticky top-0"
        />
      </motion.div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Transparent Header */}
        <header className="flex w-full items-center justify-between px-6 py-6 md:px-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="flex gap-1 group-hover:opacity-80 transition-opacity">
              <div className="h-3 w-3 rounded-full bg-dark" />
              <div className="h-3 w-3 rounded-full bg-dark" />
            </div>
            <span className="font-sans text-sm font-semibold tracking-wide text-dark">
              MerchantPay
            </span>
          </Link>
        </header>

        {/* Main Content */}
        <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 py-8 md:px-12">
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.15em] font-semibold text-muted">
                Dashboard
              </span>
              <h1 className="mt-2 font-heading text-4xl font-light leading-tight tracking-tight text-dark md:text-5xl">
                REGISTERED
                <br />
                <span className="font-serif italic font-normal">Merchants</span>
              </h1>
            </div>
            <Link to="/onboard">
              <Button
                className="rounded-xl bg-dark px-8 py-6 text-sm font-semibold tracking-wide text-page hover:bg-dark/90 hover:scale-[1.02] transition-all shadow-md"
              >
                NEW MERCHANT
              </Button>
            </Link>
          </div>

          {error && (
            <div className="mb-8 flex flex-col items-center gap-4 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <p className="text-sm font-medium text-red">{error}</p>
              <Button
                onClick={retry}
                variant="outline"
                className="rounded-xl border-2 border-dark px-8 text-dark hover:bg-dark hover:text-page"
              >
                RETRY
              </Button>
            </div>
          )}

          {!error && isLoading && (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-16 animate-pulse rounded-2xl bg-white/40 backdrop-blur-md" />
              ))}
            </div>
          )}

          {!error && !isLoading && items.length === 0 && (
            <div className="flex flex-col items-center gap-6 rounded-2xl border border-white/40 bg-white/60 backdrop-blur-xl p-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <p className="text-sm text-dark font-medium">No merchants registered yet.</p>
              <Link to="/onboard">
                <Button
                  className="rounded-xl bg-dark px-8 py-6 text-sm font-semibold tracking-wide text-page hover:bg-dark/90 hover:scale-[1.02] transition-all"
                >
                  ONBOARD YOUR FIRST MERCHANT
                </Button>
              </Link>
            </div>
          )}

          {!error && !isLoading && items.length > 0 && (
            <>
              <div className="overflow-x-auto rounded-2xl border border-white/50 bg-white/60 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
                <table className="w-full text-left">
                  <thead>
                    {table.getHeaderGroups().map((hg) => (
                      <tr key={hg.id} className="border-b border-white/50 bg-white/20">
                        {hg.headers.map((header) => (
                          <th
                            key={header.id}
                            className="px-6 py-4 text-[10px] uppercase tracking-[0.15em] font-semibold text-muted"
                          >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                          </th>
                        ))}
                      </tr>
                    ))}
                  </thead>
                  <tbody>
                    {table.getRowModel().rows.map((row) => (
                      <tr key={row.id} className="border-b border-white/30 last:border-b-0 hover:bg-white/30 transition-colors">
                        {row.getVisibleCells().map((cell) => (
                          <td key={cell.id} className="px-6 py-4 text-sm font-medium text-dark/80">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 flex items-center justify-between px-2">
                <span className="text-[11px] uppercase tracking-widest font-semibold text-muted">
                  Showing {offset + 1}–{Math.min(offset + pageSize, total)} of {total}
                </span>
                <div className="flex gap-4">
                  <Button
                    onClick={prevPage}
                    disabled={offset === 0}
                    variant="ghost"
                    className="rounded-xl px-6 py-5 text-xs font-semibold uppercase tracking-widest text-dark hover:bg-white/40 disabled:opacity-30 transition-all"
                  >
                    PREV
                  </Button>
                  <Button
                    onClick={nextPage}
                    disabled={!hasMore}
                    variant="ghost"
                    className="rounded-xl px-6 py-5 text-xs font-semibold uppercase tracking-widest text-dark hover:bg-white/40 disabled:opacity-30 transition-all"
                  >
                    NEXT
                  </Button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
