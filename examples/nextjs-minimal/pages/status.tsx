import Head from 'next/head';
import Link from 'next/link';

export default function Status() {
  const services = [
    { name: 'API Gateway', status: 'operational', uptime: '99.9%' },
    { name: 'Database', status: 'operational', uptime: '99.8%' },
    { name: 'CDN', status: 'operational', uptime: '99.9%' },
    { name: 'Authentication', status: 'operational', uptime: '99.7%' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational':
        return '#10b981';
      case 'degraded':
        return '#f59e0b';
      case 'down':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  };

  const getStatusBadge = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  return (
    <>
      <Head>
        <title>Status - Consulting Co. Internal Hub</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div style={styles.container}>
        <header style={styles.header}>
          <div style={styles.headerContent}>
            <Link href="/" style={styles.logoLink}>
              <h1 style={styles.logo}>Consulting Co.</h1>
            </Link>
            <nav style={styles.nav}>
              <Link href="/tools" style={styles.navLink}>Tools</Link>
              <Link href="/dashboards" style={styles.navLink}>Dashboards</Link>
              <Link href="/status" style={styles.navLinkActive}>Status</Link>
            </nav>
          </div>
        </header>

        <main style={styles.main}>
          <div style={styles.pageHeader}>
            <h2 style={styles.pageTitle}>System Status</h2>
            <p style={styles.pageSubtitle}>Real-time status of all services and infrastructure</p>
          </div>

          <div style={styles.statusOverview}>
            <div style={styles.statusCard}>
              <div style={styles.statusIndicator} />
              <div>
                <div style={styles.statusLabel}>All Systems Operational</div>
                <div style={styles.statusTime}>Last updated: {new Date().toLocaleString()}</div>
              </div>
            </div>
          </div>

          <div style={styles.servicesList}>
            {services.map((service, index) => (
              <div key={index} style={styles.serviceCard}>
                <div style={styles.serviceHeader}>
                  <h3 style={styles.serviceName}>{service.name}</h3>
                  <div style={{
                    ...styles.statusBadge,
                    backgroundColor: getStatusColor(service.status),
                  }}>
                    {getStatusBadge(service.status)}
                  </div>
                </div>
                <div style={styles.serviceMetrics}>
                  <span style={styles.metricLabel}>Uptime:</span>
                  <span style={styles.metricValue}>{service.uptime}</span>
                </div>
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
  statusOverview: {
    marginBottom: '3rem',
  },
  statusCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '2rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
  },
  statusIndicator: {
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    backgroundColor: '#10b981',
    flexShrink: 0,
  },
  statusLabel: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#1a1f36',
    marginBottom: '0.25rem',
  },
  statusTime: {
    fontSize: '0.9rem',
    color: '#718096',
  },
  servicesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1.5rem',
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e2e8f0',
  },
  serviceHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  serviceName: {
    fontSize: '1.1rem',
    fontWeight: 600,
    color: '#1a1f36',
    margin: 0,
  },
  statusBadge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: '#ffffff',
  },
  serviceMetrics: {
    display: 'flex',
    gap: '0.5rem',
    alignItems: 'center',
  },
  metricLabel: {
    fontSize: '0.9rem',
    color: '#718096',
  },
  metricValue: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: '#1a1f36',
  },
} as const;
