// Keeps track of all the classes the user has added
var USER_SECTIONS: { [key: string]: Section } = {};


//////////////////////////////////////////////////
////////    Dealing with USER_SECTIONS     ////////
//////////////////////////////////////////////////


/*
A single Section.
*/
class Section {
	// Class variables
	crn: string;
	courseName: string;
	content: { [key: string]: any };
	// Constructor
	constructor(crn: string, courseName: string, content: {[key: string]: any}) {
		this.crn = crn;
		this.courseName = courseName;
		this.content = content;
	}
	alreadySaved(sectionCrn: string): boolean {
		return this.crn in USER_SECTIONS;
	}
}


/*
Removes a section which has already been gotten
	- sectionCrn (String): The CRN of the section
	- @return (void)
*/
function removeSavedSection(sectionCrn: string): void {
	delete USER_SECTIONS[sectionCrn];
}


/*
Gets the section data from a section which has already been added
	- sectionCrn (String): The CRN of the section
	- @return (Section): The section
	- @throws If the section has not been added yet
*/
function getSavedSection(sectionCrn: string): Section {
	try {
		return USER_SECTIONS[sectionCrn];
	}
	catch (err) {
		throw new Error("Class has not yet been added");
	}
}


/*
Adds a new Section
	- section (Section): The section which we're adding to the dictionary
	- @return (void)
*/
function saveSection(section: Section): void {
	USER_SECTIONS[section.crn] = section;
}