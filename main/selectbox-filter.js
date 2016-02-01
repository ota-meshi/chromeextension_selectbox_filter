(() => {
	'use strict';
	const appendStyleSheet = inputId => {
		const style = document.createElement('style');
		style.innerHTML = '#' + inputId + '::-webkit-calendar-picker-indicator {opacity: 0;}';
		const head = document.getElementsByTagName('head')[0];
		head.appendChild(style);
	};

	const getUniqueId = prefix => {
		const ran = Math.floor(Math.random() * 10000000);
		const canId = prefix + ran;
		if (document.getElementById(canId)) {
			return getUniqueId(prefix);
		} else {
			return canId;
		}
	};
	const getInputId = () => {
		return getUniqueId('selectbox-filter-input-unique-');
	};
	const getDatalistId = () => {
		return getUniqueId('selectbox-filter-datalist-unique-');
	};

	const input = document.createElement('input');
	input.setAttribute('type', 'search');
	input.setAttribute('placeholder', 'enter filter keyword');
	input.setAttribute('autocomplete', 'on');
	const setupInputStyle = input => {
		input.removeAttribute('style');
		input.style.backgroundImage = 'url("' + chrome.extension.getURL('/icons/icon16.png') + '")';
		input.style.backgroundRepeat = 'no-repeat';
		input.style.backgroundPosition = 'right';
		input.removeAttribute('disabled');
	};

	const dataList = document.createElement('datalist');

	let select;
	let options;
	let originalDisplays;
	let timeoutIdOnChange = 0;

	const getDisplays = opts => Array.prototype.map.call(opts, opt => opt.style.display);

	const resetDisplays = (opts, orgDisps) => Array.prototype.forEach.call(opts, (opt, i) => (opt.style.display = orgDisps[i]));

	const adjustString = s => s ? s.toLowerCase().normalize('NFKC').
		replace(/[ァ-ン]/g, s => String.fromCharCode(s.charCodeAt(0) - 0x60)).
		replace(/[！-～]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
				: '';

	const optionsToDatalist = opts => {
		let html = '';
		Array.prototype.forEach.call(opts, (opt, i) => {
			if (opt.style.display !== 'none') {
				html += '<option value="' + (opt.label || opt.textContent) + '"></option>';
			}
		});
		if (dataList.innerHTML !== html) {
			dataList.innerHTML = html;
		}
	};

	const onchange = select => {
		const evt = document.createEvent('Event');
		evt.initEvent('change', true, true);
		select.dispatchEvent(evt);
		timeoutIdOnChange = 0;
	};
	const onFilter = () => {
		const value = adjustString(input.value);
		const match = value ? option => {
			return adjustString(option.label || option.textContent).indexOf(value) > -1;
		} : option => {
			return true;
		};
		const befSelectedIndex = select.selectedIndex;
		const dispOpts = [];
		let hitIndex = -1;

		Array.prototype.forEach.call(options, (option, i) => {
			if (match(option)) {
				option.style.display = originalDisplays[i];
				if (originalDisplays[i] !== 'none') {
					dispOpts.push(i);
					if (adjustString(option.label || option.textContent) === value) {
						hitIndex = i;
					}
				}
			} else {
				option.style.display = 'none';
			}
		});

		let delayOnChange = false;
		if (timeoutIdOnChange) {
			clearTimeout(timeoutIdOnChange);
			delayOnChange = true;
			timeoutIdOnChange = 0;
		}
		if (dispOpts.length > 0) {
			const aftSelectIndex = hitIndex >= 0 ? hitIndex : (dispOpts.indexOf(befSelectedIndex) >= 0 ? befSelectedIndex : dispOpts[0]);
			if (aftSelectIndex !== befSelectedIndex) {
				select.selectedIndex = aftSelectIndex;
				if (dispOpts.length === 1) {
					onchange(select);
					delayOnChange = false;
				} else {
					delayOnChange = true;
				}
			}
		}
		if (delayOnChange) {
			const sel = select;
			timeoutIdOnChange = setTimeout(() => {
				onchange(sel);
			}, 1000);
		}
	};
	const off = () => {
		resetDisplays(options, originalDisplays);
		options = null;
		select = null;
		originalDisplays = null;
		input.parentElement.removeChild(input);
	};

	input.addEventListener('keyup', onFilter);
	input.addEventListener('input', onFilter);
	document.addEventListener('click', e => {
		if (e.ctrlKey && e.target.tagName.toLowerCase() === 'select') {
			if (select === e.target) {
				return;
			}
			if (options) {
				resetDisplays(options, originalDisplays);
			}
			timeoutIdOnChange = 0;

			select = e.target;
			options = select.getElementsByTagName('option');
			originalDisplays = getDisplays(options);
			input.value = '';
			setupInputStyle(input);
			select.parentElement.insertBefore(input, select);
			input.focus();

			if (!input.id) {
				input.id = getInputId();
				appendStyleSheet(input.id);
			}
			dataList.id = dataList.id || getDatalistId();

			input.setAttribute('list', dataList.id);
			document.body.appendChild(dataList);

			optionsToDatalist(options);
		} else if (e.ctrlKey && e.target === input) {
			off();
		}
	});
})();

