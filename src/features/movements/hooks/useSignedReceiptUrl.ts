import { useState, useEffect } from 'react'
import { supabase } from '../../../shared/lib/supabase';

interface useSignedReceiptUrlPropsTypes {
  receiptPath: string | null
  isOpen: boolean
}

export const useSignedReceiptUrl = ({ receiptPath, isOpen }: useSignedReceiptUrlPropsTypes) => {
  const [receiptUrl, setReceiptUrl] = useState<string | null>(null)
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false)

  // Fetch receipt image url 
  useEffect(() => {
    let isMounted = true

    const fetchSignedUrl = async () => {
      if (!receiptPath) {
        if (isMounted) setReceiptUrl(null)
        return
      }

      setIsLoadingImage(true)

      try {
        const { data, error } = await supabase.storage
          .from('receipts')
          .createSignedUrl(receiptPath, 60)

        if (error) throw error

        if (isMounted) {
          setReceiptUrl(data?.signedUrl ?? null)
        }
      } catch (error) {
        console.log('Error al generar la URL firmada:', error)
        if (isMounted) setReceiptUrl(null)
      } finally {
        if (isMounted) setIsLoadingImage(false)
      }
    }

    if (isOpen) {
      fetchSignedUrl()
    }

    return () => {
      isMounted = false
    }
  }, [receiptPath, isOpen])

  return {
    receiptUrl: isOpen ? receiptUrl : null,
    isLoadingImage
  }
}
