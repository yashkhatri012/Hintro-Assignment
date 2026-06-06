import express from "express";

const EvaluationRoute = express.Router();




/**
 * @swagger
 * /api/evaluation:
 *   get:
 *     summary: Assignment evaluation information
 *     tags: [Evaluation]
 *     responses:
 *       200:
 *         description: Returns candidate and project information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 traceId:
 *                   type: string
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     candidateName:
 *                       type: string
 *                     email:
 *                       type: string
 *                     repositoryUrl:
 *                       type: string
 *                     deployedUrl:
 *                       type: string
 *                     externalIntegration:
 *                       type: string
 *                     features:
 *                       type: array
 *                       items:
 *                         type: string
 */

EvaluationRoute.get("/", (req, res) => {
  res.status(200).json({
    traceId: req.traceId,
    success: true,
    data: {
      candidateName: "Yash",
      email: "yashkhatri88540@gmail.com",
      repositoryUrl: "https://github.com/yashkhatri012/Hintro-Assignment",
      deployedUrl: "",
      externalIntegration: "Telegram Bot API",
      features: [
        "Authentication",
        "Meeting Management",
        "AI Analysis",
        "Transcript Citations",
        "Action Item Management",
        "Overdue Detection",
        "Reminder Scheduler",
        "Telegram Notifications",
        "Swagger Documentation",
        "Trace ID Middleware",
        "Structured Logging",
        "Input Validation",
        "Global Error Handling"
      ],
    },
  });
});

export default EvaluationRoute;
