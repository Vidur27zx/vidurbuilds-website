import { toolCategories } from "@/tools";

export function Tools() {
  return <section aria-labelledby="tools-heading" className="glass-rim rounded-[30px] bg-surface p-5 shadow-[0_26px_50px_-36px_rgba(74,36,18,0.5)] ring-1 ring-line md:p-7">
    <h2 id="tools-heading" className="display text-[26px]">Tools I work with</h2>
    <div className="mt-5 grid gap-4 md:grid-cols-2">
      {toolCategories.map(({category, tools}) => <section key={category} className="glass-rim min-w-0 rounded-[22px] bg-paper p-4 ring-1 ring-line/60">
        <h3 className="text-[14px] font-bold text-brand">{category}</h3>
        <ul className="mt-3 grid grid-cols-2 gap-x-3 gap-y-3">
          {tools.map((tool) => <li key={tool.name} className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/90 ring-1 ring-line/50">
              {/* Brand SVGs are local and have intrinsic dimensions to avoid shifts. */}
              <img src={tool.icon} alt="" width={24} height={24} loading="lazy" className="h-6 w-6 object-contain" />
            </span>
            <span className="text-[13px] leading-snug font-medium text-ink">{tool.name}</span>
          </li>)}
        </ul>
      </section>)}
    </div>
  </section>;
}
