# Changelog

## Unreleased

### Added

- `@arcsyn/presentations` with an AI-ready brief schema, editorial layouts, narrative patterns, visual theme and editable PowerPoint, HTML slide and continuous technical-proposal templates.
- `StatCard`, `LineChart`, `BarChart`, `Sparkline`, `ChartLegend` and `ChartTooltip`.
- `PageHeader`, `SearchInput`, `StatusIndicator`, `ActivityFeed`, `UserMenu` and `DataState`.
- Composed `Chat` with message delivery states, typing indicator and an accessible composer, plus a React Native adapter.
- `NotificationCenter` with unread count, a five-item popover and a React Native modal adapter.
- `Command` and `Command.Dialog` with filtering, keyboard navigation, shortcuts and a React Native modal adapter.
- `Slider` with single and range values, marks, horizontal and vertical orientations, and React Native parity.
- `DatePicker` with focus-open behavior that preserves the typing cursor, typed dates, direct month navigation, ISO values, keyboard calendar navigation, validation states and a React Native modal adapter.
- Composed `Card` anatomy while preserving the existing root API.
- Data state support in `DataTable`.
- Dashboard, application, deployment, monitoring, account, notification, filtering and action icons in both adapters.
- `ChevronUpIcon` for compact incremental controls.
- `Select.Content.positionerClassName` for nested overlay composition.

### Icon policy

Public icon names use a stable semantic name with the `Icon` suffix and re-export Lucide without copying SVG source. New aliases are added only when the ArcSyn meaning is clearer than the upstream name. Deprecations remain exported for at least one minor release and are announced here before removal.
