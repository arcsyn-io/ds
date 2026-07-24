# Changelog

## Unreleased

### Added

- `StatCard`, `LineChart`, `BarChart`, `Sparkline`, `ChartLegend` and `ChartTooltip`.
- `PageHeader`, `SearchInput`, `StatusIndicator`, `ActivityFeed`, `UserMenu` and `DataState`.
- Composed `Card` anatomy while preserving the existing root API.
- Data state support in `DataTable`.
- Dashboard, application, deployment, monitoring, account, notification, filtering and action icons in both adapters.

### Icon policy

Public icon names use a stable semantic name with the `Icon` suffix and re-export Lucide without copying SVG source. New aliases are added only when the ArcSyn meaning is clearer than the upstream name. Deprecations remain exported for at least one minor release and are announced here before removal.
