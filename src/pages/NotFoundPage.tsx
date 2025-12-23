import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function NotFoundPage() {
  return (
    <div className="grid min-h-dvh place-items-center px-4 py-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Page not found</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <p className="m-0 text-sm text-muted-foreground">The page you requested does not exist.</p>
          <Button asChild>
            <Link to="/">Go home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
