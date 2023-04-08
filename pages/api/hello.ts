const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: { body: { prompt: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { text?: any; error?: string; }): void; new(): any; }; }; }) {
  const prompt = req.body.prompt;
  if (typeof prompt === "string") {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      n: 1,
    });

    res.status(200).json({ text: response.data.choices[0].message });
    
    console.log('Your Cover Letter:',response.data.choices[0].message);
  } else {
    res.status(400).json({ error: "Invalid prompt provided." });
  }
}
