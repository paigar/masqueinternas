import fs from "fs";
import path from "path";

export default async function () {
	const directoryPath = "./public/img/";

	if (!fs.existsSync(directoryPath)) {
		console.warn(`Directory ${directoryPath} does not exist`);
		return [];
	}

	try {
		const files = fs.readdirSync(directoryPath);
		return files
			.filter((file) => fs.statSync(path.join(directoryPath, file)).isFile())
			.map((file) => file);
	} catch (error) {
		console.error(`Error reading directory ${directoryPath}:`, error);
		return [];
	}
}
