const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const prompt = req.body.prompt;
  const temperature = req.body.temperature;
  if (typeof prompt === "string") {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a job searching assistant and you main goal is to write a really convincing and useful cover letter for the user using all the information they give you."},
        { role: "user", content: prompt }],
        temperature: temperature
        // max_tokens: 4000
      });

    console.log(response);
    console.log(response["data"]["choices"]);
    res.status(200).json({ text: response["data"]["choices"][0]["message"]["content"] })
  } else {
    res.status(200).json({ text: "Invalid prompt provided." })
  }
}
