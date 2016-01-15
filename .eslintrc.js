﻿module.exports = {
	'rules': {
		//Possible Errors
		'comma-dangle': 0, // ケツカンマ禁止 IE8などの場合必要
		'no-cond-assign': 2,
		// 'no-console': 2, // consoleの利用禁止
		'no-constant-condition': 2,
		'no-control-regex': 2,
		'no-debugger': 2,
		'no-dupe-args': 2,
		'no-dupe-keys': 2,
		'no-duplicate-case': 2,
		'no-empty-character-class': 2,
		'no-empty': 2,
		'no-ex-assign': 2,
		// 'no-extra-boolean-cast': 2, // !!を利用したbooleanのキャストを禁止
		// 'no-extra-parens': 2, // 不要な括弧
		'no-extra-semi': 2, // 不要なセミコロン
		'no-func-assign': 2,
		'no-inner-declarations': 2,
		'no-invalid-regexp': 2,
		'no-irregular-whitespace': 2, // 危険なwhitespaceの利用（スペースやTAB、通常の改行コードではない何かが使われている）
		'no-negated-in-lhs': 2,
		'no-obj-calls': 2,
		'no-regex-spaces': 2,
		'no-sparse-arrays': 2,
		'no-unreachable': 2,
		'use-isnan': 2,
		// 'valid-jsdoc': 2, // jsdocのチェック
		'valid-typeof': 2,
		'no-unexpected-multiline': 2,
		//Best Practices
		'accessor-pairs': 2,
		'block-scoped-var': 2, // スコープ内にはあるがブロックスコープ内には無い変数の利用
		'complexity': 2,
		'consistent-return': 1, // 一貫性の無いreturn
		'curly': 2,
		// 'default-case': 2, // defaultなしのswitch
		'dot-notation': 2,
		'dot-location': 2,
		'eqeqeq': 2, // 厳密比較の比較演算子を強制
		// 'guard-for-in': 2, // forinループの禁止
		// 'no-alert': 2, // alertの利用禁止
		'no-caller': 2,
		'no-div-regex': 2,
		// 'no-else-return': 2, // else内のreturn禁止
		'no-empty-label': 2,
		'no-eq-null': 2,
		'no-eval': 2,
		'no-extend-native': 2, // ネイティブオブジェクトの拡張を許可しない
		'no-extra-bind': 2, // 不要なfunction bind
		'no-fallthrough': 2,
		'no-floating-decimal': 2,
		'no-implicit-coercion': [2, {'boolean': false, 'number': true, 'string': false}], // 省略記法の許容 数値系 'var n = 1 * foo;'などは許さない （foo - 0 はここではチェックされないのでOK
		'no-implied-eval': 2,
		// 'no-invalid-this': 2, // クラス外this
		'no-iterator': 2,
		'no-labels': 2,
		'no-lone-blocks': 2,
		// 'no-loop-func': 2, // ループ内でfunction生成を禁止
		'no-multi-spaces': 2, // 不要なスペース2つ以上
		'no-multi-str': 2,
		'no-native-reassign': 2,
		'no-new-func': 2,
		'no-new-wrappers': 2,
		// 'no-new': 2, // 未代入のnew禁止
		'no-octal-escape': 2,
		'no-octal': 2,
		// 'no-param-reassign': 2, // 引数への再代入禁止
		'no-process-env': 2,
		'no-proto': 2,
		'no-redeclare': 2,
		'no-return-assign': 2,
		'no-script-url': 2,
		'no-self-compare': 2,
		'no-sequences': 2,
		'no-throw-literal': 2,
		'no-unused-expressions': 2,
		'no-useless-call': 2,
		'no-void': 2,
		'no-warning-comments': 1, //[TODO]や[FIXME]を警告
		'no-with': 2,
		'radix': 2,
		'vars-on-top': 2, // 変数宣言は必ず一番最初
		// 'wrap-iife': 2, // functionの即時実行禁止
		// 'yoda': 2, // ヨーダ条件式の禁止
		//Strict Mode
		'strict': 2, // 厳格モードを利用
		//Variables
		// 'init-declarations': 2, // 変数宣言箇所以外の代入禁止
		'no-catch-shadow': 2,
		'no-delete-var': 2,
		'no-label-var': 2,
		'no-shadow-restricted-names': 2,
		// 'no-shadow': 2, // シャドーイング禁止
		// 'no-undef-init': 2, // 変数のイニシャライズ時にundefinedを代入している個所
		'no-undef': 2, // 宣言されていない変数の利用
		// 'no-undefined': 2, // undefinedの利用禁止
		'no-unused-vars': [2, {'vars': 'all', 'args': 'none'}], // 利用していない変数 引数は許容
		'no-use-before-define': 2,
		//Node.js
		'callback-return': 0, //callbackを呼んだ後必ずreturn
		'handle-callback-err': 2,
		'no-mixed-requires': 2,
		'no-new-require': 2,
		'no-path-concat': 2,
		'no-process-exit': 2,
		'no-restricted-modules': 2,
		'no-sync': 2,
		//Stylistic Issues
		'array-bracket-spacing': 2,
		'brace-style': [2, '1tbs', {'allowSingleLine': true}], // ブロック記述方法
		'camelcase': 2, // キャメルケースを強制
		'comma-spacing': [2, {'before': false, 'after': true}], // カンマ前後のスペース カンマ後にスペースを強制
		'comma-style': 2,
		'computed-property-spacing': 2,
		'consistent-this': [2, 'self'], // thisの代入先制限 selfで宣言させる(that,meはだめ)
		// 'eol-last': 2, // ファイル末端の改行を強制
		// 'func-names': 2, // 無名function禁止
		// 'func-style': 2, // 未代入の無名関数禁止
		// 'id-length': 2, // 短い変数名の禁止
		'indent': [2, 'tab'], //インデント tab
		'key-spacing': 2, // プロパティ宣言のスペースの記述制限
		// 'lines-around-comment': 2, // コメント前後の空行
		'linebreak-style': 2,
		'max-nested-callbacks': 2,
		// 'new-cap': 2, // newするクラス名の小文字始まり禁止
		'new-parens': 2,
		// 'newline-after-var': 2, // var宣言後の空行を強制
		'no-array-constructor': 2,
		// 'no-continue': 2, // continue利用禁止
		// 'no-inline-comments': 2, // コード行と同一行のコメント禁止
		// 'no-lonely-if': 2, // else ifと記載できそうなelse内ifを警告 （バグってる気がする1.0.0）
		'no-mixed-spaces-and-tabs': 2, //インデント内のスペースとTABの混在
		'no-multiple-empty-lines': 2, //3行以上の空行を許可しない
		// 'no-nested-ternary': 2, // 三項演算子内三項演算子禁止
		'no-new-object': 2,
		'no-spaced-func': 2, // function実行時、括弧前のスペースを許容しない
		// 'no-ternary': 2, // 三項演算子禁止
		'no-trailing-spaces': 2, // 行末の空白 空行はOK
		// 'no-underscore-dangle': 2, // アンダースコア禁止
		'no-unneeded-ternary': 2, // booleanを返す三項演算子
		'object-curly-spacing': 2,
		// 'one-var': 2, // var宣言は1度しか認めない
		// 'operator-assignment': 2, // 代入演算子が利用できそうな箇所
		'operator-linebreak': 2,
		// 'padded-blocks': 2, // ブロック内のパディングを強制
		// 'quote-props': 2, // プロパティ名のクォートの記載を強制
		'quotes': [2, 'single'], // クォートの記載ルール シングルクォートで記載
		'id-match': 2,
		'semi-spacing': 2, //セミコロン前後の空白 設定は後ろだけ必要
		'semi': 2,
		// 'sort-vars': 2, // varのソートを強制
		'space-after-keywords': 2, // キーワード（if・else・forなど）の後の空白を強制
		'space-before-blocks': 2, // ブロック前の空白を強制
		// 'space-before-function-paren': 2, // function括弧前後の空白を強制
		'space-in-parens': 2, // 「(」後「)」前のスペースは不要
		'space-infix-ops': 2, // 演算子前後のスペース
		'space-return-throw-case': 2,
		'space-unary-ops': 2,
		// 'spaced-comment': 2, // コメントの開始終了時の空白
		// 'wrap-regex': 2, // 正規表現オブジェクト宣言時の括弧を強制
		//ECMAScript 6
		'arrow-parens': [2, 'as-needed'], // アローの引数に括弧が必要
		'arrow-spacing': 2,
		'constructor-super': 2,
		'generator-star-spacing': 2,
		'no-class-assign': 2,
		'no-const-assign': 2,
		'no-this-before-super': 2,
		'no-var': 2,
		'object-shorthand': 2,
		'prefer-const': 2,
		'prefer-spread': 2,
		//'prefer-reflect': 2, // Refrectを使おう
		'require-yield': 2,
		//Legacy
		'max-depth': 2,
		// 'max-len': 2, // 1行の最大文字数
		// 'max-params': 2, // 引数の最大数
		'max-statements': [2, 200], // ステートメントの最大行数100
		'no-bitwise': 2,
		// 'no-plusplus': 2, // インクリメント・デクリメント演算子の利用禁止
	},
	'env': {
		'es6': true,
		'jquery': true,
		'jasmine': true,
		'browser': true,
	},
	'globals': {
		'chrome': true,
		'module': true,
	},
	'plugins': [
		'html'
	],
	'extends': 'eslint:recommended',
};
