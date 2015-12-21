export default function classname(base, mods, additional) {
	var result = [base];

	result.push.apply(result, mods.filter(identity).map(function (mod) {
		return base + '_' + mod;
	}));

	result.push(additional);

	return result.join(' ').trim();
}

function identity(_) { return _ }