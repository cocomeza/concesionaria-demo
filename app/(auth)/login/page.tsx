'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createSupabaseClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createSupabaseClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validar que el email y password no estén vacíos
      if (!email || !password) {
        toast({
          title: 'Error',
          description: 'Por favor completa todos los campos',
          variant: 'destructive',
        })
        return
      }

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      })

      if (error) {
        // Mensajes de error más específicos
        let errorMessage = 'Error al iniciar sesión'
        
        if (error.message.includes('Invalid login credentials')) {
          errorMessage = 'Email o contraseña incorrectos'
        } else if (error.message.includes('Email not confirmed')) {
          errorMessage = 'Por favor confirma tu email antes de iniciar sesión'
        } else {
          errorMessage = error.message
        }
        
        toast({
          title: 'Error de autenticación',
          description: errorMessage,
          variant: 'destructive',
        })
        return
      }

      if (!data.user) {
        toast({
          title: 'Error',
          description: 'No se pudo obtener la información del usuario',
          variant: 'destructive',
        })
        return
      }

      // Verificar si es admin
      const { data: profile, error: profileError } = await supabase
        .from('admin_profiles')
        .select('*')
        .eq('id', data.user.id)
        .single()

      if (profileError || !profile) {
        toast({
          title: 'Acceso denegado',
          description: 'No tienes permisos de administrador. Contacta al administrador del sistema.',
          variant: 'destructive',
        })
        await supabase.auth.signOut()
        return
      }

      // Éxito - redirigir al dashboard
      toast({
        title: '¡Bienvenido!',
        description: `Hola ${profile.nombre}`,
      })
      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      console.error('Login error:', error)
      toast({
        title: 'Error inesperado',
        description: error.message || 'Ocurrió un error al iniciar sesión. Por favor intenta de nuevo.',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
      <Card className="w-full max-w-md bg-slate-900 border-slate-800">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-white">Iniciar Sesión</CardTitle>
          <CardDescription className="text-gray-400">
            Acceso exclusivo para administradores de la plataforma
          </CardDescription>
          <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-md">
            <p className="text-sm text-red-400 font-medium">
              ⚠️ Esta sección es solo para administradores autorizados
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-300">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@autoelite.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white placeholder:text-gray-500"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-300">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-800 border-slate-700 text-white"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white" 
              disabled={loading}
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/inicio" className="text-cyan-400 hover:text-cyan-300 hover:underline">
              Volver al inicio
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

