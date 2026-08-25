import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message, honeypot } = body;

    // Simple honeypot check to prevent basic bots
    if (honeypot) {
      return NextResponse.json(
        { success: false, message: "Bot detected" },
        { status: 400 }
      );
    }

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Semua field harus diisi" },
        { status: 400 }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, message: "Format email tidak valid" },
        { status: 400 }
      );
    }

    const emailTo = process.env.CONTACT_EMAIL_TO;
    if (!emailTo) {
      throw new Error("CONTACT_EMAIL_TO is not set in environment variables");
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portofolio Contact <onboarding@resend.dev>",
      to: emailTo,
      replyTo: email,
      subject: `Pesan baru dari ${name} via Portofolio`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2 style="color: #0f172a;">Pesan Baru dari Portofolio</h2>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
          <h3 style="color: #334155;">Isi Pesan:</h3>
          <p style="white-space: pre-wrap; color: #475569; line-height: 1.5;">${message}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true, message: "Pesan berhasil dikirim" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, message: "Terjadi kesalahan internal. Gagal mengirim pesan." },
      { status: 500 }
    );
  }
}
