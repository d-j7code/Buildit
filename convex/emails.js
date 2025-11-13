import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendWelcomeEmail = action({
  args: {
    email: v.string(),
    language: v.string(),
  },
  handler: async (ctx, args) => {
    console.log("API Key available:", !!process.env.RESEND_API_KEY);
    
    // Import email templates
    const emailTemplates = await import("../src/data/emailTemplates.json");
    const template = emailTemplates.default[args.language] || emailTemplates.default.en;
    
    // Send email using Resend API (web-compatible)
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Build!t Community <noreply@buildit.dev>",
        to: [args.email],
        subject: template.subject,
        html: template.body,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.log("Resend error:", errorText);
      throw new Error(`Email failed: ${response.statusText} - ${errorText}`);
    }

    return await response.json();
  },
});