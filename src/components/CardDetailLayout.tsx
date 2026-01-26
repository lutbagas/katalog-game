'use client'

import  { useTheme } from '@/app/ThemeContext/ThemeContext';

export function CardDetailLayout({ children }: { children: React.ReactNode}) {
    const { alt } = useTheme();
    return (
        <div className={`max-w-2xl mx-auto bg-gradient-to-bl rounded-2xl shadow-lg p-8 mt-8 flex flex-col items-center
         ${alt ? 'bg-gradient-to-br from-cyan-950 via-blue-900 to-cyan-950' : 'bg-gradient-to-br from-cyan-800 via-blue-900 to-cyan-800'}`}>
            {children}
        </div>
    )
}