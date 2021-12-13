import { countOnes } from "../parseSection";


describe('countOnes', () => {
  it('no ones', () => {
    expect(countOnes(0b0)).toBe(0);
    expect(countOnes(0b00)).toBe(0);
    expect(countOnes(0b000)).toBe(0);
    expect(countOnes(0b0000)).toBe(0);
    expect(countOnes(0b0000_00)).toBe(0);
  });

  it('all ones', () => {
    expect(countOnes(0b1)).toBe(1);
    expect(countOnes(0b11)).toBe(2);
    expect(countOnes(0b111)).toBe(3);
    expect(countOnes(0b1111)).toBe(4);
    expect(countOnes(0b1111_11)).toBe(6);
  });

  it('mixed', () => {
    expect(countOnes(0b0101_1110)).toBe(5);
    expect(countOnes(0b000_0111)).toBe(3);
    expect(countOnes(0b1111_0000)).toBe(4);
    expect(countOnes(0b1000_0001)).toBe(2);
    expect(countOnes(0b1010_1010)).toBe(4);
    expect(countOnes(0b0110_0110)).toBe(4);
  });

  it('test mutation', () => {
    let n = 0b111;
    expect(countOnes(n)).toBe(3);
    expect(n).toBe(0b111);
    
    const m = 0b0101;
    expect(countOnes(m)).toBe(2);
    expect(m).toBe(0b0101);
  });
})