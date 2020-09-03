export default function onScrollEnd(fn: () => void) {
    const $html = document.querySelector('html') || { scrollHeight: 0, scrollTop: 0, clientHeight: 0 }
    document.addEventListener('scroll', function () {
        var scrollHeight = $html.scrollHeight;
        var scrollTop = $html.scrollTop;
        var clientHeight = $html.clientHeight;

        if (scrollHeight - scrollTop === clientHeight) {
            fn()
        }
    })
}