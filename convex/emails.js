import { action } from "./_generated/server";
import { v } from "convex/values";

export const sendWelcomeEmail = action({
  args: {
    email: v.string(),
    language: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      // Define email template directly in code
      const template = {
        subject: "🎉 Welcome to Build!t - Your Developer Journey Starts Now!",
        body: "<!DOCTYPE html><html><head><meta charset='utf-8'><meta name='viewport' content='width=device-width,initial-scale=1'><style>@keyframes fadeIn{0%{opacity:0;transform:translateY(20px)}100%{opacity:1;transform:translateY(0)}}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}.container{max-width:600px;margin:0 auto;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;background:#f8fafc;border-radius:16px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.1)}.header{background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:40px 20px;text-align:center;color:white}.logo{font-size:42px;font-weight:bold;margin:0;animation:pulse 2s infinite}.tagline{font-size:16px;margin:10px 0 0;opacity:0.9}.content{background:white;padding:40px 30px}.welcome{font-size:24px;color:#2d3748;margin:0 0 20px;text-align:center;animation:fadeIn 1s ease-out}.description{font-size:16px;line-height:1.6;color:#4a5568;margin:0 0 30px;text-align:center}.features{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:20px;margin:30px 0}.feature{background:linear-gradient(135deg,#ff6b6b,#feca57);padding:25px;border-radius:12px;color:white;text-align:center;animation:fadeIn 1s ease-out}.feature-icon{font-size:28px;margin-bottom:10px}.feature h3{margin:0 0 8px;font-size:16px}.feature p{margin:0;font-size:14px;opacity:0.9}.cta{text-align:center;margin:40px 0}.cta-button{display:inline-block;background:linear-gradient(135deg,#667eea,#764ba2);color:white;text-decoration:none;padding:15px 30px;border-radius:25px;font-weight:bold;transition:transform 0.3s ease}.cta-button:hover{transform:translateY(-2px)}.footer{background:#f7fafc;padding:30px;text-align:center;color:#718096;font-size:14px}.social{margin:20px 0}.social a{display:inline-block;margin:0 8px;font-size:20px;text-decoration:none}@media (max-width:600px){.content{padding:20px}.features{grid-template-columns:1fr}}</style></head><body><div class='container'><div class='header'><h1 class='logo'>Build!t</h1><p class='tagline'>Where Innovation Meets Community</p></div><div class='content'><h2 class='welcome'>🎉 Welcome to the Build!t Family!</h2><p class='description'>You've just joined an incredible community of passionate developers, innovators, and tech enthusiasts. We're thrilled to have you on board as we build the future together!</p><div class='features'><div class='feature'><div class='feature-icon'>🚀</div><h3>Epic Hackathons</h3><p>Compete in thrilling hackathons with amazing prizes, mentorship, and career opportunities</p></div><div class='feature'><div class='feature-icon'>🤝</div><h3>Networking Events</h3><p>Connect with industry leaders, fellow developers, and potential co-founders at our exclusive meetups</p></div><div class='feature'><div class='feature-icon'>💡</div><h3>Learning Hub</h3><p>Access workshops, tech talks, and resources to level up your skills and stay ahead of trends</p></div></div><div class='cta'><a href='#' class='cta-button'>Explore Upcoming Events</a></div><p style='text-align:center;color:#4a5568;margin:30px 0;font-style:italic;'>Get ready for an amazing journey of learning, building, and growing together. The next big breakthrough could be yours!</p></div><div class='footer'><div class='social'><a href='#'>🌐</a><a href='#'>💬</a><a href='#'>📧</a></div><p><strong>Happy coding!</strong><br>The Build!t Team</p><p style='font-size:12px;color:#a0aec0;margin-top:15px;'>You're receiving this because you joined our developer community. Ready to build something amazing?</p></div></div></body></html>"
      };
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(args.email)) {
        throw new Error("Invalid email format");
      }
      
      // Check API key exists
      if (!process.env.BREVO_API_KEY) {
        throw new Error("BREVO_API_KEY not configured");
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