export default function Footer({ name }: { name?: string }) {
  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      padding: '2rem clamp(1.5rem, 5vw, 3rem)',
      display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
    }}>
      <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
        © {new Date().getFullYear()} {name ?? 'Sameer Hasan'}. All rights reserved.
      </p>
      <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', fontFamily: 'var(--font-mono)' }}>
        Next.js · Sanity · Vercel
      </p>
    </footer>
  )
}