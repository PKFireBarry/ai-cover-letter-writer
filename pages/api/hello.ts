const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: { body: {
  temperature: any; prompt: any; 
}; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { text?: any; error?: string; }): void; new(): any; }; }; }) {
  const prompt = req.body.prompt;
  const temperature = req.body.temperature;
  if (typeof prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      temperature: req.body.temperature,
      max_tokens: 3800,
      frequency_penalty: 0,
      presence_penalty: 0,
      n: 1,
    })

    console.log(response);
    res.status(200).json({ text: response.data.choices[0].text })
  } else {
    res.status(200).json({ text: "Invalid prompt provided." })
  }
}