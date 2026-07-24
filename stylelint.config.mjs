export default {
  extends: ["stylelint-config-recommended"],
  ignoreFiles: ["**/dist/**", "**/node_modules/**", "**/coverage/**"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["custom-variant", "theme"],
      },
    ],
    "no-descending-specificity": null,
  },
  overrides: [
    {
      files: ["packages/styles/src/**/*.css"],
      rules: {
        "selector-class-pattern": [
          "^arcsyn-[a-z0-9]+(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$",
          {
            message: "Use o contrato público de classes arcsyn-* com BEM quando necessário.",
          },
        ],
      },
    },
  ],
};
