const input = "abcdefgh";

const cannotContainTheLetters = (forbiddenLetters: string[]) => (allLetters: string[]) =>
	allLetters.every((letter) => !forbiddenLetters.includes(letter));

const hasOneIncreasingStraight = (allLetters: string[]) =>
	allLetters.some((letter, index) => {
		const nextLetter = allLetters[index + 1];
		const nextNextLetter = allLetters[index + 2];

		return (
			nextLetter === String.fromCharCode(letter.charCodeAt(0) + 1) &&
			nextNextLetter === String.fromCharCode(letter.charCodeAt(0) + 2)
		);
	});

const hasAtLeastTwoDifferentNonOverlappingPairs = (allLetters: string[]) => {
	const pairs = allLetters.reduce((acc, letter, index) => {
		const nextLetter = allLetters[index + 1];
		if (nextLetter === letter) {
			acc.push(letter);
		}
		return acc;
	}, [] as string[]);

	return pairs.length >= 2;
};

const increment = (letters: string[]): string[] => {
	const lastLetter = letters[letters.length - 1];
	const newLetter = lastLetter === "z" ? "a" : String.fromCharCode(lastLetter.charCodeAt(0) + 1);

	if (newLetter === "a") {
		return increment(letters.slice(0, -1)).concat(newLetter);
	}

	return letters.slice(0, -1).concat(newLetter);
};

const generateNextPassword = (password: string) => {
	const letters = password.split("");
	const nextPassword = increment(letters);

	return nextPassword.join("");
};

const assignment1 = () => {
	const cannotContain = cannotContainTheLetters(["i", "o", "l"]);

	const valid = false;

	let password = generateNextPassword(input);

	while (!valid) {
		const letters = input.split("");
		const nextPassword = generateNextPassword(password);

		if (
			cannotContain(letters) &&
			hasOneIncreasingStraight(letters) &&
			hasAtLeastTwoDifferentNonOverlappingPairs(letters)
		) {
			return nextPassword;
		}

		password = nextPassword;
	}
};

const Day = () => {
	return (
		<main>
			<p>Part 1: {assignment1()}</p>
		</main>
	);
};

export default Day;
