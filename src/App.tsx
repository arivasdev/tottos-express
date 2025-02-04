import { useState, useEffect } from 'react'
import './App.css'
import { supabase } from '@/supabaseClient';
import { Session } from '@supabase/supabase-js';
import { LoginForm } from '@/components/login/LoginForm'
import Layout from '@/components/Layout'
import SystemRoutes from './components/SystemRoutes';

function App() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session) {
    return <LoginForm />
  }
  else {
    return (
      <Layout>
        <SystemRoutes />
         <button onClick={() => supabase.auth.signOut()}>Sign out</button>
      </Layout>
    )
  }
}


export default App;
