import { createFileRoute } from "@tanstack/react-router";
import { Resend } from "resend";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().max(100).optional(),
  project: z.string().min(20).max(2000),
  budget: z.enum(["", "under_8k", "8_20k", "20_50k", "over_50k"]).optional(),
});

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const result = contactSchema.safeParse(body);
          if (!result.success) {
            return new Response(
              JSON.stringify({ error: "Validation failed", errors: result.error.flatten().fieldErrors }),
              { status: 400, headers: { "Content-Type": "application/json" } }
            );
          }

          const { name, email, company, project, budget } = result.data;

          // Fallback: if Resend not configured, still accept and return success
          const apiKey = process.env.RESEND_API_KEY;
          if (!apiKey || apiKey.includes("placeholder")) {
            console.log("Contact form submitted (no Resend configured):", { name, email, company, budget });
            return new Response(JSON.stringify({ success: true, fallback: true }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          }

          const resend = new Resend(apiKey);
          const sendResult = await resend.emails.send({
            from: "noreply@sepehr.am",
            to: "hello@sepehr.am",
            subject: `New project inquiry from ${name}`,
            html: `
              <h2>New Inquiry</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
              <p><strong>Project:</strong></p>
              <p>${project.replace(/\n/g, "<br>")}</p>
              ${budget ? `<p><strong>Budget Range:</strong> ${budget}</p>` : ""}
            `,
          });

          if (sendResult.error) {
            console.error("Resend error:", sendResult.error);
            return new Response(
              JSON.stringify({ error: "Failed to send email" }),
              { status: 500, headers: { "Content-Type": "application/json" } }
            );
          }

          return new Response(JSON.stringify({ success: true, id: sendResult.data?.id }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          });
        } catch (err) {
          console.error("Contact API error:", err);
          return new Response(
            JSON.stringify({ error: "Internal server error" }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      },
    },
  },
});
