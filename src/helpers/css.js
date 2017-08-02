export default class HelperCss {
	static inlineStyleToObject(str) {
		const cssToClassName = (class_name) => {
			const regexp = new RegExp("\\-[a-z]", "g")
			return class_name.replace(regexp, v => v.toUpperCase().slice(1))
		}

		let res = {};
		let regexp = /([\w-]+)\s*:\s*([^;]+)\s*;?/g
		let iterator = regexp.exec(str);
		while (iterator) {
			res[cssToClassName(iterator[1])] = iterator[2];
			iterator = regexp.exec(str)
		}


		return res;
	}
}
