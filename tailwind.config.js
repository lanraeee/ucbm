/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'ucbm-dark':        '#2a1440',
        'ucbm-primary':     '#3b1d5e',
        'ucbm-purple-hv':   '#4a2673',
        'ucbm-purple-mid':  '#5b2d8e',
        'ucbm-footer':      '#1e0e30',
        'ucbm-gold':        '#c9a227',
        'ucbm-gold-hv':     '#b8921d',
        'ucbm-gold-lt':     '#e8d9a0',
        'ucbm-gold-badge':  '#f0e9d2',
        'ucbm-gold-btx':    '#8a6d12',
        'ucbm-pill':        '#efe9f7',
        'ucbm-light':       '#f7f4fb',
        'ucbm-border':      '#ece6f4',
        'ucbm-input':       '#d9d0e8',
        'ucbm-text':        '#2b2340',
        'ucbm-body':        '#55496b',
        'ucbm-muted':       '#6b6180',
        'ucbm-faint':       '#8a7fa0',
        'ucbm-ondark':      '#d9cfe8',
        'ucbm-ftext':       '#b9a9d4',
        'ucbm-err-bg':      '#fdf0f0',
        'ucbm-err':         '#a33a3a',
        'ucbm-err-bd':      '#f0d4d4',
      },
      fontFamily: {
        marcellus: ['var(--font-marcellus)', 'Georgia', 'serif'],
        mulish:    ['var(--font-mulish)', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        ucbm: '1240px',
      },
      boxShadow: {
        card:    '0 12px 28px rgba(59,29,94,0.12)',
        'card-hv': '0 12px 28px rgba(59,29,94,0.14)',
        header:  '0 2px 12px rgba(59,29,94,0.06)',
        modal:   '0 24px 60px rgba(0,0,0,0.3)',
      },
    },
  },
  plugins: [],
}
