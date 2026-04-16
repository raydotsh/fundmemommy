import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
  }

  try {
    // Check if email exists
    const { data: existing } = await supabase
      .from('emails')
      .select('email')
      .eq('email', email)
      .single();

    if (existing) {
      return NextResponse.json({ message: 'Email already subscribed' }, { status: 409 });
    }

    // Insert new email
    const { error } = await supabase
      .from('emails')
      .insert([{ email }]);

    if (error) {
      if (error.code === '23505') { // Unique constraint violation
        return NextResponse.json({ message: 'Email already subscribed' }, { status: 409 });
      }
      throw error;
    }

    return NextResponse.json({ message: 'Successfully subscribed!' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}