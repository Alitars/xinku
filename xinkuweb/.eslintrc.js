/*
 * @Descripttion: 
 * @Author: luozhongpeng
 * @Date: 2020-10-27 18:42:01
 * @LastEditors: voanit
 * @LastEditTime: 2020-11-16 10:19:22
 */
module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ["plugin:vue/essential", "eslint:recommended"],
	parserOptions: {
		parser: "babel-eslint"
  },
  globals: {
    AMap: true
  },
	rules: {
		"no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-parsing-error": [
      2,
      {
        "x-invalid-end-tag": false
      }
    ]
	}
};