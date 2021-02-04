module.exports = {
    "plugins": [
      "stylelint-scss"
    ],
    "extends": "stylelint-config-standard",
    "rules": {
      "no-empty-source": null,
      "no-descending-specificity": null,
      "selector-pseudo-element-no-unknown": [
        true,
        {
          ignorePseudoElements: ['v-deep']
        }
      ]
    }
  }