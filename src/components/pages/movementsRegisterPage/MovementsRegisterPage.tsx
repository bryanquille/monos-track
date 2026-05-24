import { RefreshCcw, ShieldCheck } from "lucide-react";
import { cn } from "../../../utils/cn";

function MovementsRegisterPage() {
  return (
    <section className={cn('dark:text-neutral-dark')}>
      <header>
        <h1>Registrar Movimiento</h1>
        <p>Ingresa los detalles de tu nueva operación financiera.</p>
        <button type="button">
          <span>Ingreso</span>
          <span>Gasto</span>
        </button>
      </header>
      <main>
        <form>
          <div>
            <label htmlFor="amount">Monto</label>
            <input type="number" id="amount" />
          </div>
          <div>
            <label htmlFor="movementDate">Fecha</label>
            <input type="date" id="movementDate" />
          </div>
          <div>
            <label htmlFor="cathegory">Categoría</label>
            <select id="cathegory">
              <option value="salary">Salario</option>
              <option value="gift">Regalo</option>
            </select>
          </div>
          <div>
            <label htmlFor="method">Método de Pago</label>
            <select id="method">
              <option value="cash">Efectivo</option>
              <option value="transfer">Transferencia</option>
              <option value="deposit">Deposito</option>
            </select>
          </div>
          <div>
            <label htmlFor="description">Descripción</label>
            <textarea id="description"></textarea>
          </div>
          <div>
            <label htmlFor="voucher">Comprobante/Adjunto</label>
            <input type="file" id="voucher" />
          </div>
          <button type="submit">Confirmar Movimiento</button>
        </form>
      </main>
      <footer>
        <article>
          <div>
            <h3>Seguridad</h3>
            <p>Transacción encriptada de extremo a extremo</p>
          </div>
          <ShieldCheck />
        </article>
        <article>
          <div>
            <h3>Sincronización</h3>
            <p>Actualización en tiempo real</p>
          </div>
          <RefreshCcw />
        </article>
      </footer>
    </section>
  )
}

export default MovementsRegisterPage