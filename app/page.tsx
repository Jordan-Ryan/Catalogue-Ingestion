import Image from "next/image";

const fields = [
  { label: "Type", value: "Blazer" },
  { label: "Name", value: "Oversized Structured Blazer" },
  { label: "Brand", value: "ASOS DESIGN" },
  { label: "Colour", value: "Jet Black" },
  { label: "Margin", value: "48.97%" },
  { label: "Image", value: "Primary + 3 additional" }
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-8 md:px-8">
      <section className="w-full overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
        <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-5 md:px-8">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-black px-3 py-1.5 text-xs font-extrabold tracking-[0.2em] text-white">ASOS</span>
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-zinc-700">Catalogue Approval</p>
          </div>
          <p className="hidden items-center gap-2 text-sm font-medium text-zinc-500 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.15)]" />
            1 of 24 pending review
          </p>
        </header>

        <div className="grid lg:grid-cols-[360px_1fr]">
          <aside className="border-b border-zinc-200 bg-zinc-50 p-5 lg:border-r lg:border-b-0 lg:p-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <span className="absolute left-3 top-3 z-10 rounded-full bg-black/85 px-3 py-1 text-[11px] font-semibold tracking-[0.09em] text-white">WOMENSWEAR</span>
              <Image
                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80"
                alt="Black oversized blazer on model"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                ["SKU", "AS-981237-BLK"],
                ["Size", "UK 10"],
                ["RRP", "$145.00"],
                ["Cost Price", "$74.00"]
              ].map(([label, value]) => (
                <article key={label} className="rounded-xl border border-zinc-200 bg-white p-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-zinc-500">{label}</p>
                  <p className="mt-1 text-sm font-bold text-zinc-900">{value}</p>
                  {label === "Cost Price" ? (
                    <p className="mt-2 inline-block rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">Margin 48.97%</p>
                  ) : null}
                </article>
              ))}
            </div>
          </aside>

          <section className="p-6 md:p-8">
            <header>
              <h1 className="text-2xl font-bold leading-tight text-zinc-950 md:text-3xl">ASOS DESIGN Oversized Structured Blazer</h1>
              <p className="mt-2 text-sm font-medium text-zinc-500">Review item content, costing and attributes before publication.</p>
            </header>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {fields.map((field) => (
                <article key={field.label} className="rounded-xl border border-zinc-200 bg-zinc-50 p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.09em] text-zinc-500">{field.label}</p>
                  <p className="mt-1 text-sm font-bold text-zinc-900">{field.value}</p>
                </article>
              ))}
            </div>

            <article className="mt-5 rounded-2xl border border-zinc-200 bg-white p-5">
              <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-600">Details</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-700">
                Single-breasted blazer in premium woven fabric with light shoulder padding, notch lapels, flap pockets and relaxed
                oversized tailoring. Fully lined with internal pocket and back vent for ease of movement. Suitable for smart-casual
                and occasion styling.
              </p>
            </article>

            <footer className="mt-6 flex flex-wrap justify-end gap-3">
              <button className="rounded-xl border border-zinc-300 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:-translate-y-0.5 hover:bg-zinc-50">Reject</button>
              <button className="rounded-xl bg-zinc-100 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:-translate-y-0.5 hover:bg-zinc-200">Need Changes</button>
              <button className="rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(0,0,0,0.22)] transition hover:-translate-y-0.5">Approve Item</button>
            </footer>
          </section>
        </div>
      </section>
    </main>
  );
}
