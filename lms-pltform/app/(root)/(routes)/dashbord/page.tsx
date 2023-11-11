import { Button } from '@/components/ui/button'
import { FC } from 'react'

interface DashbordPageProps {
  
}

const DashbordPage: FC<DashbordPageProps> = ({}) => {
  return (
    <div className=" flex flex-col justify-center items-center">
      <Button>DashbordPage</Button>
    </div>
  );
}

export default DashbordPage