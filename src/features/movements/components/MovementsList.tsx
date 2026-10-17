import { cn } from "../../../shared/utils/cn";
import { Eye, Edit, Trash2 } from "lucide-react";
import type { FinancialDataListTypes } from "../pages/MovementsRegisterPage";

interface MovementListProps {
  movements: FinancialDataListTypes[] | undefined;
  onViewDetails?: (movement: FinancialDataListTypes) => void;
  onEdit?: (movement: FinancialDataListTypes) => void;
  onDelete?: (id: string) => void;
}

export const MovementList = ({
  movements,
  onViewDetails,
  onEdit,
  onDelete,
}: MovementListProps) => {
  if (!movements || movements.length === 0) {
    return (
      <div className="w-full p-8 text-center text-gray-500 dark:text-gray-400">
        No hay movimientos registrados todavía.
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <h3 className="text-lg font-semibold px-2">Historial de Movimientos</h3>

      {/* ========================================================= */}
      {/* 1. VISTA MOBILE: Tarjetas apiladas verticalmente            */}
      {/* ========================================================= */}
      <div className="block md:hidden space-y-3">
        {movements.map((item) => (
          <div
            key={item.id}
            className={cn(
              "p-4 bg-white dark:bg-tertiary-dark",
              "border border-neutral-light/50 dark:border-neutral-dark/20 rounded-xl",
              "shadow-sm flex flex-col gap-2"
            )}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold capitalize text-sm">
                {item.category}
              </span>
              <span
                className={cn(
                  "font-bold text-base",
                  item.movement_type === "income"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                )}
              >
                {item.movement_type === "income" ? "+" : "-"}$
                {item.amount.toFixed(2)}
              </span>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-2">
              {item.description || "Sin descripción"}
            </p>

            <div className="flex justify-between items-center text-xs text-gray-400 mt-2 pt-2 border-t border-gray-100 dark:border-gray-800">
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

      {/* ========================================================= */}
      {/* 2. VISTA TABLET Y DESKTOP: Tabla estructurada tradicional  */}
      {/* ========================================================= */}
      <div className="hidden md:block overflow-x-auto border border-neutral-light/50 dark:border-neutral-dark/20 rounded-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-800/60 text-xs uppercase font-semibold text-gray-500 dark:text-gray-400 border-b border-neutral-light/50 dark:border-neutral-dark/20">
              <th className="p-3.5">Fecha</th>
              <th className="p-3.5">Categoría</th>
              <th className="p-3.5">Descripción</th>
              <th className="p-3.5">Método</th>
              <th className="p-3.5">Monto</th>
              <th className="p-3.5 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-light/50 dark:divide-neutral-dark/15 text-sm">
            {movements.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-gray-50/60 dark:hover:bg-slate-800/40 transition-colors"
              >
                <td className="p-3.5 text-gray-600 dark:text-gray-300">
                  {item.movement_date}
                </td>
                <td className="p-3.5 font-medium capitalize">
                  {item.category}
                </td>
                <td className="p-3.5 text-gray-600 dark:text-gray-300 max-w-xs truncate">
                  {item.description || "-"}
                </td>
                <td className="p-3.5 capitalize text-gray-600 dark:text-gray-300">
                  {item.payment_method || "-"}
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
                      className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-md transition-colors"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => onEdit(item)}
                      title="Editar"
                      className="p-1.5 text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950/40 rounded-md transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      title="Eliminar"
                      className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-md transition-colors"
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
    </div>
  );
};