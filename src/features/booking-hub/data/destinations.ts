export type DestinationItem = {
  label: string;
  href?: boolean;
  goHotel?: boolean;
  children?: DestinationItem[];
};

export type DestinationRegion = {
  label: string;
  items: DestinationItem[];
};

export const DESTINATION_REGIONS: DestinationRegion[] = [
  { label: "Asia", items: [
    { label: "Thailand", children: [{ label: "Bangkok", goHotel: true }] },
    { label: "Bali", href: true }, { label: "India", href: true }, { label: "Sri Lanka", href: true },
  ]},
  { label: "Caribbean & Central America", items: [
    { label: "Jamaica", href: true }, { label: "St. Lucia", href: true }, { label: "Costa Rica", href: true },
  ]},
  { label: "Europe", items: [
    { label: "France", children: [{ label: "Paris", href: true }] },
    { label: "Italy", href: true },
    { label: "UK", children: [{ label: "London", href: true }] },
  ]},
  { label: "Mexico", items: [{ label: "Zihuatanejo", href: true }, { label: "Tulum", href: true }] },
  { label: "Nordic Region", items: [{ label: "Iceland", href: true }, { label: "Norway", href: true }] },
  { label: "US + Canada", items: [
    { label: "USA", children: [
      { label: "Los Angeles", href: true }, { label: "Sonoma + Napa", href: true }, { label: "Pacific Northwest", href: true },
    ]},
    { label: "Canada", href: true },
  ]},
];

export const DESTINATIONS = DESTINATION_REGIONS.flatMap((region) =>
  region.items.flatMap((item) => item.children?.map((child) => ({ name: `${child.label}, ${item.label}`, built: !!child.goHotel })) ?? [{ name: item.label, built: !!item.goHotel }]),
);
