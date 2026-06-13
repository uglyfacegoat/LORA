export type Product = "website" | "app" | "crm";
export type Tier = "min" | "mid" | "max" | "custom";
export type PricingVariant = "home" | "page";

export type TierView = {
  key: Tier;
  label: string;
  price: string;
  note: string;
  for: string;
  value: string;
  features: string[];
};

export type PricingProductView = {
  key: Product;
  label: string;
  summary: string;
};

export type StandaloneProductView = {
  label: string;
  price: string;
  badge: string;
  features: string[];
};

type Translate = (key: string) => string;

export function getWebsiteTiers(t: Translate): TierView[] {
  return getPricingTiers(t, "website", false);
}

export function getPricingProducts(t: Translate): PricingProductView[] {
  return [
    { key: "website", label: t("pricing.product.website"), summary: t("pricing.product.website.summary") },
    { key: "app", label: t("pricing.product.app"), summary: t("pricing.product.app.summary") },
    { key: "crm", label: t("pricing.product.crm"), summary: t("pricing.product.crm.summary") },
  ];
}

export function getPricingTiers(t: Translate, product: Product, includeFullFeatureSet = true): TierView[] {
  const midFeatures = [
    t(`pricing.${product}.mid.f1`),
    t(`pricing.${product}.mid.f2`),
    t(`pricing.${product}.mid.f3`),
    t(`pricing.${product}.mid.f4`),
  ];
  const maxFeatures = [
    t(`pricing.${product}.max.f1`),
    t(`pricing.${product}.max.f2`),
    t(`pricing.${product}.max.f3`),
    t(`pricing.${product}.max.f4`),
  ];

  if (includeFullFeatureSet) {
    midFeatures.push(t(`pricing.${product}.mid.f5`));
    maxFeatures.push(t(`pricing.${product}.max.f5`), t(`pricing.${product}.max.f6`));
  }

  return [
    {
      key: "min",
      label: t("pricing.tier.min"),
      price: t(`pricing.${product}.min.price`),
      note: t("pricing.fromNote"),
      for: t("pricing.tier.min.for"),
      value: t("pricing.tier.min.value"),
      features: [
        t(`pricing.${product}.min.f1`),
        t(`pricing.${product}.min.f2`),
        t(`pricing.${product}.min.f3`),
        t(`pricing.${product}.min.f4`),
      ],
    },
    {
      key: "mid",
      label: t("pricing.tier.mid"),
      price: t(`pricing.${product}.mid.price`),
      note: t("pricing.fromNote"),
      for: t("pricing.tier.mid.for"),
      value: t("pricing.tier.mid.value"),
      features: midFeatures,
    },
    {
      key: "max",
      label: t("pricing.tier.max"),
      price: t(`pricing.${product}.max.price`),
      note: t("pricing.fromNote"),
      for: t("pricing.tier.max.for"),
      value: t("pricing.tier.max.value"),
      features: maxFeatures,
    },
    {
      key: "custom",
      label: t("pricing.tier.custom"),
      price: t(`pricing.${product}.custom.price`),
      note: t("pricing.custom.note"),
      for: t("pricing.tier.custom.for"),
      value: t("pricing.tier.custom.value"),
      features: [t("pricing.custom.f1"), t("pricing.custom.f2"), t("pricing.custom.f3"), t("pricing.custom.f4")],
    },
  ];
}

export function getStandaloneProducts(t: Translate): StandaloneProductView[] {
  return [
    {
      label: t("pricing.audit.label"),
      price: t("pricing.audit.price"),
      badge: t("pricing.fixed"),
      features: [t("pricing.audit.f1"), t("pricing.audit.f2"), t("pricing.audit.f3")],
    },
    {
      label: t("pricing.hosting.label"),
      price: t("pricing.hosting.price"),
      badge: t("pricing.monthly"),
      features: [t("pricing.hosting.f1"), t("pricing.hosting.f2"), t("pricing.hosting.f3")],
    },
  ];
}
