import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";
import { TwitterApi } from "twitter-api-v2";
dotenv.config();
console.log(process.env.ANTHROPIC_API_KEY);
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
});
const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 32,
    temperature: 1,
    system: "クロード、あなたは高校時代に俳句甲子園全国大会に出場したこともある俳人です。大学でも俳句会で活動を続けていました。有季定型、季重なり(季語が１句に複数出現する)は避けてください。",
    messages: [
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: "春の季語で俳句を一句作ってもらえますか？季語が入っていれば「春」と言う言葉は入れなくていいです。驚きや発見がある景で作ってください。改行・スペースは不要です。前後の説明は不要です。",
                },
            ],
        },
    ],
});
console.log(msg);
// https://github.com/plhery/node-twitter-api-v2/blob/HEAD/doc/basics.md
// Instantiate with desired auth type (here's Bearer v2 auth)
const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_KEY_SECRET,
    // Following access tokens are not required if you are
    // at part 1 of user-auth process (ask for a request token)
    // or if you want a app-only client (see below)
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
// const appOnlyClient = new TwitterApi(process.env.TWITTER_BEARER_TOKEN);
await twitterClient.v2.tweet(`${msg.content[0].text} / kuroto\n\nclaude-3-opus-20240229, input_tokens: ${msg.usage.input_tokens} / output_tokens: ${msg.usage.output_tokens}`);
