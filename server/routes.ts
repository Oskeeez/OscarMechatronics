import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import { ZodError } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission route
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate the request body using the zod schema
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Store the contact message
      const contactMessage = await storage.createContactMessage({
        ...validatedData,
        createdAt: new Date().toISOString(),
      });
      
      return res.status(201).json({
        message: "Contact message sent successfully",
        id: contactMessage.id
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: "Invalid contact form data",
          errors: error.errors
        });
      }
      
      return res.status(500).json({
        message: "An error occurred while sending your message"
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
