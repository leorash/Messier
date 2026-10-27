/* ============================================================
 *  页面防护：禁用开发者工具 / 快捷键 / 右键菜单
 *  依赖：disable-devtool（CDN，在 index.html 中先于本文件加载）
 * ============================================================ */

if (typeof DisableDevtool === 'function') {
    DisableDevtool({
        disableMenu: true,
        interval: 200,
        clearInterval: true,
        ondevtoolopen: function () {
            window.location.replace('about:blank');
        }
    });
} else {
    console.warn('DisableDevtool 未加载，启用备用防护');
}

document.addEventListener('keydown', function (e) {
    const k = e.key ? e.key.toUpperCase() : '';
    if (
        k === 'F12' ||
        (e.ctrlKey && e.shiftKey && (k === 'I' || k === 'J' || k === 'C')) ||
        (e.ctrlKey && (k === 'U' || k === 'S' || k === 'P'))
    ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}, true);

document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
}, true);
