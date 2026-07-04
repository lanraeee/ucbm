interface PageHeaderProps {
  eyebrow: string
  title: string
  children?: React.ReactNode
}

export default function PageHeader({ eyebrow, title, children }: PageHeaderProps) {
  return (
    <section
      className="text-white py-16 px-6"
      style={{ background: 'linear-gradient(135deg, #2a1440, #3b1d5e)' }}
    >
      <div className="max-w-ucbm mx-auto">
        <p className="eyebrow mb-2.5">{eyebrow}</p>
        <h1 className="font-marcellus text-[44px] font-normal m-0 leading-tight max-sm:text-[34px]">
          {title}
        </h1>
        {children}
      </div>
    </section>
  )
}
