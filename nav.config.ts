import { Home, Users, CreditCard, Settings, Package } from "lucide-react";

export type NavItem = {
  id: string;
  label: string;
  href: string;
  // icon: React.ElementType;
};
export type NavBox = {
  title: string;
  items?: NavItem[];
};
type Role = "LEAD" | "CALLER" | "TEAM" | "OTHER";

export const navByRole: Record<Role, NavBox[]> = {
  LEAD: [
    {
      title: "Listings",
      items: [
        { id: "all", href: "/listings", label: "All" },
        { id: "autotrader", href: "/listings/autotrader", label: "Autotrader" },
        { id: "kijiji", href: "/listings/kijiji", label: "Kijiji" },
        {
          id: "marketplace",
          href: "/listings/marketplace",
          label: "Marketplace",
        },
      ],
    },
    {
      title: "Sheets",
      items: [
        {
          id: "leadsSheet",
          label: "Leads",
          href: "/sheet-leads",
        },
        {
          id: "sheets",
          label: "Callers Sheet",
          href: "/sheet-dabou",
        },
      ],
    },
    {
      title: "VIN",
      items: [
        {
          id: "vin-decoder",
          href: "/vin-decoder",
          label: "Vin Decoder",
        },
      ],
    },
  ],
  CALLER: [
    {
      title: "Listings",
      items: [
        { id: "all", href: "/listings", label: "All" },
        { id: "autotrader", href: "/listings/autotrader", label: "Autotrader" },
        { id: "kijiji", href: "/listings/kijiji", label: "Kijiji" },
        {
          id: "marketplace",
          href: "/listings/marketplace",
          label: "Marketplace",
        },
      ],
    },
    {
      title: "Sheets",
      items: [
        {
          id: "callerSheet",
          label: "Caller Sheet",
          href: "/sheet-dabou",
        },
      ],
    },
    {
      title: "VIN",
      items: [
        {
          id: "vin-decoder",
          href: "/vin-decoder",
          label: "Vin Decoder",
        },
      ],
    },
  ],
  TEAM: [
    {
      title: "Listings",
      items: [
        { id: "all", href: "/listings", label: "All" },
        { id: "autotrader", href: "/listings/autotrader", label: "Autotrader" },
        { id: "kijiji", href: "/listings/kijiji", label: "Kijiji" },
        {
          id: "marketplace",
          href: "/listings/marketplace",
          label: "Marketplace",
        },
      ],
    },
    {
      title: "VIN",
      items: [
        {
          id: "vin-decoder",
          href: "/vin-decoder",
          label: "Vin Decoder",
        },
      ],
    },
  ],
  OTHER: [
    {
      title: "Listings",
      items: [
        { id: "all", href: "/listings", label: "All" },
        { id: "autotrader", href: "/listings/autotrader", label: "Autotrader" },
        { id: "kijiji", href: "/listings/kijiji", label: "Kijiji" },
        {
          id: "marketplace",
          href: "/listings/marketplace",
          label: "Marketplace",
        },
      ],
    },
    {
      title: "VIN",
      items: [
        {
          id: "vin-decoder",
          href: "/vin-decoder",
          label: "Vin Decoder",
        },
      ],
    },
  ],
};
