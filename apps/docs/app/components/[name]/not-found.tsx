import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground mb-4">组件未找到</p>
        <Link href="/" className="text-primary hover:underline">
          返回首页
        </Link>
      </div>
    </div>
  )
}
