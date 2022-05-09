import type {NextPage} from "next";
import {CourseWithoutSections, SectionWithCourse} from "../../types/types";
import {useContext, useEffect, useState} from "react";
import FiltersContext from "../../pages/contexts/FiltersContext";
import styles from "../../styles/SectionsTable.module.css";

// Taken from here: https://react-icons.github.io/react-icons
// Since I don't feel like installing a 44MB package for the sake of two icons
export const LOCKED = (
		<svg
				stroke="currentColor"
				fill="currentColor"
				strokeWidth="0"
				version="1.1"
				viewBox="0 0 16 16"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
		>
			<path
					d="M9.25 7h-0.25v-3c0-1.654-1.346-3-3-3h-2c-1.654 0-3 1.346-3 3v3h-0.25c-0.412 0-0.75 0.338-0.75 0.75v7.5c0 0.412 0.338 0.75 0.75 0.75h8.5c0.412 0 0.75-0.338 0.75-0.75v-7.5c0-0.412-0.338-0.75-0.75-0.75zM3 4c0-0.551 0.449-1 1-1h2c0.551 0 1 0.449 1 1v3h-4v-3z"></path>
		</svg>
);
export const UNLOCKED = (
		<svg
				stroke="currentColor"
				fill="currentColor"
				strokeWidth="0"
				version="1.1"
				viewBox="0 0 16 16"
				height="1em"
				width="1em"
				xmlns="http://www.w3.org/2000/svg"
		>
			<path
					d="M12 1c1.654 0 3 1.346 3 3v3h-2v-3c0-0.551-0.449-1-1-1h-2c-0.551 0-1 0.449-1 1v3h0.25c0.412 0 0.75 0.338 0.75 0.75v7.5c0 0.412-0.338 0.75-0.75 0.75h-8.5c-0.412 0-0.75-0.338-0.75-0.75v-7.5c0-0.412 0.338-0.75 0.75-0.75h6.25v-3c0-1.654 1.346-3 3-3h2z"></path>
		</svg>
);

type Props = {
	crns: string[];
	courses: Record<string, CourseWithoutSections>;
	sections: Record<string, SectionWithCourse>;
};

const SectionsTable: NextPage<Props> = ({crns, courses, sections}) => {
	const context = useContext(FiltersContext);

	const [width, setWidth] = useState<number>(window.innerWidth);

	function handleWindowSizeChange() {
		setWidth(window.innerWidth);
	}

	useEffect(() => {
		window.addEventListener('resize', handleWindowSizeChange);
		return () => {
			window.removeEventListener('resize', handleWindowSizeChange);
		}
	}, []);

	const isMobile = width <= 768;

	/**
	 * Converts this section to a standardized string
	 * @param course The course of this section
	 * @param crn The CRN of this section
	 * @returns A standardized string representing this section
	 */
	function sectionString(course: string, crn: string): string {
		return `${course}/${crn}`;
	}

	/**
	 * Checks if this section of this course is locked
	 * @param course The course this section belongs to
	 * @param crn The CRN of this section
	 * @returns Whether or not this section is currently locked
	 */
	function isSectionLocked(course: string, crn: string): boolean {
		return context.courses.includes(sectionString(course, crn));
	}

	/**
	 * Toggles a section between locked (the only section of that course we consider) to unlocked
	 * @param course The course in question
	 * @param crn The section we wish to lock/unlock
	 */
	function toggleSection(course: string, crn: string): void {
		const sec_string = sectionString(course, crn);

		let filtered_courses;
		if (context.courses.includes(course)) {
			// Lock section
			filtered_courses = context.courses.filter((c) => c !== course);
			filtered_courses.push(sec_string);
		}
		else if (context.courses.includes(sec_string)) {
			// Unlock section
			filtered_courses = context.courses.filter((c) => c !== sec_string);
			filtered_courses.push(course);
		}
		else {
			console.log(context.courses);
			throw Error(`Neither section nor course was found: ${course}, ${crn}`);
		}

		context.setFormData({
			...context,
			courses: filtered_courses,
		});
	}

	return (
			isMobile ?
					<table className={styles["section-table"]}>
						<thead>
						<tr>
							<th title="A locked section will be the only section from its course used in schedules">
								Section Locked?
							</th>
							<th>Course name</th>
							<th title="How many seats are left?">Seats left</th>
						</tr>
						</thead>
						<tbody>
						{crns.map((crn) => {
							const section = sections[crn];

							const online_class = section.classType.toLowerCase() === "online";

							return (
									<tr key={section.url}>
										<td
												className={styles["section-lock"]}
												onClick={(e) =>
														toggleSection(
																`${section.subject}/${section.classId}`,
																section.crn
														)
												}
										>
											{isSectionLocked(
													`${section.subject}/${section.classId}`,
													section.crn
											)
													? LOCKED
													: UNLOCKED}
										</td>
										<td>
											{section.class} (<a href={section.url} target="_blank" rel="noreferrer">
											{crn}
										</a>) &mdash; {courses[section.class].name}
											&nbsp;
											{online_class ? <b>[Online] </b> : ""}
											{section.honors ? <b>[Honors] </b> : ""}
											<hr/>
											{section.campus ? section.campus : <i>No campus listed</i>}, <i>
											{section.profs.length > 0 ? (
													section.profs.join(", ")
											) : (
													<i>No professors listed</i>
											)}
											</i>
										</td>
										<td>
											{section.seatsRemaining}/{section.seatsCapacity}
										</td>
									</tr>
							);
						})}
						</tbody>
					</table>
					:
					<table className={styles["section-table"]}>
						<thead>
						<tr>
							<th title="A locked section will be the only section from its course used in schedules">
								Section Locked?
							</th>
							<th>CRN</th>
							<th>Course name</th>
							<th>Campus</th>
							<th>Professor(s)</th>
							<th title="How many seats are left?">Seats left</th>
						</tr>
						</thead>
						<tbody>
						{crns.map((crn) => {
							const section = sections[crn];

							const online_class = section.classType.toLowerCase() === "online";

							return (
									<tr key={section.url}>
										<td
												className={styles["section-lock"]}
												onClick={(e) =>
														toggleSection(
																`${section.subject}/${section.classId}`,
																section.crn
														)
												}
										>
											{isSectionLocked(
													`${section.subject}/${section.classId}`,
													section.crn
											)
													? LOCKED
													: UNLOCKED}
										</td>
										<td>
											<a href={section.url} target="_blank" rel="noreferrer">
												{crn}
											</a>
										</td>

										<td>
											{section.class} &mdash; {courses[section.class].name}
											&nbsp;
											{online_class ? <b>[Online] </b> : ""}
											{section.honors ? <b>[Honors] </b> : ""}
										</td>
										<td>{section.campus ? section.campus : <i>No campus listed</i>}</td>
										<td>
											{section.profs.length > 0 ? (
													section.profs.join(", ")
											) : (
													<i>No professors listed</i>
											)}
										</td>
										<td>
											{section.seatsRemaining}/{section.seatsCapacity}
										</td>
									</tr>
							);
						})}
						</tbody>
					</table>
	);
};

export default SectionsTable;
