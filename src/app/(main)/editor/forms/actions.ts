"use server";

import openai from "@/lib/openai";
import { canUseAiTools } from "@/lib/permission";
import { getUserSubscriptionLevel } from "@/lib/subscription";
import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
  WorkExperience,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";

export async function generateSummary(input: GenerateSummaryInput) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);
  if (!canUseAiTools(subscriptionLevel)) {
    throw new Error(
      "AI tools are available for Pro users and above. Please upgrade your subscription.",
    );
  }
  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMsg = `You're a job resume generator AI. Your task is to write a professional introduction summary for a resume given the user's provided data.
  Only return the summary and do not include any other information in the response. Keep it concise and professional.`;

  const userMsg = `Plerase generate a professional resume summary for this data
  
  Job Tilte: ${jobTitle || "N/A"}

  Work experience: ${workExperiences
    ?.map(
      (work) => `
    Position: ${work.position || " N/A"} at ${work.company || "N/A"} from ${work.startDate || "N/A"} to ${work.endDate || "Present"}
    Description : ${work.description || "N/A"}
    `,
    )
    .join("\n\n")}
 Education: ${educations
   ?.map(
     (edu) => `
    Position: ${edu.degree || " N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
    `,
   )
   .join("\n\n")}
  

   Skills: ${skills}
  `;

  console.log("System msg", systemMsg);
  console.log("User msg", userMsg);

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMsg,
      },
      {
        role: "user",
        content: userMsg,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  return aiResponse;
}

export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
) {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);
  if (!canUseAiTools(subscriptionLevel)) {
    throw new Error(
      "AI tools are available for Pro users and above. Please upgrade your subscription.",
    );
  }
  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMsg = `You're a job resume generator AI. Your task is to generate a single work experience entry based on user input. Your response must adhere to the following structure. You can omit fields if they can't be inferef from the provided data, but don't add any new ones
  
  Job Title: <job title>
  Company: <company name>
  Start date: <format: YYYY-MM-DD> (only if provided)
  End date: <format: YYYY-MM-DD> (only if provided)
  Description: <an optimized description in bullet format, might be infared from the job title>
  `;

  const userMsg = `Please provide a work experience entry from this description
  ${description} `;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMsg,
      },
      {
        role: "user",
        content: userMsg,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  console.log("ai response", aiResponse);

  return {
    position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
    company: aiResponse.match(/Company: (.*)/)?.[1] || "",
    description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)?.[1],
    endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)?.[1],
  } satisfies WorkExperience;
}
