import { useState, useEffect } from 'react'
import { supabase } from '@/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { LoginForm } from '@/components/login/LoginForm'
import Layout from '@/components/Layout'
import SystemRoutes from './components/SystemRoutes';
import { Toaster } from "@/components/ui/toaster"
import { useUserStore } from './store/user.store';
import { getUserById } from '@/services/user.services';

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const store = useUserStore();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {

      setSession(session)
      if (session?.user?.id) {
        if (!store.user) {
          getUserById(session.user.id).then((user) => {
            store.setUser(user);
          })
        }
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  if (!session) {
    return <LoginForm />
  }
  else {
    return (
      <Layout>
        <SystemRoutes />
        <Toaster />
      </Layout>
    )
  }
}


export default App;
