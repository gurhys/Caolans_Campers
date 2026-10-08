export type VanSize = "small" | "medium" | "large";

export type SkyKey =
  | "fan" | "toiletvent"
  | "largesky" | "smallsky"
  | "smallwin" | "largewin";

export const VAN_SCALE: Record<VanSize, number> = {
  small:  0.85,
  medium: 1.0,
  large:  1.2,
};

// Material cost ranges [min, max] in €
export const COSTS = {
  power: {
    light:     [200,  500] as [number, number],
    charge:    [150,  300] as [number, number],
    battery:   [400, 1200] as [number, number],
    solar:     [500, 1500] as [number, number],
    induction: [300,  800] as [number, number],
    gas:       [150,  450] as [number, number],
    mains:     [300,  700] as [number, number],
  },
  heat: {
    insulation: [500, 1200] as [number, number],
    diesel:    [1000, 2500] as [number, number],
    hotwater:   [600, 1500] as [number, number],
  },
  sky: {
    fan:        [300,  600] as [number, number],
    toiletvent: [150,  300] as [number, number],
    largesky:   [450,  800] as [number, number],
    smallsky:   [280,  500] as [number, number],
    smallwin:   [200,  400] as [number, number],
    largewin:   [300,  600] as [number, number],
  },
  water: {
    sink:     [400,  800] as [number, number],
    toilet:   [500,  900] as [number, number],
    shower:   [900, 1800] as [number, number],
    wetroom:  [600, 1200] as [number, number],
    external: [150,  300] as [number, number],
  },
  layout: {
    dbed:     [ 900, 1800] as [number, number],
    sbed:     [ 500,  900] as [number, number],
    couch:    [ 600, 1200] as [number, number],
    kitchen:  [1200, 2800] as [number, number],
    garage:   [ 300,  700] as [number, number],
    bathroom: [ 800, 1800] as [number, number],
    desk:     [ 400,  900] as [number, number],
    storage:  [ 500, 1200] as [number, number],
    finish:   [ 800, 2000] as [number, number],
  },
};

// Build time ranges [min, max] in days
export const TIME: Record<string, [number, number]> = {
  // Power
  light:     [1,   1],
  charge:    [0.5, 1],
  battery:   [1,   2],
  solar:     [2,   4],
  induction: [1,   2],
  gas:       [1,   1],
  mains:     [1,   2],
  // Heating
  insulation: [2, 4],
  diesel:     [2, 4],
  hotwater:   [2, 4],
  // Skylights
  fan:        [1, 2],
  toiletvent: [1, 1],
  largesky:   [1, 2],
  smallsky:   [1, 1],
  smallwin:   [1, 1],
  largewin:   [1, 2],
  // Water
  sink:     [2, 3],
  toilet:   [1, 1],
  shower:   [2, 4],
  wetroom:  [2, 4],
  external: [1, 1],
  // Layout
  dbed:     [2,  4],
  sbed:     [2,  2],
  couch:    [2,  2],
  kitchen:  [4,  6],
  garage:   [1,  2],
  bathroom: [4,  6],
  desk:     [1,  2],
  storage:  [2,  2],
  finish:   [6, 10],
  // Van prep (additional days for size)
  vanSmall:  [0, 0],
  vanMedium: [2, 4],
  vanLarge:  [4, 6],
};

export interface Slot {
  id:   string;
  week: string;
  day:  string;
  time: string;
}

export const SLOTS: Slot[] = [
  { id: "mon16-am", week: "Week of 16 June", day: "Mon 16", time: "10:00am" },
  { id: "mon16-pm", week: "Week of 16 June", day: "Mon 16", time: "2:00pm"  },
  { id: "tue17-am", week: "Week of 16 June", day: "Tue 17", time: "11:00am" },
  { id: "wed18-am", week: "Week of 16 June", day: "Wed 18", time: "10:00am" },
  { id: "wed18-pm", week: "Week of 16 June", day: "Wed 18", time: "4:00pm"  },
  { id: "thu19-am", week: "Week of 16 June", day: "Thu 19", time: "9:00am"  },
  { id: "fri20-am", week: "Week of 16 June", day: "Fri 20", time: "11:00am" },
  { id: "fri20-pm", week: "Week of 16 June", day: "Fri 20", time: "3:00pm"  },
  { id: "mon23-am", week: "Week of 23 June", day: "Mon 23", time: "10:00am" },
  { id: "tue24-pm", week: "Week of 23 June", day: "Tue 24", time: "2:00pm"  },
  { id: "wed25-am", week: "Week of 23 June", day: "Wed 25", time: "11:00am" },
  { id: "thu26-am", week: "Week of 23 June", day: "Thu 26", time: "10:00am" },
  { id: "thu26-pm", week: "Week of 23 June", day: "Thu 26", time: "3:00pm"  },
  { id: "fri27-am", week: "Week of 23 June", day: "Fri 27", time: "9:00am"  },
];
