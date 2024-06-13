import { Link } from 'react-router-dom';
import { InternalLayout } from '../internal-layout/internal-layout';

export function NotFoundPage() {
  return (
    <InternalLayout>
      <h1>Page not found</h1>
      <Link to='/'><h3>Return home</h3></Link>
    </InternalLayout>
  );
}
