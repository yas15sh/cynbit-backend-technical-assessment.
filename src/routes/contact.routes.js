import { Router } from "express";
import { rateLimit } from "express-rate-limit";
import { contactSchema } from "../schemas/contact.schema.js";
import { prisma } from "../services/prisma.js";

export const contactRouter = Router();
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-7",
  legacyHeaders: false
});

contactRouter.post("/", contactLimiter, async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        error: {
          code: "VALIDATION_ERROR",
          message: "Please correct the submitted information.",
          details: parsed.error.issues.map(issue => ({
            field: issue.path.join("."),
            message: issue.message
          }))
        }
      });
    }

    // Persist first. Queue email delivery after commit in a production deployment.
    const inquiry = await prisma.inquiry.create({ data: parsed.data });
    return res.status(201).json({
      success: true,
      message: "Your inquiry has been received.",
      data: { id: inquiry.id, status: inquiry.status }
    });
  } catch (error) {
    next(error);
  }
});
