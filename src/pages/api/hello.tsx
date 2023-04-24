import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req: any, res: any) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const text = req.body.text || "";
  const type = req.body.type || "";
  const recipient = req.body.recipient || "";
  const sender = req.body.sender || "";

  if (text.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid text",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(text, type, recipient, sender),
      temperature: 0.6,
      max_tokens: 2000, // Set a maximum length of 1024 tokens
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(
  text: string,
  type: string,
  recipient: string,
  sender: string
) {
  switch (type) {
    case "enhance":
      return `Please review and revise 'My Text' for professionalism and grammatical accuracy. Your task is to improve the text to ensure it meets the highest standards of written communication. My Text: "${text.replace(
        /[\n\r]/g,
        " "
      )}"`;

    case "email":
      return `Compose an email from 'Sender' to 'Recipient' regarding the information outlined in 'Notes', and create a suitable email subject line. Please ensure that the email is written professionally and is grammatically correct. The names and text are as follows: Recipient: "${recipient}". Sender: "${sender}". Notes: "${text}".`;

    case "summarize":
      return `Please summarize the key points and essential details covered in 'My Text'. Your summary should include relevant information on the topic, key arguments or ideas presented, and any notable insights or conclusions. Please ensure that your summary is clear, concise, and accurately captures the main points of 'My Text'. My Text: "${text}"`;

    default:
      return `Please repeat after me: Excuse me, ${type} is not a Job I offer.`;
  }
}
