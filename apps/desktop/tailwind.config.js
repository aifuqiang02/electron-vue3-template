/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './electron/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      colors: {
        // VSCode 主题色
        'vscode': {
          'bg': '#1e1e1e',
          'bg-light': '#252526',
          'bg-lighter': '#2d2d30',
          'fg': '#cccccc',
          'fg-muted': '#969696',
          'accent': '#007acc',
          'accent-hover': '#005a9e',
          'border': '#3c3c3c',
          'success': '#4ec9b0',
          'warning': '#ffcc02',
          'error': '#f44747',
          'statusbar': '#252526',
          'statusbar-text': '#cccccc',
          'statusbar-text-dim': '#969696'
        },
        // Bootstrap 兼容色
        'primary': '#007acc',
        'secondary': '#6c757d',
        'success': '#28a745',
        'danger': '#dc3545',
        'warning': '#ffc107',
        'info': '#17a2b8',
        'light': '#f8f9fa',
        'dark': '#343a40'
      },
      fontFamily: {
        'mono': [
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace'
        ]
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms')
  ],
  darkMode: 'class'
}
