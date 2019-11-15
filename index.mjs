function isFunc(fn) {
    return fn && typeof fn === 'function';
}
function addXMLRequestOpenAOP({before, after} = {}) {
    const _open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function open(...args) {
        const data = {
            href: location.href,
            method: args[0],
            url: args[1],
            async: args[2]
        };
        try {
            if(isFunc(before) && before(this, data)) {
                // 可中断
                return;
            }
        } catch(e) {/**/}

        isFunc(_open) && _open.apply(this, args);

        try {
            isFunc(after) && after(this, data);
        } catch(e) {/**/}
    };
}

export default addXMLRequestOpenAOP;
