import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendWelcomeEmail = action({
  args: {
    email: v.string(),
    language: v.string(),
  },
  handler: async (ctx, args) => {
    // Import email templates
    const emailTemplates = await import("../src/data/emailTemplates.json");
    const template = emailTemplates.default[args.language] || emailTemplates.default.en;
    
    // Send email using Brevo API
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Build!t Community", email: "djmonecorp@gmail.com" },
        to: [{ email: args.email }],
        subject: template.subject,
        htmlContent: template.body,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Email failed: ${response.statusText} - ${errorText}`);
    }

    return { success: true };
  },
});