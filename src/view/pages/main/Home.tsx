import { useEffect } from 'react';
import Dashboard from '../../../components/Main/Dashboard';
import { useAppContext } from '../../../context/AppContext';
import type { AppContextIn } from '../../../Interface/InApp';

function Home() {

  const context = useAppContext() as AppContextIn

  useEffect(() => {
    context.setGlobalTitleFn('Dashboard');
  }, []);

  return (

    <div className='main-con'>
      <Dashboard/>
    </div>
  )
}

export default Home