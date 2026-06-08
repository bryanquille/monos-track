import { supabase } from "../../../lib/supabase";
import type { MovementsData } from "../schemas/movementsSchema";

export const submitMovementToSupabase = async (data: MovementsData) => {
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error(`No se puede verificar tu sesión. Por favor vuelve a iniciar sesión.`)
  }

  let receiptPath = null

  if (data.receiptUpload && data.receiptUpload.length > 0) {
    const file = data.receiptUpload[0]
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('receipts')
      .upload(fileName, file)

    if (uploadError) {
      throw new Error(`Error al subir la imagen: ${uploadError.message}`)
    }

    receiptPath = uploadData.path
  }

  const { error: dbError } = await supabase
    .from('movements')
    .insert({
      user_id: user.id,
      movement_type: data.movementType,
      amount: data.amount,
      category: data.category,
      movement_date: data.movementDate,
      payment_method: data.getMoneyMethod,
      description: data.description,
      receipt_path: receiptPath
    })

  if (dbError) {
    if (receiptPath) {
      await supabase.storage.from('receipts').remove([receiptPath])
    }
    throw new Error(`Error al guardar el movimiento en la base de datos: ${dbError.message}`)
  }

  return true
}
