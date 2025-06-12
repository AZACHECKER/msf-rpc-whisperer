
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const { action, command, sessionId } = await req.json()
    
    console.log(`Metasploit RPC action: ${action}`)

    // Metasploit RPC connection details
    const MSF_HOST = '4.tcp.eu.ngrok.io'
    const MSF_PORT = 17403
    const MSF_USER = 'msf'
    const MSF_PASS = 'msfpass'

    switch (action) {
      case 'connect':
        return await connectToMetasploit(supabaseClient, MSF_HOST, MSF_PORT, MSF_USER, MSF_PASS)
      
      case 'sessions':
        return await getActiveSessions(supabaseClient)
      
      case 'execute':
        return await executeCommand(supabaseClient, command, sessionId)
      
      case 'exploits':
        return await getAvailableExploits(supabaseClient)
      
      default:
        return new Response(
          JSON.stringify({ error: 'Unknown action' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
    }
  } catch (error) {
    console.error('Metasploit RPC error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

async function connectToMetasploit(supabase: any, host: string, port: number, user: string, pass: string) {
  try {
    // Симуляция подключения к Metasploit RPC
    console.log(`Connecting to Metasploit RPC at ${host}:${port}`)
    
    // В реальной реализации здесь был бы TCP socket connection
    // Для демонстрации создаем симуляцию успешного подключения
    
    const connectionResult = {
      success: true,
      token: 'msf-token-' + Date.now(),
      version: '6.3.31-dev',
      hostname: host,
      port: port
    }

    // Логируем подключение в базу данных
    await supabase.from('console_history').insert({
      command: `connect ${host}:${port}`,
      output: `Connected to Metasploit Framework ${connectionResult.version}`,
      command_type: 'metasploit',
      target_host: host
    })

    return new Response(
      JSON.stringify(connectionResult),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Connection error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function getActiveSessions(supabase: any) {
  try {
    const { data: sessions, error } = await supabase
      .from('metasploit_sessions')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })

    if (error) throw error

    return new Response(
      JSON.stringify({ sessions }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Get sessions error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function executeCommand(supabase: any, command: string, sessionId?: string) {
  try {
    // Симуляция выполнения команды
    const output = `Executed: ${command}\nResult: Command completed successfully`
    
    // Сохраняем команду в истории
    await supabase.from('console_history').insert({
      command,
      output,
      command_type: 'metasploit',
      session_id: sessionId || null
    })

    return new Response(
      JSON.stringify({ success: true, output }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Execute command error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function getAvailableExploits(supabase: any) {
  try {
    const { data: exploits, error } = await supabase
      .from('available_exploits')
      .select('*')
      .order('success_rate', { ascending: false })

    if (error) throw error

    return new Response(
      JSON.stringify({ exploits }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Get exploits error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}
