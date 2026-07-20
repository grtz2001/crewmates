import { createClient } from '@supabase/supabase-js'

const URL = 'https://gwqclknkmkfcahihirzt.supabase.co'
const API_KEY = 'sb_publishable_WqJBS0Yo74F5dT91dimkbw_55U9PBhV'

export const supabase = createClient(URL, API_KEY)