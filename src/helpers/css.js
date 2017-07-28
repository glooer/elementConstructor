export default class HelperCss {
	static inlineStyleToObject(str) {
		let res = {};
		let regexp = /([\w-]+)\s*:\s*([^;]+)\s*;?/g
		let iterator;
		while (iterator = regexp.exec(str)) {
			res[iterator[1]] = iterator[2];
		}

		return res;
	}
}
