import { useToast } from '@/components/ui/toast'

export const notify = (title: string, description: string) => {
  const { toast } = useToast()
  toast({
    title,
    description,
  })
}
