import { cn } from "../../../shared/utils/cn"
import { Eye, Edit, Trash2 } from "lucide-react"
import type { FinancialDataListTypes } from "../pages/MovementsRegisterPage"
import { EXPENSE_CATEGORIES, GET_MONEY_METHOD_CATEGORIES, INCOME_CATEGORIES } from "../../../shared/constants/constants"
import { useState } from "react"

interface MovementListProps {
  movements: FinancialDataListTypes[] | undefined
  onViewDetails?: (movement: FinancialDataListTypes) => void
  onEdit?: (movement: FinancialDataListTypes) => void
  onDelete?: (id: string) => void
}

export const MovementList = ({
  movements,
  onViewDetails,
  onEdit,
  onDelete,
}: MovementListProps) => {
  const [visibleCount, setVisibleCount] = useState<number>(10)

  if (!movements || movements.length === 0) {
    return (
      <div className="w-full p-8 text-center text-secondary-light/80 dark:text-neutral-dark/80">
        No hay movimientos registrados todavía.
      </div>
    )
  }

  const visibleMovements = movements.slice(0, visibleCount)
  const hasMoreItems = visibleCount < movements.length

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10)
  }

  return (
    <>
      {}
      <div className="w-full space-y-4">
        <h3 className="text-lg font-semibold px-2">Historial de Movimientos</h3>

        {/* MOBILE VIEW: VERTICALLY STACKED CARDS */}
        <div className="block md:hidden space-y-3">
          {visibleMovements.map((item) => (
            <div
              key={item.id}
              className={cn(
                "p-4",
                "border border-neutral-light/80 dark:border-neutral-dark/30 rounded-xl",
                "shadow-sm flex flex-col gap-2"
              )}
            >
              <div className="flex justify-between items-center">
                <span className="font-semibold capitalize text-sm text-secondary-light dark:text-neutral-dark">
                  {
                    EXPENSE_CATEGORIES.find(expenseItem => expenseItem.value === item.category)?.label ||
                    INCOME_CATEGORIES.find(incomeItem => incomeItem.value === item.category)?.label
                  }
                </span>
                <span
                  className={cn(
                    "font-bold text-base font-Geist-Mono",
                    item.movement_type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  )}
                >
                  {item.movement_type === "income" ? "+" : "-"}$
                  {item.amount.toFixed(2)}
                </span>
              </div>

              <p className="text-xs text-secondary-light/80 dark:text-neutral-dark/80 line-clamp-2">
                {item.description || "Sin descripción"}
              </p>

              <div className="flex justify-between items-center text-xs text-secondary-light/60 dark:text-neutral-dark/60 mt-2 pt-2 border-t border-t-secondary-light/20 dark:border-t-neutral-dark/20">
                <span>Fecha: {item.movement_date}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onViewDetails(item)}
                    title="Ver detalles"
                    className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-md transition-colors"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    onClick={() => onEdit(item)}
                    title="Editar"
                    className="p-1.5 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950/40 rounded-md transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(item.id)}
                    title="Eliminar"
                    className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* TABLET AND DESKTOP VIEW: TRADITIONAL STRUCTURED TABLE */}
        <div className="hidden md:block overflow-x-auto border border-secondary-light/50 dark:border-neutral-dark/40 rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-light/40 dark:bg-primary-dark/30 text-xs uppercase font-semibold text-secondary-light dark:text-neutral-dark/80 border-b border-neutral-light/50 dark:border-neutral-dark/30">
                <th className="p-3.5">Fecha</th>
                <th className="p-3.5">Categoría</th>
                <th className="p-3.5">Descripción</th>
                <th className="p-3.5">Método</th>
                <th className="p-3.5">Monto</th>
                <th className="p-3.5 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary-light/30 dark:divide-neutral-dark/30 text-sm">
              {visibleMovements.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-neutral-light/50 dark:hover:bg-primary-dark/50 transition-colors"
                >
                  <td className="p-3.5 text-secondary-light/70 dark:text-neutral-dark/70">
                    {item.movement_date}
                  </td>
                  <td className="p-3.5 font-medium capitalize">
                    {
                      EXPENSE_CATEGORIES.find(expenseItem => expenseItem.value === item.category)?.label ||
                      INCOME_CATEGORIES.find(incomeItem => incomeItem.value === item.category)?.label
                    }
                  </td>
                  <td className="p-3.5 text-secondary-light/80 dark:text-neutral-light max-w-xs truncate">
                    {item.description || "-"}
                  </td>
                  <td className="p-3.5 capitalize text-secondary-light/80 dark:text-neutral-light">
                    {
                      GET_MONEY_METHOD_CATEGORIES.find(metItem => metItem.value === item.payment_method)?.label
                      || "-"
                    }
                  </td>
                  <td
                    className={cn(
                      "p-3.5 font-bold",
                      item.movement_type === "income"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                    )}
                  >
                    {item.movement_type === "income" ? "+" : "-"}$
                    {item.amount.toFixed(2)}
                  </td>
                  <td className="p-3.5">
                    <div className="flex justify-center items-center gap-1.5">
                      <button
                        onClick={() => onViewDetails(item)}
                        title="Ver detalles"
                        className="cursor-pointer p-1.5 text-blue-500 hover:bg-blue-300 dark:hover:bg-blue-950 rounded-md transition-colors"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => onEdit(item)}
                        title="Editar"
                        className="cursor-pointer p-1.5 text-yellow-500 hover:bg-yellow-200 dark:hover:bg-yellow-950 rounded-md transition-colors"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => onDelete(item.id)}
                        title="Eliminar"
                        className="cursor-pointer p-1.5 text-red-500 hover:bg-red-300 dark:hover:bg-red-950 rounded-md transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Button to load more elements */}
        {hasMoreItems && (
          <div className="flex justify-center pt-4">
            <button
              onClick={handleLoadMore}
              className={cn(
                "px-6 py-2.5 rounded-lg font-medium text-sm transition-colors cursor-pointer",
                "bg-primary text-white",
                "border border-blue-600",
                "hover:opacity-60"
              )}
            >
              Cargar más movimientos ({Math.min(visibleCount, movements.length)} de {movements.length})
            </button>
          </div>
        )}
      </div>
    </>
  )
}