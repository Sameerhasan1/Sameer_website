import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 })
    }

    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',   // works without domain verification
      to:   'sameerhasanwork1@gmail.com',
      replyTo: email,
      subject: `New message from ${name} — Portfolio`,
      html: `
        <div style="font-family:sans-serif;max-width:560px;padding:2rem;background:#fafafa;border-radius:12px;">
          <h2 style="color:#6366f1;margin-top:0;">New Portfolio Message</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border:none;border-top:1px solid #e5e7eb;margin:1.5rem 0;">
          <p style="color:#374151;line-height:1.7;">${message.replace(/\n/g, '<br>')}</p>
        </div>
      `,
    })

    if (error) return NextResponse.json({ error: 'Send failed' }, { status: 500 })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}