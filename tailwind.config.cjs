module.exports = {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--primary-background-color)",
        secondary: "var(--secondary-background-color)",
        accent: "var(--accent-background-color)",
        success: "var(--success-background-color)",
        error: "var(--error-background-color)",
      },
      textColor: {
        primary: "var(--primary-text-color)",
        secondary: "var(--secondary-text-color)",
        success: "var(--success-background-color)",
        error: "var(--error-background-color)",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        ".border-primary": {
          borderColor: "var(--primary-border-color)",
          borderWidth: "1px",
          borderStyle: "solid",
        },
        ".border-secondary": {
          borderColor: "var(--primary-border-color)",
          borderWidth: "1px",
          borderStyle: "solid",
        },

        ".border-accent": {
          borderColor: "var(--accent-border-color)",
          borderWidth: "1px",
          borderStyle: "solid",
        },

        ".border-success": {
          borderColor: "var(--success-border-color)",
          borderWidth: "1px",
          borderStyle: "solid",
        },

        ".border-error": {
          borderColor: "var(--error-border-color)",
          borderWidth: "1px",
          borderStyle: "solid",
        },

        ".border-underline": {
          borderBottomColor: "var(--primary-border-color)",
          borderBottomWidth: "1px",
          borderBottomStyle: "solid",
        },
      };

      addUtilities(newUtilities, ["responsive", "hover"]);
    },
  ],
};
