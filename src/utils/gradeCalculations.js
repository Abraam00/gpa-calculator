export function getLetterGrade(percentage) {
	if (percentage === null || Number.isNaN(percentage)) return "—";
	if (percentage >= 93) return "A";
	if (percentage >= 90) return "A-";
	if (percentage >= 87) return "B+";
	if (percentage >= 83) return "B";
	if (percentage >= 80) return "B-";
	if (percentage >= 77) return "C+";
	if (percentage >= 73) return "C";
	if (percentage >= 70) return "C-";
	if (percentage >= 67) return "D+";
	if (percentage >= 63) return "D";
	if (percentage >= 60) return "D-";
	return "F";
}

export function getGpaPoints(percentage) {
	if (percentage === null || Number.isNaN(percentage)) return null;
	if (percentage >= 93) return 4.0;
	if (percentage >= 90) return 3.7;
	if (percentage >= 87) return 3.3;
	if (percentage >= 83) return 3.0;
	if (percentage >= 80) return 2.7;
	if (percentage >= 77) return 2.3;
	if (percentage >= 73) return 2.0;
	if (percentage >= 70) return 1.7;
	if (percentage >= 67) return 1.3;
	if (percentage >= 63) return 1.0;
	if (percentage >= 60) return 0.7;
	return 0.0;
}

export function calculateClassStats(assignments) {
	let totalWeight = 0;
	let weightedGradeSum = 0;

	assignments.forEach((assignment) => {
		const weight = parseFloat(assignment.weight);
		const grade = parseFloat(assignment.grade);

		if (!Number.isNaN(weight) && weight > 0) {
			totalWeight += weight;
			if (!Number.isNaN(grade)) {
				weightedGradeSum += grade * weight;
			}
		}
	});

	const hasValidGradedWork = assignments.some((a) => {
		const w = parseFloat(a.weight);
		const g = parseFloat(a.grade);
		return !Number.isNaN(w) && w > 0 && !Number.isNaN(g);
	});

	// Normalize by entered weight so partial-semester grades reflect current standing
	const gradedWeight = assignments.reduce((acc, a) => {
		const w = parseFloat(a.weight);
		const g = parseFloat(a.grade);
		if (!Number.isNaN(w) && w > 0 && !Number.isNaN(g)) {
			return acc + w;
		}
		return acc;
	}, 0);

	const average =
		hasValidGradedWork && gradedWeight > 0
			? weightedGradeSum / gradedWeight
			: null;

	return {
		average,
		totalWeight,
		letterGrade: getLetterGrade(average),
		gpaPoints: getGpaPoints(average),
	};
}

export function calculateSemesterStats(classes) {
	let totalEnrolledCredits = 0;
	let gradedCredits = 0;
	let weightedPercentageSum = 0;
	let weightedGpaSum = 0;

	classes.forEach((course) => {
		const credits = parseFloat(course.credits);
		if (!Number.isNaN(credits) && credits > 0) {
			totalEnrolledCredits += credits;

			const { average, gpaPoints } = calculateClassStats(course.assignments);
			if (average !== null && gpaPoints !== null) {
				gradedCredits += credits;
				weightedPercentageSum += average * credits;
				weightedGpaSum += gpaPoints * credits;
			}
		}
	});

	const overallPercentage =
		gradedCredits > 0 ? weightedPercentageSum / gradedCredits : null;

	const semesterGpa = gradedCredits > 0 ? weightedGpaSum / gradedCredits : null;

	return {
		overallPercentage,
		semesterGpa,
		totalEnrolledCredits,
		gradedCredits,
		overallLetter: getLetterGrade(overallPercentage),
	};
}
