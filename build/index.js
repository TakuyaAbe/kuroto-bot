import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";
import { TwitterApi } from "twitter-api-v2";
import kigoSpring from "scraping-kigo/resultJson/spring.json" assert {
    type: "json"
};
import kigoSummer from "scraping-kigo/resultJson/summer.json" assert {
    type: "json"
};
import kigoFall from "scraping-kigo/resultJson/fall.json" assert {
    type: "json"
};
import kigoWinter from "scraping-kigo/resultJson/winter.json" assert {
    type: "json"
};
import kigoNewYear from "scraping-kigo/resultJson/newYear.json" assert {
    type: "json"
};
dotenv.config();
const TARGET_SEASON = "spring";
const kigo = {
    spring: kigoSpring,
    summer: kigoSummer,
    fall: kigoFall,
    winter: kigoWinter,
    newYear: kigoNewYear,
};
const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
});
const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 32,
    temperature: 1,
    system: `クロード、あなたは高校時代に俳句甲子園全国大会に出場したこともある俳人です。
		清冽な感性が評価されています。
		大学生になった今も俳句会で活動を続けています。`,
    messages: [
        {
            role: "user",
            content: [
                {
                    type: "text",
                    text: `春の季語で俳句を一句作ってもらえますか？
					「土筆」「桜」「犬」「蕗の薹」は禁止です。
					季重なり(季語が１句に複数出現する)は避けてください。
					季語が入っていれば「春」と言う言葉は入れなくていいです。
					驚きや発見がある景、光を感じる光景で作ってください。
					改行・スペースは不要です。
					有季定型で作ってください。
					字余り・字足らずは避けてください。

					口語で作ってください。
					前後の説明は不要です。`,
                },
            ],
        },
    ],
});
console.log(msg);
// https://github.com/plhery/node-twitter-api-v2/blob/HEAD/doc/basics.md
const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_KEY_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});
await twitterClient.v2.tweet(`${msg.content[0].text} / kuroto\n\nclaude-3-opus-20240229, input_tokens: ${msg.usage.input_tokens} / output_tokens: ${msg.usage.output_tokens}`);
