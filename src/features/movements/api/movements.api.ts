import { supabase } from "../../../shared/lib/supabase";
import type { MovementOutput, MovementsData } from "../schemas/movementsSchema";

export interface updateMovementInSupabasePropsTypes {
  id: string | undefined
  data: MovementOutput
  oldReceiptPath: string | undefined
}

export interface deleteMovementFromSupabasePropsTypes {
  id: string | undefined
  receiptPath: string | undefined
}

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
      payment_method: data.paymentMethod,
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

export const updateMovementInSupabase = async ({
  id,
  data,
  oldReceiptPath
}: updateMovementInSupabasePropsTypes) => {
  // Verify user session for security
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error(`No se puede verificar tu sesión. Por favor vuelve a iniciar sesión.`)
  }

  let newReceiptPath = oldReceiptPath;

  // Receipt upload handling (Supabase Storage: 'receipts')
  if (data.receiptUpload && data.receiptUpload.length > 0) {
    const file = data.receiptUpload[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

    // Upload the new receipt to Supabase Storage bucket 'receipts'
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('receipts')
      .upload(fileName, file);

    if (uploadError) {
      throw new Error(`Error al subir la nueva imagen: ${uploadError.message}`);
    }

    newReceiptPath = uploadData.path;

    // Delete the old receipt from Supabase Storage if it exists
    if (oldReceiptPath) {
      await supabase.storage.from('receipts').remove([oldReceiptPath]);
    }
  }

  // Update the movement in movements table in Supabase DB
  const { error: dbError } = await supabase
    .from('movements')
    .update({
      amount: data.amount,
      category: data.category,
      movement_type: data.movementType,
      movement_date: data.movementDate,
      payment_method: data.paymentMethod,
      description: data.description,
      receipt_path: newReceiptPath,
    })
    .eq('id', id);

  if (dbError) {
    // If the DB update failed and we uploaded a new file in this request, clean up the orphaned file
    if (newReceiptPath && newReceiptPath !== oldReceiptPath) {
      await supabase.storage.from('receipts').remove([newReceiptPath]);
    }
    throw new Error(`Error al actualizar el movimiento en la base de datos: ${dbError.message}`);
  }

  return true;
}

export const deleteMovementFromSupabase = async ({ id, receiptPath }: deleteMovementFromSupabasePropsTypes) => {
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    throw new Error('No se puede verificar tú sesión. Por favor vuelve a iniciar sesión.')
  }

  if (receiptPath) {
    const { error: storageError } = await supabase.storage
      .from('receipts')
      .remove([receiptPath])

    if (storageError) {
      console.error('Adevertencia al eliminar el archivo del storage:', storageError.message)
    }
  }

  const { error: dbError } = await supabase
    .from('movements')
    .delete()
    .eq('id', id)

  if (dbError) {
    throw new Error(`Error al eliminar el movimiento: ${dbError.message}`)
  }

  return true
}