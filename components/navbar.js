import {useMemo} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import styles from '../styles/navbar.module.scss';
import {unslugify} from '../utils/functions';

function Navbar() {
  const router = useRouter();

  const crumbs = useMemo(() => {
    const numberOfSlashes = (router.pathname.match(/\//g) || []).length;
    const path = router.asPath;
    const paths = [];

    if (path === '/') {
      return [{name: 'Home', path: '/'}];
    }

    for (let i = 0; i <= numberOfSlashes; i += 1) {
      paths.push({
        name: path.split('/')[i] || 'Home',
        path: path.split('/', i + 1).join('/') || '/',
      });
    }

    return paths.slice(0, 3);
  }, [router]);

  return (
    <div className={styles.navbar}>
      <div className={styles.breadcrumbs}>
        {crumbs.map((crumb, index) => (
          <>
            <Link href={crumb.path}>
              <a className={styles.crumb}>{unslugify(crumb.name)}</a>
            </Link>

            {index !== crumbs.length - 1 && (
              <span className={styles.slash}>/</span>
            )}
          </>
        ))}
      </div>

      <div className={styles.colophon}>Jeremy Philemon</div>
    </div>
  );
}

export default Navbar;
