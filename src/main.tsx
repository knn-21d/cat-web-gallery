import ReactDOM from 'react-dom/client';
import './index.css';
import { InternalLayout } from './features/cats-gallery/pages/internal-layout/internal-layout';
import { CatsPage } from './features/cats-gallery/pages/cats-page/cats-page';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <InternalLayout>
    <CatsPage></CatsPage>
  </InternalLayout>,
);
