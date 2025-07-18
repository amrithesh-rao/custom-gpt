import { InferenceClient } from "@huggingface/inference";
import { configDotenv } from "dotenv";
configDotenv();

const client = new InferenceClient(process.env.HF_TOKEN);

export async function getChatCompletion(message) {
    return await client.chatCompletion({
        provider: "groq",
        model: "google/gemma-2-9b-it",
        messages: [
            {
                role: "user",
                content: message,
            },
        ],
    });
}


