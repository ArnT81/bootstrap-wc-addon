import terser from '@rollup/plugin-terser';

export default [
	// ESM build (för bundlers och tree-shaking)
	{
		input: 'src/index.js',
		output: {
			file: 'dist/bootstrap-wc-addon.esm.js',
			format: 'esm',
			sourcemap: true
		}
	},

	// IIFE build (för <script>-taggar via CDN)
	{
		input: 'src/index.js',
		output: {
			file: 'dist/bootstrap-wc-addon.bundle.min.js',
			format: 'iife',
			name: 'BootstrapWCAddon', // global variabel om någon vill nå saker via window
			sourcemap: true
		},
		plugins: [
			terser()
		]
	}
];