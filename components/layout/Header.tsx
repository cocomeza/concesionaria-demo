'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Car, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { createSupabaseClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createSupabaseClient()

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      setIsAuthenticated(!!session)
      setIsLoading(false)
    }

    checkAuth()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/inicio')
    router.refresh()
  }

  return (
    <header className="bg-slate-950 border-b border-slate-800" data-testid="main-header">
      <div className="container mx-auto px-4">
        {/* Top section with logo and navigation */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 py-4 md:py-6">
          {/* Logo */}
          <Link href="/inicio" className="flex items-center gap-2 md:gap-3">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Car className="w-5 h-5 md:w-7 md:h-7 text-white" />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-white">AutoElite</div>
              <div className="text-xs md:text-sm text-gray-400">Concesionaria Premium</div>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center gap-2 md:gap-4">
            <Link
              href="/inicio"
              className={cn(
                'px-2 md:px-4 py-2 text-xs md:text-sm font-medium transition-colors',
                pathname === '/inicio' || pathname === '/'
                  ? 'text-cyan-400'
                  : 'text-gray-300 hover:text-cyan-400'
              )}
            >
              Inicio
            </Link>
            <Link
              href="/vehiculos"
              className={cn(
                'px-2 md:px-4 py-2 text-xs md:text-sm font-medium transition-colors',
                pathname === '/vehiculos'
                  ? 'text-cyan-400'
                  : 'text-gray-300 hover:text-cyan-400'
              )}
            >
              Catálogo
            </Link>
            {!isLoading && (
              <>
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard">
                      <Button
                        variant="ghost"
                        className="text-gray-300 hover:text-cyan-400 text-xs md:text-sm px-2 md:px-4"
                      >
                        Panel Admin
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={handleLogout}
                      className="text-gray-300 hover:text-white text-xs md:text-sm px-2 md:px-4"
                    >
                      <LogOut className="w-4 h-4 md:mr-2" />
                      <span className="hidden md:inline">Salir</span>
                    </Button>
                  </>
                ) : (
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-gray-300 hover:text-cyan-400 text-xs md:text-sm px-2 md:px-4"
                    >
                      Panel Admin
                    </Button>
                  </Link>
                )}
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

