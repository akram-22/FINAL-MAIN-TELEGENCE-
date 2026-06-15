'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { LogOut, Building2, AlertTriangle } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import AppNavbar from '@/components/app-navbar'
import MainteligenceDashboard from '@/components/mainteligence-dashboard'

export default function ClientDashboardPage() {
  const router = useRouter()
  const { user, loading, logout } = useAuth()
  const [section, setSection] = useState('overview')

  useEffect(() => {
    if (!loading && !user) router.replace('/login')
  }, [loading, user, router])

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-[#09090b] flex items-center justify-center">
        <div className="flex items-center gap-3 text-xs font-mono text-[#3a3a3d]">
          <span className="w-4 h-4 border-2 border-[#27272a] border-t-[#e8650a] rounded-full animate-spin" />
          Authentification...
        </div>
      </div>
    )
  }

  const { company } = user
  const criticalCount = company.alerts.filter(a => a.severity === 'critical' && !a.resolved).length

  function handleLogout() {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col">
      {/* Top bar */}
      <header className="h-14 border-b border-[#1c1c1f] bg-[#09090b]/98 backdrop-blur-md flex items-center px-6 gap-4 sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/api-attachments/G5GBg0NwHnI0ygSX2aOgv-yHCBfxf9exqvRH4s5vViaYhdSw2A6T.png"
            alt="Mainteligence"
            className="w-7 h-7 object-contain"
          />
          <span className="font-semibold text-[13px] text-[#fafafa] whitespace-nowrap hidden sm:block">
            Maint<span className="text-[#e8650a]">elligence</span>
          </span>
        </Link>

        <div className="h-4 w-px bg-[#1c1c1f] hidden sm:block" />
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
          <span className="text-[10px] font-mono text-[#52525b]">Espace Client</span>
        </div>

        <div className="flex-1" />

        {criticalCount > 0 && (
          <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#ef4444] bg-[#ef4444]/8 border border-[#ef4444]/20 px-2.5 py-1.5 rounded-sm">
            <AlertTriangle size={10} />
            <span>{criticalCount} Critique{criticalCount > 1 ? 's' : ''}</span>
          </div>
        )}

        <div className="hidden md:flex items-center gap-1.5">
          <Building2 size={11} className="text-[#3a3a3d]" />
          <span className="text-[11px] font-mono text-[#52525b] max-w-[180px] truncate">{company.name}</span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-[10px] font-mono text-[#3a3a3d] hover:text-[#ef4444] transition-colors px-2 py-1.5 rounded-sm border border-transparent hover:border-[#ef4444]/20"
        >
          <LogOut size={11} />
          <span className="hidden sm:block">Déconnexion</span>
        </button>
      </header>

      {/* Full dashboard — same as demo */}
      <MainteligenceDashboard
        mode="client"
        section={section}
        setSection={setSection}
      />
    </div>
  )
}
