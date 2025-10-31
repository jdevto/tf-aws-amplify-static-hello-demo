import Head from 'next/head';
import Link from 'next/link';

export default function Tools() {
  const tools = [
    { name: 'API Explorer', description: 'Browse and test API endpoints', icon: '🌐' },
    { name: 'Code Generator', description: 'Generate boilerplate code', icon: '💻' },
    { name: 'Data Validator', description: 'Validate and format data', icon: '✅' },
    { name: 'Config Manager', description: 'Manage configuration files', icon: '⚙️' },
  ];

  return (
    <>
      <Head>
        <title>Tools - Consulting Co. Internal Hub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <Link href="/" style={styles.logoLink}>
              <h1 style={styles.logo}>Consulting Co.</h1>
            </Link>
            <nav style={styles.nav}>
              <Link href="/tools" style={styles.navLinkActive}>Tools</Link>
              <Link href="/dashboards" style={styles.navLink}>Dashboards</Link>
              <Link href="/status" style={styles.navLink}>Status</Link>
            </nav>
          </div>
        </header>

        <main style={styles.main}>
          <div style={styles.pageHeader}>
            <h2 style={styles.pageTitle}>Development Tools</h2>
            <p style={styles.pageSubtitle}>Utilities and helper tools to streamline your development workflow</p>
          </div>

          <div style={styles.grid}>
            {tools.map((tool, index) => (
              <div key={index} style={styles.toolCard}>
                <div style={styles.toolIcon}>{tool.icon}</div>
                <h3 style={styles.toolName}>{tool.name}</h3>
                <p style={styles.toolDescription}>{tool.description}</p>
              </div>
            ))}
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
  logoLink: {
    textDecoration: 'none',
    color: 'inherit',
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
  },
  navLinkActive: {
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 500,
  },
  main: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '3rem 2rem',
  },
  pageHeader: {
    marginBottom: '3rem',
  },
  pageTitle: {
    fontSize: '2.5rem',
    fontWeight: 700,
    color: '#1a1f36',
    margin: '0 0 0.5rem 0',
  },
  pageSubtitle: {
    fontSize: '1.1rem',
    color: '#4a5568',
    margin: 0,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '2rem',
  },
  toolCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    transition: 'transform 0.2s, box-shadow 0.2s',
  },
  toolIcon: {
    fontSize: '3rem',
    marginBottom: '1rem',
  },
  toolName: {
    fontSize: '1.25rem',
    fontWeight: 600,
    color: '#1a1f36',
    margin: '0 0 0.5rem 0',
  },
  toolDescription: {
    color: '#718096',
    margin: 0,
    lineHeight: 1.6,
  },
} as const;
