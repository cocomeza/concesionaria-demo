import { Sidebar } from '@/components/admin/Sidebar'
import { createSupabaseServerComponentClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createSupabaseServerComponentClient()
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  // Verificar si es admin
  const { data: profile, error: profileError } = await supabase
    .from('admin_profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (profileError || !profile) {
    // Log para debugging (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.error('Admin profile error:', profileError)
      console.error('User ID:', user.id)
      console.error('User email:', user.email)
    }
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <main className="lg:pl-64">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  )
}

