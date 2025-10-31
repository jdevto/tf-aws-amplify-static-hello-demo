import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Consulting Co. Internal Hub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <h1 style={styles.logo}>Consulting Co.</h1>
            <nav style={styles.nav}>
              <Link href="/tools" style={styles.navLink}>Tools</Link>
              <Link href="/dashboards" style={styles.navLink}>Dashboards</Link>
              <Link href="/status" style={styles.navLink}>Status</Link>
            </nav>
          </div>
        </header>

        <main style={styles.main}>
          <div style={styles.hero}>
            <h2 style={styles.heroTitle}>Internal Hub</h2>
            <p style={styles.heroSubtitle}>
              Self-service access to tools and dashboards — globally served via AWS Amplify.
            </p>
          </div>

          <div style={styles.cards}>
            <Link href="/tools" style={styles.card}>
              <div style={styles.cardIcon}>🔧</div>
              <h3 style={styles.cardTitle}>Tools</h3>
              <p style={styles.cardDescription}>Development utilities and helper tools for your workflow</p>
            </Link>

            <Link href="/dashboards" style={styles.card}>
              <div style={styles.cardIcon}>📊</div>
              <h3 style={styles.cardTitle}>Dashboards</h3>
              <p style={styles.cardDescription}>Analytics and monitoring dashboards for insights</p>
            </Link>

            <Link href="/status" style={styles.card}>
              <div style={styles.cardIcon}>⚡</div>
              <h3 style={styles.cardTitle}>Status</h3>
              <p style={styles.cardDescription}>System health and service availability status</p>
            </Link>
          </div>

          <div style={styles.footer}>
            <p style={styles.footerText}>
              Powered by <strong>AWS Amplify</strong> • Built with <strong>Next.js</strong>
            </p>
          </div>
        </main>
      </div>
    </>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f7fa',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    backgroundColor: '#1a1f36',
    color: '#ffffff',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  headerContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 600,
    margin: 0,
    color: '#ffffff',
  },
  nav: {
    display: 'flex',
    gap: '2rem',
  },
  navLink: {
    color: '#a0aec0',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
    transition: 'color 0.2s',
    cursor: 'pointer',
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  hero: {
    textAlign: 'center',
    marginBottom: '4rem',
    paddingTop: '2rem',
  },
  heroTitle: {
    fontSize: '3rem',
    fontWeight: 700,
    color: '#1a1f36',
    margin: '0 0 1rem 0',
    letterSpacing: '-0.02em',
  },
  heroSubtitle: {
    fontSize: '1.25rem',
    color: '#4a5568',
    margin: 0,
    lineHeight: 1.6,
  },
  cards: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
    marginBottom: '4rem',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '2rem',
    textDecoration: 'none',
    color: 'inherit',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    transition: 'transform 0.2s, box-shadow 0.2s',
    border: '1px solid #e2e8f0',
    display: 'block',
    cursor: 'pointer',
  },
  cardIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  cardTitle: {
    fontSize: '1.5rem',
    fontWeight: 600,
    color: '#1a1f36',
    margin: '0 0 0.5rem 0',
  },
  cardDescription: {
    color: '#718096',
    margin: 0,
    lineHeight: 1.6,
  },
  footer: {
    textAlign: 'center',
    paddingTop: '3rem',
    borderTop: '1px solid #e2e8f0',
    marginTop: '3rem',
  },
  footerText: {
    color: '#a0aec0',
    fontSize: '0.9rem',
    margin: 0,
  },
} as const;
