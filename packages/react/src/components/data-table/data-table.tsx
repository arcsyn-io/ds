import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, EllipsisIcon } from "../../icons/index.js";
import { cx } from "../../utilities/cx.js";
import { Checkbox } from "../checkbox/checkbox.js";
import { DropdownMenu } from "../dropdown-menu/dropdown-menu.js";

export type DataTableSortDirection = "asc" | "desc";

export interface DataTableSort {
  columnId: string;
  direction: DataTableSortDirection;
}

export interface DataTableCellContext<T> {
  row: T;
  rowIndex: number;
  value: unknown;
}

export interface DataTableColumn<T> {
  id?: string;
  header: ReactNode;
  accessorKey?: keyof T & string;
  accessor?: (row: T) => unknown;
  cell?: (context: DataTableCellContext<T>) => ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  hideable?: boolean;
  align?: "start" | "center" | "end";
  width?: CSSProperties["width"];
  sort?: (rowA: T, rowB: T) => number;
  filter?: (row: T, query: string, value: unknown) => boolean;
}

export interface DataTableProps<T> {
  data: readonly T[];
  columns: readonly DataTableColumn<T>[];
  getRowId?: (row: T, index: number) => string;
  caption?: ReactNode;
  className?: string;
  filterPlaceholder?: string;
  emptyMessage?: ReactNode;
  rowActions?: (row: T, rowIndex: number) => ReactNode;
  rowActionsLabel?: string;
  initialSort?: DataTableSort;
  initialPageSize?: number;
  pageSizeOptions?: readonly number[];
  initialColumnVisibility?: Record<string, boolean>;
  enableRowSelection?: boolean;
  isRowSelectable?: (row: T) => boolean;
  selectedRowIds?: readonly string[];
  defaultSelectedRowIds?: readonly string[];
  onRowSelectionChange?: (rowIds: string[]) => void;
}

function getColumnId<T>(column: DataTableColumn<T>, index: number) {
  return column.id ?? column.accessorKey ?? `column-${index}`;
}

function getCellValue<T>(column: DataTableColumn<T>, row: T) {
  if (column.accessor) return column.accessor(row);
  if (column.accessorKey) return row[column.accessorKey];
  return undefined;
}

function compareValues(valueA: unknown, valueB: unknown) {
  if (valueA == null && valueB == null) return 0;
  if (valueA == null) return 1;
  if (valueB == null) return -1;
  if (typeof valueA === "number" && typeof valueB === "number") return valueA - valueB;
  if (valueA instanceof Date && valueB instanceof Date) return valueA.getTime() - valueB.getTime();
  return String(valueA).localeCompare(String(valueB), undefined, { numeric: true, sensitivity: "base" });
}

function getPaginationItems(pageCount: number, currentPage: number) {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, index) => index);

  const pages = [...new Set([0, currentPage - 1, currentPage, currentPage + 1, pageCount - 1])]
    .filter((page) => page >= 0 && page < pageCount)
    .sort((pageA, pageB) => pageA - pageB);
  const items: Array<number | string> = [];

  pages.forEach((page, index) => {
    const previousPage = pages[index - 1];
    if (previousPage !== undefined && page - previousPage > 1) items.push(`ellipsis-${previousPage}`);
    items.push(page);
  });

  return items;
}

function SelectionCheckbox({
  checked,
  indeterminate = false,
  label,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  indeterminate?: boolean;
  label: string;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ref.current) ref.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <Checkbox
      ref={ref}
      className="arcsyn-data-table__checkbox"
      checked={checked}
      disabled={disabled}
      aria-label={label}
      onChange={(event) => onChange(event.currentTarget.checked)}
    />
  );
}

export function DataTable<T>({
  data,
  columns,
  getRowId = (_row, index) => String(index),
  caption = "Tabela de dados",
  className,
  filterPlaceholder = "Filtrar resultados...",
  emptyMessage = "Nenhum resultado encontrado.",
  rowActions,
  rowActionsLabel = "Ações",
  initialSort,
  initialPageSize = 10,
  pageSizeOptions = [10, 20, 50],
  initialColumnVisibility = {},
  enableRowSelection = true,
  isRowSelectable = () => true,
  selectedRowIds,
  defaultSelectedRowIds = [],
  onRowSelectionChange,
}: DataTableProps<T>) {
  const columnEntries = useMemo(
    () => columns.map((column, index) => ({ column, id: getColumnId(column, index) })),
    [columns],
  );
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<DataTableSort | undefined>(initialSort);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>(() => initialColumnVisibility);
  const [internalSelection, setInternalSelection] = useState<Set<string>>(() => new Set(defaultSelectedRowIds));
  const selectedIds = useMemo(
    () => selectedRowIds ? new Set(selectedRowIds) : internalSelection,
    [internalSelection, selectedRowIds],
  );

  const visibleColumns = columnEntries.filter(({ id }) => columnVisibility[id] !== false);
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const processedRows = useMemo(() => {
    const filtered = normalizedQuery
      ? data.filter((row) => columnEntries.some(({ column }) => {
          if (column.filterable === false) return false;
          const value = getCellValue(column, row);
          if (column.filter) return column.filter(row, normalizedQuery, value);
          return String(value ?? "").toLocaleLowerCase().includes(normalizedQuery);
        }))
      : [...data];

    if (!sort) return filtered;
    const entry = columnEntries.find(({ id }) => id === sort.columnId);
    if (!entry) return filtered;
    const direction = sort.direction === "asc" ? 1 : -1;
    return filtered
      .map((row, index) => ({ row, index }))
      .sort((itemA, itemB) => {
        const result = entry.column.sort
          ? entry.column.sort(itemA.row, itemB.row)
          : compareValues(getCellValue(entry.column, itemA.row), getCellValue(entry.column, itemB.row));
        return result === 0 ? itemA.index - itemB.index : result * direction;
      })
      .map(({ row }) => row);
  }, [columnEntries, data, normalizedQuery, sort]);

  const pageCount = Math.max(1, Math.ceil(processedRows.length / pageSize));
  const currentPage = Math.min(pageIndex, pageCount - 1);
  const pageRows = processedRows.slice(currentPage * pageSize, currentPage * pageSize + pageSize);
  const pageRowEntries = pageRows.map((row, index) => ({
    row,
    rowIndex: currentPage * pageSize + index,
    rowId: getRowId(row, currentPage * pageSize + index),
  }));
  const selectablePageRows = pageRowEntries.filter(({ row }) => isRowSelectable(row));
  const allPageRowsSelected = selectablePageRows.length > 0 && selectablePageRows.every(({ rowId }) => selectedIds.has(rowId));
  const somePageRowsSelected = selectablePageRows.some(({ rowId }) => selectedIds.has(rowId));

  useEffect(() => {
    if (pageIndex >= pageCount) setPageIndex(pageCount - 1);
  }, [pageCount, pageIndex]);

  function updateSelection(next: Set<string>) {
    if (selectedRowIds === undefined) setInternalSelection(next);
    onRowSelectionChange?.([...next]);
  }

  function toggleSort(columnId: string) {
    setSort((current) => {
      if (current?.columnId !== columnId) return { columnId, direction: "asc" };
      if (current.direction === "asc") return { columnId, direction: "desc" };
      return undefined;
    });
    setPageIndex(0);
  }

  function setColumnVisible(columnId: string, visible: boolean) {
    setColumnVisibility((current) => ({ ...current, [columnId]: visible }));
  }

  const firstResult = processedRows.length === 0 ? 0 : currentPage * pageSize + 1;
  const lastResult = Math.min((currentPage + 1) * pageSize, processedRows.length);
  const paginationItems = getPaginationItems(pageCount, currentPage);

  return (
    <div className={cx("arcsyn-data-table", className)}>
      <div className="arcsyn-data-table__toolbar">
        <label className="arcsyn-data-table__filter">
          <span className="arcsyn-data-table__sr-only">Filtrar tabela</span>
          <input
            value={query}
            placeholder={filterPlaceholder}
            onChange={(event) => {
              setQuery(event.currentTarget.value);
              setPageIndex(0);
            }}
          />
        </label>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="arcsyn-data-table__columns-trigger" variant="outline" size="sm">
            Colunas
            <ChevronDownIcon aria-hidden size={14} />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content align="end">
            <DropdownMenu.Group>
              <DropdownMenu.Label>Colunas visíveis</DropdownMenu.Label>
              {columnEntries.filter(({ column }) => column.hideable !== false).map(({ column, id }) => {
                const checked = columnVisibility[id] !== false;
                return (
                  <DropdownMenu.CheckboxItem
                    key={id}
                    checked={checked}
                    disabled={checked && visibleColumns.length === 1}
                    onCheckedChange={(next) => setColumnVisible(id, next)}
                  >
                    {column.header}
                  </DropdownMenu.CheckboxItem>
                );
              })}
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </div>

      <div className="arcsyn-data-table__viewport">
        <table>
          <caption className="arcsyn-data-table__sr-only">{caption}</caption>
          <thead>
            <tr>
              {enableRowSelection ? (
                <th className="arcsyn-data-table__selection-cell" scope="col">
                  <SelectionCheckbox
                    checked={allPageRowsSelected}
                    indeterminate={!allPageRowsSelected && somePageRowsSelected}
                    disabled={selectablePageRows.length === 0}
                    label="Selecionar linhas desta página"
                    onChange={(checked) => {
                      const next = new Set(selectedIds);
                      selectablePageRows.forEach(({ rowId }) => checked ? next.add(rowId) : next.delete(rowId));
                      updateSelection(next);
                    }}
                  />
                </th>
              ) : null}
              {visibleColumns.map(({ column, id }) => {
                const activeSort = sort?.columnId === id ? sort.direction : undefined;
                return (
                  <th
                    key={id}
                    scope="col"
                    aria-sort={activeSort ? (activeSort === "asc" ? "ascending" : "descending") : undefined}
                    data-align={column.align}
                    style={{ width: column.width }}
                  >
                    {column.sortable ? (
                      <button className="arcsyn-data-table__sort" type="button" onClick={() => toggleSort(id)}>
                        <span>{column.header}</span>
                        <ChevronDownIcon aria-hidden size={14} data-direction={activeSort} />
                      </button>
                    ) : column.header}
                  </th>
                );
              })}
              {rowActions ? <th className="arcsyn-data-table__actions-heading" scope="col"><span className="arcsyn-data-table__sr-only">{rowActionsLabel}</span></th> : null}
            </tr>
          </thead>
          <tbody>
            {pageRowEntries.length ? pageRowEntries.map(({ row, rowId, rowIndex }) => {
              const selected = selectedIds.has(rowId);
              const selectable = isRowSelectable(row);
              return (
                <tr key={rowId} data-selected={selected || undefined}>
                  {enableRowSelection ? (
                    <td className="arcsyn-data-table__selection-cell">
                      <SelectionCheckbox
                        checked={selected}
                        disabled={!selectable}
                        label={`Selecionar linha ${rowIndex + 1}`}
                        onChange={(checked) => {
                          const next = new Set(selectedIds);
                          if (checked) next.add(rowId);
                          else next.delete(rowId);
                          updateSelection(next);
                        }}
                      />
                    </td>
                  ) : null}
                  {visibleColumns.map(({ column, id }) => {
                    const value = getCellValue(column, row);
                    return (
                      <td key={id} data-align={column.align}>
                        {column.cell ? column.cell({ row, rowIndex, value }) : value as ReactNode}
                      </td>
                    );
                  })}
                  {rowActions ? <td className="arcsyn-data-table__actions">{rowActions(row, rowIndex)}</td> : null}
                </tr>
              );
            }) : (
              <tr>
                <td className="arcsyn-data-table__empty" colSpan={visibleColumns.length + (enableRowSelection ? 1 : 0) + (rowActions ? 1 : 0)}>
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="arcsyn-data-table__footer">
        <span className="arcsyn-data-table__status" aria-live="polite">
          {selectedIds.size > 0 ? `${selectedIds.size} selecionada${selectedIds.size === 1 ? "" : "s"} · ` : ""}
          {firstResult}–{lastResult} de {processedRows.length}
        </span>
        <label className="arcsyn-data-table__page-size">
          <span>Linhas por página</span>
          <select
            value={pageSize}
            onChange={(event) => {
              setPageSize(Number(event.currentTarget.value));
              setPageIndex(0);
            }}
          >
            {[...new Set([...pageSizeOptions, initialPageSize])].sort((a, b) => a - b).map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <div className="arcsyn-data-table__pagination" aria-label="Paginação">
          <button type="button" disabled={currentPage === 0} aria-label="Página anterior" onClick={() => setPageIndex((current) => Math.max(0, current - 1))}>
            <ArrowLeftIcon aria-hidden size={14} />
            <span>Anterior</span>
          </button>
          {paginationItems.map((item) => typeof item === "number" ? (
            <button
              key={item}
              type="button"
              aria-label={`Ir para a página ${item + 1}`}
              aria-current={currentPage === item ? "page" : undefined}
              data-active={currentPage === item || undefined}
              onClick={() => setPageIndex(item)}
            >
              {item + 1}
            </button>
          ) : (
            <span className="arcsyn-data-table__pagination-ellipsis" key={item} aria-hidden="true">
              <EllipsisIcon size={14} />
            </span>
          ))}
          <button type="button" disabled={currentPage >= pageCount - 1} aria-label="Próxima página" onClick={() => setPageIndex((current) => Math.min(pageCount - 1, current + 1))}>
            <span>Próxima</span>
            <ArrowRightIcon aria-hidden size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
