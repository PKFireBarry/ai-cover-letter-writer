const { Configuration, OpenAIApi } = require("openai");
import fs from "fs";

const instructions = `
I'll break down each point and provide some examples to illustrate how you can follow these rules:
Start with a strong opening sentence that grabs the reader's attention and explains why you are interested in the position.
Example: "As a passionate software developer with a strong interest in cutting-edge technologies, I am excited to apply for the position of [job title] at [company name]."
Introduce yourself and explain why you are a good fit for the job. Highlight your relevant skills, experience, and education.
Example: "With [number] years of experience in software development and a degree in [field], I have developed a strong foundation in [relevant skills] and am confident in my ability to excel in this position."
Research the company and job requirements to tailor the letter accordingly. Show that you understand the company's mission and how you can contribute to its goals.
Example: "I am impressed by [company name]'s commitment to [mission/goal], and I believe my experience in [relevant skill] and [related experience] can help [company name] achieve even greater success."
Provide specific examples of your accomplishments that showcase your abilities and make you stand out from other candidates.
Example: "I am particularly proud of my work on [project name], where I [briefly describe accomplishment]. This experience has taught me [related skill] and has given me the confidence to take on even more challenging projects in the future."
End with a strong closing statement that reiterates your interest in the position and thanks the employer for considering your application.
Example: "Thank you for considering my application for the position of [job title]. I am excited about the opportunity to contribute my skills and experience to [company name], and I look forward to discussing how I can help achieve your goals."
Use technical language and terminology relevant to the job you are applying for. This shows that you have a strong understanding of the field and can communicate effectively with other professionals.
Example: "My experience with [programming language/tool/technology] has enabled me to [related accomplishment], and I am eager to apply this knowledge to help [company name] develop even more innovative solutions."
Showcase your experience with specific programming languages, tools, and technologies that are relevant to the job. This can help you stand out from other candidates who may have more general experience.
Example: "My proficiency in [programming language/tool/technology] has allowed me to [related accomplishment], and I am confident in my ability to contribute to [company name]'s development efforts in this area."
Highlight any relevant projects or contributions you have made to open source software or other tech communities. This can demonstrate your passion for the field and your ability to collaborate with others.
Example: "I am an active contributor to [open source software/tech community], where I have had the opportunity to collaborate with other developers on [relevant project]. This experience has taught me the importance of teamwork and has deepened my passion for software development."
Emphasize your problem-solving skills and ability to think creatively. These are important qualities for software developers who often need to find innovative solutions to complex problems.
Example: "My ability to think creatively and approach problems from multiple perspectives has been instrumental in my success as a software developer. I am excited about the opportunity to bring this mindset to [company name] and help tackle even the most complex challenges."
Keep it to a max of 500 words.
By following these rules, you can create a strong and compelling cover letter that showcases your skills and experience in the tech industry. Good luck with your job search!
`
const configuration = new Configuration({
  apiKey: process.env.OPENAI,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req: any, res: any) {
  const prompt = req.body.prompt;
  const temperature = req.body.temperature;
  if (typeof prompt === "string") {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: `You are a job searching assistant and you main goal is to write a really convincing and useful cover letter for the user using all the information they give you and this guide material abour what a good cover letter has '${instructions}'. follow the guide and write a cover letter for the user using all the information to make a cohesive first impression`},
        { role: "user", content: prompt }],
        temperature: temperature,
        presence_penalty: 0.5,
        frequency_penalty: 0.5
      });

    console.log(response);
    console.log(response["data"]["choices"]);
    res.status(200).json({ text: response["data"]["choices"][0]["message"]["content"] })
  } else {
    res.status(200).json({ text: "Invalid prompt provided." })
  }
}
