import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const add = mutation({
  args: {
    email: v.string(),
    language: v.string(),
  },
  handler: async (ctx, args) => {
    const subscriberId = await ctx.db.insert("subscribers", {
      email: args.email,
      language: args.language,
      subscribedAt: Date.now(),
    });
    return subscriberId;
  },
});