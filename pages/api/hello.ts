const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: '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'
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: { body: { prompt: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { text?: any; error?: string; }): void; new(): any; }; }; }) {
  const prompt = req.body.prompt;
  if (typeof prompt === "string") {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: req.body.prompt,
      temperature: 0.2,
      max_tokens: 3800,
      n: 1,
    })

    console.log(response);
    res.status(200).json({ text: response.data.choices[0].text })
  } else {
    res.status(200).json({ text: "Invalid prompt provided." })
  }
}