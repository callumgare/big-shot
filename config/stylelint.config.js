module.exports = {
    "plugins": [
      "stylelint-scss"
    ],
    "extends": "stylelint-config-standard",
    "rules": {
      "no-empty-source": null,
      "no-descending-specificity": null,
      "selector-pseudo-class-no-unknown": [
        true,
        {
          ignorePseudoClasses: ['deep']
        }
      ]
    }
  }