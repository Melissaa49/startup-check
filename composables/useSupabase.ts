import { createClient } from '@supabase/supabase-js'

let client: ReturnType<typeof createClient> | null = null

export const useSupabase = () => {

  if (client)
    return client

  const config = useRuntimeConfig()

  console.log('URL:', config.public.supabaseUrl)
  console.log('KEY:', config.public.supabaseKey)

  client = createClient(
    config.public.supabaseUrl,
    config.public.supabaseKey
  )

  return client

}