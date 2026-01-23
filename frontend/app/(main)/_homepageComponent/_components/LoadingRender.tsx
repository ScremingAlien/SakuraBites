import { Skeleton } from '@/components/ui/skeleton'
 
type Props = {}

export default function LoadingRender({ }: Props) {
  return (
    <div className=' grid grid-cols-4 gap-5'>
      {
        Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className=' h-60  '></Skeleton>))
      }
    </div>
  )
}