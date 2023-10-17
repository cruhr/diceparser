type DiceResult = {
    die: string;
    result: number;
};
type Options = {
    separator: string;
    defaultFaces: number;
};
export declare const rollDice: (str?: string, { separator, defaultFaces }?: Partial<Options>) => {
    sum: number;
    dice: DiceResult[];
};
export {};
