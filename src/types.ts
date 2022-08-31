export type Supplier<SUPPLY> = () => SUPPLY;
export type Consumer<CONSUMABLE> = (consumable: CONSUMABLE) => void;