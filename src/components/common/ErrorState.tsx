import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export function ErrorState({ title, message }: { title: string; message: string }) {
  return (
    <div className="w-full">
      <Alert variant="destructive">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </div>
  )
}

