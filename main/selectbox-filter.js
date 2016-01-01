(function() {
    'use strict';
    let input = document.createElement('input');
    input.setAttribute('placeholder', 'enter filter keyword');
    input.style.backgroundImage = 'url("' + chrome.extension.getURL('/icons/icon16.png') + '")';
    input.style.backgroundRepeat = 'no-repeat';
    input.style.backgroundPosition = 'right';
    let select;
    let options;
    let originalDisplays;
    
    let getDisplays = function(opts) {
        let result = [];
        for (let i = 0; i < opts.length; i++) {
            result.push(opts[i].style.display);
        }
        return result;
    };
    
    let resetDisplays = function(opts, orgDisps) {
        let result = [];
        for (let i = 0; i < opts.length; i++) {
            opts[i].style.display = orgDisps[i];
        }
        return result;
    };
    
    let adjustString = function(s) {
        if (!s) {
            return '';
        } else {
            return s.toLowerCase().normalize('NFKC').replace(/[ァ-ン]/g, function(s) {
                return String.fromCharCode(s.charCodeAt(0) - 0x60);
            }).replace(/[！-～]/g, function(s) {
                return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
            });
        }
    };
    
    input.addEventListener('keyup', function() {
        let value = adjustString(input.value);
        let match = value ? function(option) {
            return adjustString(option.textContent).indexOf(value) > -1;
        } : function(option) {
            return true;
        };
        let befSelectedIndex = select.selectedIndex;
        let dispOpt = [];
        for (let i = 0; i < options.length; i++) {
            if (match(options[i])) {
                options[i].style.display = originalDisplays[i];
                if (originalDisplays[i] !== 'none') {
                    dispOpt.push(i);
                }
            } else {
                options[i].style.display = 'none';
            }
            if (options[i].textContent === value) {
                select.selectedIndex = i;
            }
        }
        if (dispOpt.length > 0 && dispOpt.indexOf(befSelectedIndex) < 0) {
            select.selectedIndex = dispOpt[0];
        }
    });
    document.addEventListener('click', function(e) {
        if (e.ctrlKey && e.target.tagName.toLowerCase() === 'select') {
            if (select === e.target) {
                return;
            }
            if (options) {
                resetDisplays(options, originalDisplays);
            }
            
            select = e.target;
            options = select.getElementsByTagName('option');
            originalDisplays = getDisplays(options);
            input.value = '';
            select.parentElement.insertBefore(input, select);
            input.focus();
        }
    });
})();
