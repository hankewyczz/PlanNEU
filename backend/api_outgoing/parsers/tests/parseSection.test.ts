import { isParsedSection } from "../../../types/types";
import { minifySection, parseSection } from "../parseSection";
import sections from "./data/sections.data";

describe("Parse sections", () => {
  test("Sections parse properly", () => {
    // Algo
    expect(parseSection(sections.cs3000_202210_1())).toMatchObject(
      sections.cs3000_202210_1_parsed()
    );
    expect(parseSection(sections.cs3000_202210_2())).toMatchObject(
      sections.cs3000_202210_2_parsed()
    );
    expect(parseSection(sections.cs3000_202210_3())).toMatchObject(
      sections.cs3000_202210_3_parsed()
    );
    // Theory of comp
    expect(parseSection(sections.cs3800_202210_1())).toMatchObject(
      sections.cs3800_202210_1_parsed()
    );
    expect(parseSection(sections.cs3800_202210_2())).toMatchObject(
      sections.cs3800_202210_2_parsed()
    );
    // Algo recitation
    expect(parseSection(sections.cs3001_202210_1())).toMatchObject(
      sections.cs3001_202210_1_parsed()
    );
    expect(parseSection(sections.cs3001_202210_2())).toMatchObject(
      sections.cs3001_202210_2_parsed()
    );
    expect(parseSection(sections.cs3001_202210_3())).toMatchObject(
      sections.cs3001_202210_3_parsed()
    );
    expect(parseSection(sections.cs3001_202210_4())).toMatchObject(
      sections.cs3001_202210_4_parsed()
    );
    expect(parseSection(sections.cs3001_202210_5())).toMatchObject(
      sections.cs3001_202210_5_parsed()
    );
    expect(parseSection(sections.cs3001_202210_6())).toMatchObject(
      sections.cs3001_202210_6_parsed()
    );
    expect(parseSection(sections.cs3001_202210_7())).toMatchObject(
      sections.cs3001_202210_7_parsed()
    );
    expect(parseSection(sections.cs3001_202210_8())).toMatchObject(
      sections.cs3001_202210_8_parsed()
    );
    expect(parseSection(sections.cs3001_202210_9())).toMatchObject(
      sections.cs3001_202210_9_parsed()
    );
    // Logic and comp
    expect(parseSection(sections.cs2800_202210_1())).toMatchObject(
      sections.cs2800_202210_1_parsed()
    );
    expect(parseSection(sections.cs2800_202210_2())).toMatchObject(
      sections.cs2800_202210_2_parsed()
    );
    expect(parseSection(sections.cs2800_202210_3())).toMatchObject(
      sections.cs2800_202210_3_parsed()
    );
    // Logic and comp lab
    expect(parseSection(sections.cs2801_202210_1())).toMatchObject(
      sections.cs2801_202210_1_parsed()
    );
    expect(parseSection(sections.cs2801_202210_2())).toMatchObject(
      sections.cs2801_202210_2_parsed()
    );
    expect(parseSection(sections.cs2801_202210_3())).toMatchObject(
      sections.cs2801_202210_3_parsed()
    );
    expect(parseSection(sections.cs2801_202210_4())).toMatchObject(
      sections.cs2801_202210_4_parsed()
    );

    // fundamentals of digital design lab
    expect(parseSection(sections.eece2323_202210_1())).toMatchObject(
      sections.eece2323_202210_1_parsed()
    );
    expect(parseSection(sections.eece2323_202210_2())).toMatchObject(
      sections.eece2323_202210_2_parsed()
    );
    expect(parseSection(sections.eece2323_202210_3())).toMatchObject(
      sections.eece2323_202210_3_parsed()
    );
    expect(parseSection(sections.eece2323_202210_4())).toMatchObject(
      sections.eece2323_202210_4_parsed()
    );
    expect(parseSection(sections.eece2323_202210_5())).toMatchObject(
      sections.eece2323_202210_5_parsed()
    );
    expect(parseSection(sections.eece2323_202210_6())).toMatchObject(
      sections.eece2323_202210_6_parsed()
    );
    expect(parseSection(sections.eece2323_202210_7())).toMatchObject(
      sections.eece2323_202210_7_parsed()
    );

    // fundamentals of digital design
    expect(parseSection(sections.eece2322_202210_1())).toMatchObject(
      sections.eece2322_202210_1_parsed()
    );
    expect(parseSection(sections.eece2322_202210_2())).toMatchObject(
      sections.eece2322_202210_2_parsed()
    );
    expect(parseSection(sections.eece2322_202210_3())).toMatchObject(
      sections.eece2322_202210_3_parsed()
    );
    expect(parseSection(sections.eece2322_202210_4())).toMatchObject(
      sections.eece2322_202210_4_parsed()
    );
    expect(parseSection(sections.eece2322_202210_5())).toMatchObject(
      sections.eece2322_202210_5_parsed()
    );
    expect(parseSection(sections.cs4850_202210_1())).toMatchObject(
      sections.cs4850_202210_1_parsed()
    );
  });

  test("Minimal sections", () => {
    // Algo
    expect(minifySection(sections.cs3000_202210_1_parsed())).toMatchObject(
      sections.cs3000_202210_1_minimal
    );
    expect(minifySection(sections.cs3000_202210_2_parsed())).toMatchObject(
      sections.cs3000_202210_2_minimal
    );
    expect(minifySection(sections.cs3000_202210_3_parsed())).toMatchObject(
      sections.cs3000_202210_3_minimal
    );
    // Theory of comp
    expect(minifySection(sections.cs3800_202210_1_parsed())).toMatchObject(
      sections.cs3800_202210_1_minimal
    );
    expect(minifySection(sections.cs3800_202210_2_parsed())).toMatchObject(
      sections.cs3800_202210_2_minimal
    );
    // Algo recitation
    expect(minifySection(sections.cs3001_202210_1_parsed())).toMatchObject(
      sections.cs3001_202210_1_minimal
    );
    expect(minifySection(sections.cs3001_202210_2_parsed())).toMatchObject(
      sections.cs3001_202210_2_minimal
    );
    expect(minifySection(sections.cs3001_202210_3_parsed())).toMatchObject(
      sections.cs3001_202210_3_minimal
    );
    expect(minifySection(sections.cs3001_202210_4_parsed())).toMatchObject(
      sections.cs3001_202210_4_minimal
    );
    expect(minifySection(sections.cs3001_202210_5_parsed())).toMatchObject(
      sections.cs3001_202210_5_minimal
    );
    expect(minifySection(sections.cs3001_202210_6_parsed())).toMatchObject(
      sections.cs3001_202210_6_minimal
    );
    expect(minifySection(sections.cs3001_202210_7_parsed())).toMatchObject(
      sections.cs3001_202210_7_minimal
    );
    expect(minifySection(sections.cs3001_202210_8_parsed())).toMatchObject(
      sections.cs3001_202210_8_minimal
    );
    expect(minifySection(sections.cs3001_202210_9_parsed())).toMatchObject(
      sections.cs3001_202210_9_minimal
    );

    // Logic and comp
    expect(minifySection(sections.cs2800_202210_1_parsed())).toMatchObject(
      sections.cs2800_202210_1_minimal
    );
    expect(minifySection(sections.cs2800_202210_2_parsed())).toMatchObject(
      sections.cs2800_202210_2_minimal
    );
    expect(minifySection(sections.cs2800_202210_3_parsed())).toMatchObject(
      sections.cs2800_202210_3_minimal
    );

    // Logic and comp lab
    expect(minifySection(sections.cs2801_202210_1_parsed())).toMatchObject(
      sections.cs2801_202210_1_minimal
    );
    expect(minifySection(sections.cs2801_202210_2_parsed())).toMatchObject(
      sections.cs2801_202210_2_minimal
    );
    expect(minifySection(sections.cs2801_202210_3_parsed())).toMatchObject(
      sections.cs2801_202210_3_minimal
    );
    expect(minifySection(sections.cs2801_202210_4_parsed())).toMatchObject(
      sections.cs2801_202210_4_minimal
    );

    // fundamentals of digital design lab
    expect(minifySection(sections.eece2323_202210_1_parsed())).toMatchObject(
      sections.eece2323_202210_1_minimal
    );
    expect(minifySection(sections.eece2323_202210_2_parsed())).toMatchObject(
      sections.eece2323_202210_2_minimal
    );
    expect(minifySection(sections.eece2323_202210_3_parsed())).toMatchObject(
      sections.eece2323_202210_3_minimal
    );
    expect(minifySection(sections.eece2323_202210_4_parsed())).toMatchObject(
      sections.eece2323_202210_4_minimal
    );
    expect(minifySection(sections.eece2323_202210_5_parsed())).toMatchObject(
      sections.eece2323_202210_5_minimal
    );
    expect(minifySection(sections.eece2323_202210_6_parsed())).toMatchObject(
      sections.eece2323_202210_6_minimal
    );
    expect(minifySection(sections.eece2323_202210_7_parsed())).toMatchObject(
      sections.eece2323_202210_7_minimal
    );

    // fundamentals of digital design
    expect(minifySection(sections.eece2322_202210_1_parsed())).toMatchObject(
      sections.eece2322_202210_1_minimal
    );
    expect(minifySection(sections.eece2322_202210_2_parsed())).toMatchObject(
      sections.eece2322_202210_2_minimal
    );
    expect(minifySection(sections.eece2322_202210_3_parsed())).toMatchObject(
      sections.eece2322_202210_3_minimal
    );
    expect(minifySection(sections.eece2322_202210_4_parsed())).toMatchObject(
      sections.eece2322_202210_4_minimal
    );
    expect(minifySection(sections.eece2322_202210_5_parsed())).toMatchObject(
      sections.eece2322_202210_5_minimal
    );
  });

  test("Type checks", () => {
    expect(isParsedSection(sections.eece2322_202210_5_parsed())).toBeTruthy();
    expect(isParsedSection(sections.cs2800_202210_2_parsed())).toBeTruthy();
    expect(isParsedSection(sections.cs3001_202210_1_parsed())).toBeTruthy();

    expect(isParsedSection(sections.eece2322_202210_5())).toBeFalsy();
    expect(isParsedSection(sections.cs2800_202210_2())).toBeFalsy();
    expect(isParsedSection(sections.cs3001_202210_1())).toBeFalsy();
    expect(isParsedSection(sections.cs3001_202210_1_minimal)).toBeFalsy();
  });
});
