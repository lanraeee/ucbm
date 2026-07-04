interface ImageSlotProps {
  placeholder: string
  className?: string
  style?: React.CSSProperties
}

export default function ImageSlot({ placeholder, className = '', style }: ImageSlotProps) {
  return (
    <div
      className={`flex items-center justify-center bg-ucbm-light border-2 border-dashed border-ucbm-input rounded-xl text-ucbm-muted text-sm font-semibold text-center p-4 ${className}`}
      style={style}
    >
      {placeholder}
    </div>
  )
}
