(() => {
    'use strict';

    const input = document.createElement('input');
    input.setAttribute('placeholder', 'enter filter keyword');
    input.style.backgroundImage = 'url("' + chrome.extension.getURL('/icons/icon16.png') + '")';
    input.style.backgroundRepeat = 'no-repeat';
    input.style.backgroundPosition = 'right';
    let select;
    let options;
    let originalDisplays;
    let timeoutIdOnChange = 0;
    
    const getDisplays = opts => Array.prototype.map.call(opts, opt => opt.style.display);
    
    const resetDisplays = (opts, orgDisps) => Array.prototype.forEach.call(opts, (opt, i) => opts[i].style.display = orgDisps[i]);
    
    const adjustString = s => s ? s.toLowerCase().normalize('NFKC')
                .replace(/[ァ-ン]/g, s => String.fromCharCode(s.charCodeAt(0) - 0x60))
                .replace(/[！-～]/g, s => String.fromCharCode(s.charCodeAt(0) - 0xFEE0))
                : '';

    const onchange = select => {
        const evt = document.createEvent('Event');
        evt.initEvent('change', true, true);
        select.dispatchEvent(evt);
        timeoutIdOnChange = 0;
    };
    
    input.addEventListener('keyup', () => {
        const value = adjustString(input.value);
        const match = value ? option => {
            return adjustString(option.textContent).indexOf(value) > -1;
        } : option => {
            return true;
        };
        const befSelectedIndex = select.selectedIndex;
        const dispOpt = [];
        Array.prototype.forEach.call(options ,(option, i) => {
            if (match(option)) {
                option.style.display = originalDisplays[i];
                if (originalDisplays[i] !== 'none') {
                    dispOpt.push(i);
                }
            } else {
                option.style.display = 'none';
            }
            if (option.textContent === value) {
                select.selectedIndex = i;
            }
        });
        let delayOnChange = false;
        if (timeoutIdOnChange) {
            clearTimeout(timeoutIdOnChange);
            delayOnChange = true;
            timeoutIdOnChange = 0;
        }
        if (dispOpt.length > 0 && dispOpt.indexOf(befSelectedIndex) < 0) {
            select.selectedIndex = dispOpt[0];
            if (dispOpt.length === 1) {
                onchange(select);
                delayOnChange = false;
            } else {
                delayOnChange = true;
            }
        }
        if (delayOnChange) {
            let sel = select;
            timeoutIdOnChange = setTimeout(() => {
                onchange(sel);
            }, 1000);
        }
    });
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
            select.parentElement.insertBefore(input, select);
            input.focus();
        }
    });
})();

