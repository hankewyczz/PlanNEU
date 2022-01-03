import { nestedArrayEquality } from "../global"

test("Testing nestedArrayEquality", () => {
    nestedArrayEquality([['a'], ['b'], ['c']], [['b'], ['c'], ['a']])
    nestedArrayEquality([['a']], [['a']])
})