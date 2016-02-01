(function() {
	'use strict';
	function getDiaplayOptions(select) {
		const options = select.getElementsByTagName('option');
		return Array.prototype.filter.call(options, option => option.style.display !== 'none');
	}

	function ctrlClick(select) {
		const evt = new MouseEvent('click', {
			bubbles: true,
			cancelable: true,
			view: window,
			ctrlKey: true,
		});
		select.dispatchEvent(evt);
	}

	function keyup(input) {
		const evt = document.createEvent('KeyboardEvent');
		evt.initEvent('keyup', true, true);
		input.dispatchEvent(evt);
	}

	describe('filter suite', () => {
		it('filter', () => {
			const select = document.getElementById('language');
			ctrlClick(select);
			const input = select.previousSibling;
			expect(input.tagName.toLowerCase()).toBe('input');

			input.value = '英';
			keyup(input);

			const dispOptions = getDiaplayOptions(select);
			expect(dispOptions.length).toBe(3);
		});

		it('filter ABC', () => {
			const select = document.getElementById('chars');
			ctrlClick(select);
			const input = select.previousSibling;
			expect(input.tagName.toLowerCase()).toBe('input');

			input.value = 'ABC';
			keyup(input);

			let dispOptions = getDiaplayOptions(select);
			expect(dispOptions.length).toBe(1);
			expect(dispOptions[0].textContent).toBe('abcd');

			input.value = 'ａｂｃ';
			keyup(input);

			dispOptions = getDiaplayOptions(select);
			expect(dispOptions.length).toBe(1);
			expect(dispOptions[0].textContent).toBe('abcd');
		});

		it('filter ｶﾅ', () => {
			const select = document.getElementById('chars');
			ctrlClick(select);
			const input = select.previousSibling;
			expect(input.tagName.toLowerCase()).toBe('input');

			input.value = 'アイウ';
			keyup(input);

			let dispOptions = getDiaplayOptions(select);
			expect(dispOptions.length).toBe(1);
			expect(dispOptions[0].textContent).toBe('ｱｲｳｴｵ');

			input.value = 'あいう';
			keyup(input);

			dispOptions = getDiaplayOptions(select);
			expect(dispOptions.length).toBe(1);
			expect(dispOptions[0].textContent).toBe('ｱｲｳｴｵ');
		});
		it('filter disp', () => {
			const select = document.getElementById('disp');
			ctrlClick(select);
			const input = select.previousSibling;
			expect(input.tagName.toLowerCase()).toBe('input');

			input.value = 'disp';
			keyup(input);

			const dispOptions = getDiaplayOptions(select);
			expect(dispOptions.length).toBe(1);
		});

		it('filter empty', () => {
			const select = $('<select><option value="1">option1</option><option value="2">option2-hit</option><option value="3">option3</option></select>')[0];
			$('#test').append(select);
			ctrlClick(select);
			const input = select.previousSibling;
			expect(input.tagName.toLowerCase()).toBe('input');

			input.value = 'hit';
			keyup(input);

			let dispOptions = getDiaplayOptions(select);
			expect(dispOptions.length).toBe(1);
			expect(select.selectedIndex).toBe(1);

			input.value = '';
			keyup(input);
			dispOptions = getDiaplayOptions(select);
			expect(dispOptions.length).toBe(3);
			expect(select.selectedIndex).toBe(1);
		});
	});

	describe('event suite', () => {
		it('change event', () => {
			const spy = jasmine.createSpy();
			const select = $('<select><option value="1">option1</option><option value="2">change event test</option></select>')[0];
			$('#test').append(select);
			select.addEventListener('change', spy);
			ctrlClick(select);
			const input = select.previousSibling;
			expect(input.tagName.toLowerCase()).toBe('input');

			input.value = 'test';
			keyup(input);

			const dispOptions = getDiaplayOptions(select);
			expect(dispOptions.length).toBe(1);
			expect(spy).toHaveBeenCalled();
		});

		it('change event JQuery', () => {
			const spy = jasmine.createSpy();
			const select = $('<select><option value="1">option1</option><option value="2">change event test JQuery</option></select>')[0];
			$('#test').append(select);
			$(select).on('change', spy);
			ctrlClick(select);
			const input = select.previousSibling;
			expect(input.tagName.toLowerCase()).toBe('input');

			input.value = 'test';
			keyup(input);

			const dispOptions = getDiaplayOptions(select);
			expect(dispOptions.length).toBe(1);
			expect(spy).toHaveBeenCalled();
		});

		it('change event onChange', () => {
			const spy = jasmine.createSpy();
			window.onChangeTestSpy = spy;
			const select = $('<select onChange="onChangeTestSpy()"><option value="1">option1</option><option value="2">change event test onChange</option></select>')[0];
			$('#test').append(select);
			ctrlClick(select);
			const input = select.previousSibling;
			expect(input.tagName.toLowerCase()).toBe('input');

			input.value = 'test';
			keyup(input);

			const dispOptions = getDiaplayOptions(select);
			expect(dispOptions.length).toBe(1);
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('delay event suite', () => {
		beforeEach(function() {
			jasmine.clock().install();
		});
		afterEach(function() {
			jasmine.clock().uninstall();
		});
		it('delay change event', () => {
			const spy = jasmine.createSpy();
			const select = $('<select><option value="1">option1</option><option value="2">delay change event test</option><option value="3">test</option></select>')[0];
			$('#test').append(select);
			select.addEventListener('change', spy);
			ctrlClick(select);
			const input = select.previousSibling;
			expect(input.tagName.toLowerCase()).toBe('input');

			input.value = 'tes';
			keyup(input);

			const dispOptions = getDiaplayOptions(select);
			expect(dispOptions.length).toBe(2);
			expect(spy).not.toHaveBeenCalled();

			jasmine.clock().tick(1100);

			expect(spy).toHaveBeenCalled();
		});
	});

	describe('delay event 2 suite', () => {
		it('delay change event2', done => {
			const waits = time => {
				let fn;
				let end = false;
				setTimeout(() => {
					if (fn) {
						fn();
					}
					if (end) {
						done();
					}
				}, time);
				return {
					runs: delayfn => {
						fn = delayfn;
						return {
							waits: time2 => {
								return waits(time + time2);
							},
							done: () => {
								end = true;
							},
						};
					},
				};
			};
			const spy = jasmine.createSpy();
			const select = $('<select><option value="1">option1</option><option value="2">delay change event test</option><option value="3">test</option></select>')[0];
			$('#test').append(select);
			select.addEventListener('change', spy);
			ctrlClick(select);
			const input = select.previousSibling;
			expect(input.tagName.toLowerCase()).toBe('input');

			input.value = 'te';
			keyup(input);

			const dispOptions = getDiaplayOptions(select);
			expect(dispOptions.length).toBe(2);
			expect(spy).not.toHaveBeenCalled();

			waits(500).runs(() => {
				expect(spy).not.toHaveBeenCalled();
				input.value = 'tes';
				keyup(input);
			}).waits(600).runs(() => {
				expect(spy).not.toHaveBeenCalled();
			}).waits(600).runs(() => {
				expect(spy).toHaveBeenCalled();
			}).done();
		});

	});

	describe('mode suite', () => {
		it('off', () => {
			const select = $('<select><option value="1">option1</option><option value="2">option2</option></select>')[0];
			$('#test').append(select);
			ctrlClick(select);
			const input = select.previousSibling;
			expect(input.tagName.toLowerCase()).toBe('input');

			ctrlClick(input);
			const notinput = select.previousSibling;
			expect(notinput.tagName.toLowerCase()).not.toBe('input');
		});

		it('reset disabled', () => {
			const select = $('<select><option value="1">option1</option><option value="2">option2</option></select>')[0];
			$('#test').append(select);
			ctrlClick(select);
			const input = select.previousSibling;
			expect(input.tagName.toLowerCase()).toBe('input');
			input.setAttribute('disabled', true);

			ctrlClick(input);
			ctrlClick(select);

			expect(input.getAttribute('disabled')).toBe(null);
		});

		if (window.jscoverage_report) {
			window.jscoverage_report();
		}
	});
})();