// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toVal(mix: any) {
	let k,
		y,
		str = '';

	if (typeof mix === 'string' || typeof mix === 'number') {
		str += mix;
	} else if (typeof mix === 'object') {
		if (Array.isArray(mix)) {
			const len = mix.length;
			for (k = 0; k < len; k++) {
				if (mix[k]) {
					if ((y = toVal(mix[k]))) {
						str && (str += ' ');
						str += y;
					}
				}
			}
		} else {
			for (y in mix) {
				if (mix[y]) {
					str && (str += ' ');
					str += y;
				}
			}
		}
	}

	return str;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
export function clsx(...args: any[]) {
	let i = 0,
		tmp,
		x,
		str = '';
	const len = arguments.length;
	for (; i < len; i++) {
		// eslint-disable-next-line prefer-rest-params
		if ((tmp = arguments[i])) {
			if ((x = toVal(tmp))) {
				str && (str += ' ');
				str += x;
			}
		}
	}
	return str;
}

export default clsx;
