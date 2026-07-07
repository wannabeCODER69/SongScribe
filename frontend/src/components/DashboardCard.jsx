import { motion } from "framer-motion";

function DashboardCard({
    children,
    className = "",
    delay = 0,
    title,
    eyebrow,
    action,
}) {
    return (
        <motion.section
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-[24px] border border-white/10 bg-white/[0.065] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_20px_70px_rgba(0,0,0,0.22)] backdrop-blur-2xl ${className}`}

            initial={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
        >
            {(title || eyebrow || action) && (
                <div className="mb-5 flex items-start justify-between gap-4">
                    <div>
                        {eyebrow && (
                            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-violet-200/54">
                                {eyebrow}
                            </p>
                        )}
                        {title && (
                            <h3 className="mt-1 text-[17px] font-semibold tracking-[-0.02em] text-white">
                                {title}
                            </h3>
                        )}
                    </div>
                    {action}
                </div>
            )}
            {children}
        </motion.section>
    );
}

export default DashboardCard;
