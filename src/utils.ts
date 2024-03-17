import kigoSpring from "scraping-kigo/resultJson/spring.json" assert {
	type: "json",
};
import kigoSummer from "scraping-kigo/resultJson/summer.json" assert {
	type: "json",
};
import kigoFall from "scraping-kigo/resultJson/fall.json" assert {
	type: "json",
};
import kigoWinter from "scraping-kigo/resultJson/winter.json" assert {
	type: "json",
};
import kigoNewYear from "scraping-kigo/resultJson/newYear.json" assert {
	type: "json",
};

const saijiki = {
	spring: kigoSpring,
	summer: kigoSummer,
	fall: kigoFall,
	winter: kigoWinter,
	newYear: kigoNewYear,
};

export const isKigasanariExists = (haiku: string) => {
	let kigoCount = 0;
	for (const kigosBySeason of Object.values(saijiki)) {
		for (const kigoDef of kigosBySeason) {
			const includesKigo = haiku.includes(kigoDef.kigo);
			if (includesKigo) {
				kigoCount++;
			}
			const includesBodai = kigoDef.bodai.some((_bodai) =>
				haiku.includes(_bodai),
			);
			if (includesBodai) {
				kigoCount++;
			}
		}
	}
	if (kigoCount >= 2) {
		return true;
	}
	return false;
};
