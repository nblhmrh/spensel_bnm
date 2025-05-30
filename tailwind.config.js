module.exports = {
  // ... existing config ...
  theme: {
    extend: {
      // ... other extensions ...
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        }
      },
      animation: {
        fadeIn: 'fadeIn 0.7s ease-out forwards',
        slideUp: 'slideUp 0.7s ease-out forwards'
      }
    }
  }
}