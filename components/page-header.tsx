interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="text-center pt-16 pb-8">
      <h1 className="text-4xl font-bold text-primary mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg py-2 max-w-4xl mx-auto text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  )
}