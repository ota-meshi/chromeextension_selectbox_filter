'use strict';

function getDiaplayOptions(select) {
    const options = select.getElementsByTagName('option');
    return Array.prototype.filter.call(options, option => option.style.display !== 'none');
}

function ctrlClick(select) {
    const evt = document.createEvent('MouseEvents');
    evt.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null );
    select.dispatchEvent(evt);
}

function keyup(input) {
    const evt = document.createEvent('KeyboardEvent');
    evt.initEvent('keyup', true, true);
    input.dispatchEvent(evt);
}

describe("suite", function() {
    it("filter", function() {
        const select = document.getElementById('language');
        ctrlClick(select);
        const input = select.previousSibling;
        expect(input.tagName.toLowerCase()).toBe('input');
        
        input.value = '英';
        keyup(input);
        
        const dispOptions = getDiaplayOptions(select);
        expect(dispOptions.length).toBe(3);
    });
    
    it("filter ABC", function() {
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
    
    it("filter ｶﾅ", function() {
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
    it("filter disp", function() {
        const select = document.getElementById('disp');
        ctrlClick(select);
        const input = select.previousSibling;
        expect(input.tagName.toLowerCase()).toBe('input');
        
        input.value = 'disp';
        keyup(input);
        
        let dispOptions = getDiaplayOptions(select);
        expect(dispOptions.length).toBe(1);
    });
    
    it("change event", function() {
        const spy = jasmine.createSpy();
        const select = $('<select><option value="1">option1</option><option value="2">change event test</option></select>')[0];
        $('#test').append(select);
        select.addEventListener('change', spy);
        ctrlClick(select);
        const input = select.previousSibling;
        expect(input.tagName.toLowerCase()).toBe('input');
        
        input.value = 'test';
        keyup(input);
        
        let dispOptions = getDiaplayOptions(select);
        expect(dispOptions.length).toBe(1);
        expect(spy).toHaveBeenCalled();
    });
    
    it("change event JQuery", function() {
        const spy = jasmine.createSpy();
        const select = $('<select><option value="1">option1</option><option value="2">change event test JQuery</option></select>')[0];
        $('#test').append(select);
        $(select).on('change', spy);
        ctrlClick(select);
        const input = select.previousSibling;
        expect(input.tagName.toLowerCase()).toBe('input');
        
        input.value = 'test';
        keyup(input);
        
        let dispOptions = getDiaplayOptions(select);
        expect(dispOptions.length).toBe(1);
        expect(spy).toHaveBeenCalled();
    });
    
    it("change event onChange", function() {
        const spy = jasmine.createSpy();
        window.onChangeTestSpy = spy;
        const select = $('<select onChange="onChangeTestSpy()"><option value="1">option1</option><option value="2">change event test onChange</option></select>')[0];
        $('#test').append(select);
        ctrlClick(select);
        const input = select.previousSibling;
        expect(input.tagName.toLowerCase()).toBe('input');
        
        input.value = 'test';
        keyup(input);
        
        let dispOptions = getDiaplayOptions(select);
        expect(dispOptions.length).toBe(1);
        expect(spy).toHaveBeenCalled();
    });

    if (window.jscoverage_report) {
        jscoverage_report();
    }
});
