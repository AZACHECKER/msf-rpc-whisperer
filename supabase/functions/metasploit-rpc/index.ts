
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

    const { action, command, sessionId, config } = await req.json()
    
    console.log(`Metasploit RPC action: ${action}`)

    switch (action) {
      case 'test_connection':
        return await testConnection(supabaseClient, config)
      
      case 'connect':
        return await connectToMetasploit(supabaseClient)
      
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

async function testConnection(supabase: any, config: any) {
  try {
    console.log(`Testing connection to ${config.host}:${config.port}`)
    
    // Симуляция проверки подключения
    // В реальной реализации здесь был бы TCP socket connection
    const connectionTest = {
      success: true,
      message: `Successfully connected to ${config.host}:${config.port}`,
      version: '6.3.31-dev'
    }

    // Логируем попытку подключения
    await supabase.from('console_history').insert({
      command: `test_connection ${config.host}:${config.port}`,
      output: `Connection test successful - ${connectionTest.message}`,
      command_type: 'metasploit'
    })

    return new Response(
      JSON.stringify(connectionTest),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Connection test error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
}

async function connectToMetasploit(supabase: any) {
  try {
    console.log('Connecting to Metasploit RPC')
    
    const connectionResult = {
      success: true,
      token: 'msf-token-' + Date.now(),
      version: '6.3.31-dev',
      message: 'Connected to Metasploit Framework'
    }

    await supabase.from('console_history').insert({
      command: 'connect',
      output: `Connected to Metasploit Framework ${connectionResult.version}`,
      command_type: 'metasploit'
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
    console.log(`Executing command: ${command}`)
    
    // Симуляция выполнения различных команд
    let output = ''
    let success = true

    if (command.includes('sessions -l')) {
      output = `Active sessions
===============

Id  Name  Type         Information               Connection
--  ----  ----         -----------               ----------
1   msf   meterpreter  NT AUTHORITY\\SYSTEM @ WIN-TEST  192.168.1.100:445 -> 192.168.1.50:4444 (192.168.1.100)`
    } else if (command.includes('use exploit/')) {
      output = `Using ${command.replace('use ', '')}`
    } else if (command.includes('set ')) {
      const [_, param, value] = command.split(' ')
      output = `${param} => ${value}`
    } else if (command === 'exploit') {
      output = `[*] Started reverse TCP handler on 192.168.1.50:4444
[*] 192.168.1.100:445 - Connecting to target for exploitation.
[*] 192.168.1.100:445 - Connection established for exploitation.
[*] 192.168.1.100:445 - Target OS: Windows 10 Build 19041
[*] 192.168.1.100:445 - Built a write-what-where primitive...
[+] 192.168.1.100:445 - Overwrite complete... SYSTEM session created!
[*] Sending stage (200774 bytes) to 192.168.1.100
[*] Meterpreter session 1 opened (192.168.1.50:4444 -> 192.168.1.100:49158)`
      
      // Создаем новую сессию в базе данных
      await supabase.from('metasploit_sessions').insert({
        session_id: '1',
        target_host: '192.168.1.100',
        session_type: 'meterpreter',
        status: 'active',
        metadata: {
          exploit: 'ms17_010_eternalblue',
          payload: 'windows/x64/meterpreter/reverse_tcp',
          target_os: 'Windows 10 Build 19041'
        }
      })
    } else if (command === 'help') {
      output = `Core Commands
=============

    Command       Description
    -------       -----------
    ?             Help menu
    background    Backgrounds the current session
    exit          Terminate the Metasploit console
    help          Help menu
    info          Displays information about a module
    run           Run a script
    sessions      Dump session listings and display information about sessions
    set           Sets a variable to a value
    show          Displays modules of a given type, or all modules
    use           Selects a module by name
    version       Show the framework and console library version numbers`
    } else {
      output = `Command executed: ${command}\nResult: Command completed successfully`
    }

    // Сохраняем команду в истории
    await supabase.from('console_history').insert({
      command,
      output,
      command_type: 'metasploit',
      session_id: sessionId || null
    })

    return new Response(
      JSON.stringify({ success, output }),
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
