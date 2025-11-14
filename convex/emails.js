import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendWelcomeEmail = action({
  args: {
    email: v.string(),
    language: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Import email templates
      const emailTemplates = await import("../src/data/emailTemplates.json");
      const template = emailTemplates.default[args.language] || emailTemplates.default.en;
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(args.email)) {
        throw new Error("Invalid email format");
      }
      
      // Send email using Brevo API
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          sender: { 
            name: "Build!t Community", 
            email: "djmonecorp@gmail.com" 
          },
          to: [{ 
            email: args.email,
            name: "Builder" 
          }],
          subject: template.subject,
          htmlContent: template.body,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: "Unknown error" }));
        throw new Error(`Brevo API Error: ${response.status} - ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      return { success: true, messageId: result.messageId };
    } catch (error) {
      console.error("Email sending failed:", error.message);
      throw new Error(`Failed to send email: ${error.message}`);
    }
  },
});