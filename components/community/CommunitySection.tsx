export default function CommunitySection() {
  return (
    <section className="bg-darkbg text-paper">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          <div>
            <div className="font-mono text-sm text-paper/60">
              <span className="inline-flex items-center">
                <span
                  className="inline-block w-[3px] h-[14px] bg-amber mr-2.5"
                  aria-hidden
                />
                <span className="font-medium tracking-[0.05em]">
                  more than a dev team
                </span>
              </span>
            </div>

            <h2 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-tight">
              We learn together.
              <br />
              <span className="text-amber">We build together.</span>
            </h2>
          </div>

          <div>
            <p className="text-lg md:text-xl text-paper/70 leading-relaxed">
              DPRIME is a student technology community where people learn by
              actually building. You don't have to know everything before you
              join. You just need curiosity, consistency and a willingness to
              contribute.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                "LEARN",
                "COLLABORATE",
                "BUILD",
                "GROW",
              ].map((item, index) => (
                <div
                  key={item}
                  className="border border-paper/10 rounded-md p-4 bg-paper/5"
                >
                  <span className="font-mono text-xs text-amber">
                    0{index + 1}
                  </span>

                  <p className="mt-2 font-display text-lg">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}