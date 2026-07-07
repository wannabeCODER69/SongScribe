import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import StudioWorkspace from "../components/StudioWorkspace";

function Home() {
    return (
        <div className="relative flex h-dvh overflow-hidden bg-[#07050d] text-white">
            {/* Background Glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(139,92,246,0.24),transparent_34%),radial-gradient(circle_at_82%_8%,rgba(217,70,239,0.13),transparent_28%),linear-gradient(135deg,#07050d_0%,#0b0714_42%,#05050a_100%)]" />

            {/* Grid Texture */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.024)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:48px_48px] opacity-45" />

            <div className="relative z-10 flex h-full w-full">
                <Sidebar />

                <main className="flex min-w-0 flex-1 flex-col">
                    <Header />

                    <section className="min-h-0 flex flex-1 px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-5">
                        <div className="flex h-full w-full">
                            <StudioWorkspace />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default Home;