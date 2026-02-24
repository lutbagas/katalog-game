'use client'
import { useTheme } from "@/app/ThemeContext/ThemeContext";

export function CardLayout({ children }: { children: React.ReactNode }) {
    const { alt } = useTheme();
    return (
        <div className={`${alt ? 'bg-gradient-to-br from-purple-900/60 via-sky-950/50 to-purple-950/60' : 'bg-gradient-to-br from-purple-700/60 via-sky-800/50 to-purple-800/60' } p-4 rounded-4xl `}>
            {children}
        </div>

    )

}