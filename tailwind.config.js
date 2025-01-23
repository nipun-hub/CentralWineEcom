/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      scrollBehavior: {
        smooth: 'smooth',
      },

      fontFamily: {
        Merriweather: ['Merriweather', 'serif'],
      },

      colors: {
        colorTextGold400: 'var(--color-text-gold-400)',
        colorTextWhite: 'var(--color-text-white)',
        colorTextWhite5: 'var(--color-text-white-5)',
        colorTextGray: 'var(--color-text-gray)',
        colorTextBlack950: 'var(--color-text-black-950)',
        colorTextGold50: 'var(--color-text-gold-50)',
        colorTextGold950: 'var(--color-text-gold-950)',
        colorTextGold700: 'var(--color-text-gold-700)',
        colorTextGold100: 'var(--color-text-gold-100)',

        // Notification colors
        colorNotificationSuccess: 'var(--color-notification-success)',
        colorNotificationWarning: 'var(--color-notification-warning)',
        colorNotificationError: 'var(--color-notification-error)',

        //Theme independent colors
        colorPrimaryBg: 'var(--color-primary-bg)',
        colorGold50: 'var(--color-gold-50)',
        colorGold700: 'var(--color-gold-700)',
        colorGold100: 'var(--color-gold-100)',
        colorGold950: 'var(--color-gold-950)',
        colorBlack950: 'var(--color-black-950)',
        colorWhite950: 'var(--color-white-950)',
      },

      screens: {
        xsm: '360px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
        '3xl': '1680px',
        '4gs': '712px',
      },

      borderWidth: {
        DEFAULT: '0.75px',
        0: '0px',
        1: '1px',
        2: '2px',
        3: '3px',
        4: '4px',
        6: '6px',
        8: '8px',
      },

      borderRadius: {
        none: '0px',
        sm: '2px',
        DEFAULT: '4px',
        md: '6px',
        lg: '8px',
        full: '9999px',
        large: '12px',
      },

      fontSize: {
        xxxs: '0.5rem',
        xxs: '0.625rem',
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
    },
  },
  plugins: [],
}
